import axios from 'axios';

const LOAD_CMOS = 'LOAD_CMOS';


const formatData = (arr) => {

    // console.log(arr);

    arr.forEach(item => {

        let cmo =  item.cmo.split("-");
        // item.year = item.cmo.split(/\s-\s(.*)/g);   
        
        // console.log(cmo);

        item.year = cmo[0];
        
        item.deal = cmo[1];

        item.group = cmo[2];

        item.currface = (item.currface/1000000).toFixed(1);

        item.coupon = item.coupon.toFixed(1);

        item.cpr = (item.cpr * 100).toFixed(1);

        item.pastcpr = (item.pastcpr * 100).toFixed(1);

        item.twomonthspastcpr = (item.twomonthspastcpr * 100).toFixed(1);

        item.resid = (item.resid * 100).toFixed(1);
        
        item.pastresid = (item.pastresid * 100).toFixed(1);

        item.twomonthspastresid = (item.twomonthspastresid * 100).toFixed(1);

        item.predictedcpr = (item.predictedcpr * 100).toFixed(1);

        item.predictedcprnext = (item.predictedcprnext * 100).toFixed(1);

        item.cdr = (item.cdr * 100).toFixed(1);

        item.predictedcdr = (item.predictedcdr * 100).toFixed(1);

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
        
        console.log(tests[0])
        formatData(tests) 
        
        dispatch(_loadCMOS(tests));
    }
};


export const loadCMOSYearDealGroup = ( year, deal, group, coupon ) =>{


    return async(dispatch)=>{
        const tests = (await axios.get(`/api/cmostwo/yeardealgroup/${year}/${deal}/${group}/${coupon}`)).data;
        
        formatData(tests) 
        console.log(tests)
        dispatch(_loadCMOS(tests));
    }
};



export { cmosReducer };



