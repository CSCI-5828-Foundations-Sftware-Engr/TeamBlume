import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import {CategoryScale} from 'chart.js';
ChartJS.register(CategoryScale);
import {Bar} from 'react-chartjs-2';

type dataObj = {
    labels?: any[];
    datasets?: any[];
};

type BarChartProps = {
  data: dataObj;
};

const BarChart = ({data}:BarChartProps) => {

  return(
    <div className='barChart-container'>
        <h2>Trends</h2>
        <Bar data={data as any}/>
      </div>
  );
};
export default BarChart;

