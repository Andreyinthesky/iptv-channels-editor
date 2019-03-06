import React, { Component } from 'react';
import Channels from "./components/Channels";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/es/Toolbar";

const playlistPaperStyles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 9,
    marginTop: theme.spacing.unit * 9,
    marginRight: theme.spacing.unit * 9,
  },
  appIcon: {
    width: theme.spacing.unit * 5,
    height: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 2,
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
});

class App extends Component {
  displayName = App.name;

  constructor(props) {
    super(props);

    this.state = {loading: true};
    this.fileUpload = React.createRef();
    this.handleUploadPlaylist = this.handleUploadPlaylist.bind(this);
  }

  handleUploadPlaylist(event) {
    event.preventDefault();
    if (this.fileUpload.current.files.length <= 0)
      return;

    let formData = new FormData();
    formData.append('file', this.fileUpload.current.files[0]);

    fetch('api/fileUpload', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(channels => {
        channels.map((channel, index) =>
        {
          channel.id = index;
          channel.selected = false;
          return channel;
        });
        this.setState({channels: channels, loading: false});
      })
      .catch(error => console.error('Error:', error));
  }

  loadSampleChannels = () => {
    fetch('api/sampleChannels')
      .then(response => response.json())
      .then(playlist => {
        playlist.channels.map((channel, index) =>
        {
          channel.id = index;
          channel.selected = false;
          return channel;
        });
        
        this.channels = playlist.channels;
        this.setState({loading: false});
      })
      .catch(error => console.error('Error:', error));
  };

  renderForm() {
    let content = !this.state.loading &&
      <Channels channels={this.state.channels}/>;

    return (
      <div>
        <Typography variant='h3' color='primary'>
          Choose file for upload
        </Typography>
        <form onSubmit={this.handleUploadPlaylist}>
          <label>
            Upload file:
            <input type="file" ref={this.fileUpload} accept=".m3u,.m3u8"/>
          </label>
          <br/>
          <button type="submit">Submit</button>
          {content}
        </form>
      </div>
    );
  }

  render() {
    if (this.state.loading){
      this.loadSampleChannels();
    }
    
    const {classes} = this.props;
    
    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <img alt='IPTV' className={classes.appIcon} src={require("./icons/app-icon.svg")}/>
            <Typography variant="h6" color="inherit" className={classes.title}>
              IPTV Channels editor
            </Typography>
          </Toolbar>
        </AppBar>
        <Paper className={classes.paper} elevation={1} square={true}>
          <Typography variant='h3' paragraph={true}>
            Sample channels
          </Typography>
          {!this.state.loading && <Channels channels={this.channels}/>}
        </Paper>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(playlistPaperStyles)(App);
