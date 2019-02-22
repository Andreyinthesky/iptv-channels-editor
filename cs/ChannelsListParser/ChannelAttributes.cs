using System.Text.RegularExpressions;

namespace ChannelsListParser
{
    public class ChannelAttributes
    {
        private const string ATTR_TVG_LOGO = @"tvg-logo=""(.*?)""";
        private const string ATTR_TVG_NAME = @"tvg-name=""(.*?)""";
        private const string ATTR_TVG_ID = @"tvg-id=""(.*?)""";
        private const string ATTR_GROUP_TITLE = @"group-title=""(.*?)""";

        private const string AttributesFormat =
            @"tvg-id=""{0}"", tvg-name=""{1}"", tvg-logo=""{2}"", group-title=""{3}""";

        public string TvgId { get; set; }
        public string TvgLogoPath { get; set; }
        public string TvgName { get; set; }
        public string GroupTitle { get; set; }

        public ChannelAttributes()
        {
        }

        public ChannelAttributes(string tvgId, string tvgLogoPath, string tvgName, string groupTitle)
        {
            TvgId = tvgId;
            TvgLogoPath = tvgLogoPath;
            TvgName = tvgName;
            GroupTitle = groupTitle;
        }

        public static ChannelAttributes Parse(string str)
        {
            var attributes = new ChannelAttributes();
            var tvgId = Regex.Match(str, ATTR_TVG_ID);
            var tvgLogo = Regex.Match(str, ATTR_TVG_LOGO);
            var tvgName = Regex.Match(str, ATTR_TVG_NAME);
            var groupTitle = Regex.Match(str, ATTR_GROUP_TITLE);

            if (tvgId.Success)
                attributes.TvgId = tvgId.Groups[1].Value;
            if (tvgLogo.Success)
                attributes.TvgLogoPath = tvgLogo.Groups[1].Value;
            if (tvgName.Success)
                attributes.TvgName = tvgName.Groups[1].Value;
            if (groupTitle.Success)
                attributes.GroupTitle = groupTitle.Groups[1].Value;

            return attributes;
        }

        public override string ToString()
        {
            return string.Format(AttributesFormat, TvgId, TvgName, TvgLogoPath, GroupTitle);
        }
    }
}