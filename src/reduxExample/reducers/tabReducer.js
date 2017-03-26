const bankReducer = (state = {focused: 0}, action) => {
    switch(action.type) {
        case 'CHANGE_TAB':
            return {
                focused: action.focused
            }
        default: return state;
    }
}

export default bankReducer;
