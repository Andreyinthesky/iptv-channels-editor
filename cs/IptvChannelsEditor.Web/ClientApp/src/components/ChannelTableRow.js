import React, {Component} from 'react';
import InsertChannelMenu from './InsertChannelMenu';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CheckBox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import {withStyles} from "@material-ui/core";
import PropTypes from "prop-types";

const channelTableRowStyles = theme => ({
  tvgLogo: {
    extend: 'img',
    width: '50px',
    marginRight: '20px',
  },
  pathCell: {
    textOverflow : 'ellipsis',
    overflow : 'hidden',
    maxWidth: '200px',
  },
  groupTitleCell: {
    textOverflow : 'ellipsis',
    overflow : 'hidden',
    maxWidth: '100px',
  },
  titleCell: {
    textOverflow : 'ellipsis',
    overflow : 'hidden',
    maxWidth: '200px',
  },
  selectCell: {
    textOverflow : 'ellipsis',
    overflow : 'hidden',
  },
  numberCell: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: theme.palette.primary.light,
  }
});

class ChannelTableRow extends Component {

  handleSelectChannel = () => {
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
  
  handleCheckChannel = () => {
    let {channel, index} = this.props;
    this.props.onCheckChannel(channel, index);
  };
  
  render() {
    const {classes, index} = this.props;
    const channel = this.props.channel;
    const channelAttrs = channel.attributes;

    const CustomTableRow = withStyles(theme => ({
      root: {
        backgroundColor: channel.available === undefined 
          ? undefined
          : channel.available 
            ? '#41dc38b3' : '#3b3f4eb3',
        transition: '1.5s ease',
      },
    }))(TableRow);

    return (
      <CustomTableRow>
        <TableCell className={classes.numberCell}>
          {index + 1}
        </TableCell>
        <TableCell className={classes.selectCell}>
          <CheckBox color="primary" onClick={this.handleSelectChannel} checked={channel.selected}/>
        </TableCell>
        <TableCell className={classes.titleCell}>
          <Grid container direction="row" justify="flex-start" alignItems="center">
            {channelAttrs.tvgLogoPath && <img className={classes.tvgLogo} src={channelAttrs.tvgLogoPath} alt="logo"/>}
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
      </CustomTableRow>
    );
  }
}

ChannelTableRow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(channelTableRowStyles)(ChannelTableRow);