import React,{
    Component
} from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'

import MetaCoin from 'contracts/MetaCoin.sol';
import Web3 from 'web3';

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
import Close from 'material-ui/svg-icons/navigation/close';
import Add from 'material-ui/svg-icons/content/add';

import update from 'immutability-helper';

import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';


const provider = new Web3.providers.HttpProvider('http://localhost:8545')
MetaCoin.setProvider(provider);




{/*const renderHobbies = ({ fields, meta: { error } }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push()}>Add Hobby</button>
    </li>
    {fields.map((hobby, index) =>
      <li key={index}>
        <RaisedButton
          icon={<Close />}
          style={style}
          onClick={() => fields.remove(index)}/>
        <Field
          name={hobby}
          type="text"
          component={TextField}
          label={`Hobby #${index + 1}`}/>
      </li>
    )}
    {error && <li className="error">{error}</li>}
  </ul>
)*/}

class FieldArraysForm extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    console.log(props.sender)
  }


  handleFormSubmit(formProps) {
      // Call action creator to sign up the user!
    console.log(formProps);
    
  }

  getChildContext() {
     return { muiTheme: getMuiTheme(baseTheme) };
  }

  renderAccount2({
      account, accountName
  }) {
    return <MenuItem key={account} value={account} primaryText={accountName} />
  }

  render() {

    const style = {
      margin: 12,
    };

    const style1 = {
      verticalAlign: 'bottom',
      marginRight: 30
    };


    const renderRecipients = ({fields, meta: { touched, error } }) => (
     <div>
     {/*<Field
       name="recipientAddress"
       component={SelectField}
       hintText="Recipient Address"
       floatingLabelText="Recipient Address"
       style={style1}>
       {this.props.sender.map(this.renderAccount2)}
     </Field>
    */}

      <span
       style={{verticalAlign: '-webkit-baseline-middle',marginRight: 20}}
       > #0 </span>
    <Field
      name="recipientAddress"
      component={SelectField}
      hintText="Recipient Address"
      floatingLabelText="Recipient Address"
      style={style1}>
      {this.props.sender.map(this.renderAccount2)}
    </Field>
       <Field name="amount"
         component={TextField}
         hintText="Amount"
         floatingLabelText="Amount"
         style={style1} />

         <RaisedButton
           type="button"
           icon={<Add />}
           style={style}
           onClick={() => fields.push({})} />

           {touched && error && <span>{error}</span>}

           {fields.map((recipientObj, index) =>
             <div key={index}>
               <span
                style={{verticalAlign: '-webkit-baseline-middle',marginRight: 20}}
                > #{index + 1}</span>
               <Field
                 name={`${recipientObj}.recipient`}
                 type="text"
                 component={SelectField}
                 style={style1}
                 floatingLabelText="Recipient Address">
                 {this.props.sender.map(this.renderAccount2)}
               </Field>

               <Field
                 name={`${recipientObj}.amount`}
                 type="text"
                 component={TextField}
                 style={style1}
                 floatingLabelText="Amount"/>

                   <RaisedButton
                     icon={<Close />}
                     style={style}
                     onClick={() => fields.remove(index)}/>
               {/*<FieldArray name={`${member}.hobbies`} component={renderHobbies}/>*/}
             </div>
           )}

     </div>
    )



  const { handleSubmit, pristine, reset, submitting } = this.props
  return (
    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

      <FieldArray name="recipients" component={renderRecipients}/>
      <div>
      <br/>
        <RaisedButton label="Submit" primary={true} type="submit" disabled={submitting} style={style} style={{ textAlign: 'center'}}/>
        <RaisedButton label="Clear" disabled={pristine || submitting} onClick={reset} style={style} />
      </div>
    </form>
  )
}
}

export default reduxForm({
  form: 'fieldArrays'
})(FieldArraysForm)

FieldArraysForm.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired,
};
