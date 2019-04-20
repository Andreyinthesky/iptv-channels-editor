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


export class ChannelTableRow extends Component {
  constructor(props){
    super(props);
    this.state = {
      isEdit : false,
    };
    this.titleRef = React.createRef();
    this.groupTitleRef = React.createRef();
    this.pathRef = React.createRef();
  }

  handleSelectChannel = () => {
    let channel = this.props.channel;
    channel.selected = !channel.selected;
    this.props.onSelectChannel(this.props.index);
  };
  
  handleEditChannel = () => {
    this.props.onEditChannel(this.props.index);
  };

  handleCancelEditChannel = () => {
    let channel = this.props.channel;
    console.log('cancel');
    this.titleRef.current.value = channel.title;
    this.groupTitleRef.current.value = channel.groupTitle;
    this.pathRef.current.value = channel.path;
    this.setState({isEdit: !this.state.isEdit});
  };
  
  
  handleInsertBeforeChannel = () => {
    this.props.onInsertChannel(this.props.index);
  };
  
  handleInsertAfterChannel = () => {
    this.props.onInsertChannel(this.props.index + 1);
  };
  
  handleMoveUpChannel = () => {
    console.log("up");  
  };

  handleMoveDownChannel = () => {
    console.log("down");
  };
  
  render() {
    const channel = this.props.channel;
    const channelAttrs = channel.attributes;
    
    return (
      <TableRow>
        <TableCell>
          <CheckBox color="primary" onClick={this.handleSelectChannel} checked={channel.selected}/>
        </TableCell>
        <TableCell>
          <Grid container direction="row" justify="flex-start" alignItems="center">
            {channelAttrs.tvgLogoPath && <img className="tvg-logo" src={channelAttrs.tvgLogoPath} alt="logo"/>}
            {channel.title}
          </Grid>
        </TableCell>
        <TableCell>
          {!channel.groupTitle ? 'Неизвестно' : channel.groupTitle}
        </TableCell>
        <TableCell>
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
              {this.state.isEdit ? <DoneIcon /> : <EditIcon />}
            </IconButton>
          </Tooltip>
          {
            this.state.isEdit &&
            <Tooltip title='Cancel'>
              <IconButton onClick={this.handleCancelEditChannel} aria-label="Cancel">
                <CancelIcon />
              </IconButton>
            </Tooltip>
          }
          <InsertChannelMenu
            onInsertBeforeChannel={this.handleInsertBeforeChannel}
            onInsertAfterChannel={this.handleInsertAfterChannel}
          />
        </TableCell>
      </TableRow>
    );
  }
}