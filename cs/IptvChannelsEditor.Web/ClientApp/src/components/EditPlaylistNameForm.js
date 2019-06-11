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
    minWidth: 400,
    maxWidth: 500,
  },
  formControlLabel: {
    marginTop: theme.spacing.unit,
  },
});

class EditPlaylistNameForm extends React.Component {
  constructor(props){
    super(props);
    const playlistName = this.props.playlistName;
    
    this.state = {
      playlistName: playlistName,
      fullWidth: true,
      maxWidth: 'md',
    };
  }
  
  componentDidMount() {
    setTimeout(() => this.forceUpdate(), 100);
  }
  
  handleClose = (playlistName) => {
    this.props.onClose(playlistName);
  };

  handleChange = (event) => {
    const newPlaylistName = event.target.value;
    if (newPlaylistName.length > 100)
      return;
    this.setState({ playlistName: newPlaylistName});
  };

  render() {
    const { classes } = this.props;
    const playlistName = this.state.playlistName;

    return (
      <Dialog
        fullWidth={this.state.fullWidth}
        maxWidth={this.state.maxWidth}
        open={true}
        onClose={() => this.handleClose(null)}
        aria-labelledby="form-title"
      >
        <DialogTitle id="form-title">Изменение имени плейлиста</DialogTitle>
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
                Имя
              </InputLabel>
              <OutlinedInput
                id='title'
                value={playlistName ? playlistName : undefined}
                onChange={e => this.handleChange(e)}
                labelWidth={this.titleRef ? this.titleRef.offsetWidth : 0}
              >
              </OutlinedInput>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.handleClose(this.state.playlistName)} color="primary">
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

EditPlaylistNameForm.propTypes = {
  classes: PropTypes.object.isRequired,
  playlistName: PropTypes.string.isRequired,
};

export default withStyles(editChannelFormStyles)(EditPlaylistNameForm);