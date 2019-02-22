import React, {Component} from "react";
import {ChannelTable} from "./ChannelTable";

export class Channels extends Component {

  handleEditChannel = channel => {
    alert("Edit #" + channel.id);
  };

  handleDeleteChannel = channel => {
    alert("Delete #" + channel.id);
  };

  render() {
    return (
      <ChannelTable
        channels={this.props.channels}
        onEditChannel={this.handleEditChannel}
        onDeleteChannel={this.handleDeleteChannel}
      />
    );
  }
}