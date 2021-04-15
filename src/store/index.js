import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'
import { rowsReducer } from './cmos';
import { currentRowsReducer } from './currentcmos';

// the reducer
const reducer = combineReducers({
    rows: rowsReducer,
    currentrows: currentRowsReducer
})

//think this is just a fancy logger but not sure
const middleware = composeWithDevTools(
    applyMiddleware(thunk, createLogger({collapsed: true}))
  )
const store = createStore(reducer, middleware);


export default store;
export * from './cmos'
export * from './currentcmos'

