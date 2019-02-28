using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;

namespace ChannelsListParser
{
    public class Channel
    {
        private const string DEFINITION =
            @"#EXTINF:(?<duration>-1|\d+)(?<attributes>.*)?,\s?(?<title>.*)";

        private const string DefinitionFormat =
            @"#EXTINF:{0} {1},{2}";

        public string Title { get; set; }
        public int Duration { get; set; } = -1;
        public string Path { get; set; }
        public string GroupTitle { get; set; }
        public ChannelAttributes Attributes { get; set; }

        public Channel()          
        {
        }
        
        public Channel(int duration, string title, string path)
            : this(duration, title, path, null, new ChannelAttributes())
        {
        }
        
        public Channel(int duration, string title, string path, string groupTitle)
            : this(duration, title, path, groupTitle, new ChannelAttributes())
        {
        }

        public Channel(int duration, string title, string path, string groupTitle,
            ChannelAttributes attributes)
        {
            Duration = duration;
            Title = title;
            Path = path;
            GroupTitle = groupTitle;
            Attributes = attributes;
        }

        public static Channel Parse(string definition, string path, string groupTitle = null)
        {
            var channel = new Channel();
            try
            {
                var match = Regex.Match(definition, DEFINITION, RegexOptions.CultureInvariant);
                channel.Duration = int.Parse(match.Groups["duration"].Value);
                channel.Title = match.Groups["title"].Value;
                channel.Path = path;
                channel.GroupTitle = groupTitle;
                channel.Attributes = ChannelAttributes.Parse(match.Groups["attributes"].Value);

                return channel;
            }
            catch (Exception e)
            {
                throw new Exception(
                    $"Error processing playlist item: {definition}{Environment.NewLine}"
                    + $"{path}{Environment.NewLine}"
                    + $"{e.Message}");
            }
        }

        public override string ToString()
        {
            return string.Format(DefinitionFormat, Duration, Attributes, Title)
                   + Environment.NewLine
                   + Path
                   + Environment.NewLine;
        }
    }
}