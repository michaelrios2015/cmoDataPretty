import axios from 'axios';

// cusip,name,indicator,type,issuedate,currface,cfincmo,cfinfed,cfinplat,coupon,gwac,wala,wam,va,pastactcpr,curractualcpr,cprprediction,cprpredictionnext,pastactcdr,curractualcdr,cdrprediction,cdrpredictionnext,date

const LOAD_POOLS = 'LOAD_POOLS';


const loadData = (arr) => {

    function createData ( cusip, name, indicator, type, issuedate, currentface, cfincmo, cfinfed, cfinplat, coupon, gwac, wala, wam, va, pastactcpr, curractualcpr, cprprediction, cprpredictionnext, pastactcdr, curractualcdr, 
                            cdrprediction, cdrpredictionnext, date ) 
    {
        return { 
            cusip, name, indicator, type, issuedate, currentface, cfincmo, cfinfed, cfinplat, coupon, gwac, wala, wam, va, pastactcpr, curractualcpr, cprprediction, cprpredictionnext, pastactcdr, curractualcdr, 
            cdrprediction, cdrpredictionnext, date
                };
    }

    const rows= [];

    console.log(arr[0]);

    try {
        arr.forEach(item => {
            rows.push(createData(item.cusip, item.name, item.indicator, item.type, item.issuedate, item.currentface,  
                item.cfincmo, item.cfinfed, item.cfinplat, item.coupon, item.gwac, item.wala, item.wam, item.va, item.pastactcpr, item.curractualcpr, item.cprprediction, item.cprpredictionnext, 
                item.pastactcdr, item.curractualcdr, item.cdrprediction, item.cdrpredictionnext, item.date))
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

            item.currentface = (item.currentface/1000000).toFixed(1);
            if (item.cfincmo){
                item.cfincmo = (item.cfincmo/1000000).toFixed(1);
            }
            if (item.cfinplat){
                item.cfinplat = (item.cfinplat/1000000).toFixed(1);
            }
            item.cfinfed = (item.cfinfed/1000000).toFixed(1);
            item.pastactcpr = (item.pastactcpr * 100).toFixed(1); 
            item.curractualcpr = (item.curractualcpr * 100).toFixed(1);
            item.cprprediction = (item.cprprediction * 100).toFixed(1);
            item.cprpredictionnext = (item.cprpredictionnext * 100).toFixed(1);
            item.pastactcdr = (item.pastactcdr * 100).toFixed(1); 
            item.curractualcdr = (item.curractualcdr * 100).toFixed(1);
            item.cdrprediction = (item.cdrprediction * 100).toFixed(1);
            item.cdrpredictionnext = (item.cdrpredictionnext * 100).toFixed(1);
            item.issuedate = item.issuedate.toString().slice(0, 4) + item.issuedate.toString().slice(5, 7);
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



