using System;
using ChannelsListParser;
using MongoDB.Driver;

namespace IptvChannelsEditor.Web.Domain
{
    public class MongoPlaylistRepository : IPlaylistRepository
    {
        private readonly IMongoCollection<Playlist> playlistCollection;
        public const string CollectionName = "playlists";
        
        public MongoPlaylistRepository(IMongoDatabase database)
        {
            playlistCollection = database.GetCollection<Playlist>(CollectionName);
        }
        
        public MongoPlaylistRepository(IMongoDatabaseProvider provider)
        {
            playlistCollection = provider.GetDatabase().GetCollection<Playlist>(CollectionName);
        }
        
        public Playlist Insert(Playlist playlist)
        {
            playlistCollection.InsertOne(playlist);
            return playlist;
        }

        public void Update(Playlist playlist)
        {
            playlistCollection.ReplaceOne(p => playlist.Id == p.Id, playlist);
        }

        public Playlist FindById(Guid playlistId)
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