import React, { Component } from 'react'
// import './SendCoin.css'

import MetaCoin from 'contracts/MetaCoin.sol';
import Web3 from 'web3';
import { Form, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
MetaCoin.setProvider(provider);

class SendCoin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recipient: '',
      amount: ''
    };
    this.handleSendMeta = this.handleSendMeta.bind(this)
    this.handleChange = this.handleChange.bind(this);
  }

  handleSendMeta(e) {
    e.preventDefault()
    var meta = MetaCoin.deployed();
    console.log(`Recipient Address: ${this.state.recipient}`)
    console.log(`sender: ${this.props.coinbase}`)
    meta.sendCoin(this.state.recipient, this.state.amount, {from: this.props.coinbase}).then(function() {
      console.log('SENT')
    }).catch(function(e) {
      console.log(e);
    });
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    console.log("::::Main account transcation count::::"+this.props.web3.eth.getTransactionCount(this.props.coinbase));
    var defaultBlock = this.props.web3.eth.defaultBlock;
    console.log("::::defaultBlock :::: "+defaultBlock);
    var sync = this.props.web3.eth.syncing;
    console.log("::::sync :::: "+sync);
    var gasPrice = this.props.web3.eth.gasPrice;
    console.log("::::gasPrice:::"+gasPrice.toString(10));
    var accounts = this.props.web3.eth.accounts;
    console.log(":::::Accounts:::"+accounts);
    console.log("::::" + name + ':::' + value);
    this.setState({
      [name]: value
    });
  }


  renderAccount({
      account, accountName
  }) {
    return <option key={account} value={account}>{accountName}</option>
  }

  render() {
    return (
      <Form className='SendCoin' inline>

        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Recipient Address</ControlLabel>
          <FormControl
              componentClass="select"
              name = "recipient"
              value={this.state.recipient}
              onChange={this.handleChange}
              placeholder="select">
            <option value="select">select</option>
              {this.props.sender.map(this.renderAccount)}
          </FormControl>
        </FormGroup>

          <FormGroup controlId="recipient_address">
            <ControlLabel>Amount</ControlLabel>
            <FormControl
              type="text"
              name = "amount"
              value={this.state.amount}
              onChange={this.handleChange}
              placeholder="Amount"
              />
          </FormGroup>
          <Button type="submit" onClick={this.handleSendMeta}> Submit </Button>
      </Form>
    )
  }
}

export default SendCoin
