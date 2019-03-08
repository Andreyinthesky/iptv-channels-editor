using MongoDB.Driver;

namespace IptvChannelsEditor.Web.Domain
{
    public interface IMongoDatabaseProvider
    {
        IMongoDatabase GetDatabase();
    }
}