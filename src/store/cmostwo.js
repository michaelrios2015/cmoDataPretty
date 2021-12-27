import axios from 'axios';

const LOAD_CMOS = 'LOAD_CMOS';

// const loadData = (arr) => {

//     function createData(id, year, deal, group, cpr, cprNext, vpr, vprNext, cdr, cdrNext, currFace, residual, actualCpr) {
//         return {id, year, deal, group, cpr, cprNext, vpr, vprNext, cdr, cdrNext, currFace, residual, actualCpr };
//     }

//     const rows= [];

//     arr.forEach(item => {
//         rows.push(createData(item.id, item.year, item.deal, item.group, item.cmobodies[0].cpr, item.cmobodies[0].cprNext, item.cmobodies[0].vpr, item.cmobodies[0].vprNext, item.cmobodies[0].cdr, 
//         item.cmobodies[0].cdrNext, item.cmobodies[0].currFace, item.cmobodies[0].residual, item.cmobodies[0].actualCpr))
//     });

//     return rows;
// }


const formatData = (arr) => {

    console.log(arr);

    arr.forEach(item => {

        let cmo =  item.cmo.split("-");
        // item.year = item.cmo.split(/\s-\s(.*)/g);   
        
        console.log(cmo);

        item.year = cmo[0];
        
        item.deal = cmo[1];

        item.group = cmo[2];

        item.currface = (item.currface/1000000).toFixed(1);

        
        item.cpr = (item.cpr * 100).toFixed(1);

        item.resid = (item.resid * 100).toFixed(1);
        
        item.predictedcpr = (item.predictedcpr * 100).toFixed(1);

        item.predictedcprnext = (item.predictedcprnext * 100).toFixed(1);

        for (const property in item) {
            if (item[property] * 1  == 0 || item[property] * 1 == -0){
                item[property] = '';
                // console.log(`${property}: ${item[property]}`);
            }    
        }
    
    
    })

}



const cmosReducer = (state = [], action) =>{
    if (action.type === LOAD_CMOS){
        state = action.cmos
    }

    return state;
}

const _loadCMOS = (cmos) =>{
    return {
        type: LOAD_CMOS,
        cmos
    };
};

export const loadCMOS = ( ) =>{

    return async(dispatch)=>{
        const tests = (await axios.get(`/api/cmostwo`)).data;
        
        formatData(tests) 
        console.log(tests)
        dispatch(_loadCMOS(tests));
    }
};


export const loadCMOSYearDealGroup = ( year, deal, group ) =>{

    // let yeardealgroup = '';

    // if (deal === 'All' && group === 'All'){
    //     yeardealgroup = `${year}%`
    // }
    // else if (group === 'All'){
    //     yeardealgroup = `${year}-${deal}-%`
    // }
    // else if (deal === 'All'){
    //     yeardealgroup = `${year}-%-${group}`
    // }
    // else {
    //     yeardealgroup = `${year}-${deal}-${group}`
    // }

    return async(dispatch)=>{
        const tests = (await axios.get(`/api/cmostwo/yeardealgroup/${year}/${deal}/${group}`)).data;
        
        formatData(tests) 
        console.log(tests)
        dispatch(_loadCMOS(tests));
    }
};


// export const loadRowsByYear = (year, month) =>{

//     // there
//     if(!year){
//         year = '2021';
//     }
//     if(!month){
//         month = 'FEB';
//     }

//     console.log(month);

//     return async(dispatch)=>{
//         const tests = (await axios.get(`/api/cmos/year/${year}/${month}`)).data;
//         // console.log(tests) 
//         dispatch(_loadRows(loadData(tests)));
//     }
// };


// export const loadDataByDealandGroup = (deal, group, year, month) =>{
    
//     console.log(month);
//     return async(dispatch)=>{
//         console.log('---------------in loadDataByGroup dispath ----------');
//         let data = [];
//         if (deal === 'All' && group === 'All'){
//             data = (await axios.get(`/api/cmos/year/${year}/${month}`)).data;
//         }
//         else {
//             data = (await axios.get(`/api/cmos/dealandgroup/${deal}/${group}/${year}/${month}`)).data;
//         }
//         console.log(data);
//         dispatch(_loadRows(loadData(data)));
//     }
// };

export { cmosReducer };



