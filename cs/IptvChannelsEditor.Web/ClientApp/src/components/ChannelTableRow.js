import React, {Component} from 'react';

export class ChannelTableRow extends Component {

  constructor(props){
    super(props);
    this.titleRef = React.createRef();
    this.groupTitleRef = React.createRef();
    this.pathRef = React.createRef();
  }  
  
  handleEditChannel = () => {
    let channel = this.props.channel;
    this.titleRef.current.disabled = !this.titleRef.current.disabled;
    this.groupTitleRef.current.disabled = !this.groupTitleRef.current.disabled;
    this.pathRef.current.disabled = !this.pathRef.current.disabled;
    if (this.titleRef.current.disabled){
      console.log('save');
      channel.title = this.titleRef.current.value;
      channel.groupTitle = this.groupTitleRef.current.value;
      channel.path = this.pathRef.current.value;
      this.props.onEditChannel(channel);
    }
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
          <div className="channelTitle">
            {channelAttrs.tvgLogoPath && <img className="tvg-logo" src={channelAttrs.tvgLogoPath} alt="logo"/>}
            <input type="text" ref={this.titleRef} disabled defaultValue={channel.title}/>
          </div>
        </td>
        <td>
          <input type="text" ref={this.groupTitleRef} disabled defaultValue={channel.groupTitle == null ? 'None' : channel.groupTitle} />
        </td>
        <td>
          <input type="text" ref={this.pathRef} disabled defaultValue={channel.path} />
        </td>
        <td>
          <button onClick={this.handleEditChannel}>Edit</button>
        </td>
        <td>
          <button onClick={this.handleDeleteChannel}>Delete</button>
        </td>
        <td>
          <button>Insert</button>
        </td>
      </tr>
    );
  }
}