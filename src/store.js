import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const LOAD_DATA = 'LOAD_DATA';
const LOAD_ROWS = 'LOAD_ROWS';


//segment of real data ************************
const dataReducer = (state = [], action) =>{
    if (action.type === LOAD_DATA){
        state = action.data
    }

    return state;
}

//This is because i needed a place to load the rows for the 
const rowsReducer = (state = [], action) =>{
    if (action.type === LOAD_ROWS){
        state = action.rows
    }

    return state;
}

// the reducer
const reducer = combineReducers({
    rows: rowsReducer,
    data: dataReducer
})



const store = createStore(reducer, applyMiddleware(thunk, logger));


//TESTS THUNKS****************************************


const _loadData = (data) =>{
    return {
        type: LOAD_DATA,
        data
    };
};

const loadData = () =>{
    return async(dispatch)=>{
        const data = (await axios.get('/api/cmos')).data;
        dispatch(_loadData(data));
    }
};

const _loadRows = (rows) =>{
    return {
        type: LOAD_ROWS,
        rows
    };
};


const loadRows = () =>{
    return async(dispatch)=>{
        const tests = (await axios.get('/api/cmos-rows')).data;
        // console.log()
        function createData(id, group, deal, cpr, cprNext, vpr, vprNext, cdr, cdrNext, currFace) {
            return { id, group, deal, cpr, cprNext, vpr, vprNext, cdr, cdrNext, currFace };
          }
        
        const rows= [];
        
        
        tests.forEach(item => {
            // console.log(item.id)
            rows.push(createData(item.id, item.group, item.deal, item.cpr, item.cprNext, item.vpr, item.vprNext, item.cdr, item.cdrNext, item.currFace))
        });

        // console.log(rows); 
        dispatch(_loadRows(rows));
    }
};

export default store;
export { loadData, loadRows };