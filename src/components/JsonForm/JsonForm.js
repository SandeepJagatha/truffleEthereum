import React, { Component } from 'react'
// import './SendCoin.css'

import MetaCoin from 'contracts/MetaCoin.sol';
import Web3 from 'web3';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
MetaCoin.setProvider(provider);

class JsonForm extends React.Component {
  constructor(props) {
    super(props);
    // var jsonobj = [
    //   {
    //      from : "0xb722e15cb1343d98dbcea957eea09776031c4cbf",
    //      to : "0x1e185e3bd9f0c78f679a6803cd4e95a09b4eeb4e",
    //      amount : 200
    //   },{
    //      from : "0xb722e15cb1343d98dbcea957eea09776031c4cbf",
    //      to : "0x1e185e3bd9f0c78f679a6803cd4e95a09b4eeb4e",
    //      amount : 100
    //   },{
    //      from : "0xb722e15cb1343d98dbcea957eea09776031c4cbf",
    //      to : "0x1e185e3bd9f0c78f679a6803cd4e95a09b4eeb4e",
    //      amount : 50
    //   }
    // ];
    //
    // var prettyjsonobj = JSON.stringify(jsonobj, undefined, 4);

    this.state = {
      prettyjson: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  _getAccountBalances() {
      this.props.route.web3.eth.getAccounts(function (err, accs) {
          if (err != null) {
              window.alert('There was an error fetching your accounts.')
              console.error(err)
              return
          }

          if (accs.length === 0) {
              window.alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.")
              return
          }

          var jsonobj = [];
          var accountsclone = [];

          accountsclone = accs.slice();
          accountsclone.shift();
          for (let account of accountsclone) {
            jsonobj.push({"from":accs[0], "to":account, "amount": 0 });
          }

          var prettyjsonobj = JSON.stringify(jsonobj, undefined, 4);

          this.setState({
            prettyjson: prettyjsonobj
          });

          console.log(":::::::::prettyjsonobj :::::::::::");
          console.log(prettyjsonobj);

      }.bind(this))
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('An essay was submitted: ' + this.prettyjson.value);
    var myData = JSON.parse(this.prettyjson.value);
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

  componentDidMount() {
      const refreshBalances = () => {
          this._getAccountBalances()
      }
      refreshBalances();
  }

  render() {
    return (
      <Grid>
          <Row className="show-grid">
            <Col xs={12} md={12}>
              <form onSubmit={this.handleSubmit}>
                <FormGroup controlId="formControlsTextarea">
                   <ControlLabel>Json</ControlLabel>
                   <FormControl
                      componentClass="textarea"
                      placeholder="textarea"
                      value={this.state.prettyjson}
                      rows="40"
                      onChange={this.handleChange} />
                 </FormGroup>
                 <Button type="submit">
                  Submit
                </Button>
              </form>
            </Col>
          </Row>
    </Grid>
    );
  }
}

export default JsonForm
