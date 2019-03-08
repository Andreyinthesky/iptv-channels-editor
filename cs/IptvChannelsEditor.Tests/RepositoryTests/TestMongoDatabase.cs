using MongoDB.Driver;

namespace IptvChannelsEditor.Tests.RepositoryTests
{
    public static class TestMongoDatabase
    {
        public static IMongoDatabase Create()
        {
            var mongoConnectionString = "mongodb://localhost:27017";
            var mongoClient = new MongoClient(mongoConnectionString);
            return mongoClient.GetDatabase("iptv-channels-editor-test");
        }
    }
}