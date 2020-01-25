import React, {Component} from 'react';
import Channels from "./components/Channels";
import AppBarForSelected from './components/AppBarForSelected';
import AppBarMain from "./components/AppBarMain";
import EditPlaylistNameForm from "./components/EditPlaylistNameForm";
import PlaylistControlPanel from "./components/PlaylistControlPanel";
import MainForm from "./components/MainForm";
import appStyles from "./App.styles";
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import Button from "@material-ui/core/Button";
import {getCookie, deleteCookie} from "./helpers/cookieHelpers";
import {
  checkChannel,
  getDefaultChannel,
  loadPlaylistById,
  savePlaylist
} from "./helpers/playlistHelpers";


class App extends Component {
  displayName = App.name;

  constructor(props) {
    super(props);

    this.doStack = [];
    this.undoStack = [];

    this.state = {
      isPlaylistLoad: false,
      selectedChannelsCount: 0,
      allChangesSaved: true,
      playlistName: null,
      openEditPlaylistNameForm: false,
      channels: [],
    };
  }

  handleDeleteSelectedChannels = () => {
    const channels = this.state.channels;
    const newChannels = [];

    for (let i = 0; i < channels.length; i++) {
      if (channels[i] && !channels[i].selected)
        newChannels.push(channels[i]);
    }
    this.setState({
      channels: newChannels,
      selectedChannelsCount: 0,
      allChangesSaved: false
    }, () => {
      this.savePlaylistSnapshot();
    });
  };

  handleSelectChannel = channelIndex => {
    const newChannels = this.state.channels.slice();
    const channel = Object.assign({}, newChannels[channelIndex]);
    channel.selected = !channel.selected;
    newChannels[channelIndex] = channel;
    let delta = channel.selected ? 1 : -1;
    this.setState({
      selectedChannelsCount: this.state.selectedChannelsCount + delta,
      channels: newChannels
    });
  };

  handleSelectAllChannels = () => {
    const isSelect = this.state.selectedChannelsCount !== this.state.channels.length;
    const newChannels = this.state.channels.slice().map(ch => {
      let newChannel = Object.assign({}, ch);
      newChannel.selected = isSelect;
      return newChannel;
    });

    this.setState({
      channels: newChannels,
      selectedChannelsCount: isSelect ? this.state.channels.length : 0,
    });
  };

  handleCheckSelectedChannels = () => {
    const newChannels = this.state.channels.slice();
    console.log('start check');

    for (let channelIndex = 0; channelIndex < newChannels.length; channelIndex++) {
      let channel = newChannels[channelIndex];

      if (!channel || !channel.selected ||
        !channel.path || channel.available !== undefined)
        continue;

      checkChannel(channel)
        .then(verdict => {
          console.log(channel.title + " : " + verdict);
          newChannels[channelIndex] = Object.assign({}, newChannels[channelIndex]);
          newChannels[channelIndex].available = verdict;
          this.setState({channels: newChannels});
        })
        .catch(error => console.error('Error:', error));
    }
  };

  handleInsertChannel = channelIndex => {
    let newChannel = getDefaultChannel();
    newChannel.id = this.nextChannelNumber;
    newChannel.title += newChannel.id;
    this.nextChannelNumber++;

    const channels = this.state.channels.slice();
    channels.splice(channelIndex, 0, newChannel);
    this.setState({
      channels: channels,
      allChangesSaved: false
    }, () => {
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

    this.setState({
      channels: newChannels,
      allChangesSaved: false
    }, () => {
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

    this.setState({
      channels: newChannels,
      allChangesSaved: false
    }, () => {
      this.savePlaylistSnapshot();
    });
  };

  handleClickEditPlaylistNameButton = () => {
    this.setState({openEditPlaylistNameForm: true});
  };

  handleChangePlaylistName = (newPlaylistName) => {
    this.setState({openEditPlaylistNameForm: false}, () => {
      if (!newPlaylistName || newPlaylistName === this.state.playlistName)
        return;

      this.setState({
        playlistName: newPlaylistName,
        allChangesSaved: false
      }, () => {
        this.savePlaylistSnapshot();
      });
    });
  };

  handleSwitchToMainForm = () => {
    deleteCookie("currentPlaylistId");
    this.setState({isPlaylistLoad: false});
  };

  handleSavePlaylist = () => {
    if (this.state.allChangesSaved)
      return Promise.resolve();

    const playlist = {};
    playlist.channels = this.state.channels;
    playlist.name = this.state.playlistName;
    playlist.nextChannelNumber = this.nextChannelNumber;

    return savePlaylist(this.playlistId, playlist)
      .then(isSuccess => isSuccess && this.setState({allChangesSaved: true}));
  };

  handleDownloadPlaylist = () => {
    this.handleSavePlaylist()
      .then(isSuccess => {
        if (!isSuccess) {
          console.error("Error on download playlist");
          return;
        }

        let anchor = document.createElement('a');
        anchor.setAttribute('href', `api/playlist/download/${this.playlistId}`);
        anchor.setAttribute('download', "download");
        anchor.click();
      });
  };

  loadPlaylistById = id => {
    loadPlaylistById(id)
      .then(playlist => {
        this.loadPlaylist(playlist);
      });
  };

  loadPlaylist = playlist => {
    playlist.channels.map((channel, index) => {
      channel.id = index;
      channel.selected = false;
      return channel;
    });

    this.playlistId = playlist.id;
    this.nextChannelNumber = playlist.nextChannelNumber;
    this.setState({
      isPlaylistLoad: true,
      playlistName: playlist.name,
      channels: playlist.channels
    }, () => {
      this.doStack.push(
        {
          playlistName: this.state.playlistName,
          channels: this.state.channels.slice()
        }
      );
    });
  };

  savePlaylistSnapshot = () => {
    const channels = this.state.channels.slice()
      .map(ch => {
        let newChannel = Object.assign({}, ch);
        newChannel.selected = false;
        return newChannel;
      });

    const snapshot = {
      playlistName: this.state.playlistName,
      channels: channels,
    };

    this.undoStack = [];
    this.doStack.push(snapshot);

    console.log(this.doStack);
  };

  undoAction = () => {
    if (this.doStack.length <= 1)
      return;

    this.undoStack.push(this.doStack.pop());
    const snapshot = this.doStack[this.doStack.length - 1];

    this.setState({
      playlistName: snapshot.playlistName,
      channels: snapshot.channels,
      allChangesSaved: false
    });
  };

  redoAction = () => {
    if (this.undoStack.length === 0)
      return;

    const snapshot = this.undoStack.pop();
    this.setState({
      playlistName: snapshot.playlistName,
      channels: snapshot.channels,
      allChangesSaved: false
    }, () => {
      this.doStack.push(snapshot);
    });
  };

  render() {
    if (!this.state.isPlaylistLoad) {
      const currentPlaylistId = getCookie("currentPlaylistId");

      if (!currentPlaylistId)
        return <MainForm onUpload={this.loadPlaylist}/>;

      this.loadPlaylistById(currentPlaylistId);
      return null;
    }

    const {classes} = this.props;

    return (
      <React.Fragment>
        {!this.state.selectedChannelsCount > 0 ?
          <AppBarMain
            allChangesSaved={this.state.allChangesSaved}
            onSavePlaylist={this.handleSavePlaylist}
            onUndoAction={this.undoAction}
            onRedoAction={this.redoAction}
            onSwitchToMainForm={this.handleSwitchToMainForm}
          />
          :
          <AppBarForSelected
            selectedChannelsCount={this.state.selectedChannelsCount}
            onDeleteSelectedChannels={this.handleDeleteSelectedChannels}
            onCheckSelectedChannels={this.handleCheckSelectedChannels}
            onSelectAllChannels={this.handleSelectAllChannels}
          />
        }
        <Paper className={classes.paper} elevation={1} square={true}>
          <PlaylistControlPanel
            classes={classes}
            playlistName={this.state.playlistName}
            onClickEditPlaylistNameButton={this.handleClickEditPlaylistNameButton}
            onClickInsertChannelButton={() => this.handleInsertChannel(this.state.channels.length)}
          />
          <Channels
            channels={this.state.channels}
            onSelectChannel={this.handleSelectChannel}
            onInsertChannel={this.handleInsertChannel}
            onChangeChannel={this.handleChangeChannel}
            onSwapChannels={this.handleSwapChannels}
            onCheckChannel={this.checkChannel}
          />
          <div className={classes.downloadButtonWrapper}>
            <Button
              variant="contained"
              size="large"
              color={"default"}
              className={classes.downloadButton}
              onClick={this.handleDownloadPlaylist}
            >
              <SaveAltIcon className={classes.leftIcon}/>
              Скачать
            </Button>
          </div>
        </Paper>
        {
          this.state.openEditPlaylistNameForm &&
          <EditPlaylistNameForm
            onClose={this.handleChangePlaylistName}
            playlistName={this.state.playlistName}
          />
        }
      </React.Fragment>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(appStyles)(App);
