using System;
using System.CodeDom;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text.RegularExpressions;

namespace ChannelsListParser
{
    public class Playlist
    {
        public IEnumerable<Channel> Channels { get; }

        private const string PREFIX_EXTM3U = "#EXTM3U";
        private const string PREFIX_EXTINF = "#EXTINF:";
        private const string PREFIX_EXTGRP = "#EXTGRP:";
        private const string PREFIX_COMMENT = "#";
        
        private const string EXTGRP = @"#EXTGRP:(?<group>.*)";

        public Playlist(IEnumerable<Channel> channels)
        {
            Channels = channels;
        }

        public static Playlist Parse(string str)
        {
            var channels = new List<Channel>();
            var lines = str.Split('\n', '\r').Where(s => !string.IsNullOrWhiteSpace(s)).ToList();
            var linesEnumerator = lines.GetEnumerator();

            if (!linesEnumerator.MoveNext() || !lines[0].StartsWith(PREFIX_EXTM3U))
            {
                throw new FormatException("Not a m3u file format");
            }

            while (linesEnumerator.MoveNext())
            {
                var definition = linesEnumerator.Current?.Trim() ?? string.Empty;

                if (definition.StartsWith(PREFIX_EXTINF) && linesEnumerator.MoveNext())
                {
                    string group = null;
                    var channelPath = linesEnumerator.Current?.Trim() ?? string.Empty;
                    
                    if (channelPath.StartsWith(PREFIX_EXTGRP))
                    {
                        if (!linesEnumerator.MoveNext())
                            break;
                        group = channelPath;
                        channelPath = linesEnumerator.Current?.Trim();
                    }

                    group = group == null ? null : Regex
                        .Match(group, EXTGRP, RegexOptions.CultureInvariant)
                        .Groups["group"]
                        .Value;
                    
                    channels.Add(Channel.Parse(definition, channelPath, group));
                }
            }

            linesEnumerator.Dispose();
            return new Playlist(channels);
        }
    }
}