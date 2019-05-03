using System;
using System.Collections.Generic;
using System.Linq;
using MongoDB.Bson.Serialization.Attributes;

namespace IptvChannelsEditor.Web.Models.Entities
{
    public class PlaylistEntity
    {
        public Guid Id { get; private set; }
        public string Name { get; set; }

        // ReSharper disable once AutoPropertyCanBeMadeGetOnly.Local
        public List<Channel> Channels { get; private set; }

        [BsonElement]
        public int NextChannelNumber { get; private set; } = 0;

        public PlaylistEntity()
        {
        }

        public PlaylistEntity(IEnumerable<Channel> channels, string name = null)
            : this(Guid.Empty, channels, name)
        {
        }

        public PlaylistEntity(Guid id, IEnumerable<Channel> channels, string name = null)
        {
            Id = id;
            Channels = channels?.ToList();
            NextChannelNumber = Channels?.Count ?? 0;
            Name = name;
        }
    }
}