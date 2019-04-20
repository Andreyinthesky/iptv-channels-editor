using System;
using System.Collections.Generic;
using ChannelsListParser;
using IptvChannelsEditor.Web.Domain;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;

namespace IptvChannelsEditor.Web.Controllers
{
    [Route("api/[controller]")]
    public class SampleChannelsController
    {
        private readonly IPlaylistRepository repository;
        private readonly Guid sampleChannelsId = Guid.Parse("77777777-7777-7777-7777-000000000000");

        public SampleChannelsController(IPlaylistRepository repository)
        {
            this.repository = repository;
        }   
        
        [HttpGet]
        public ChannelsListParser.Playlist GetChannels()
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
            
            var playlist = new ChannelsListParser.Playlist(sampleChannelsId, channels, "sample playlist");
            var retrievedPlaylist = repository.FindById(sampleChannelsId);
            
            if (retrievedPlaylist != null)
            {
                repository.Update(playlist);
                return playlist;
            }

            repository.Insert(playlist);

            return playlist;
        }
    }
}