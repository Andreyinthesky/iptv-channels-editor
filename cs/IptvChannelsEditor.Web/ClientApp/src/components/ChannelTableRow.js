import React, {Component} from 'react';
import InsertChannelMenu from './InsertChannelMenu';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CheckBox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const channelTableRowStyles = theme => ({
  pathCell: {
    maxWidth: '200px',
    textOverflow : 'ellipsis',
    overflow : 'hidden',
    fontSize: '16px',
  },
  groupTitleCell: {
    maxWidth: '100px',
    textOverflow : 'ellipsis',
    overflow : 'hidden',
    fontSize: '16px',
  },
  titleCell: {
    maxWidth: '200px',
    textOverflow : 'ellipsis',
    overflow : 'hidden',
    fontSize: '16px',
  },
  selectCell: {
    maxWidth: '70px'
  }
});

class ChannelTableRow extends Component {
  constructor(props){
    super(props);
  }

  handleSelectChannel = () => {
    let channel = this.props.channel;
    channel.selected = !channel.selected;
    this.props.onSelectChannel(this.props.index);
  };
  
  handleEditChannel = () => {
    this.props.onEditChannel(this.props.index);
  };
  
  handleInsertBeforeChannel = () => {
    this.props.onInsertChannel(this.props.index);
  };
  
  handleInsertAfterChannel = () => {
    this.props.onInsertChannel(this.props.index + 1);
  };
  
  handleMoveUpChannel = () => {
    const channelIndex = this.props.index;
    this.props.onSwapChannels(channelIndex, channelIndex - 1);
  };

  handleMoveDownChannel = () => {
    const channelIndex = this.props.index;
    this.props.onSwapChannels(channelIndex, channelIndex + 1);
  };
  
  render() {
    const {classes} = this.props;
    const channel = this.props.channel;
    const channelAttrs = channel.attributes;
    
    return (
      <TableRow className={classes.row}>
        <TableCell className={classes.selectCell}>
          <CheckBox color="primary" onClick={this.handleSelectChannel} checked={channel.selected}/>
        </TableCell>
        <TableCell className={classes.titleCell}>
          <Grid container direction="row" justify="flex-start" alignItems="center">
            {channelAttrs.tvgLogoPath && <img className="tvg-logo" src={channelAttrs.tvgLogoPath} alt="logo"/>}
            {channel.title}
          </Grid>
        </TableCell>
        <TableCell className={classes.groupTitleCell}>
          {!channel.groupTitle ? 'Неизвестно' : channel.groupTitle}
        </TableCell>
        <TableCell className={classes.pathCell}>
           {channel.path}
        </TableCell>
        <TableCell>
          <IconButton onClick={this.handleMoveUpChannel}>
            <ExpandLessIcon/>
          </IconButton>
          <IconButton onClick={this.handleMoveDownChannel}>
            <ExpandMoreIcon/>
          </IconButton>
          <Tooltip title={'Редактировать'}>
            <IconButton onClick={this.handleEditChannel} aria-label="Edit">
              <EditIcon />
            </IconButton>
          </Tooltip>
          <InsertChannelMenu
            onInsertBeforeChannel={this.handleInsertBeforeChannel}
            onInsertAfterChannel={this.handleInsertAfterChannel}
          />
        </TableCell>
      </TableRow>
    );
  }
}

ChannelTableRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(channelTableRowStyles)(ChannelTableRow);