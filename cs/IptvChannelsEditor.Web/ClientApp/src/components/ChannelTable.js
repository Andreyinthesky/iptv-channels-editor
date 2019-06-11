import React, {Component} from 'react';
import ChannelTableRow from "./ChannelTableRow";
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from "@material-ui/core/TablePagination";
import Divider from "@material-ui/core/Divider";


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
  
  //TODO: add HOC on table pagination (jump to start/end)
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