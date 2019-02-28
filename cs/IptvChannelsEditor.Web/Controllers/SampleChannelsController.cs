using System.Collections.Generic;
using ChannelsListParser;
using Microsoft.AspNetCore.Mvc;

namespace IptvChannelsEditor.Web.Controllers
{
    [Route("api/[controller]")]
    public class SampleChannelsController
    {
        [HttpGet]
        public Playlist GetChannels()
        {
            var channels =
                new[]
                {
                    new Channel(-1, "Первый канал", "http://localhost:3000", "Новости",
                        new ChannelAttributes(null, "https://webarmen.com/my/iptv/uploads/icon/2.png", null, null)),
                    new Channel(-1, "Первый канал HD", "http://localhost:3001", "Новости",
                        new ChannelAttributes(null, "https://webarmen.com/my/iptv/uploads/icon/154.png", null, null)),
                    new Channel(-1, "Россия 1 HD", "http://localhost:3003", "Новости",
                        new ChannelAttributes(null, "https://webarmen.com/my/iptv/uploads/icon/1.png", null, null)),
                };

            return new Playlist(channels);
        }
    }
}