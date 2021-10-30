import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

const state = {
  labels: ['0', '5', '10', '15', '20', '25', '30', '35', '40', '45', ' 50', '55', '60', '65', '70', '75', '80', '85' , '90' , '95'],
  datasets: [
    {
      label: 'G1 Pools',
      fill: false,
      lineTension: 0,
      backgroundColor: 'rgba(75,192,192,1)',
      borderColor: 'rgba(0,0,0,1)',
      borderWidth: 2,
      data: [881225, 766401, 669811, 616160,  600036, 511758, 456201, 421243, 332102, 178385, 99819,
        18805, 1668, 1243, 427, 108, 95, 94, 6, 1]
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
