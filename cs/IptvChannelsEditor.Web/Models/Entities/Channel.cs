namespace IptvChannelsEditor.Web.Models.Entities
{
    public class Channel
    {
        public string Title { get; set; }
        public int Duration { get; set; } = -1;
        public string Path { get; set; }
        public string GroupTitle { get; set; }
        public ChannelAttributes Attributes { get; set; }
        
        private const string ChannelFormat =
            @"#EXTINF:{0} {1},{2}";

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
        
        public override string ToString()
        {
            return string.Format(ChannelFormat, Duration, Attributes, Title)
                   + (GroupTitle == null ? "" : '\n' + "#EXTGRP:" + GroupTitle)
                   + '\n'
                   + Path
                   + '\n';
        }
    }
}