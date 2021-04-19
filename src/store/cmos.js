import axios from 'axios';

const LOAD_ROWS = 'LOAD_ROWS';

const rowsReducer = (state = [], action) =>{
    if (action.type === LOAD_ROWS){
        state = action.rows
    }

    return state;
}

const _loadRows = (rows) =>{
    return {
        type: LOAD_ROWS,
        rows
    };
};

// this is just find all. there is a boat load of data and it loads to slowly so not using it at the moment
export const loadRows = () =>{
    return async(dispatch)=>{
        const tests = (await axios.get('/api/cmos')).data;
        // console.log()
        function createData(id, deal, group, cpr, cprNext, vpr, vprNext, cdr, cdrNext, currFace, residual, actualCpr) {
            return {id, deal, group, cpr, cprNext, vpr, vprNext, cdr, cdrNext, currFace, residual, actualCpr };
          }
        
        const rows= [];
        
        
        tests.forEach(item => {
            // console.log(item.id)
            rows.push(createData(item.id, item.deal, item.group, item.cpr, item.cprNext, item.vpr, item.vprNext, item.cdr, item.cdrNext, item.currFace, item.residual, item.actualCpr))
        });

        // console.log(rows); 
        dispatch(_loadRows(rows));
    }
};

// mot using right now was just a way of getting some data out quickly
export const loadInitialRows = () =>{
    return async(dispatch)=>{
        const tests = (await axios.get('/api/cmos/initial')).data;
        // console.log()
        function createData(id, deal, group, cpr, cprNext, vpr, vprNext, cdr, cdrNext, currFace, residual, actualCpr) {
            return {id, deal, group, cpr, cprNext, vpr, vprNext, cdr, cdrNext, currFace, residual, actualCpr };
          }
        
        const rows= [];
        
        
        tests.forEach(item => {
            // console.log(item.id)
            rows.push(createData(item.id, item.deal, item.group, item.cpr, item.cprNext, item.vpr, item.vprNext, item.cdr, item.cdrNext, item.currFace, item.residual, item.actualCpr))
        });

        // console.log(rows); 
        dispatch(_loadRows(rows));
    }
};

export const loadRowsByYear = (year) =>{

    // there
    if(!year){
        year = '2021';
    }

    return async(dispatch)=>{
        const tests = (await axios.get(`/api/cmos/year/${year}`)).data;
        // console.log()
        function createData(id, deal, group, cpr, cprNext, vpr, vprNext, cdr, cdrNext, currFace, residual, actualCpr) {
            return {id, deal, group, cpr, cprNext, vpr, vprNext, cdr, cdrNext, currFace, residual, actualCpr };
          }
        
        const rows= [];
        
        
        tests.forEach(item => {
            // console.log(item.id)
            rows.push(createData(item.id, item.deal, item.group, item.cpr, item.cprNext, item.vpr, item.vprNext, item.cdr, item.cdrNext, item.currFace, item.residual, item.actualCpr))
        });

        // console.log(rows); 
        dispatch(_loadRows(rows));
    }
};


export const loadDataByDealandGroup = (deal, group, year) =>{
    
    return async(dispatch)=>{
        console.log('---------------in loadDataByGroup dispath ----------');
        let data = [];
        if (deal === 'All' && group === 'All'){
            data = (await axios.get(`/api/cmos/year/${year}`)).data;
        }
        else {
            data = (await axios.get(`/api/cmos/dealandgroup/${deal}/${group}`)).data;
        }
        console.log(data);
        function createData(id, deal, group, cpr, cprNext, vpr, vprNext, cdr, cdrNext, currFace, actualCpr, residual) {
            return {id, deal, group, cpr, cprNext, vpr, vprNext, cdr, cdrNext, currFace, actualCpr, residual };
          }
        
        const rows= [];
        
        
        data.forEach(item => {
            // console.log(item.residual)
            rows.push(createData(item.id, item.deal, item.group, item.cpr, item.cprNext, item.vpr, item.vprNext, item.cdr, item.cdrNext, item.currFace, item.actualCpr, item.residual))
        });
        dispatch(_loadRows(rows));
    }
};

export { rowsReducer };