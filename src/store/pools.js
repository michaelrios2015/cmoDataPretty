import axios from 'axios';

// cusip,name,issuedate,currface,cfincmo,cfinfed,cfinplat,coupon,gwac,wala,wam,va,cprprediction,cprpredictionnext,date

const LOAD_POOLS = 'LOAD_POOLS';


const loadData = (arr) => {

    function createData (cusip, name, issuedate, currentface, cfincmo, cfinfed, cfinplat, coupon, gwac, wala, wam, va, cprprediction, cprpredictionnext, date) 
    {
        return { 
            cusip, name, issuedate, currentface, cfincmo, cfinfed, cfinplat, coupon, gwac, wala, wam, va, cprprediction, cprpredictionnext, date
                };
    }

    const rows= [];

    console.log(arr[0]);

    try {
        arr.forEach(item => {
            rows.push(createData(item.cusip, item.name, item.issuedate, item.currentface,  
                item.cfincmo, item.cfinfed, item.cfinplat, item.coupon, item.gwac, item.wala, item.wam, item.va, item.cprprediction, item.cprpredictionnext, item.date))
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
        // so this will work to weed out ones that are null
        // tests.forEach(item => {if (!item.poolbodies[0].poolprediction){
        //     console.log(item)
        // }})
        tests.forEach(item => {

            item.currentface = item.currentface.toFixed(2);
            if (item.cfincmo){
                item.cfincmo = item.cfincmo.toFixed(2)
            }
            if (item.cfinplat){
                item.cfinplat = item.cfinplat.toFixed(2)
            }
            item.cprprediction = (item.cprprediction * 100).toFixed(1);
            item.cprpredictionnext = (item.cprpredictionnext * 100).toFixed(1);
            item.issuedate = item.issuedate.toString().slice(0, 4) + '/'  + item.issuedate.toString().slice(5, 7);
        })
        console.log(tests[0])    


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



