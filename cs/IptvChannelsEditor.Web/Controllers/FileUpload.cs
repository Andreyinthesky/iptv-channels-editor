using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using ChannelsListParser;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IptvChannelsEditor.Web.Controllers
{
    [Route("api/[controller]")]
    public class FileUpload : Controller
    {
        [HttpPost("[action]")]
        public async Task<IEnumerable<Channel>> Index(IFormFile file)
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
    }
}