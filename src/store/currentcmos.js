import { createStore, combineReducers, applyMiddleware } from 'redux';
import axios from 'axios';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

const LOAD_CURRENT_ROWS = 'LOAD_CURRENT_ROWS';


const currentRowsReducer = (state = [], action) =>{
    if (action.type === LOAD_CURRENT_ROWS){
        state = action.rows
    }

    return state;
}


//TESTS THUNKS****************************************

const _loadCurrentRows = (rows) =>{
    return {
        type: LOAD_CURRENT_ROWS,
        rows
    };
};


export const loadCurrentRows = () =>{
    return async(dispatch)=>{
        const tests = (await axios.get('/api/currentcmos')).data;
        // console.log()
        function createData(id, deal, group, cpr, cprNext, vpr, vprNext, cdr, cdrNext, currFace) {
            return {id, deal, group, cpr, cprNext, vpr, vprNext, cdr, cdrNext, currFace};
          }
        
        const rows= [];
        
        
        tests.forEach(item => {
            // console.log(item.id)
            rows.push(createData(item.id, item.deal, item.group, item.cpr, item.cprNext, item.vpr, item.vprNext, item.cdr, item.cdrNext, item.currFace))
        });

        // console.log(rows); 
        dispatch(_loadCurrentRows(rows));
    }
};


// const loadDataByDealandGroup = (deal, group) =>{
    
//     return async(dispatch)=>{
//         console.log('---------------in loadDataByGroup dispath ----------');
//         const data = (await axios.get(`/api/cmos/dealandgroup/${deal}/${group}`)).data;
//         // console.log(data);
//         function createData(id, deal, group, cpr, cprNext, vpr, vprNext, cdr, cdrNext, currFace, actualCpr, residual) {
//             return {id, deal, group, cpr, cprNext, vpr, vprNext, cdr, cdrNext, currFace, actualCpr, residual };
//           }
        
//         const rows= [];
        
        
//         data.forEach(item => {
//             // console.log(item.residual)
//             rows.push(createData(item.id, item.deal, item.group, item.cpr, item.cprNext, item.vpr, item.vprNext, item.cdr, item.cdrNext, item.currFace, item.actualCpr, item.residual))
//         });
//         dispatch(_loadRows(rows));
//     }
// };

export { currentRowsReducer };