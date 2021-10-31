import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

const state = {
  labels: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', ' 50', '55', '60', '65', '70', '75', '80', '85' , '90' , '95'],
  datasets: [
    {
      label: 'G2 Pools, Coupon 4.5',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [  34263, 34140, 34135, 34016, 33821, 30029, 25716, 24168, 23296, 21163, 9531, 1546, 82, 82, 82, 82, 82, 81 ]
    }
    ,
    {
      label: 'G2 Pools, Coupon 4.5 - Predicted CPR',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      // line color
      borderColor: "#80b6f4",
      borderWidth: 2,
      data: [ 34263, 34157, 34157, 34155, 33916, 33590, 24375, 23689, 22018, 12635]
    }, 
  
    {
      label: 'G2 Pools, Coupon 5',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [ 9644, 9218, 9057, 8819, 8509, 7614, 6662, 6430, 6094, 5615, 4009, 2100, 333, 11, 11, 11 ]
    }
    ,
    {
      label: 'G2 Pools, Coupon 5 - Predicted CPR',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      // line color
      borderColor: "#80b6f4",
      borderWidth: 2,
      data: [9291, 9291, 9234, 8757, 7476, 6311, 6122, 5622, 903]
    }
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
