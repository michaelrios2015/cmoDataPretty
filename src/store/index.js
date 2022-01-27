import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'
import { ginniesReducer } from './ginnies';
import { graphDataReducer } from './graphData';
import { cmosReducer } from './cmostwo';

// the reducer
const reducer = combineReducers({
    ginnies: ginniesReducer,
    graphData: graphDataReducer,
    cmos: cmosReducer
})

//think this is just a fancy logger but not sure
const middleware = composeWithDevTools(
    applyMiddleware(thunk, createLogger({collapsed: true}))
  )
const store = createStore(reducer, middleware);


export default store;
export * from './cmostwo'
export * from './ginnies'
export * from './graphData'
