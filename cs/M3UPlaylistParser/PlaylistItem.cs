using System;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using System.Text.RegularExpressions;

namespace M3UPlaylistParser
{
    public class PlaylistItem
    {
        public string Title { get; set; }
        public int Duration { get; set; } = -1;
        public string Path { get; set; }
        public string GroupTitle { get; set; }
        public Dictionary<string, string> Attributes { get; set; }

        public PlaylistItem()
        {
            Attributes = new Dictionary<string, string>();
        }
    }
}