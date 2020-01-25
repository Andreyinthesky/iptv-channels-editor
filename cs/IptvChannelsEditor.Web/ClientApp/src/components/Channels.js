import React, {Component} from "react";
import ChannelTable from "./ChannelTable";
import EditChannelForm from "./EditChannelForm";

export default class Channels extends Component {

  constructor(props){
    super(props);
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
      this.props.onChangeChannel(index, changedChannel);
    });
  };

  render() {
    const {channels} = this.props;
    
    return (
      <React.Fragment>
        <ChannelTable
          channels={channels}
          onEditChannel={this.handleEditChannel}
          {...this.props}
        />
        {this.state.channelIndexForEdit >= 0 && 
        <EditChannelForm
          channel={channels[this.state.channelIndexForEdit]}
          onClose={this.handleCloseEditChannelForm}
        />}
      </React.Fragment>
    );
  }
}