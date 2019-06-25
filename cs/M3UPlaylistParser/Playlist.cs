using System.Collections.Generic;
using System.IO;

namespace M3UPlaylistParser
{
    public class Playlist
    {
        public IEnumerable<PlaylistItem> Items { get; private set; }

        internal Playlist(IEnumerable<PlaylistItem> items)
        {
            Items = items;
        }
        
        public static Playlist Parse(string filePath)
        {
            return Parse(File.ReadAllLines(filePath));
        }
        
        public static Playlist Parse(StreamReader streamReader)
        {
            return Parse(streamReader.ReadAllLines());
        }

        private static Playlist Parse(IEnumerable<string> lines)
        {
            var parser = new PlaylistParser();
            return parser.Parse(lines);
        }
    }
}