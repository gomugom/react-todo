const changeEffect = ()=> {
    return dispatch => {
        dispatch({
            type: 'SHOW_EFFECT'
        });
        setTimeout(()=> {
            dispatch({
                type: 'HIDE_EFFECT'
            });
        }, 500);
    }
}

const save = money => {
    return dispatch => {
        dispatch({
            type: 'SAVE_MONEY',
            money
        });
        dispatch(changeEffect());
    }
}
const withdraw = money => {
    return dispatch => {
        dispatch({
            type: 'WITHDRAW_MONEY',
            money
        });
        dispatch(changeEffect());
    }
}

export default {
    save,
    withdraw
}
