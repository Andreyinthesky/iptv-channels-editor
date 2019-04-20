using System.ComponentModel.DataAnnotations;
using ChannelsListParser;

namespace IptvChannelsEditor.Web.Models
{
    public class UpdatePlaylistDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public Channel[] Channels { get; set; }
    }
}