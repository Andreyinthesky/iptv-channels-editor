using System.Linq;
using AutoMapper;
using IptvChannelsEditor.Web.Models.Entities;
using M3UPlaylistParser;

namespace IptvChannelsEditor.Web.Models.MapProfile
{
    public class PlaylistEntityMapper : Profile
    {
        public PlaylistEntityMapper()
        {
            CreateMap<Playlist, PlaylistEntity>()
                .ForMember(entity => entity.Channels, 
                    opt => opt.MapFrom(playlist => playlist.Items.Select(MapPlaylistItemToChannel)))
                .ForMember(entity => entity.NextChannelNumber, opt => opt.MapFrom(playlist => playlist.Items.Count()));
        }

        private Channel MapPlaylistItemToChannel(PlaylistItem item)
        {
            var channelAttributes = new ChannelAttributes
            {
                TvgId = item.Attributes.TryGetValue("tvg-id", out var tvgId) ? tvgId : null,
                TvgName = item.Attributes.TryGetValue("tvg-name", out var tvgName) ? tvgName : null,
                TvgLogoPath = item.Attributes.TryGetValue("tvg-logo", out var tvgLogoPath) ? tvgLogoPath : null,
                GroupTitle = item.Attributes.TryGetValue("group-title", out var groupTitle) ? groupTitle : null,
            };
            return new Channel(item.Duration, item.Title, item.Path, item.GroupTitle, channelAttributes);
        }
    }
}