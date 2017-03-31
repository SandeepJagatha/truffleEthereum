import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './App'
import Web3 from 'web3'

import About from './About.js'
import TranscationsContainer from 'components/Transcations/TranscationsContainer'
import JsonForm from 'components/JsonForm/JsonForm'
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

import './index.css'

import truffleConfig from '../truffle.js'

var web3Location = `http://${truffleConfig.rpc.host}:${truffleConfig.rpc.port}`

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
// const store = createStoreWithMiddleware(reducers);

window.addEventListener('load', function() {
  var web3Provided;
  // Supports Metamask and Mist, and other wallets that provide 'web3'.
  if (typeof web3 !== 'undefined') {
    // Use the Mist/wallet provider.
    // eslint-disable-next-line
    web3Provided = new Web3(web3.currentProvider);
  } else {
    web3Provided = new Web3(new Web3.providers.HttpProvider(web3Location))
  }

  ReactDOM.render(
    <Provider  store={createStoreWithMiddleware(reducers)}>
      <Router history={browserHistory}>
        <Route path="/" component={App} web3={web3Provided}/>
        <Route path="/transcations" component={TranscationsContainer} web3={web3Provided}/>
        <Route path="/json" component={JsonForm} web3={web3Provided}/>
        <Route path="/about" component={About}/>
      </Router>
    </Provider>,
    document.getElementById('root')
  )
});
