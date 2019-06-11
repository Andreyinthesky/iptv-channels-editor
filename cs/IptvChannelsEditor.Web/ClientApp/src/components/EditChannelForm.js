import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import * as ReactDOM from "react-dom";

const editChannelFormStyles = theme => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: 'fit-content',
  },
  formControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 200,
    maxWidth: 300,
  },
  pathFormControl: {
    marginTop: theme.spacing.unit * 2,
    minWidth: 500,
    maxWidth: 600,
  },
  formControlLabel: {
    marginTop: theme.spacing.unit,
  },
});

class EditChannelForm extends React.Component {
  constructor(props){
    super(props);
    const channel = this.props.channel;
    
    this.state = {
      channel: channel,
      fullWidth: true,
      maxWidth: 'md',
    };
  }
  
  componentDidMount() {
    setTimeout(() => this.forceUpdate(), 100);
  }
  
  handleClose = (channel) => {
    this.props.onClose(channel);
  };

  handleChange = (event, channelProp)=> {
    const newChannel = Object.assign({}, this.state.channel);
    newChannel[channelProp] = event.target.value;
    this.setState({ channel: newChannel});
  };

  //TODO: Add logoPath field
  render() {
    const { classes } = this.props;
    const channel = this.state.channel;
    const { title, groupTitle, path } = channel;

    return (
      <Dialog
        fullWidth={this.state.fullWidth}
        maxWidth={this.state.maxWidth}
        open={true}
        onClose={() => this.handleClose(null)}
        aria-labelledby="form-title"
      >
        <DialogTitle id="form-title">Изменение канала</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Для принятия изменений нажмите "Cохранить"
          </DialogContentText>
          <form className={classes.form} noValidate autoComplete="off">
            <FormControl className={classes.formControl} variant='outlined'>
              <InputLabel 
                ref={ref => {this.titleRef = ReactDOM.findDOMNode(ref)}}
                htmlFor='title'
              >
                Название
              </InputLabel>
              <OutlinedInput
                id='title'
                value={title ? title : undefined}
                onChange={e => this.handleChange(e, 'title')}
                labelWidth={this.titleRef ? this.titleRef.offsetWidth : 0}
              >
              </OutlinedInput>
            </FormControl>
            <FormControl className={classes.formControl} variant='outlined'>
              <InputLabel
                ref={ref => {this.groupRef = ReactDOM.findDOMNode(ref)}}
                htmlFor='group'
              >
                Группа
              </InputLabel>
              <OutlinedInput
                id='group'
                value={groupTitle ? groupTitle : undefined}
                onChange={e => this.handleChange(e, 'groupTitle')}
                labelWidth={this.groupRef ? this.groupRef.offsetWidth : 0}
              >
              </OutlinedInput>
            </FormControl>
            <FormControl className={classes.pathFormControl} variant='outlined'>
              <InputLabel
                ref={ref => {this.pathRef = ReactDOM.findDOMNode(ref)}}
                htmlFor='path'
              >
                Адрес
              </InputLabel>
              <OutlinedInput
                id='path'
                value={path ? path : undefined}
                onChange={e => this.handleChange(e, 'path')}
                labelWidth={this.pathRef ? this.pathRef.offsetWidth : 0}
              >
              </OutlinedInput>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose(this.state.channel)} color="primary">
            Сохранить
          </Button>
          <Button onClick={() => this.handleClose(null)} color="primary">
            Отмена
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

EditChannelForm.propTypes = {
  classes: PropTypes.object.isRequired,
  channel: PropTypes.object.isRequired,
};

export default withStyles(editChannelFormStyles)(EditChannelForm);