using System.Text.RegularExpressions;

namespace IptvChannelsEditor.Web.Helpers
{
    public class FileHelpers
    {
        private const string playlistFileName = @"(?<name>.+)\.m3u(8?)$";
        
        public static string GetPlaylistNameFromFileName(string fileName)
        {
            var match = Regex.Match(fileName, playlistFileName, RegexOptions.IgnoreCase);
            if (!match.Success)
            {
                return fileName;
            }

            return match.Groups["name"].Value;
        }
    }
}