import axios from 'axios';

const LOAD_POOLS = 'LOAD_POOLS';

const loadData = (arr) => {

    function createData
    (cusip, name, type, indicator, issueDate, maturityDate, originalFace, isTBAElig, interestRate, 
         remainingBalance, factor, GWAC, WAM, WALA) 
    {
        return { 
                cusip, name, type, indicator, issueDate, maturityDate, 
                originalFace, isTBAElig, interestRate,  remainingBalance, factor, GWAC, WAM, WALA 
                };
    }

    const rows= [];

    console.log(arr[0]);

    try {
    arr.forEach(item => {
        rows.push(createData(item.cusip, item.name, item.type, item.indicator, item.issueDate, item.maturityDate, 
            item.originalFace, item.isTBAElig, item.poolbodies[0].interestRate, item.poolbodies[0].remainingBalance,  
            item.poolbodies[0].factor, item.poolbodies[0].GWAC, item.poolbodies[0].WAM, item.poolbodies[0].WALA))
    });
    }
    catch(err){
        console.log(err)
    }
    return rows;
}

const poolsReducer = (state = [], action) =>{
    if (action.type === LOAD_POOLS){
        state = action.pools
    }

    return state;
}

const _loadPools = (pools) =>{
    return {
        type: LOAD_POOLS,
        pools
    };
};


export const loadPools = () =>{

    return async(dispatch)=>{
        const tests = (await axios.get(`/api/pools/`)).data;
        console.log(tests[0]); 
        dispatch(_loadPools(loadData(tests)));
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

export { poolsReducer };



