const bankReducer = (state = {accountList: []}, action) => {
    switch(action.type) {
        case 'SAVE_MONEY': {
            const money = action.money * 1;
            const prevAccount = state.accountList;
            const lastResult = prevAccount.length ? (prevAccount[prevAccount.length - 1].result) : 0;

            return {
                accountList: [...state.accountList, {
                    type: 'save',
                    money: money,
                    result: lastResult + money
                }]
            };
        }
        case 'WITHDRAW_MONEY': {
            const money = action.money * 1;
            const prevAccount = state.accountList;
            const lastResult = prevAccount.length ? (prevAccount[prevAccount.length - 1].result) : 0;

            return {
                accountList: [...state.accountList, {
                    type: 'withdraw',
                    money: money,
                    result: lastResult - money
                }]
            };
        }
        default: return state;
    }
}

export default bankReducer;
