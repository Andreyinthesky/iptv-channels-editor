import React, {Component} from 'react';
import {ChannelTableRow} from "./ChannelTableRow";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export class ChannelTable extends Component {
  
  render() {
    const channels = this.props.channels;
    
    return (
      <Table>
        <TableHead>
        {channels.filter(ch => ch !== undefined).length > 0 && 
        <TableRow>
          <TableCell>Select</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Group</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>}
        </TableHead>
        <TableBody>
        {channels.map((channel, index) =>
          channel && <ChannelTableRow key={channel.id}
            index = {index}                          
            channel = {channel}
            onEditChannel={this.props.onEditChannel}
            onDeleteChannel={this.props.onDeleteChannel}
            onInsertChannel={this.props.onInsertChannel}
            onSelectChannel={this.props.onSelectChannel}
          />
        )}
        </TableBody>
      </Table>
    );
  }
}