using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using FluentAssertions;
using NUnit.Framework;

namespace M3UPlaylistParser.Tests.ParserTests
{
    [TestFixture]
    public class Playlist_Should
    {
        [Test]
        public void Parse_PlaylistWithoutChannels_PlaylistShouldBeEmpty()
        {
            using (var stream = new MemoryStream())
            {
                var bytes = Encoding.UTF8.GetBytes("#EXTM3U");
                stream.Write(bytes);
                stream.Position = 0;
                var playlist = Playlist.Parse(stream);
                
                playlist.Items.Should().BeEmpty();
            }
        }
        
        [TestCase(arg: "#EXTM3U\r\n#EXTINF:-1,Первый канал\r\nhttp://localhost:3000\r\n")]
        [TestCase(arg: "#EXTM3U\n#EXTINF:-1,Первый канал\nhttp://localhost:3000\n")]
        public void Parse_PlaylistWithOneSimpleChannel_PlaylistShouldBeCorrect(string m3u)
        {
            var duration = -1;
            var title = "Первый канал";
            var path = "http://localhost:3000";
            var expectedItem = new PlaylistItem {Duration = duration, Title = title, Path = path};

            using (var stream = new MemoryStream())
            {
                var bytes = Encoding.UTF8.GetBytes(m3u);
                stream.Write(bytes);
                stream.Position = 0;
                
                var playlist = Playlist.Parse(stream);

                playlist.Items.Count().Should().Be(1);
                playlist.Items.First().Should().BeEquivalentTo(expectedItem);
            }
        }
        
        [Test]
        public void Parse_PlaylistWithMultipleSimpleChannels_PlaylistShouldBeCorrect()
        {
            var m3u = "#EXTM3U\r\n" +
                     "#EXTINF:-1,Первый канал\r\n" +
                     "http://localhost:3000\r\n" +
                     "#EXTINF:-1,Второй канал\r\n" +
                     "http://localhost:3001\r\n" +
                     "#EXTINF:-1,Четвертый канал\r\n" +
                     "http://localhost:3003\r\n";
            var expectedItems =
                new[]
                {
                    new PlaylistItem{Duration = -1, Title = "Первый канал", Path = "http://localhost:3000"},
                    new PlaylistItem{Duration = -1, Title = "Второй канал", Path = "http://localhost:3001"},
                    new PlaylistItem{Duration = -1, Title = "Четвертый канал", Path = "http://localhost:3003"},
                };
            
            using (var stream = new MemoryStream())
            {
                var bytes = Encoding.UTF8.GetBytes(m3u);
                stream.Write(bytes);
                stream.Position = 0;
                var playlist = Playlist.Parse(stream);
                
                playlist.Items.Should().BeEquivalentTo(expectedItems);
            }
        }
        
        [Test, TestCaseSource(nameof(PerformanceTestCases))]
        [MaxTime(1000)]
        public void Parse_TooLargePlaylist_ShouldWorkingFast(string m3uFilePath)
        {
            Playlist.Parse(m3uFilePath);
            
            Assert.True(true);
        }
        
        [Test]
        public void Parse_IncorrectFormat_DoesNotThrowException()
        {
            using (var stream = new MemoryStream())
            {
                var bytes = Encoding.UTF8.GetBytes("wasd");
                stream.Write(bytes);
                stream.Position = 0;
                
                Action act = () => Playlist.Parse(stream);

                act.Should().NotThrow();
            }
        }

        private static IEnumerable<TestCaseData> PerformanceTestCases
        {
            get
            {
                var files = Directory.GetFiles(Path.Combine(Environment.CurrentDirectory, "ParserTests\\Files"),
                    "test-perf-*");
                foreach (var file in files)
                {
                    yield return new TestCaseData(file);
                }
            }
        }
    }
}