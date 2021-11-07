import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { connect } from 'react-redux';
// import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { loadGraphData, loadGraphDataByCoupon } from '../store';

const state = {
  labels: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', ' 50', '55', '60', '65', '70', '75', '80', '85' , '90' , '95'],
  datasets: [
    {
      label: 'G2 Pools, Actual CPR',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: []
    }
    ,
    {
      label: 'G2 Pools, Predicted CPR',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      // line color
      borderColor: "#80b6f4",
      borderWidth: 2,
      data: [] 
    }, 
  

  ]
}
 


//rows are now created in store :) 
function Graph({ graphData, loadGraphData, loadGraphDataByCoupon}) {
  const [searchA, setSearchA ] = useState('');
  const [searchB, setSearchB ] = useState('');
  // const [searchYear, setSearchYear ] = useState('2021');
  // const [searchMonth, setSearchMonth ] = useState('FEB');
  
  const [loading, setLoading ] = useState(true);

  // console.log(g1s[0])
  //my homemade loading true or false again needed not sure
  // useEffect(() => {
  //   console.log(g1s.length)
  //   if (g1s.length > 0){
  //     setLoading(false);
  //   }
  // },[g1s]);

  //should be the first thing to load
  // useEffect(() => {
  //   // setLoading(true);
  //   loadGraphData();

    
  // },[]);

  // const data = [];

  useLayoutEffect(() => {
    console.log(searchB);
    loadGraphDataByCoupon(searchB);
    // console.log(data.length)
    state.datasets[0]['data'] = [];
    state.datasets[1]['data'] = [];
  },[searchB ]);

  
  graphData.forEach(element => {
    // console.log(element.floatsum) 
    state.datasets[0]['data'].push(element.floatsumactual);
    state.datasets[1]['data'].push(element.floatsumpredicted);
  });

  console.log(state)
let coupon = [];
for (let i=1; i < 10; i += .5 ){
  coupon.push(i.toString())
}

// const propertyValues = Object.values(graphData);

    console.log(state.datasets[0]['data'])
    console.log(Object.values(graphData));
    // console.log( propertyValues)
    return (
      <div>
                <Autocomplete
          id="combo-box-pool-names"
          options={coupon}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={(event, value)=>{setSearchB(value); console.log(searchB)}}
          renderInput={(params) => <TextField  {...params} label="Coupons" variant="outlined"/>}
        />  
        <Line
          data={state}
          // very confusing.. but seems to work
          height={"100%"}
          // width={"800%"}
          options={{
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            },
            // maintainAspectRatio: false 

          }}
        />
      </div>
    );
  }


const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadGraphData: ()=> {
      dispatch(loadGraphData());
    },
    loadGraphDataByCoupon: (coupon)=> {
      dispatch(loadGraphDataByCoupon(coupon));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Graph);