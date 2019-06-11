import React, { Component } from 'react';
import Channels from "./components/Channels";
import AppBarForSelected from './components/AppBarForSelected';
import AppBarMain from "./components/AppBarMain";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import {getCookie, deleteCookie} from "./helpers/cookieHelpers";
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import EditIcon from '@material-ui/icons/Edit';
import {getDefaultChannel} from "./helpers/playlistHelpers";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import EditPlaylistNameForm from "./components/EditPlaylistNameForm";
import lightGreen from '@material-ui/core/colors/lightGreen';
import MainForm from "./components/MainForm";


const appStyles = theme => ({
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
    borderRadius: '20px',
  },
  playlistName: {
    maxWidth: '650px',
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
      openEditPlaylistNameForm: false,
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
    this.setState({channels: newChannels, selectedChannelsCount : 0, allChangesSaved: false}, () => {
      this.savePlaylistSnapshot();
    });
  };

  //TODO setstate
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
    
    this.setState({
      channels: newChannels,
      selectedChannelsCount: isSelect ? this.state.channels.length : 0,
    });
  };

  handleInsertChannel = channelIndex => {
    let newChannel = getDefaultChannel();
    newChannel.id = this.nextChannelNumber;
    newChannel.title += newChannel.id;
    this.nextChannelNumber++;
    
    const channels = this.state.channels.slice();
    channels.splice(channelIndex, 0, newChannel);
    this.setState({channels: channels, allChangesSaved: false}, () => {
      this.savePlaylistSnapshot();
    });
  };
  
  handleSwapChannels = (firstChannelIndex, secondChannelIndex) => {
    const newChannels = this.state.channels.slice();
    
    if (firstChannelIndex < 0 || firstChannelIndex >= newChannels.length
      || secondChannelIndex < 0 || secondChannelIndex >= newChannels.length)
      return;
    
    const tempChannel = newChannels[firstChannelIndex];
    newChannels[firstChannelIndex] = newChannels[secondChannelIndex];
    newChannels[secondChannelIndex] = tempChannel;
    
    this.setState({channels: newChannels, allChangesSaved: false}, () => {
      this.savePlaylistSnapshot();
    });
  };
  
  handleChangeChannel = (index, channel) => {
    if (!channel)
      return;
    const newChannels = this.state.channels.slice();
    if (channel.path !== newChannels[index].path && channel.available !== undefined)
      channel.available = undefined;
    newChannels[index] = channel;
    
    console.log(channel);

    this.setState({channels: newChannels, allChangesSaved: false}, () => {
      this.savePlaylistSnapshot();
      console.log(this.state.channels);
    });
  };

  handleClickEditPlaylistNameButton = () => {
    this.setState({openEditPlaylistNameForm: true});
  };
  
  handleChangePlaylistName = (newPlaylistName) => {
    this.setState({openEditPlaylistNameForm: false}, () => {
      if (!newPlaylistName || newPlaylistName === this.state.playlistName)
        return;

      this.setState({playlistName: newPlaylistName, allChangesSaved: false}, () => {
        this.savePlaylistSnapshot();
      });
    });
  };

  handleSwitchToMainForm = () => {
    deleteCookie("currentPlaylistId");
    this.setState({loading: true});
  };
  
  //TODO setstate -> false when catch
  handleSavePlaylist = (e) => {
    this.setState({allChangesSaved: true});
    
    const playlistToFetch = {};
    playlistToFetch.channels = this.state.channels;
    playlistToFetch.name = this.state.playlistName;
    playlistToFetch.nextChannelNumber = this.nextChannelNumber;
    
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

  handleCheckSelectedChannels = () => {
    const newChannels = this.state.channels.slice();
    
    console.log('start check');
    
    for (let i = 0; i < newChannels.length; i++) {
      if (newChannels[i] && newChannels[i].selected) {
        let channel = newChannels[i];
        let channelIndex = i;
        
        if (!channel.path || channel.available !== undefined)
          continue;

        fetch(`api/channel/check?path=${channel.path}`)
          .then(response => {
            return response.json();
          })
          .then(verdict => {
            console.log(channel.title + " : " + verdict);
            newChannels[channelIndex].available = verdict;
            this.setState({channels: newChannels});
          })
          .catch(error => console.error('Error:', error));
      }
    }
  };

  loadPlaylistById = (id) => {
    if (!id)
      return;
    
    fetch(`api/playlist/get/${id}`)
      .then(response => {
        if (response.status !== 200) {
          if (response.status === 404) {
            deleteCookie("currentPlaylistId");
            this.forceUpdate();
          }
          return undefined;
        }
        return response.json();
      })
      .then(playlist => {
        if(!playlist)
          return;
        
        this.loadPlaylist(playlist)
      })
      .catch(error => console.error('Error:', error));
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
    this.nextChannelNumber = playlist.nextChannelNumber;
    this.setState({loading: false, playlistName: playlist.name, channels: playlist.channels}, () => {
      this.doStack = [];
      this.undoStack = [];
      this.doStack.push({playlistName: this.state.playlistName.slice(), channels: this.state.channels.slice()});
    });
  };
  
  savePlaylistSnapshot = () => {
    const channels = this.state.channels.slice().map(ch => {
      ch.selected = false;
      return ch;
    });
    
    const snapshot = {
      playlistName: this.state.playlistName,
      channels: channels,  
    };
    
    this.undoStack = [];
    this.doStack.push(snapshot);
  };
  
  undoAction = () => {
    if (this.doStack.length <= 1)
      return;

    this.undoStack.push(this.doStack.pop());
    const snapshot = this.doStack[this.doStack.length - 1];
    
    this.setState({
      playlistName : snapshot.playlistName,
      channels: snapshot.channels,
      allChangesSaved: false
    });
  };
  
  redoAction = () => {
    if (this.undoStack.length === 0)
      return;
    
    const snapshot = this.undoStack.pop();
    this.setState({
      playlistName : snapshot.playlistName, 
      channels: snapshot.channels,
      allChangesSaved: false
    }, () => {
      this.doStack.push(snapshot);
    });
  };
  
  //TODO Add auto-save before downloading
  render() {
    if (this.state.loading) {
      const currentPlaylistId = getCookie("currentPlaylistId");
      
      if (!currentPlaylistId)
        return <MainForm onUpload={this.loadPlaylist} />;
      
      this.loadPlaylistById(currentPlaylistId);
      return null;
      // this.loadSampleChannels();
    }
    
    const {classes} = this.props;
    
    return (
      <div className={classes.root}>
        {!this.state.selectedChannelsCount > 0 ? 
          <AppBarMain 
            classes={classes}
            allChangesSaved={this.state.allChangesSaved}
            onSavePlaylist={this.handleSavePlaylist}
            onUndoAction={this.undoAction}
            onRedoAction={this.redoAction}
            onSwitchToMainForm={this.handleSwitchToMainForm}
          />
          :
          <AppBarForSelected 
            classes={classes}
            selectedChannelsCount={this.state.selectedChannelsCount}
            onDeleteSelectedChannels={this.handleDeleteSelectedChannels}
            onCheckSelectedChannels={this.handleCheckSelectedChannels}
            onSelectAllChannels={this.handleSelectAllChannels}
          />
        }
        { !this.state.loading &&
          <Paper className={classes.paper} elevation={1} square={true}>
            <Grid 
              container
              direction="row"
              justify="flex-start"
              alignItems="baseline"
            >
              <Typography variant='h3' inline={true} className={classes.playlistName}>
                {
                  this.state.playlistName.length > 27
                  ? this.state.playlistName.substr(0, 24) + "..." 
                  : this.state.playlistName
                }
              </Typography>
              <Button 
                onClick={this.handleClickEditPlaylistNameButton}
                variant="outlined"
                size="small"
                aria-label="Edit" 
                className={classes.playlistToolbarIcon}
              >
                <EditIcon className={classes.leftIcon} />
                Изменить имя
              </Button>
            </Grid>
            { this.state.openEditPlaylistNameForm &&
              <EditPlaylistNameForm 
                onClose={this.handleChangePlaylistName}
                playlistName={this.state.playlistName}
              />
            }
            <Channels 
              channels={this.state.channels}
              onSelectChannel={this.handleSelectChannel}
              onInsertChannel={this.handleInsertChannel}
              onChangeChannel={this.handleChangeChannel}
              onSwapChannels={this.handleSwapChannels}
              onCheckChannel={this.checkChannel}
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
