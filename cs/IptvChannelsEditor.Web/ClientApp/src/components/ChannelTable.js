import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import ChannelTableRow from "./ChannelTableRow";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from "@material-ui/core/TablePagination";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from '@material-ui/icons/FirstPage';
import LastPageIcon from '@material-ui/icons/LastPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

const tablePaginationActionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

class TablePaginationActions extends React.Component {
  handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
  };

  handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
  };

  handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
  };

  handleLastPageButtonClick = event => {
    this.props.onChangePage(
      event,
      Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
  };

  render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
      <div className={classes.root}>
        <IconButton
          onClick={this.handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="First Page"
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={this.handleBackButtonClick}
          disabled={page === 0}
          aria-label="Previous Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
          onClick={this.handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Next Page"
        >
          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
          onClick={this.handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label="Last Page"
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </div>
    );
  }
}

TablePaginationActions.propTypes = {
  classes: PropTypes.object.isRequired,
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(tablePaginationActionsStyles, { withTheme: true })(
  TablePaginationActions
);

export default class ChannelTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      rowsPerPage: 5,
      curPage: 0,
    };
  }
  
  handleChangePage = (event, page) => {
    this.setState({ curPage: page });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };
  
  render() {
    const {channels} = this.props;
    const {rowsPerPage, curPage} = this.state;
    
    return (
      <div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={channels.length}
          rowsPerPage={rowsPerPage}
          page={curPage}
          labelDisplayedRows={({from, to, count}) => `${from}-${to} из ${count}`}
          labelRowsPerPage={'Строк на странице'}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
          ActionsComponent={TablePaginationActionsWrapped}
        />
        <Divider/>
        <Table>
          <TableHead>
            {
              channels.filter(ch => ch !== undefined).length > 0 && 
              <TableRow>
                <TableCell>№</TableCell>
                <TableCell>Выбрать</TableCell>
                <TableCell>Имя</TableCell>
                <TableCell>Группа</TableCell>
                <TableCell>Адрес</TableCell>
                <TableCell>Действия</TableCell>
              </TableRow>
            }
          </TableHead>
          <TableBody>
          {channels.slice(curPage * rowsPerPage, curPage * rowsPerPage + rowsPerPage)
            .map((channel, index) => channel && 
              <ChannelTableRow 
                key={channel.id}
                index = {curPage * rowsPerPage + index}                          
                channel = {channel}
                onEditChannel={this.props.onEditChannel}
                onInsertChannel={this.props.onInsertChannel}
                onSelectChannel={this.props.onSelectChannel}
                onSwapChannels={this.props.onSwapChannels} 
                onCheckChannel={this.props.onCheckChannel}
              />
          )}
          </TableBody>
        </Table>
      </div>
    );
  }
}