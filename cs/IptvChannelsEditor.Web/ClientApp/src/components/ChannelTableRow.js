import React, {Component} from 'react';

export class ChannelTableRow extends Component {

  handleEditChannel = () => {
    this.props.onEditChannel(this.props.channel);
  };

  handleDeleteChannel = () => {
    this.props.onDeleteChannel(this.props.channel);
  };
  
  render() {
    const channel = this.props.channel;
    const channelAttrs = channel.attributes;
    
    return (
      <tr>
        <td>
          <input type="checkbox"/>
        </td>
        <td>
          {channelAttrs.tvgLogoPath && <img className="tvg-logo" src={channelAttrs.tvgLogoPath} alt="logo"/>}
          {channel.title}
        </td>
        <td>
          {channel.groupTitle == null ? 'None' : channel.groupTitle}
        </td>
        <td>{channel.path}</td>
        <td>
          <button onClick={() => this.handleEditChannel}>Edit</button>
        </td>
        <td>
          <button onClick={() => this.handleDeleteChannel}>Delete</button>
        </td>
        <td>
          <button>Insert</button>
        </td>
      </tr>
    );
  }
}