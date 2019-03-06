import React, {Component} from 'react';
import InsertChannelMenu from './InsertChannelMenu';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import CheckBox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import CancelIcon from '@material-ui/icons/Cancel';


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
    this.props.onSelectChannel();
  };
  
  handleEditChannel = () => {
    let channel = this.props.channel;
    if (this.state.isEdit){
      console.log('save');
      channel.title = this.titleRef.current.value;
      channel.groupTitle = this.groupTitleRef.current.value;
      channel.path = this.pathRef.current.value;
      this.props.onEditChannel(channel);
    }
    this.setState({isEdit: !this.state.isEdit});
  };

  handleCancelEditChannel = () => {
    let channel = this.props.channel;
    console.log('cancel');
    this.titleRef.current.value = channel.title;
    this.groupTitleRef.current.value = channel.groupTitle;
    this.pathRef.current.value = channel.path;
    this.setState({isEdit: !this.state.isEdit});
  };

  handleDeleteChannel = () => {
    this.props.onDeleteChannel(this.props.index);
  };
  
  handleInsertBeforeChannel = () => {
    this.props.onInsertChannel(this.props.index);
  };
  
  handleInsertAfterChannel = () => {
    this.props.onInsertChannel(this.props.index + 1);
  };
  
  render() {
    const channel = this.props.channel;
    const channelAttrs = channel.attributes;
    
    return (
      <TableRow>
        <TableCell>
          <CheckBox color="primary" onClick={this.handleSelectChannel}/>
        </TableCell>
        <TableCell>
          <Grid container direction="row" justify="space-around" alignItems="center">
            {channelAttrs.tvgLogoPath && <img className="tvg-logo" src={channelAttrs.tvgLogoPath} alt="logo"/>}
            <TextField inputRef={this.titleRef} disabled={!this.state.isEdit} defaultValue={channel.title}/>
          </Grid>
        </TableCell>
        <TableCell>
          <TextField inputRef={this.groupTitleRef} disabled={!this.state.isEdit}
                 defaultValue={channel.groupTitle == null ? 'None' : channel.groupTitle} />
        </TableCell>
        <TableCell>
          <TextField inputRef={this.pathRef} disabled={!this.state.isEdit} defaultValue={channel.path} />
        </TableCell>
        <TableCell>
          <Tooltip title={this.state.isEdit ? 'Apply' : 'Edit'}>
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
          <Tooltip title='Delete'>
            <IconButton onClick={this.handleDeleteChannel} aria-label="Delete">
              <DeleteIcon />
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