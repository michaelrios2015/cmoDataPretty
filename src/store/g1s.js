import axios from 'axios';

// cusip,name,indicator,type,issuedate,currface,cfincmo,cfinfed,cfinplat,coupon,gwac,wala,wam,va,pastactcpr,curractualcpr,cprprediction,cprpredictionnext,pastactcdr,curractualcdr,cdrprediction,cdrpredictionnext,date

const LOAD_G1S = 'LOAD_G1S';


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

const formatData = (arr) => {

    arr.forEach(item => {

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
        if (item.curractualcpr * 1 === -0){
            item.curractualcpr = Math.abs(item.curractualcpr * 1);
            console.log(item.curractualcpr)
        }
        item.cprprediction = (item.cprprediction * 100).toFixed(1);
        item.cprpredictionnext = (item.cprpredictionnext * 100).toFixed(1);
        item.pastactcdr = (item.pastactcdr * 100).toFixed(1); 
        item.curractualcdr = (item.curractualcdr * 100).toFixed(1);
        item.cdrprediction = (item.cdrprediction * 100).toFixed(1);
        item.cdrpredictionnext = (item.cdrpredictionnext * 100).toFixed(1);
        item.issuedate = item.issuedate.toString().slice(0, 4) + item.issuedate.toString().slice(5, 7);
    })

}

const g1sReducer = (state = [], action) =>{
    if (action.type === LOAD_G1S){
        state = action.g1s
    }

    return state;
}

const _loadG1s = (g1s) =>{
    return {
        type: LOAD_G1S,
        g1s
    };
};


export const loadG1s = () =>{

    return async(dispatch)=>{
        const tests = (await axios.get(`/api/g1s/`)).data;
        // console.log(tests[0]); 

        formatData(tests)

        dispatch(_loadG1s(loadData(tests)));
    }
};


export const loadG1sByCoupon = (coupon) =>{

    console.log(coupon);

    return async(dispatch)=>{
        const tests = (await axios.get(`/api/g1s/coupons/${coupon}`)).data;
        // console.log(tests[0]); 
        formatData(tests)

        dispatch(_loadG1s(loadData(tests)));
    }
       
};

export const loadG1ByFloats = (float) =>{

    console.log(float);

    return async(dispatch)=>{
        const tests = (await axios.get(`/api/g1s/floats/${float}`)).data;
        // console.log(tests[0]); 
        formatData(tests)
        // console.log(tests[0])    

        dispatch(_loadG1s(loadData(tests)));
    }
       
};


export const loadG1sByCouponsAndFloats = (coupon, float) =>{

    // console.log("IN COUPONS AND FLOATS");
    // console.log(float);

    return async(dispatch)=>{
        const tests = (await axios.get(`/api/g1s/couponsandfloats/${coupon}/${float}`)).data;
        // console.log(tests[0]); 

        formatData(tests)
        // console.log(tests[0])    


        dispatch(_loadG1s(loadData(tests)));
    }
       
};


export { g1sReducer };



