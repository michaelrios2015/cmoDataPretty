import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

const state = {
  labels: ['20', '25', '30', '35', '40', '45', ' 50', '55', '60', '65', '70', '75', '80'],
  datasets: [
    {
      label: 'Rainfall',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [65, 59, 80, 81, 56]
    },
    {
      label: 'RainPaul',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [5, 59, 37, 81, 50]
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
