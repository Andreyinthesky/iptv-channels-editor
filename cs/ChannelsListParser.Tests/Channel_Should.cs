using FluentAssertions;
using NUnit.Framework;

namespace ChannelsListParser.Tests
{
    [TestFixture]
    public class Channel_Should
    {   
        [SetUp]
        public void Setup()
        {
        }

        [TestCase("#EXTINF:-1, Первый", "C:\\First.m3u")]
        public void Parse_SimpleChannel_ShouldBeCorrect(string definition, string path)
        {
            var expected = new Channel(-1, "Первый", path, null, new ChannelAttributes());
            
            var channel = Channel.Parse(definition, path);
            
            channel.Should().BeEquivalentTo(expected);
        }
        
        [Test]
        public void Parse_ChannelWithGroupTitle_ShouldBeCorrect()
        {
            var path = "C:\\First.m3u";
            var groupTitle = "Новости";
            var name = "Первый канал";
            var definition = $"#EXTINF:-1 group-title=\"{groupTitle}\",{name}";
            var expectedChannelAttributes = new ChannelAttributes(null, null, null, groupTitle);
            var expectedChannel = new Channel(-1, name, path, null, expectedChannelAttributes);
            
            var channel = Channel.Parse(definition, path);
            
            channel.Should().BeEquivalentTo(expectedChannel);
        }
        
        [Test]
        public void Parse_ChannelWithTvgId_ShouldBeCorrect()
        {
            var path = "C:\\First.m3u";
            var tvgId = "7662";
            var name = "Первый канал";
            var definition = $"#EXTINF:-1 " +
                             $"tvg-id=\"{tvgId}\",{name}";
            var expectedChannelAttributes = new ChannelAttributes(tvgId, null, null, null);
            var expectedChannel = new Channel(-1, name, path, null, expectedChannelAttributes);
            
            var channel = Channel.Parse(definition, path);
            
            channel.Should().BeEquivalentTo(expectedChannel);
        }
        
        [Test]
        public void Parse_ChannelWithTvgLogo_ShouldBeCorrect()
        {
            var path = "C:\\First.m3u";
            var name = "Первый канал";
            var tvgLogo = "https://logo.png";
            var definition = $"#EXTINF:-1 " +
                             $"tvg-logo=\"{tvgLogo}\",{name}";
            var expectedChannelAttributes = new ChannelAttributes(null, tvgLogo, null, null);
            var expectedChannel = new Channel(-1, name, path, null, expectedChannelAttributes);
            
            var channel = Channel.Parse(definition, path);
            
            channel.Should().BeEquivalentTo(expectedChannel);
        }
        
        [Test]
        public void Parse_ChannelWithTvgName_ShouldBeCorrect()
        {
            var path = "C:\\First.m3u";
            var tvgName = "Первый канал";
            var definition = $"#EXTINF:-1 " +
                             $"tvg-name=\"{tvgName}\",{tvgName}";
            var expectedChannelAttributes = new ChannelAttributes(null, null, tvgName, null);
            var expectedChannel = new Channel(-1, tvgName, path, null, expectedChannelAttributes);
            
            var channel = Channel.Parse(definition, path);
            
            channel.Should().BeEquivalentTo(expectedChannel);
        }
        
        [Test]
        public void Parse_ChannelWithExtGroup_ShouldBeCorrect()
        {
            var path = "C:\\First.m3u";
            var name = "Первый канал";
            var groupTitle = "Новости";
            var definition = $"#EXTINF:-1, {name}";
            var expectedChannel = new Channel(-1, name, path, groupTitle, new ChannelAttributes());
            
            var channel = Channel.Parse(definition, path, groupTitle);
            
            channel.Should().BeEquivalentTo(expectedChannel);
        }
        
        [Test]
        public void Parse_ComplexChannel_ShouldBeCorrect()
        {
            var path = "C:\\First.m3u";
            var groupTitle = "Новости";
            var tvgId = "7662";
            var tvgLogo = "https://logo.png";
            var tvgName = "Первый канал";
            var definition = $"#EXTINF:-1 group-title=\"{groupTitle}\" " +
                      $"tvg-id=\"{tvgId}\" " +
                      $"tvg-logo=\"{tvgLogo}\" " +
                      $"tvg-name=\"{tvgName}\",{tvgName}";
            var expectedChannelAttributes = new ChannelAttributes(tvgId, tvgLogo, tvgName, groupTitle);
            var expectedChannel = new Channel(-1, tvgName, path, groupTitle, expectedChannelAttributes);
            
            var channel = Channel.Parse(definition, path, groupTitle);
            
            channel.Should().BeEquivalentTo(expectedChannel);
        }
    }
}