using System;
using System.Linq;
using Microsoft.Extensions.Configuration;
using NReco.VideoInfo;

namespace IptvChannelsEditor.Tools
{
    public class ChannelChecker : IChannelChecker
    {
        private readonly string ffmpegPath;
        
        public ChannelChecker(IConfiguration configuration)
        {
            ffmpegPath = configuration.GetSection("FfmpegPath").Value;
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