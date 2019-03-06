import {Component} from "react";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from "@material-ui/core/IconButton";
import React from "react";

export default class InsertChannelMenu extends Component {
  constructor(props){
    super(props);
    this.state = {anchorEl: null};
  }

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleInsertBeforeChannel = () => {
    this.handleClose();
    this.props.onInsertBeforeChannel();
  };

  handleInsertAfterChannel = () => {
    this.handleClose();
    this.props.onInsertAfterChannel();
  };
  
  render() {
    const { anchorEl } = this.state;
    
    return (
      <span>
        <IconButton onClick={this.handleClick} aria-label="Insert menu">
          <MoreVertIcon />
        </IconButton>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleInsertBeforeChannel}>Insert Before</MenuItem>
          <MenuItem onClick={this.handleInsertAfterChannel}>Insert After</MenuItem>
        </Menu>
      </span>
      
    );
  }
}