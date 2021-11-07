import axios from 'axios';


const LOAD_GRAPHDATA = 'LOAD_GRAPHDATA';


const loadData = (arr) => {

    function createData ( coupon, cpr, floatsum, date, actual ) 
    {
        return { 
            coupon, cpr, floatsum, date, actual
                };
    }

    const rows= [];

    console.log(arr[0]);

    try {
        arr.forEach(item => {
            rows.push(createData(item.coupon, item.cpr, item.floatsum, item.date, item.actual))
        });
    }
    catch(err){
        console.log(err)
    }
    return rows;
}

const graphDataReducer = (state = [], action) =>{
    if (action.type === LOAD_GRAPHDATA){
        state = action.graphData
    }

    return state;
}

const _loadGraphData = (graphData) =>{
    return {
        type: LOAD_GRAPHDATA,
        graphData
    };
};


export const loadGraphData = () =>{

    return async(dispatch)=>{
        const data = (await axios.get(`/api/graphdata/`)).data;
        // console.log(tests[0]); 

        dispatch(_loadGraphData(data));
    }
};

export const loadGraphDataByCoupon = (coupon) =>{

    
    return async(dispatch)=>{
        const data = (await axios.get(`/api/graphdata/coupons/${coupon}`)).data;
        // console.log(data); 


        dispatch(_loadGraphData(data));
    }
};

// export const loadG1sByCoupon = (coupon) =>{

//     console.log(coupon);

//     return async(dispatch)=>{
//         const tests = (await axios.get(`/api/g1s/coupons/${coupon}`)).data;
//         // console.log(tests[0]); 
//         formatData(tests)

//         dispatch(_loadG1s(loadData(tests)));
//     }
       
// };



export { graphDataReducer };



