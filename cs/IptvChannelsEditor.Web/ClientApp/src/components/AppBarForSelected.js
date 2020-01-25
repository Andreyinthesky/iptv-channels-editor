import React from 'react';
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import DeleteIcon from '@material-ui/icons/Delete';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import PropTypes from "prop-types";
import appBarMainStyles from "./styles/AppBar.styles";
import withStyles from "@material-ui/core/es/styles/withStyles";

function AppBarForSelected(props) {
  const {selectedChannelsCount, classes} = props;
  const {onDeleteSelectedChannels, onSelectAllChannels, onCheckSelectedChannels} = props;
  
  return (
    <AppBar position="fixed" className={classes.forSelectedBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" className={classes.title}>
          {`Выбрано: ${selectedChannelsCount}`}
        </Typography>
        <Button variant="contained" size="large" className={classes.largeButton}
                onClick={onSelectAllChannels}>
          Выбрать все
        </Button>
        <Button variant="contained" size="large" className={classes.largeButton}
                onClick={onCheckSelectedChannels}>
          <DoneAllIcon className={classes.leftIcon}/>
          Проверить выбранные
        </Button>
        <Button variant="contained" size="large" className={classes.largeButton}
                onClick={onDeleteSelectedChannels}>
          <DeleteIcon className={classes.leftIcon}/>
          Удалить выбранные
        </Button>
      </Toolbar>
    </AppBar>
  );
}

AppBarForSelected.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(appBarMainStyles)(AppBarForSelected);