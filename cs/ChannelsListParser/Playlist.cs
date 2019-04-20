using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using MongoDB.Bson.Serialization.Attributes;

namespace ChannelsListParser
{
    public class Playlist
    {
        public Guid Id { get; private set; }
        public string Name { get; set; }
        // ReSharper disable once AutoPropertyCanBeMadeGetOnly.Local
        public IEnumerable<Channel> Channels { get; private set; }
        
        [BsonElement]
        private int nextChannelNumber = 0;
        
        private const string PREFIX_EXTM3U = "#EXTM3U";
        private const string PREFIX_EXTINF = "#EXTINF:";
        private const string PREFIX_EXTGRP = "#EXTGRP:";
        private const string PREFIX_COMMENT = "#";        
        private const string EXTGRP_REGEX = @"#EXTGRP:(?<group>.*)";

        public Playlist(IEnumerable<Channel> channels, string name = null)
            :this(Guid.Empty, channels, name)
        {
        }
        
        public Playlist(Guid id, IEnumerable<Channel> channels, string name = null)
        {
            Id = id;
            Channels = channels;
            Name = name;
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
                        .Match(group, EXTGRP_REGEX, RegexOptions.CultureInvariant)
                        .Groups["group"]
                        .Value;
                    
                    channels.Add(Channel.Parse(definition, channelPath, group));
                }
            }
            
            linesEnumerator.Dispose();
            return new Playlist(channels);
        }

        public override string ToString()
        {
            var stringBuilder = new StringBuilder();
            stringBuilder.AppendLine(PREFIX_EXTM3U);
            
            foreach (var channel in Channels)
            {
                stringBuilder.Append(channel);
            }

            return stringBuilder.ToString();
        }
    }
}