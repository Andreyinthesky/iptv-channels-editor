import lightGreen from "@material-ui/core/colors/lightGreen";

export default function playlistControlPanelStyles(theme) {
  return {
    leftIcon: {
      marginRight: theme.spacing.unit,
    },
    editPlaylistNameButton: {
      marginLeft: theme.spacing.unit * 2,
      verticalAlign: 'bottom',
      borderRadius: '20px',
    },
    addChannelButton: {
      marginLeft: theme.spacing.unit * 2,
      verticalAlign: 'bottom',
      borderRadius: '20px',
      color: theme.palette.getContrastText(lightGreen['A400']),
      backgroundColor: lightGreen['A400'],
      '&:hover': {
        backgroundColor: lightGreen['A700'],
      }
    },
    playlistName: {
      maxWidth: '650px',
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  }
}