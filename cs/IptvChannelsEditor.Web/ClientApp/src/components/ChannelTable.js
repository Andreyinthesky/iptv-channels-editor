import React, {Component} from 'react';
import {ChannelTableRow} from "./ChannelTableRow";

export class ChannelTable extends Component {
  render() {
    const channels = this.props.channels;
    
    return (
      <table className="table">
        <thead>
        <tr>
          <th>Select</th>
          <th>Name</th>
          <th>Group</th>
          <th>Address</th>
        </tr>
        </thead>
        <tbody>
        {channels.map(channel =>
          <ChannelTableRow key={channel.id}
            channel = {channel}
            onEdit={() => this.props.handleEditChannel}
            onDelete={() => this.props.handleDeleteChannel}
          />
        )}
        </tbody>
      </table>
    );
  }
}