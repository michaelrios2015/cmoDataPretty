// THIS NEEDS CLEAN UP 11/7/21

import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { connect } from 'react-redux';
import {Line} from 'react-chartjs-2';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import { loadGraphData, loadGraphDataByCoupon, loadGraphDataByGtypeandCoupon } from '../store';
import * as changeme from '../../data/changeme.js'

// change this
const date = changeme.date;


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
      lineTension: 0.3,
      backgroundColor: '#2196f3',
      borderColor: '#2196f3',
      borderWidth: 2,
      pointRadius: 2,
      pointHoverRadius: 4,
      data: []
    },
    {
      label: 'Predicted CPR',
      fill: false,
      lineTension: 0.3,
      backgroundColor: '#f44336',
      borderColor: '#f44336',
      borderWidth: 2,
      pointRadius: 2,
      pointHoverRadius: 4,
      data: []
    },
  ]
};


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

      <div style={{ display: 'flex', gap: '24px', padding: '8px 0 4px', fontSize: '13px', color: '#555', fontFamily: 'Arial, sans-serif' }}>
        <span><b>Date:</b> {date}</span>
        <span><b>Y Axis:</b> Tradable Float (MM)</span>
        <span><b>X Axis:</b> CPR</span>
      </div>
        <Line
          data={state}
          height={"100%"}
          options={{
            title: {
              display: true,
              text: 'Tradable Float by CPR',
              fontSize: 16,
              fontColor: '#333',
            },
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                fontColor: '#333',
                fontSize: 13,
                padding: 20,
              }
            },
            tooltips: {
              backgroundColor: 'rgba(0,0,0,0.75)',
              titleFontSize: 13,
              bodyFontSize: 12,
              cornerRadius: 4,
            },
            scales: {
              xAxes: [{ gridLines: { color: 'rgba(0,0,0,0.05)' } }],
              yAxes: [{ gridLines: { color: 'rgba(0,0,0,0.05)' } }],
            },
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
    },
    loadGraphDataByGtypeandCoupon: (gtype, coupon)=> {
      dispatch(loadGraphDataByGtypeandCoupon(gtype, coupon));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(Graph);