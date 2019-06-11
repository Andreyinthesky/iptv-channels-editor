import {Component} from "react";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
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
          <AddIcon />
        </IconButton>
        
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleInsertBeforeChannel}>Вставить до</MenuItem>
          <MenuItem onClick={this.handleInsertAfterChannel}>Вставить после</MenuItem>
        </Menu>
      </span>
      
    );
  }
}