using NUnit.Framework;
using FluentAssertions;

namespace ChannelsListParser.Tests
{
    [TestFixture]
    public class ChannelAttributes_Should
    {
        [Test]
        public void Test1()
        {
            var attrStr =
                @"group-title=""Новости;HD"" " 
                + @"tvg-id=""7665""" 
                + @" tvg-logo=""https://webarmen.com/my/iptv/uploads/icon/1.png"" " 
                + @"tvg-name=""Россия 1 HD""";

            ChannelAttributes
                .Parse(attrStr)
                .TvgLogoPath
                .Should()
                .Be("https://webarmen.com/my/iptv/uploads/icon/1.png");
        }
    }
}