import React, { Component } from 'react'
// import './SendCoin.css'

import MetaCoin from 'contracts/MetaCoin.sol';
import Web3 from 'web3';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
MetaCoin.setProvider(provider);

class JsonForm extends React.Component {
  constructor(props) {
    super(props);
    var jsonobj = [
      {
         from : "0xb722e15cb1343d98dbcea957eea09776031c4cbf",
         to : "0x1e185e3bd9f0c78f679a6803cd4e95a09b4eeb4e",
         amount : 200
      },{
         from : "0xb722e15cb1343d98dbcea957eea09776031c4cbf",
         to : "0x1e185e3bd9f0c78f679a6803cd4e95a09b4eeb4e",
         amount : 100
      },{
         from : "0xb722e15cb1343d98dbcea957eea09776031c4cbf",
         to : "0x1e185e3bd9f0c78f679a6803cd4e95a09b4eeb4e",
         amount : 50
      }
    ];

    var prettyjsonobj = JSON.stringify(jsonobj, undefined, 4);

    this.state = {
      value: prettyjsonobj
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('An essay was submitted: ' + this.state.value);
    var myData = JSON.parse(this.state.value);
    console.log('Json was submitted: ' + myData);
    var meta = MetaCoin.deployed();
    for(var i = 0; i < myData.length; i++) {
        var obj = myData[i];

        console.log(`Recipient Address: ${obj.to}`)
        console.log(`sender: ${obj.from}`)
        meta.sendCoin(obj.to, obj.amount, {from: obj.from}).then(function() {
          alert('SENT');
        }).catch(function(e) {
          console.log(e);
        });
      }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <FormGroup controlId="formControlsTextarea">
           <ControlLabel>Json</ControlLabel>
           <FormControl
              componentClass="textarea"
              placeholder="textarea"
              value={this.state.value}
              rows="10"
              onChange={this.handleChange} />
         </FormGroup>
         <Button type="submit">
          Submit
        </Button>
      </form>
    );
  }
}

export default JsonForm
