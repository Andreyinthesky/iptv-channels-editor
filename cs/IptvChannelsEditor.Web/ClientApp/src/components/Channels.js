import React, {Component} from "react";
import {ChannelTable} from "./ChannelTable";
import PropTypes from "prop-types";
import {getDefaultChannel} from "../helpers/playlistHelpers";
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  selectActionsPanel: {
    marginTop: theme.spacing.unit * 2,
  },
});

class Channels extends Component {

  constructor(props){
    super(props);
    this.state = {
      channels : props.channels,
      hasSelectedChannels : false,
    };
  }

  hasSelectedChannels = (channels) => {
    for (let i = 0; i < channels.length; i++) {
      if (channels[i] && channels[i].selected)
        return true;
    }
    return false;
  };
  
  handleSelectChannel = () => {
    let hasSelected = this.hasSelectedChannels(this.state.channels);
    if (hasSelected !== this.state.hasSelectedChannels) {
      this.setState({hasSelectedChannels: hasSelected});
    }
  };

  handleEditChannel = channel => {
    console.log(channel);
  };

  handleDeleteChannel = channelIndex => {
    const channels = this.state.channels.slice();
    delete channels[channelIndex];
    let hasSelected = this.hasSelectedChannels(channels);
    this.setState({channels: channels, hasSelectedChannels: hasSelected});
  };

  handleDeleteSelectedChannels = () => {
    const channels = this.state.channels.slice();
    for (let i = 0; i < channels.length; i++) {
      if (channels[i] && channels[i].selected)
        delete channels[i];
    }
    this.setState({channels: channels, hasSelectedChannels : false});
  };
  
  handleInsertChannel = channelIndex => {
    let newChannel = getDefaultChannel();
    newChannel.id = this.state.channels.length;
    newChannel.title += newChannel.id;
    const channels = this.state.channels.slice();
    channels.splice(channelIndex, 0, newChannel);
    this.setState({channels: channels});
  };

  handleDownloadPlaylist = (event) => {
    const channels = this.state.channels.filter(ch => ch !== undefined);
    if (channels.length === 0)
      return;
    console.log(channels);
    // let xhr = new XMLHttpRequest();
    // xhr.open('POST', 'api/file/downloadPlaylist', false);
    // xhr.send();
    // fetch('api/file/downloadPlaylist', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   // body: JSON.stringify(channels)
    // // }).then(response => {
    // //   response.r
    // }).catch(error => console.error('Error:', error));
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <ChannelTable
          channels={this.state.channels}
          onEditChannel={this.handleEditChannel}
          onDeleteChannel={this.handleDeleteChannel}
          onInsertChannel={this.handleInsertChannel}
          onSelectChannel={this.handleSelectChannel}
        />
        {/*<a onClick={this.handleDownloadPlaylist}><button>Download</button></a>*/}
        {
          this.state.hasSelectedChannels &&
          <div className={classes.selectActionsPanel}>
            <Button variant='contained' color='secondary' onClick={this.handleDeleteSelectedChannels}>
              <DeleteIcon className={classes.leftIcon} />
              Delete Selected
            </Button>
          </div>
        }
      </div>
    );
  }
}

Channels.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Channels);