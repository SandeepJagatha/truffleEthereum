import React, {Component} from 'react';
import { Table } from 'react-bootstrap';
import './AccountList.css';

class AccountList extends Component {
    render() {
        return (  <Table striped bordered condensed hover>
            < thead >
            < tr > < th > Account < /th><th>Name</th > < th > META < /th></tr >
            < /thead> < tbody > {
            this.props.accounts.map(this.renderAccount)
        } < /tbody> </Table>
    )
}

renderAccount({
    account, balance, accountName
}) {
  return <tr key={account}><td>{account}</td><td>{accountName}</td ><td>{balance.account}</td></tr>
  }
}


export default AccountList
