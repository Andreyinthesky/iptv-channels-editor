import React, { Component } from 'react';
import Channels from "./components/Channels";
import AppBarForSelected from './components/AppBarForSelected';
import AppBarMain from "./components/AppBarMain";
import MainForm from "./components/MainForm";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import {getDefaultChannel} from "./helpers/playlistHelpers";
import Button from "@material-ui/core/Button";


const appStyles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 9,
    marginTop: theme.spacing.unit * 9,
    marginRight: theme.spacing.unit * 9,
    minWidth: '800px',
  },
  forSelectedBar: {
    backgroundColor: theme.palette.primary.dark
  },
  largeButton:{
    marginLeft: theme.spacing.unit * 2,
    minWidth: '100px',
  },
  appIcon: {
    width: theme.spacing.unit * 5,
    height: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 2,
  },
  welcomeAppIcon: {
    width: '300px',
    height: '300px',
  },
  playlistToolbarIcon: {
    marginLeft: theme.spacing.unit * 2, 
    verticalAlign: 'bottom',
  },
  playlistName: {
    maxWidth: '600px',
    textOverflow : 'ellipsis',
    overflow : 'hidden',
    display: 'inline-block',
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    color: theme.palette.common.white,
  },
  allChangesSavedTitle: {
    marginRight: theme.spacing.unit * 2,
    textDecoration: 'underline',
  },
  downloadButtonDiv: {
    display: 'flex',
    flexDirection: 'row-reverse',
  },
  downloadButton: {
    marginTop: theme.spacing.unit * 2,
    backgroundColor: '#1fe218',
    marginLeft: theme.spacing.unit * 2,
    minWidth: '100px',
    width: '220px',
  }
});

class App extends Component {
  displayName = App.name;

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      selectedChannelsCount: 0,
      allChangesSaved: true,
      playlistName : null,
      channels : [],
    };
  }

  handleDeleteSelectedChannels = () => {
    const channels = this.state.channels;
    const newChannels = [];

    for (let i = 0; i < channels.length; i++) {
      if (channels[i] && !channels[i].selected)
        newChannels.push(channels[i]);
    }
    this.setState({channels: newChannels, selectedChannelsCount : 0, allChangesSaved: false});
  };

  handleSelectChannel = channelIndex => {
    let delta = this.state.channels[channelIndex].selected ? 1 : -1;
    this.setState({selectedChannelsCount: this.state.selectedChannelsCount + delta});
  };
  
  handleSelectAllChannels = () => {
    const isSelect = this.state.selectedChannelsCount !== this.state.channels.length;
    const newChannels = this.state.channels.slice().map(ch => {
      ch.selected = isSelect;
      return ch;
    });
    
    console.log(newChannels);
    
    this.setState({
      channels: newChannels,
      selectedChannelsCount: isSelect ? this.state.channels.length : 0,
    });
  };

  handleInsertChannel = channelIndex => {
    let newChannel = getDefaultChannel();
    newChannel.id = this.state.channels.length;
    newChannel.title += newChannel.id;
    const channels = this.state.channels.slice();
    channels.splice(channelIndex, 0, newChannel);
    this.setState({channels: channels, allChangesSaved: false});
  };
  
  handleChangeChannel = (index, channel) => {
    if (!channel)
      return;
    console.log(channel);
    const newChannels = this.state.channels.slice();
    newChannels[index] = channel;
    this.setState({channels: newChannels, allChangesSaved: false});
  };

  handleChangePlaylistName = (newPlaylistName) => {
    if (!newPlaylistName)
      return;
    
    this.setState({playlistName: newPlaylistName, allChangesSaved: false});
  };
  
  handleSavePlaylist = (e) => {
    this.setState({allChangesSaved: true});
    
    const playlistToFetch = {};
    playlistToFetch.channels = this.state.channels;
    playlistToFetch.name = this.state.playlistName;
    
    fetch(`api/playlist/${this.playlistId}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playlistToFetch),
    })
    .then(response => {
      if (response.status === 204) {
        console.log("saved successfully");
      }
      else {
        console.error("Error: playlist is not saved, please try again");
        this.setState({allChangesSaved: false});
      }
    })
    .catch(error => console.error('Network error:', error));
  };
  
  loadSampleChannels = () => {
    fetch('api/sampleChannels')
      .then(response => response.json())
      .then(playlist => {
        this.loadPlaylist(playlist);
      })
      .catch(error => console.error('Error:', error));
  };
  
  loadPlaylist = playlist => {
    playlist.channels.map((channel, index) =>
    {
      channel.id = index;
      channel.selected = false;
      return channel;
    });
    
    this.playlistId = playlist.id;
    this.setState({loading: false, playlistName: playlist.name, channels: playlist.channels});
  };
  
  render() {
    if (this.state.loading) {
      return (
        <MainForm onUpload={this.loadPlaylist} />);
      // this.loadSampleChannels();
    }
    
    const {classes} = this.props;
    
    return (
      <div className={classes.root}>
          {!this.state.selectedChannelsCount > 0 ? 
            <AppBarMain 
              classes={classes}
              onSavePlaylist={this.handleSavePlaylist}
              allChangesSaved={this.state.allChangesSaved}
            />
            :
            <AppBarForSelected 
              classes={classes}
              selectedChannelsCount={this.state.selectedChannelsCount}
              onDeleteSelectedChannels={this.handleDeleteSelectedChannels} 
              onSelectAllChannels={this.handleSelectAllChannels}
            />
          }
        { !this.state.loading &&
          <Paper className={classes.paper} elevation={1} square={true}>
            <Typography variant='h3' paragraph={false} className={classes.playlistName}>
              {this.state.playlistName}
            </Typography>
            <Tooltip title={'Edit'}>
              <IconButton onClick={() => console.log('edit')} aria-label="Edit" className={classes.playlistToolbarIcon}>
                {this.state.isEdit ? <DoneIcon /> : <EditIcon />}
              </IconButton>
            </Tooltip>
            <Channels 
              channels={this.state.channels}
              onSelectChannel={this.handleSelectChannel}
              onInsertChannel={this.handleInsertChannel}
              onChangeChannel={this.handleChangeChannel}
            />
            <div className={classes.downloadButtonDiv}>
              <Button 
                variant="contained"
                size="large"
                color={"default"}
                className={classes.downloadButton}
                href={`api/playlist/download/${this.playlistId}`}
              >
                <SaveAltIcon className={classes.leftIcon} />
                Скачать
              </Button>
            </div>
          </Paper>
        }
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(appStyles)(App);
