using System;
using System.Collections.Generic;
using System.IO;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using ChannelsListParser;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IptvChannelsEditor.Web.Controllers
{
    [Route("api/[controller]")]
    public class File : Controller
    {
        [HttpPost("[action]")]
        public async Task<IEnumerable<Channel>> Upload(IFormFile file)
        {
            string fileData = null;
                            
            if (file != null)
            {
                var path = "/Files/" + file.FileName;
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    var fileBytes = memoryStream.ToArray();
                    fileData = Encoding.UTF8.GetString(fileBytes);
                }
            }
            return Playlist.Parse(fileData).Channels;
        }

        [HttpGet("[action]")]
        public IActionResult Download()
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
            
            var playlist = new Playlist(channels);
            var contentType = "application/mpegurl";
            var fileName = "Playlist " + DateTime.Now + ".m3u";
            FileContentResult result;
            using (var memoryStream = new MemoryStream())
            {
                memoryStream.WriteAsync(Encoding.UTF8.GetBytes(playlist.ToString()));
                result = File(memoryStream.ToArray(), contentType, fileName);
            }

            return result;
        }
    }
}