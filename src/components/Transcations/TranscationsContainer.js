import React, {
    Component
}
from 'react'
import AccountList from 'components/AccountList/AccountList'
import SendCoin from 'components/Transcations/SendCoin'
import JsonForm from 'components/JsonForm/JsonForm'

import MetaCoin from 'contracts/MetaCoin.sol';
import Web3 from 'web3';

import { Grid, Row, Col } from 'react-bootstrap';

const provider = new Web3.providers.HttpProvider('http://localhost:8545')
MetaCoin.setProvider(provider);

class AccountListContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            accounts: [],
            coinbase: '',
            expectMainAcc : []
        }

        this._getAccountBalance = this._getAccountBalance.bind(this)
        this._getAccountBalances = this._getAccountBalances.bind(this)
    }

    _getAccountBalance(account) {
        var meta = MetaCoin.deployed()
        return new Promise((resolve, reject) => {
            meta.getBalance.call(account, {
                from: account
            }).then(function (value) {
                resolve({
                    account: value.valueOf()
                })
            }).catch(function (e) {
                console.log(e)
                reject()
            })
        })
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

            console.log(":::::::::Accounts :::::::::::");
            console.log(accs);
            this.setState({
                coinbase: accs[0]
            })

            var i = 0;
            var accountsAndBalances = accs.map((account) => {
                var accountName = "User" + i++;
                return this._getAccountBalance(account).then((balance) => {
                    return {
                        account, balance, accountName
                    }
                })
            })

            var accountsclone = [];
            Promise.all(accountsAndBalances).then((accountsAndBalances) => {
                console.log("::::: accountsAndBalances ::::::");
                console.log(accountsAndBalances);
                accountsAndBalances[0].accountName = "Main Account";
                accountsclone = accountsAndBalances.slice();
                accountsclone.shift();
                this.setState({
                    accounts: accountsAndBalances,
                    expectMainAcc: accountsclone,
                    coinbaseAccount: accountsAndBalances[0]
                })
            })
        }.bind(this))
    }

    componentDidMount() {
        const refreshBalances = () => {
            this._getAccountBalances()
        }

        refreshBalances()

        // setInterval(() => {
        //     refreshBalances();
        //     return refreshBalances
        // }, 10000)
    }

    render() {
        return (
          <Grid>
              <Row className="show-grid">
                <Col xs={12} md={12}>
                  < AccountList accounts = {
                      this.state.accounts
                  }
                  />
                </Col>
                {/*<Col xs={12} md={12}>
                  < SendCoin sender = { this.state.expectMainAcc  }
                    coinbase = {this.state.coinbase}
                    web3 = {this.props.route.web3}
                  />
                </Col>*/}
              </Row>
        </Grid>
    )
}
}

export default AccountListContainer
