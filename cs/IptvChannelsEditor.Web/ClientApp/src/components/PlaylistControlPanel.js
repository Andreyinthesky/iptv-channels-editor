import React from "react";
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import playlistControlPanelStyles from "./styles/PlaylistControlPanel.styles";
import withStyles from "@material-ui/core/es/styles/withStyles";

class PlaylistControlPanel extends React.Component {

  render() {
    const {classes, playlistName} = this.props;
    
    return (
      <React.Fragment>
        <Typography variant='h3' inline={true} className={classes.playlistName}>
          {playlistName}
        </Typography>
        <Button
          onClick={this.props.onClickEditPlaylistNameButton}
          variant="outlined"
          size="small"
          aria-label="Edit playlist name"
          className={classes.editPlaylistNameButton}
        >
          <EditIcon className={classes.leftIcon}/>
          Изменить имя
        </Button>
        <Button
          onClick={this.props.onClickInsertChannelButton}
          variant="outlined"
          size="small"
          aria-label="Add channel"
          className={classes.addChannelButton}
        >
          <AddIcon className={classes.leftIcon}/>
          Добавить канал
        </Button>
      </React.Fragment>
    );
  }
}

PlaylistControlPanel.propTypes = {
  classes: PropTypes.object.isRequired,
  playlistName: PropTypes.string.isRequired,
};

export default withStyles(playlistControlPanelStyles)(PlaylistControlPanel);