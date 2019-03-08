using FluentAssertions;
using IptvChannelsEditor.Web.Helpers;
using NUnit.Framework;

namespace IptvChannelsEditor.Tests.OtherTests
{
    [TestFixture]
    public class FileHelpers_Should
    {
        [TestCase("123")]
        [TestCase("abc")]
        [TestCase("abc123")]
        [TestCase("ABC")]
        [TestCase("фыва")]
        [TestCase("фыва123")]
        [TestCase("ФЫВА")]
        public void GetPlaylistNameFromFileName_NameWithExtension_ShouldBeWithoutOne(string name)
        {
            var fileName = name + ".m3u";
            FileHelpers.GetPlaylistNameFromFileName(fileName)
                .Should().Be(name);
            
            fileName = name + ".m3u8";
            FileHelpers.GetPlaylistNameFromFileName(fileName)
                .Should().Be(name);
        }
        
        [TestCase("123")]
        [TestCase("abc")]
        [TestCase("abc123")]
        [TestCase("ABC")]
        [TestCase("фыва")]
        [TestCase("фыва123")]
        [TestCase("ФЫВА")]
        public void GetPlaylistNameFromFileName_NameWithExtensionUpperCase_ShouldBeWithoutOne(string name)
        {
            var fileName = name + ".M3U";
            FileHelpers.GetPlaylistNameFromFileName(fileName)
                .Should().Be(name);
            
            fileName = name + ".M3U8";
            FileHelpers.GetPlaylistNameFromFileName(fileName)
                .Should().Be(name);
        }
        
        [TestCase("123")]
        [TestCase("abc")]
        [TestCase("abc123")]
        [TestCase("ABC")]
        [TestCase("фыва")]
        [TestCase("фыва123")]
        [TestCase("ФЫВА")]
        [TestCase("abc.jpg")]
        [TestCase("abc.JPG")]
        [TestCase("ABC.jpg")]
        [TestCase("ABC.JPG")]
        [TestCase("m3u")]
        [TestCase("m3u8")]
        [TestCase(".m3u")]
        [TestCase(".m3u8")]
        [TestCase("m3u.jpg")]
        [TestCase("m3u8.jpg")]
        [TestCase("M3U.jpg")]
        [TestCase("M3U8.jpg")]
        [TestCase("sm3u")]
        [TestCase("m3us")]
        [TestCase("sm3us")]
        [TestCase("SM3U")]
        [TestCase("M3US")]
        [TestCase("SM3US")]
        public void GetPlaylistNameFromFileName_NameWithoutExtension_ShouldBeCorrect(string name)
        {
            FileHelpers.GetPlaylistNameFromFileName(name)
                .Should().Be(name);
        }
    }
}