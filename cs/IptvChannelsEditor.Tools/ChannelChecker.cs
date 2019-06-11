using System;
using System.IO;
using System.Linq;
using System.Reflection;
using NReco.VideoInfo;

namespace IptvChannelsEditor.Tools
{
    public class ChannelChecker : IChannelChecker
    {
        private readonly string ffmpegPath;
        
        public ChannelChecker()
        {
            var directoryPath = new Uri(Assembly.GetExecutingAssembly().CodeBase).LocalPath;
            ffmpegPath = Path.Combine(Path.GetDirectoryName(directoryPath), "ffmpeg");
        }
        
        public bool Check(string path)
        {
            var probe = new FFProbe {ToolPath = ffmpegPath, ExecutionTimeout = TimeSpan.FromSeconds(1.5)};

            MediaInfo mediaInfo = null;
            
            try
            {
                mediaInfo = probe.GetMediaInfo(path);
            }
            catch (Exception e)
            {
                return false;
            }

            return mediaInfo != null && mediaInfo.Streams.Any(s => s.PixelFormat != null);
        }
    }
}