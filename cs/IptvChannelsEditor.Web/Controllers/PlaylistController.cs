using System;
using System.IO;
using System.Text;
using AutoMapper;
using IptvChannelsEditor.Web.Domain;
using IptvChannelsEditor.Web.Helpers;
using IptvChannelsEditor.Web.Models;
using IptvChannelsEditor.Web.Models.Entities;
using M3UPlaylistParser;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace IptvChannelsEditor.Web.Controllers
{
    [Route("api/[controller]")]
    public class PlaylistController : Controller
    {
        private readonly IPlaylistRepository repository;
        
        public PlaylistController(IPlaylistRepository repository)
        {
            this.repository = repository;
        }

        [HttpPost("[action]")]
        public IActionResult Create()
        {
            var playlistEntity = new PlaylistEntity
            {
                Name="Новый плейлист",
            };
            
            repository.Insert(playlistEntity);
            return Ok(playlistEntity);
        }
        
        [HttpPost("[action]")]
        public IActionResult Upload(IFormFile file)
        {
            if (file == null)
            {
                return BadRequest();
            }

            Playlist playlist;
            using (var fileStream = file.OpenReadStream())
            {   
                playlist = Playlist.Parse(new StreamReader(fileStream));
            }

            var playlistEntity = Mapper.Map<Playlist, PlaylistEntity>(playlist);
            playlistEntity.Name = FileHelpers.GetPlaylistNameFromFileName(file.FileName);
            repository.Insert(playlistEntity);
            
            return Ok(playlistEntity);
        }

        [HttpGet("[action]/{playlistId}")]
        public IActionResult Get([FromRoute]Guid playlistId)
        {         
            var playlistEntity = repository.FindById(playlistId);
            
            if (playlistEntity == null)
            {
                return NotFound();
            }

            return Ok(playlistEntity);
        }
        
        [HttpGet("[action]/{playlistId}")]
        public IActionResult Download([FromRoute]Guid playlistId)
        {         
            var playlist = repository.FindById(playlistId);
            
            if (playlist == null)
            {
                return NotFound();
            }
            
            var fileName = playlist.Name + ".m3u";
            var contentType = "application/mpegurl";
            
            var memoryStream = new MemoryStream();
            playlist.Channels?
                .ForEach(channel => memoryStream.Write(Encoding.UTF8.GetBytes(channel.ToString())));
            memoryStream.Position = 0;
            return File(memoryStream, contentType, fileName);
        }

        [HttpPut("{playlistId}")]
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