import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
ChartJS.register(CategoryScale);
import {Bar} from 'react-chartjs-2';


//TODO: Take data as Input
const BarChart = ({data} : {}) => {
  return(
    <div>
        <h2>Trends</h2>
        <Bar
          data={data}
          width={400}
          height={400}
        />
      </div>
  );
};
export default BarChart;

