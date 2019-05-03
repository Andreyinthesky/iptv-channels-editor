using System;
using FluentAssertions;
using IptvChannelsEditor.Web.Domain;
using IptvChannelsEditor.Web.Models.Entities;
using NUnit.Framework;

namespace IptvChannelsEditor.Tests.RepositoryTests
{
    [TestFixture]
    public class MongoPlaylistRepository_Should
    {
        [SetUp]
        public void SetUp()
        {
            var db = TestMongoDatabase.Create();
            db.DropCollection(MongoPlaylistRepository.CollectionName);
            repo = new MongoPlaylistRepository(db);
        }
        
        private MongoPlaylistRepository repo;
        
        [Test]
        public void Insert()
        {
            var playlistName = "default";
            var playlist = repo.Insert(new PlaylistEntity(null, playlistName));
            Console.WriteLine(playlist.Id);
            playlist.Id.Should().NotBe(Guid.Empty);
            playlist.Name.Should().Be(playlistName);
        }

        [Test]
        public void Update()
        {
            var playlistName = "default";
            var playlist = repo.Insert(new PlaylistEntity(null, playlistName));
            var channels = new[]
            {
                new Channel(-1, "Первый канал", "http://localhost:3000"),
                new Channel(-1, "Второй канал", "http://localhost:3001"),
                new Channel(-1, "Четвертый канал", "http://localhost:3003"),
            };
            playlistName = "updated";
            var newPlaylist = new PlaylistEntity(playlist.Id, channels, playlistName);
            repo.Update(newPlaylist);
            var retrievedPlaylist = repo.FindById(playlist.Id);
            retrievedPlaylist.Channels.Should().HaveCount(3);
            retrievedPlaylist.Name.Should().Be(playlistName);
        }

        [Test]
        public void FindById()
        {
            var playlistName = "default";
            var playlist = new PlaylistEntity(null, playlistName);
            repo.Insert(playlist);
            repo.FindById(playlist.Id).Should().NotBe(null);
        }
        
        [Test]
        public void Delete()
        {
            var playlistName = "default";
            var playlist = new PlaylistEntity(null, playlistName);
            repo.Delete(playlist.Id);
            repo.FindById(playlist.Id).Should().Be(null);
        }
    }
}