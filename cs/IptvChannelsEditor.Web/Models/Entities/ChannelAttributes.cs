using MongoDB.Bson.Serialization.Attributes;

namespace IptvChannelsEditor.Web.Models.Entities
{
    public class ChannelAttributes
    {
        public string TvgId { get; set; }
        public string TvgLogoPath { get; set; }
        public string TvgName { get; set; }
        [BsonIgnore]
        public string GroupTitle { get; set; }
        
        private const string AttributesFormat =
            @"tvg-id=""{0}"" tvg-name=""{1}"" tvg-logo=""{2}"" group-title=""{3}""";

        public ChannelAttributes()
            :this(null, null, null, null)
        {
        }

        public ChannelAttributes(string tvgId, string tvgLogoPath, string tvgName, string groupTitle)
        {
            TvgId = tvgId;
            TvgLogoPath = tvgLogoPath;
            TvgName = tvgName;
            GroupTitle = groupTitle;
        }
        
        public override string ToString()
        {
            return string.Format(AttributesFormat, TvgId, TvgName, TvgLogoPath, GroupTitle);
        }
    }
}