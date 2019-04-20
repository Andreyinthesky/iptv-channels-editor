using System;
using System.IO;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using IptvChannelsEditor.Web.Domain;
using IptvChannelsEditor.Web.Helpers;
using IptvChannelsEditor.Web.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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

        [HttpGet("[action]/{playlistId}")]
        public IActionResult Download([FromRoute]Guid playlistId)
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

        [HttpPatch("{playlistId}")]
        public IActionResult Update([FromRoute] Guid playlistId, [FromBody]UpdatePlaylistDto playlistDto)
        {          
            if (playlistDto == null)
            {
                return BadRequest();                
            }

            var playlistForUpdate = playlistId != Guid.Empty ? repository.FindById(playlistId) : null;
            if (playlistForUpdate == null)
            {
                return NotFound();
            }
            
            if (!TryValidateModel(playlistDto))
            {
                return new UnprocessableEntityObjectResult(ModelState);
            }
            
            var updatedPlaylist = Mapper.Map(playlistDto, playlistForUpdate);
            repository.Update(updatedPlaylist);
            return NoContent();
        }
        
        [HttpDelete("{playlistId}")]
        public IActionResult Delete([FromRoute] Guid playlistId)
        {
            var retrievedPlaylist = playlistId != Guid.Empty ? repository.FindById(playlistId) : null;
            
            if (retrievedPlaylist == null)
            {
                return NotFound();
            }
            
            return NoContent();
        }
    }
}