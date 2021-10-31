import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

const state = {
  labels: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', ' 50', '55', '60', '65', '70', '75', '80', '85' , '90' , '95'],
  datasets: [
    {
      label: 'G1 Pools, Coupon 5',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [8933, 8794, 8636, 8410, 8120, 7300, 6419, 6189, 5853, 5422, 3859, 1949, 333, 11, 11, 11]
    }
    // ,
    // {
    //   label: 'RainPaul',
    //   fill: false,
    //   lineTension: 0,
    //   backgroundColor: 'rgba(75,192,192,1)',
    //   borderColor: 'rgba(0,0,0,1)',
    //   borderWidth: 2,
    //   data: [5, 59, 37, 81, 50]
    // }
  ]
}

export default class Graph extends Component {
  render() {
    return (
      <div>
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
}
