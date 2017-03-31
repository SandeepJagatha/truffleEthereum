import React, { Component } from 'react'
import './App.css'

import AccountListContainer from 'components/AccountList/AccountListContainer'

import { createStore, combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

const reducers = {
  // ... your other reducers here ...
  form: formReducer     // <---- Mounted at 'form'
}
const reducer = combineReducers(reducers)
const store = createStore(reducer)

class App extends Component {
  render () {
    return (
      <div className="App">
        <AccountListContainer web3={this.props.route.web3} />
      </div>
    )
  }
}

export default App
