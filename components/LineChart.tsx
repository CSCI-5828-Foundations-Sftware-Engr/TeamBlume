import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
ChartJS.register(CategoryScale);
import {Line} from 'react-chartjs-2';

const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: 'My Second dataset',
      fill: false,
      lineTension: 0.1,
      backgroundColor: 'rgba(0,0,255,0.4)',
      borderColor: 'rgba(0,0,255,1)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgba(75,192,192,1)',
      pointBackgroundColor: '#fff',
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgba(75,192,192,1)',
      pointHoverBorderColor: 'rgba(220,220,220,1)',
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [80, 60, 40, 31, 76, 85, 80]
    }

  ]
};

const LineChart = ({ imageSrc, brand, name, productLink } : {imageSrc : string | undefined, brand : string | undefined, name : string | undefined, productLink : string}) => {
  return(
    <div>
        <h2>Line Example</h2>
        <Line
          data={data}
          width={400}
          height={400}
        />
      </div>
  );
};
export default LineChart;

