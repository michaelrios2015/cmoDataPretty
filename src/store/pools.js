import axios from 'axios';

// cusip,name,indicator,type,issuedate,currface,cfincmo,cfinfed,cfinplat,coupon,gwac,wala,wam,va,pastactcpr,curractualcpr,cprprediction,cprpredictionnext,pastactcdr,curractualcdr,cdrprediction,cdrpredictionnext,date

const LOAD_POOLS = 'LOAD_POOLS';


const loadData = (arr) => {

    function createData ( cusip, name, indicator, type, issuedate, currentface, cfincmo, cfinfed, cfinplat, coupon, gwac, wala, wam, va, 
                            pastactcpr, curractualcpr, curractualcprnext, cprpastprediction, cprprediction, cprfutureprediction, cprfuturepredictionnext, curractualcdr, 
                            currcdrprediction, cdrfutureprediction, date ) 
    {
        return { 
                    cusip, name, indicator, type, issuedate, currentface, cfincmo, cfinfed, cfinplat, coupon, gwac, wala, wam, va, 
                    pastactcpr, curractualcpr, curractualcprnext, cprpastprediction, cprprediction, cprfutureprediction, cprfuturepredictionnext, 
                    curractualcdr, currcdrprediction, cdrfutureprediction, date
                };
    }

    const rows= [];

    console.log(arr[0]);

    try {
        arr.forEach(item => {
            rows.push(createData(item.cusip, item.name, item.indicator, item.type, item.issuedate, item.currentface,  
                item.cfincmo, item.cfinfed, item.cfinplat, item.coupon, item.gwac, item.wala, item.wam, item.va, 
                item.pastactcpr, item.curractualcpr, item.curractualcprnext, item.cprpastprediction, item.cprprediction, item.cprfutureprediction, item.cprfuturepredictionnext, 
                item.curractualcdr, item.currcdrprediction, item.cdrfutureprediction, item.date))
        });
    }
    catch(err){
        console.log(err)
    }
    return rows;
}

const formatData = (arr) => {

    arr.forEach(item => {

        item.currentface = (item.currentface/1000000).toFixed(1);
        
        item.cfincmo = (item.cfincmo/1000000).toFixed(1);
        
        item.cfinplat = (item.cfinplat/1000000).toFixed(1);
        
        item.cfinfed = (item.cfinfed/1000000).toFixed(1);
        
        item.pastactcpr = (item.pastactcpr * 100).toFixed(1); 
        
        item.curractualcpr = (item.curractualcpr * 100).toFixed(1);
        
        item.curractualcprnext = (item.curractualcprnext  * 100).toFixed(1);

        item.cprpastprediction = (item.cprpastprediction * 100).toFixed(1);

        item.cprprediction = (item.cprprediction * 100).toFixed(1);
        
        item.cprfutureprediction = (item.cprfutureprediction * 100).toFixed(1);

        item.cprfuturepredictionnext = (item.cprfuturepredictionnext * 100).toFixed(1);
        
        item.curractualcdr = (item.curractualcdr * 100).toFixed(1);
        
        item.currcdrprediction = (item.currcdrprediction * 100).toFixed(1);
        
        item.cdrfutureprediction = (item.cdrfutureprediction * 100).toFixed(1);
        
        item.issuedate = item.issuedate.toString().slice(0, 4) + item.issuedate.toString().slice(5, 7);
        
        item.va = (item.va * 100).toFixed(0);
        
        for (const property in item) {
            if (item[property] * 1  == 0 || item[property] * 1 == -0){
                item[property] = '';
                // console.log(`${property}: ${item[property]}`);
            }    
        }
    
    
    })

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

        // console.log(tests[0]); 

        formatData(tests)

        dispatch(_loadPools(loadData(tests)));
    }
};


export const loadPoolsByCoupon = (coupon) =>{

    console.log(coupon);

    return async(dispatch)=>{
        const tests = (await axios.get(`/api/pools/coupons/${coupon}`)).data;
        console.log('tests[0]'); 
        console.log(tests[0]); 
        formatData(tests)

        dispatch(_loadPools(loadData(tests)));
    }
       
};

export const loadPoolsByFloats = (float) =>{

    console.log(float);

    return async(dispatch)=>{
        const tests = (await axios.get(`/api/pools/floats/${float}`)).data;
        // console.log(tests[0]); 
        formatData(tests)
        // console.log(tests[0])    

        dispatch(_loadPools(loadData(tests)));
    }
       
};


export const loadPoolsByCouponsAndFloats = (coupon, float) =>{

    // console.log("IN COUPONS AND FLOATS");
    // console.log(float);

    return async(dispatch)=>{
        const tests = (await axios.get(`/api/pools/couponsandfloats/${coupon}/${float}`)).data;
        // console.log(tests[0]); 

        formatData(tests)
        // console.log(tests[0])    


        dispatch(_loadPools(loadData(tests)));
    }
       
};


export { poolsReducer };



