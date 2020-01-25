export default function appBarMainStyles(theme) {
  return {
    forSelectedBar: {
      backgroundColor: theme.palette.primary.dark
    },
    largeButton: {
      marginLeft: theme.spacing.unit * 2,
      minWidth: '100px',
    },
    appIcon: {
      width: theme.spacing.unit * 5,
      height: theme.spacing.unit * 5,
      marginRight: theme.spacing.unit * 2,
    },
    leftIcon: {
      marginRight: theme.spacing.unit,
    },
    title: {
      flexGrow: 1,
      color: theme.palette.common.white,
    },
    allChangesSavedTitle: {
      marginRight: theme.spacing.unit * 2,
      textDecoration: 'underline',
    }
  }
}