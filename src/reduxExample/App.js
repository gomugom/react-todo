import React, { Component } from 'react';
import InputBox from './InputBox';
import AccountBook from './AccountBook';

class App extends Component {
    constructor() {
        super();
        this.state = {
            accountList : []
        }
    }
    calc(type, money) {
        money = money * 1;
        if(typeof money !== 'number') return;
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
        return (
            <div>
                <InputBox
                    calc={(type, money) => this.calc(type, money)}
                />
                <AccountBook accountList={this.state.accountList} />
            </div>
        )
    }
}

export default App;
