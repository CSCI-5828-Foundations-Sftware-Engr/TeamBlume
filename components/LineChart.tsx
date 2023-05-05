import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
ChartJS.register(CategoryScale);
import { Line } from 'react-chartjs-2';

type dataObj = {
  labels?: any[];
  datasets?: any[];
};

type trendsObj = {
  price?: any[];
  inserted_at?: any[];
  platform?: string[];
};

type LineChartProps = {
  trendsData: trendsObj;
};

const LineChart = ({ trendsData }: LineChartProps) => {
  const data = {
    labels: [] as string[],
    datasets: [
      {
        label: 'platform',
        data: [] as number[],
      },
    ],
  };

  const platforms = new Set<string>(trendsData?.platform ?? []);
    const labels = new Set<string>(
      (trendsData?.inserted_at ?? []).map((label: string) => label.substr(0, 10))
    );
//   const labels = new Set<string>(trendsData?.inserted_at ?? []);

  const datasets: { label: string; data: number[] }[] = [];

  const platformMap = new Map<string, number[]>();

  for (let i = 0; i < (trendsData?.price?.length ?? 0); i++) {
    const platform = trendsData?.platform?.[i];
    const price = trendsData?.price?.[i];

    if (platform === undefined) {
      continue;
    }

    if (!platformMap.has(platform)) {
      platformMap.set(platform, []);
    }
    platformMap.get(platform)?.push(price);
  }

  platformMap.forEach((prices, platform) => {
    datasets.push({
      label: platform,
      data: prices,
    });
  });

  data.labels = Array.from(labels);
  data.datasets = datasets;
  console.log(data);
  return (
    <div>
      <Line data={data} width={400} height={400} />
    </div>
  );
};

export default LineChart;
