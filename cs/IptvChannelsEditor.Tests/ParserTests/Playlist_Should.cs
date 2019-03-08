using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading;
using FluentAssertions;
using NUnit.Framework;

namespace ChannelsListParser.Tests
{
    [TestFixture]
    public class Playlist_Should
    {
        [Test]
        public void Parse_PlaylistWithoutChannels_ChannelsListShouldBeEmpty()
        {
            var playlist = Playlist.Parse("#EXTM3U");

            playlist.Channels.Should().BeEmpty();
        }
        
        [TestCase(arg: "#EXTM3U\r\n#EXTINF:-1,Первый канал\r\nhttp://localhost:3000")]
        [TestCase(arg: "#EXTM3U\n#EXTINF:-1,Первый канал\nhttp://localhost:3000")]
        public void Parse_PlaylistWithOneSimpleChannel_ChannelsListShouldBeCorrect(string m3u)
        {
            var expectedChannels =
                new[] {new Channel(-1, "Первый канал", "http://localhost:3000")};

            var playlist = Playlist.Parse(m3u);
            
            playlist.Channels.Should().BeEquivalentTo(expectedChannels);
        }
        
        [Test]
        public void Parse_PlaylistWithMultipleSimpleChannels_ChannelsListShouldBeCorrect()
        {
            var m3u = "#EXTM3U\r\n" +
                     "#EXTINF:-1,Первый канал\r\n" +
                     "http://localhost:3000\r\n" +
                     "#EXTINF:-1,Второй канал\r\n" +
                     "http://localhost:3001\r\n" +
                     "#EXTINF:-1,Четвертый канал\r\n" +
                     "http://localhost:3003";
            var expectedChannels =
                new[]
                {
                    new Channel(-1, "Первый канал", "http://localhost:3000"),
                    new Channel(-1, "Второй канал", "http://localhost:3001"),
                    new Channel(-1, "Четвертый канал", "http://localhost:3003"),
                };

            var playlist = Playlist.Parse(m3u);
            
            playlist.Channels.Should().BeEquivalentTo(expectedChannels);
        }
        
        [Test, TestCaseSource(nameof(PerformanceTestCases))]
        [MaxTime(1000)]
        public void Parse_TooLargePlaylist_ChannelsListShouldBeCorrect(string m3u)
        {
            Playlist.Parse(m3u);
            
            Assert.True(true);
        }
        
        [Test]
        public void Parse_IncorrectFormat_ThrowFormatException()
        {
            Action act = () => Playlist.Parse("wasd");

            act.Should().Throw<FormatException>().WithMessage("Not a m3u file format");
        }

        private static IEnumerable<TestCaseData> PerformanceTestCases
        {
            get
            {
                var files = Directory.GetFiles(Path.Combine(Environment.CurrentDirectory, "Files"), "test-perf-*");
                foreach (var file in files)
                {
                    yield return new TestCaseData(File.ReadAllText(file))
                        .SetName("{m}" + $"({Path.GetFileName(file)})");
                }
            }
        }
    }
}