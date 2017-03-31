import React, { Component } from 'react'
// import './SendCoin.css'

import MetaCoin from 'contracts/MetaCoin.sol';
import Web3 from 'web3';

import { Field, reduxForm } from 'redux-form'
import { RadioButton } from 'material-ui/RadioButton'
import MenuItem from 'material-ui/MenuItem'
import { AutoComplete as MUIAutoComplete } from 'material-ui'
import RaisedButton from 'material-ui/RaisedButton';
import {
  AutoComplete,
  Checkbox,
  DatePicker,
  TimePicker,
  RadioButtonGroup,
  SelectField,
  Slider,
  TextField,
  Toggle
} from 'redux-form-material-ui'

import update from 'immutability-helper';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
MetaCoin.setProvider(provider);


// validation functions
const required = value => value == null ? 'Required' : undefined



class SendCoin0 extends React.Component {


  constructor(props) {
    super(props)
    console.log(props)
    console.log(props.sender)
    this.state = {
      recipient: '',
      amount: '',
      inputs: [
        {
          recipient: '',
          amount: ''
        }
      ]
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
 handleChange3 = (event, index, value) => this.setState({amount:value});


 handleSignupFormSubmit() {
     // Call action creator to sign up the user!
   console.log(this.state);
 }

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
  const { handleSubmit, pristine, reset, submitting } = this.props
  const style = {
    margin: 12,
  };
  return (

    <form onSubmit={handleSubmit(this.handleSignupFormSubmit.bind(this))}>


       <div>

           <Field
             name="recipientAddress"
             component={SelectField}
             hintText="Recipient Address"
             floatingLabelText="Recipient Address"
             onChange={this.handleChange2}
             validate={required}
             style={{verticalAlign: 'bottom', marginRight: 30 }}>
             {this.props.sender.map(this.renderAccount2)}
           </Field>


           <Field name="amount"
             component={TextField}
             hintText="Amount"
             floatingLabelText="Amount"
             validate={required}
             style={{marginRight: 30 }}
             onChange={this.handleChange3}>
             </Field>
                  <RaisedButton label="+" onClick={ () => this.appendInput() } />

         {this.state.inputs.map((row,index) =>
            <div  key={index}>
               <Field
                 name={row.recipient}
                 component={SelectField}
                 hintText="Recipient Address"
                 floatingLabelText="Recipient Address"
                 validate={required}
                 style={{verticalAlign: 'bottom', marginRight: 30 }}>
                 {this.props.sender.map(this.renderAccount2)}
               </Field>

               <Field
                 name={row.amount}
                 component={TextField}
                 hintText="Amount"
                 floatingLabelText="Amount"
                 validate={required}
                 style={{marginRight: 30 }}>
                 </Field>
                <RaisedButton label="-" onClick={ () => this.removeInput(index, this) } />
            </div>
       )}
       </div>

       <div>
         <RaisedButton label="Submit" primary={true} type="submit" disabled={submitting} style={style}/>
         <RaisedButton label="Clear"  onClick={reset} style={style} />
       </div>
     </form>
  )
}

    appendInput() {
        {/*var newInput = `input-${this.state.inputs.length}`;*/}
        var newInput = {recipient: '', amount: ''};
        this.setState({ inputs: this.state.inputs.concat([newInput]) });
    }

    removeInput(index, e){
      alert(index);
      console.log(e);
      this.setState({
        inputs: update(this.state.inputs, {$splice: [[index, 1]]})
      })
    }


}

export default reduxForm({
  form: 'SendCoin0',  // a unique identifier for this form
  initialValues: {
  }
})(SendCoin0)


SendCoin0.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};




{/*

class SendCoin0 extends Component {
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

export default SendCoin0


SendCoin0.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};*/}
