using System.Collections.Generic;
using System.IO;

namespace M3UPlaylistParser
{
    internal static class StreamReaderExtensions
    {
        internal static IEnumerable<string> ReadAllLines(this StreamReader streamReader)
        {
            string line;
            while ((line = streamReader.ReadLine()) != null)
            {
                yield return line;
            }
        }
    }
}