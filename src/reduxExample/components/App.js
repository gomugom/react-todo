import React, { Component } from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';
import { connect } from 'react-redux';
import bankAction from '../actions/bankAction';

const mapStateToProps = state => ({
    accountList: state.accountList
});
const mapDispatchToProps = dispatch => ({
    calc: (type, money) => dispatch(bankAction[type](money))
});

class App extends Component {
    calc(type, money) {
        money = money * 1;
        if(typeof money !== 'number') {
            return;
        }
        const prevAccount = this.state.accountList;
        const lastResult = prevAccount.length ? (prevAccount[prevAccount.length - 1].result) : 0;
        this.setState({
            accountList: [...this.state.accountList, {
                type: 'save',
                money,
                result: lastResult + (type === 'save' ? 1 : -1) * money
            }]
        });
    }
    render() {
        const {
            accountList,
            calc
        } = this.props;
        return (
            <div>
                <InputBox
                    calc={calc}
                />
                <AccountBook accountList={accountList} />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
