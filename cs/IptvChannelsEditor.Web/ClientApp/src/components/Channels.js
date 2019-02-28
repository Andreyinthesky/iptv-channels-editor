import React, {Component} from "react";
import {ChannelTable} from "./ChannelTable";

export class Channels extends Component {

  constructor(props){
    super(props);
    this.state = {
      channels : props.channels,
    }
  }

  handleEditChannel = channel => {
    console.log(channel);
  };

  handleDeleteChannel = channel => {
    console.log(channel);
    const channels = this.state.channels.slice();
    delete channels[channel.id];
    this.setState({channels: channels});
  };

  handleDownloadPlaylist = (event) => {
    const channels = this.state.channels.filter(ch => ch !== undefined);
    if (channels.length === 0)
      return;
    console.log(channels);
    // fetch('api/file/download', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(channels)
    // }).then(response => {
    //  
    // }).catch(error => console.error('Error:', error));
  };

  render() {
    return (
      <div>
        <ChannelTable
          channels={this.state.channels}
          onEditChannel={this.handleEditChannel}
          onDeleteChannel={this.handleDeleteChannel}
        />
        <a onClick={this.handleDownloadPlaylist}><button>Download</button></a>
      </div>
    );
  }
}