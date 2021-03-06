import React, { Component } from 'react'
// import './SendCoin.css'

import MetaCoin from 'contracts/MetaCoin.sol';
import Web3 from 'web3';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

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
    console.log(`sender: ${this.props.sender[0].account}`)
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
    console.log(event);
    console.log("::::" + name + ":::" + value);
    this.setState({
      [name]: value
    });
  }

   handleChange2 = (event, index, value) => this.setState({recipient:value});


  getChildContext() {
     return { muiTheme: getMuiTheme(baseTheme) };
  }



  renderAccount({
      account, accountName
  }) {
    return <option key={account} value={account}>{accountName}</option>
  }

  renderAccount2({
      account, accountName
  }) {
    return <MenuItem key={account} value={account} primaryText={accountName} />
  }

  render() {
    return (
      <form className='SendCoin'>
        <div>
          <TextField
           defaultValue="Default Value"
           floatingLabelText="Floating Label Text"
         />
         <TextField
          defaultValue="Default Value"
          floatingLabelText="Floating Label Text"
        /><br />

        <SelectField
              floatingLabelText="Recipient Address"
              value={this.state.recipient}
              onChange={this.handleChange2}
            >
            {this.props.sender.map(this.renderAccount2)}
        </SelectField>

          <TextField
           defaultValue="Default Value"
           floatingLabelText="Amount"
         />

        </div>
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

        {/*<FormGroup controlId="recipient_address">
           <ControlLabel>Recipient Address</ControlLabel>
          <FormControl
            type="text"
            name = "recipient"
            value={this.state.recipient}
            onChange={this.handleChange}
            placeholder="Recipient Address"
            />
          </FormGroup>
          */}

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
      </form>
    )
  }
}

export default SendCoin


SendCoin.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
