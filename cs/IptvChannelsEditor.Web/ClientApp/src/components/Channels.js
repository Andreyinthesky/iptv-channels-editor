import React, {Component} from "react";
import ChannelTable from "./ChannelTable";
import EditChannelForm from "./EditChannelForm";

export default class Channels extends Component {

  constructor(props){
    super(props);
    this.handleSelectChannel = props.onSelectChannel;
    this.handleInsertChannel = props.onInsertChannel;
    this.handleChangeChannel = props.onChangeChannel;
    this.state = {
      channelIndexForEdit : -1,
    }
  }
  
  handleEditChannel = (index) => {
    this.setState({channelIndexForEdit: index});
  };

  handleCloseEditChannelForm = (changedChannel) => {
    const index = this.state.channelIndexForEdit;
    this.setState({channelIndexForEdit : -1}, () => {
      this.handleChangeChannel(index, changedChannel);
    });
  };

  render() {
    const {channels} = this.props;
    
    return (
      <div>
        <ChannelTable
          channels={channels}
          onEditChannel={this.handleEditChannel}
          onInsertChannel={this.handleInsertChannel}
          onSelectChannel={this.handleSelectChannel}
          onSwapChannels={this.props.onSwapChannels}
          onCheckChannel={this.props.onCheckChannel}
        />
        {this.state.channelIndexForEdit >= 0 && 
        <EditChannelForm
          channel={channels[this.state.channelIndexForEdit]}
          onClose={this.handleCloseEditChannelForm}
        />}
      </div>
    );
  }
}