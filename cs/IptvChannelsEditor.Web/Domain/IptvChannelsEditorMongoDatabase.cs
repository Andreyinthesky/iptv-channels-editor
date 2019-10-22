using Microsoft.Extensions.Configuration;
using MongoDB.Driver;

namespace IptvChannelsEditor.Web.Domain
{
    public class IptvChannelsEditorMongoDatabase : IMongoDatabaseProvider
    {
        private readonly IConfiguration configuration;
        private readonly IMongoDatabase database = null;

        public IptvChannelsEditorMongoDatabase(IConfiguration configuration)
        {
            this.configuration = configuration;
        }

        public IMongoDatabase GetDatabase()
        {
            if (database == null)
            {
                var mongoConnectionString = configuration.GetSection("MongoConnectionString").Value;
                var mongoClient = new MongoClient(mongoConnectionString);
                return mongoClient.GetDatabase("iptv-channels-editor");
            }

            return database;
        }
    }
}