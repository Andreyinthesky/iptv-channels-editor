using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using IptvChannelsEditor.Web.Domain;
using IptvChannelsEditor.Web.Helpers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IptvChannelsEditor.Web.Controllers
{
    [Route("api/[controller]")]
    public class Playlist : Controller
    {
        private readonly IPlaylistRepository repository;
        
        public Playlist(IPlaylistRepository repository)
        {
            this.repository = repository;
        }
        
        [HttpPost("[action]")]
        public async Task<IActionResult> Upload(IFormFile file)
        {
            string fileData = null;

            if (file == null)
            {
                return BadRequest();
            }
            
            using (var memoryStream = new MemoryStream())
            {
                await file.CopyToAsync(memoryStream);
                var fileBytes = memoryStream.ToArray();
                fileData = Encoding.UTF8.GetString(fileBytes);
            }
            
            var playlist = ChannelsListParser.Playlist.Parse(fileData);
            playlist.Name = FileHelpers.GetPlaylistNameFromFileName(file.FileName);
            repository.Insert(playlist);
            
            return Ok(playlist);
        }

        [HttpGet("[action]/{id}")]
        public IActionResult Download([FromQuery]Guid playlistId)
        {         
            var fileName = "Playlist " + DateTime.Now + ".m3u";
            var playlist = repository.FindById(playlistId);

            if (playlist == null)
            {
                return NotFound();
            }
            
            var contentType = "application/mpegurl";
            FileContentResult result;
            using (var memoryStream = new MemoryStream())
            {
                memoryStream.WriteAsync(Encoding.UTF8.GetBytes(playlist.ToString()));
                result = File(memoryStream.ToArray(), contentType, fileName);
            }

            return result;
        }

        [HttpPatch("[action]")]
        public IActionResult Update([FromBody] Playlist playlist)
        {
            throw new NotImplementedException();
        }
        
        [HttpDelete("[action]/{id}")]
        public IActionResult Delete([FromQuery] Guid playlistId)
        {
            throw new NotImplementedException();
        }
    }
}