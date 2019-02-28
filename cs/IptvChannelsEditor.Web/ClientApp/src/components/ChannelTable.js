import React, {Component} from 'react';
import {ChannelTableRow} from "./ChannelTableRow";

export class ChannelTable extends Component {
  
  // constructor(props){
  //   super(props);
  // }
  
  render() {
    const channels = this.props.channels;
    
    return (
      <table className="table">
        <thead>
        {channels.filter(ch => ch !== undefined).length > 0 && 
        <tr>
          <th>Select</th>
          <th>Name</th>
          <th>Group</th>
          <th>Address</th>
        </tr>}
        </thead>
        <tbody>
        {channels.map(channel =>
          channel && <ChannelTableRow key={channel.id}
            channel = {channel}
            onEditChannel={this.props.onEditChannel}
            onDeleteChannel={this.props.onDeleteChannel}
          />
        )}
        </tbody>
      </table>
    );
  }
}