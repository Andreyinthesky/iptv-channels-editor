using Microsoft.AspNetCore.Mvc;
using IptvChannelsEditor.Tools;

namespace IptvChannelsEditor.Web.Controllers
{
    [Route("api/[controller]")]
    public class ChannelController : Controller
    {
        private readonly IChannelChecker channelChecker;
        
        public ChannelController(IChannelChecker channelChecker)
        {
            this.channelChecker = channelChecker;
        }
        
        [HttpGet("[action]")]
        public bool Check([FromQuery] string path)
        {
            if (string.IsNullOrEmpty(path) || path.Contains("localhost") || path.Contains("127.0.0.1"))
            {
                return false;
            }

            return channelChecker.Check(path);
        }
    }
}