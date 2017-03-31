import React, {Component} from 'react';
// import { Table } from 'react-bootstrap';
// import './AccountList.css';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class AccountList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fixedHeader: true,
      fixedFooter: false,
      stripedRows: false,
      showRowHover: true,
      selectable: false,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      showCheckboxes: false,
      height: 'auto',
    };
  }

  handleToggle = (event, toggled) => {
    this.setState({
      [event.target.name]: toggled,
    });
  };

  handleChange = (event) => {
    this.setState({height: event.target.value});
  };

    getChildContext() {
       return { muiTheme: getMuiTheme(baseTheme) };
    }

    render() {
        return (
          <Table
            style={{ tableLayout: 'auto' }}
            height={this.state.height}
            fixedHeader={this.state.fixedHeader}
            fixedFooter={this.state.fixedFooter}
            selectable={this.state.selectable}
            multiSelectable={this.state.multiSelectable}
          >
            <TableHeader
              displaySelectAll={this.state.showCheckboxes}
              adjustForCheckbox={this.state.showCheckboxes}
              enableSelectAll={this.state.enableSelectAll}
            >
              <TableRow>
                <TableHeaderColumn colSpan="4" tooltip="Super Header" style={{textAlign: 'center'}}>
                  Admin
                </TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn style={{width: '10%'}} tooltip="Index">#</TableHeaderColumn>
                <TableHeaderColumn style={{width: '50%'}} tooltip="The Account Address">Account</TableHeaderColumn>
                <TableHeaderColumn style={{width: '30%'}} tooltip="The Name"> Name</TableHeaderColumn>
                <TableHeaderColumn style={{width: '10%'}} tooltip="Balance">Balance</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={this.state.showCheckboxes}
              deselectOnClickaway={this.state.deselectOnClickaway}
              showRowHover={this.state.showRowHover}
              stripedRows={this.state.stripedRows}
            >
              {this.props.accounts.map( (row, index) => (
                <TableRow key={index} selected={row.selected}>
                  <TableRowColumn style={{width: '10%'}}>{index}</TableRowColumn>
                  <TableRowColumn style={{width: '50%'}}>{row.account}</TableRowColumn>
                  <TableRowColumn style={{width: '30%'}}>{row.accountName}</TableRowColumn>
                  <TableRowColumn style={{width: '10%'}}>{row.balance.account} TC</TableRowColumn>
                </TableRow>
                ))}

            </TableBody>
        </Table>
    )
}

renderAccount({
    account, balance, accountName
}) {
  return <TableRow key={account}>
                <TableRowColumn>{account}</TableRowColumn>
                <TableRowColumn>{accountName}</TableRowColumn>
                <TableRowColumn>{balance.account}</TableRowColumn>
          </TableRow>
  }
}


export default AccountList

AccountList.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
