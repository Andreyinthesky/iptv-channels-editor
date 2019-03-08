using System;
using MongoDB.Driver;

namespace IptvChannelsEditor.Web.Domain
{
    public class IptvChannelsEditorMongoDatabase : IMongoDatabaseProvider
    {
        private readonly IMongoDatabase database = null;
        
        public IMongoDatabase GetDatabase()
        {
            if (database == null)
            {
                var mongoConnectionString = "mongodb://localhost:27017";
                var mongoClient = new MongoClient(mongoConnectionString);
                return mongoClient.GetDatabase("iptv-channels-editor");
            }

            return database;
        }
    }
}