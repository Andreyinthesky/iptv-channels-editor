using System;
using IptvChannelsEditor.Web.Models.Entities;

namespace IptvChannelsEditor.Web.Domain
{
    public interface IPlaylistRepository
    {
        PlaylistEntity Insert(PlaylistEntity playlist);
        void Update(PlaylistEntity playlist);
        PlaylistEntity FindById(Guid playlistId);
        void Delete(Guid playlistId);
    }
}