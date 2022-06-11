// THIS NEEDS CLEAN UP 11/7/21

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { connect } from 'react-redux';
// import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { loadGraphData, loadGraphDataByCoupon, loadGraphDataByGtypeandCoupon } from '../store';

const labels =[];
for(let i = 0; i<101; i++ ){
  labels.push(i)
}

const state = {
  labels: labels,
  datasets: [
    {
      label: 'Actual CPR',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      // xAxisID: 'A',
      data: []
    },
    {
      label: 'Predicted CPR',
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
 
const legend = {
  display: true,
  position: "bottom",
  labels: {
    fontColor: "#323130",
    fontSize: 14
  }
};

// should probably erease this 2/26/22
// const options =  {           
// title:{
//   display:true,
//   text:'Average Rainfall per month',
//   fontSize:20
// }};

//rows are now created in store :) 
function Graph({ graphData, loadGraphData, loadGraphDataByCoupon, loadGraphDataByGtypeandCoupon}) {
  const [searchA, setSearchA ] = useState('');
  const [searchB, setSearchB ] = useState('');
  // const [searchYear, setSearchYear ] = useState('2021');
  // const [searchMonth, setSearchMonth ] = useState('FEB');
  
  const [loading, setLoading ] = useState(true);

  //should be the first thing to load
  // useEffect(() => {
  //   // setLoading(true);
  //   loadGraphData();
  // },[]);
 
  useLayoutEffect(() => {
    console.log(searchA);
    console.log(searchB);
    // loadGraphDataByCoupon(searchB);
    loadGraphDataByGtypeandCoupon(searchA, searchB)
    // console.log(data.length)
    state.datasets[0]['data'] = [];
    state.datasets[1]['data'] = [];
  },[searchA, searchB]);

  
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
  
  const gtype = ['g1s', 'g2s', 'RG', 'JM'];

  // console.log(state.datasets[0]['data'])
  // console.log(Object.values(graphData));
    // console.log( propertyValues)
    return (
      <div>
        <div className={ 'sideBySide' }> 

        <Autocomplete
          id="combo-box-pool-names"
          options={coupon}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={(event, value)=>{setSearchB(value); console.log(searchB)}}
          renderInput={(params) => <TextField  {...params} label="Coupons" variant="outlined"/>}
        />  
        
        <Autocomplete
          id="combo-box-pool-names"
          options={gtype}
          getOptionLabel={(option) => option}
          style={{ width: 300 }}
          onChange={(event, value)=>{setSearchA(value); console.log(searchA)}}
          renderInput={(params) => <TextField  {...params} label="G1 or G2" variant="outlined"/>}
        />  
      </div>

      <div>
        <h4>Date: MAY 2022</h4>
        <h4>Y Axis: Tradable Float in MM</h4>
        <h4>X Axis: CPR</h4>
      </div>
        <Line
          data={state}

          // legend={legend}
          // very confusing.. but seems to work
          height={"100%"}
          // width={"800%"}
          options={ 
            // options
            {
            title:{
              display:true,
              text:'Average Rainfall per month',
              fontSize:20
            }
            // ,
            // scales: {
            //   y: [{
            //     scaleLabel: {
            //       display: true,
            //       labelString: 'Y text'
            //     }
            //   }],
            //   x: [{
            //     scaleLabel: {
            //       display: true,
            //       labelString: 'X text'
            //     }
            //   }],
            // },  

            // legend:{
            //   display:true,
            //   position:'right'
            // },
            
        }
      }
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
    },
    loadGraphDataByGtypeandCoupon: (gtype, coupon)=> {
      dispatch(loadGraphDataByGtypeandCoupon(gtype, coupon));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Graph);