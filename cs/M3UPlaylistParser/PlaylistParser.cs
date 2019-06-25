using System.Collections.Generic;

namespace M3UPlaylistParser
{
    internal class PlaylistParser
    {
        private const string PREFIX_EXTINF = "#EXTINF:";
        private const string PREFIX_EXTGRP = "#EXTGRP:";
    
        internal Playlist Parse(IEnumerable<string> lines)
        {
            PlaylistItem currentItem = null;
            var items = new List<PlaylistItem>();
    
            foreach (var line in lines)
            {
                if (line.StartsWith(PREFIX_EXTINF))
                {
                    ParsePlaylistItemItemInfo(line, ref currentItem);
                }
                else if (line.StartsWith(PREFIX_EXTGRP))
                {
                    ParsePlaylistItemGroup(line, ref currentItem);
                }
                else if (line.Length > 0 && !line.StartsWith('#'))
                {
                    ParsePlaylistItemPath(line, ref currentItem);
                    items.Add(currentItem);
                    currentItem = null;
                }
            }
    
            return new Playlist(items);
        }
    
        private void ParsePlaylistItemItemInfo(string line, ref PlaylistItem playlistItem)
        {
            playlistItem = playlistItem ?? new PlaylistItem();
            var state = ParsePlaylistItemInfoState.Idle;
            var prevPosition = PREFIX_EXTINF.Length;
            var curPosition = prevPosition;
            string curAttributeName = null;
    
            do
            {
                switch (state)
                {
                    case ParsePlaylistItemInfoState.Idle:
                    {
                        if (line[curPosition] == '-' || char.IsDigit(line[curPosition]))
                            state = ParsePlaylistItemInfoState.ParseDuration;
                        else if (char.IsLetter(line[curPosition]))
                            state = ParsePlaylistItemInfoState.ParseAttributeName;
                        else if (line[curPosition] == ',')
                            state = ParsePlaylistItemInfoState.ParseTitle;
                        prevPosition = curPosition;
                    }
                        break;
                    case ParsePlaylistItemInfoState.ParseDuration:
                    {
                        if (!char.IsDigit(line[curPosition]))
                        {
                            if (int.TryParse(line.Substring(prevPosition, curPosition - prevPosition),
                                out var duration))
                                playlistItem.Duration = duration;
                            prevPosition = curPosition;
                            state = line[curPosition] != ','
                                ? ParsePlaylistItemInfoState.Idle
                                : ParsePlaylistItemInfoState.ParseTitle;
                        }
                    }
                        break;
                    case ParsePlaylistItemInfoState.ParseAttributeName:
                    {
                        if (line[curPosition] == '=')
                        {
                            curAttributeName = line.Substring(prevPosition, curPosition - prevPosition);
                            prevPosition = ++curPosition + 1;
                            state = ParsePlaylistItemInfoState.ParseAttributeValue;
                        }
                        else if (line[curPosition] == '\"' || char.IsWhiteSpace(line[curPosition]))
                        {
                            curAttributeName = null;
                        }
                        else if (line[curPosition] == ',')
                        {
                            state = ParsePlaylistItemInfoState.ParseTitle;
                        }
                    }
                        break;
                    case ParsePlaylistItemInfoState.ParseTitle:
                    {
                        playlistItem.Title = line.Substring(curPosition);
                        return;
                    }
                    case ParsePlaylistItemInfoState.ParseAttributeValue:
                    {
                        if (line[curPosition] == '\"')
                        {
                            playlistItem.Attributes[curAttributeName] =
                                line.Substring(prevPosition, curPosition - prevPosition);
                            state = ParsePlaylistItemInfoState.Idle;
                        }
                    }
                        break;
                }
            } while (++curPosition < line.Length);
        }
    
        private void ParsePlaylistItemGroup(string line, ref PlaylistItem playlistItem)
        {
            playlistItem = playlistItem ?? new PlaylistItem();
            var result = line.Substring(PREFIX_EXTGRP.Length).Trim();
            playlistItem.GroupTitle = result;
        }
    
        private void ParsePlaylistItemPath(string line, ref PlaylistItem playlistItem)
        {
            playlistItem = playlistItem ?? new PlaylistItem();
            playlistItem.Path = line.Trim();
        }
    }
}