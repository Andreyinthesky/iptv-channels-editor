import lightGreen from "@material-ui/core/colors/lightGreen";

export default function appStyles(theme) {
  return {
    '@global': {
      body: {
        backgroundColor: theme.palette.primary.main,
        margin: '0px',
      },
    },
    paper: {
      ...theme.mixins.gutters(),
      marginTop: theme.spacing.unit * 9,
      marginBottom: theme.spacing.unit * 9,
      marginLeft: theme.spacing.unit * 1,
      marginRight: theme.spacing.unit * 1,
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
      minWidth: '800px',
    },
    downloadButtonWrapper: {
      display: 'flex',
      flexDirection: 'row-reverse',
    },
    downloadButton: {
      marginTop: theme.spacing.unit * 2,
      marginLeft: theme.spacing.unit * 2,
      minWidth: '100px',
      width: '220px',
      color: theme.palette.getContrastText(lightGreen['A400']),
      backgroundColor: lightGreen['A400'],
      '&:hover': {
        backgroundColor: lightGreen['A700'],
      }
    },
    '@media (min-width: 1280px)': {
      paper: {
        marginLeft: theme.spacing.unit * 9,
        marginRight: theme.spacing.unit * 9,
      }
    }
  }
}