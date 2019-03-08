using System;
using ChannelsListParser;
using Microsoft.EntityFrameworkCore;

namespace IptvChannelsEditor.Web.Domain
{
    public interface IPlaylistRepository
    {
        Playlist Insert(Playlist playlist);
        void Update(Playlist playlist);
        Playlist FindById(Guid playlistId);
        void Delete(Guid playlistId);
    }
}