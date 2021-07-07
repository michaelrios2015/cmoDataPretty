import axios from 'axios';

const LOAD_PLATINUMS = 'LOAD_PLATINUMS';

const loadData = (arr) => {

    function createData
    (cusip, name, indicator, type, issueDate,  maturityDate, originalFace, interestRate, 
         remainingBalance, factor, GWAC, WAM, WALA, originalfaceinplatinum) 
    {
        return { 
            cusip, name, indicator, type, issueDate,  maturityDate, originalFace, interestRate, 
            remainingBalance, factor, GWAC, WAM, WALA, originalfaceinplatinum
                };
    }

    const rows= [];

    console.log(arr[0]);

    try {
  
    arr.forEach(item => {
        rows.push(createData(item.cusip, item.name, item.indicator, item.type, item.issueDate,  
            item.maturityDate, item.originalFace, item.interestrate, item.remainingBalance, item.factor, item.gwac, item.wam, 
            item.wala, item.originalfaceinplatinum))
    });
    }
    catch(err){
        console.log(err)
    }
    return rows;
}

const platinumsReducer = (state = [], action) =>{
    if (action.type === LOAD_PLATINUMS){
        state = action.platinums
    }

    return state;
}

const _loadPlatinums = (platinums) =>{
    return {
        type: LOAD_PLATINUMS,
        platinums
    };
};


export const loadPlatinums = () =>{

    return async(dispatch)=>{
        const tests = (await axios.get(`/api/platinums/`)).data;
        console.log(tests[0]); 
        // so this will work to weed out ones that are null
        // tests.forEach(item => {if (!item.poolbodies[0].poolprediction){
        //     console.log(item)
        // }})
        // tests.forEach(item => {
        //     // item.totalOutstanding = (item.totalOutstanding).toFixed(2);
        //     // item.vpr = (item.vpr * 100).toFixed(1);
        //     // item.vprNext = (item.vprNext * 100).toFixed(1);
        //     // item.cdr = (item.cdr * 100).toFixed(1);
        //     // item.cdrNext = (item.cdrNext * 100).toFixed(1);
        //     item.cpr = (item.cpr * 100).toFixed(1);
        //     item.cprNext = (item.cprNext * 100).toFixed(1);
        //     item.issueDate = item.issueDate.toString().slice(0, 6);
        //     item.currentFace = ((item.originalFace * 1) * (item.factor * 1)).toFixed(2);
        // })
        // console.log(tests[0])    


        dispatch(_loadPlatinums(loadData(tests)));
    }
};


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

export { platinumsReducer };



