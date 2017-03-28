import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import bankReducer from './reducers/bankReducer';
import tabReducer from './reducers/tabReducer';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';

const logger = createLogger({
    collapsed: true,
    diff: true
});

const store = createStore(
    combineReducers({
        account: bankReducer,
        tab: tabReducer
    }),
    compose(
        applyMiddleware(thunk, logger),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;
