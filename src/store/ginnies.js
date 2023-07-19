import axios from 'axios';

// cusip,name,indicator,type,issuedate,currface,cfincmo,cfinfed,cfinplat,coupon,gwac,wala,wam,va,pastactcpr,curractualcpr,cprprediction,cprpredictionnext,pastactcdr,curractualcdr,cdrprediction,cdrpredictionnext,date

const LOAD_GINNIES = 'LOAD_GINNIES';


const formatData = (arr) => {

    const cprs = ['curractualcprnext', 'curractualcpr', 'pastactcpr', 'twomonthspastactcpr', 'va']
        

    arr.forEach(item => {

        item.issuedate = item.issuedate.toString().slice(0, 4) + item.issuedate.toString().slice(5, 7);
        
        item.currentface = (item.currentface/1000000).toFixed(1);
        
        item.cfincmo = (item.cfincmo/1000000).toFixed(1);
        
        item.cfinplat = (item.cfinplat/1000000).toFixed(1);
        
        item.cfinfed = (item.cfinfed/1000000).toFixed(1);

        if (item.va != null){
        
            item.va = (item.va * 100).toFixed(0);
        
        }
        
        if (item.twomonthspastactcpr != null){
        
            item.twomonthspastactcpr = (item.twomonthspastactcpr * 100).toFixed(1);
        
        }

        if (item.pastactcpr != null){
        
            item.pastactcpr = (item.pastactcpr * 100).toFixed(1); 
        }

        if (item.curractualcpr != null){
        
            item.curractualcpr = (item.curractualcpr * 100).toFixed(1);
        }
      
        if (item.curractualcprnext != null){

            item.curractualcprnext = (item.curractualcprnext  * 100).toFixed(1);
        }

        item.cprtwomontspastprediction = (item.cprtwomontspastprediction * 100).toFixed(1);

        item.cprpastprediction = (item.cprpastprediction * 100).toFixed(1);

        item.cprprediction = (item.cprprediction * 100).toFixed(1);
        
        item.cprfutureprediction = (item.cprfutureprediction * 100).toFixed(1);

        item.cprfuturepredictionnext = (item.cprfuturepredictionnext * 100).toFixed(1);
        
        item.curractualcdr = (item.curractualcdr * 100).toFixed(1);
        
        item.curractualcdrnext = (item.curractualcdrnext * 100).toFixed(1);

        item.currcdrprediction = (item.currcdrprediction * 100).toFixed(1);
        
        item.cdrfuturepediction = (item.cdrfuturepediction * 100).toFixed(1);
        // console.log(item.cdrfuturepediction);
        
        // so I used this to convert my 0 to blank.. but we are now changing that 
        
        console.log(cprs)
        for (const property in item) {
            if (item[property] == 0 || item[property] == -0){
                item[property] = 0;
                // console.log(`${property}: ${item[property]}`);
            }    
        }


        for (const property in item) {
            if (item[property] == 0 && !cprs.includes(property)){
                // item[property] = 0;
                item[property] = '';
                console.log(`${property}: ${item[property]}`);
            }    
        }
    
    
    })

}

// is this just always listening???
const ginniesReducer = (state = [], action) =>{
    console.log(action)
    if (action.type === LOAD_GINNIES){
        state = action.ginnies
    }

    return state;
}

const _loadGinnies = (ginnies) =>{
    return {
        type: LOAD_GINNIES,
        ginnies
    };
};


export const loadGinnies = () =>{

    return async(dispatch)=>{
        const tests = (await axios.get(`/api/ginnies/`)).data;

        // console.log(tests[0]); 

        formatData(tests)

        dispatch(_loadGinnies(tests));
    }
};


export const loadGinniesByCoupon = (coupon, indicator) =>{

    console.log(coupon);

    return async(dispatch)=>{
        const tests = (await axios.get(`/api/ginnies/coupons/${coupon}/${indicator}`)).data;
        console.log('tests'); 
        console.log(tests); 
        formatData(tests)
        console.log(tests); 

        // dispatch(_loadGinnies(loadData(tests)));
        dispatch(_loadGinnies(tests));
    }
       
};

export const loadGinniesByFloats = (float, indicator) =>{

    console.log(float);

    return async(dispatch)=>{
        const tests = (await axios.get(`/api/ginnies/floats/${float}/${indicator}`)).data;
        // console.log(tests[0]); 
        formatData(tests)
        // console.log(tests[0])    

        dispatch(_loadGinnies(tests));
    }
       
};


export const loadGinniesByCouponsAndFloats = (coupon, float, indicator) =>{

    console.log("IN COUPONS AND FLOATS");
    // console.log(float);

    return async(dispatch)=>{
        const tests = (await axios.get(`/api/ginnies/couponsandfloats/${coupon}/${float}/${indicator}`)).data;
        // console.log(tests[0]); 

        formatData(tests)
        // console.log(tests[0])    


        // dispatch(_loadGinnies(loadData(tests)));
        dispatch(_loadGinnies(tests));
    }
       
};


export { ginniesReducer };



