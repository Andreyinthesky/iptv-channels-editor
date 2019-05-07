using System.ComponentModel.DataAnnotations;
using IptvChannelsEditor.Web.Models.Entities;

namespace IptvChannelsEditor.Web.Models
{
    public class UpdatePlaylistDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public Channel[] Channels { get; set; }
        [Required]
        public int NextChannelNumber { get; set; }
    }
}