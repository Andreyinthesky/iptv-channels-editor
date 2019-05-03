using System;
using IptvChannelsEditor.Web.Models.Entities;
using MongoDB.Driver;

namespace IptvChannelsEditor.Web.Domain
{
    public class MongoPlaylistRepository : IPlaylistRepository
    {
        private readonly IMongoCollection<PlaylistEntity> playlistCollection;
        public const string CollectionName = "playlists";
        
        public MongoPlaylistRepository(IMongoDatabase database)
        {
            playlistCollection = database.GetCollection<PlaylistEntity>(CollectionName);
        }
        
        public MongoPlaylistRepository(IMongoDatabaseProvider provider)
        {
            playlistCollection = provider.GetDatabase().GetCollection<PlaylistEntity>(CollectionName);
        }
        
        public PlaylistEntity Insert(PlaylistEntity playlist)
        {
            playlistCollection.InsertOne(playlist);
            return playlist;
        }

        public void Update(PlaylistEntity playlist)
        {
            playlistCollection.ReplaceOne(p => playlist.Id == p.Id, playlist);
        }

        public PlaylistEntity FindById(Guid playlistId)
        {
            return playlistCollection
                .Find(playlist => playlist.Id == playlistId)
                .FirstOrDefault();
        }

        public void Delete(Guid playlistId)
        {
            playlistCollection.DeleteOne(playlist => playlist.Id == playlistId);
        }
    }
}