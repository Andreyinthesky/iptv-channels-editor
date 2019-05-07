import React, {Component} from 'react';
import {ChannelTableRow} from "./ChannelTableRow";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from "@material-ui/core/TablePagination";
import Divider from "@material-ui/core/Divider";

export class ChannelTable extends Component {
  
  constructor(props){
    super(props);
    this.selected = [];
    this.state = {
      rowsPerPage: 5,
      curPage: 0,
    };
  }

  handleSelectAll = event => {
    if (event.target.checked) {
      this.setState(state => ({ selected: state.data.map(n => n.id) }));
      return;
    }
    this.setState({ selected: [] });
  };

  handleSelect = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
  };
  
  handleChangePage = (event, page) => {
    this.setState({ curPage: page }, () => console.log(this.state.curPage));
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ rowsPerPage: event.target.value });
  };
  
  render() {
    const channels = this.props.channels;
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
        />
        <Divider/>
        <Table>
          <TableHead>
            {channels.filter(ch => ch !== undefined).length > 0 && 
            <TableRow>
              <TableCell>Выбрать</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Группа</TableCell>
              <TableCell>Адрес</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>}
          </TableHead>
          <TableBody>
          {channels.slice(curPage * rowsPerPage, curPage * rowsPerPage + rowsPerPage)
            .map((channel, index) =>
            channel && <ChannelTableRow key={channel.id}
              index = {curPage * rowsPerPage + index}                          
              channel = {channel}
              onEditChannel={this.props.onEditChannel}
              onInsertChannel={this.props.onInsertChannel}
              onSelectChannel={this.props.onSelectChannel}
              onSwapChannels={this.props.onSwapChannels}
            />
          )}
          </TableBody>
        </Table>
      </div>
    );
  }
}