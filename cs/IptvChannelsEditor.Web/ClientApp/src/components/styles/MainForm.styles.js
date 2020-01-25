export default function mainFormStyles(theme) {
  return {
    welcomeAppIcon: {
      width: '300px',
      height: '300px',
      marginRight: '20px',
    },
    progress: {
      position: 'absolute',
    },
    inputFileLabel: {
      border: '1px solid #ced4da',
      fontSize: 16,
      borderRadius: 4,
      padding: '10px 12px',
      backgroundColor: theme.palette.common.white,
      '&:hover': {
        cursor: 'pointer',
        backgroundColor: '#c3c3c3',
      }
    },
    inputFile: {
      display: 'none',
    },
    uploadButton: {
      width: '70%',
    },
    welcome: {
      margin: '7% 10%',
      padding: theme.spacing.unit * 2,
      minWidth: '300px',
      flexGrow: 1,
    },
    leftIcon: {
      marginRight: theme.spacing.unit,
    },
    title: {
      flexGrow: 1,
      marginBottom: '13px',
      color: theme.palette.common.white,
    },
  }
};