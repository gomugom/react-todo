import React, { Component } from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';
import Tabs from './Tabs';
import { connect } from 'react-redux';
import bankAction from '../actions/bankAction';
import tabAction from '../actions/tabAction';

const mapStateToProps = state => ({
    accountList: state.account.accountList,
    focused: state.tab.focused
});
const mapDispatchToProps = dispatch => ({
    calc: (type, money) => dispatch(bankAction[type](money)),
    changeTab: index => dispatch(tabAction.changeTab(index))
});

class App extends Component {
    render() {
        const {
            accountList,
            calc,
            focused,
            changeTab
        } = this.props;
        return (
            <div>
                <Tabs focused={focused} changeTab={changeTab}/>
                <InputBox
                    calc={calc}
                />
                <AccountBook accountList={accountList} />
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
