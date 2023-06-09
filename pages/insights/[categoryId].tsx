// pages/insights.tsx
//import { Card, Text, Metric, Title, LineChart } from "@tremor/react";
import { GetServerSidePropsContext } from 'next';
import BarChart from '../../components/BarChart'

type dataObj = {
    labels?: any[];
    datasets?: any[];
};

type ChartProps = {
  data: dataObj;
};



export default function Insights({data }:ChartProps) {
  return (
    <>
      <div className='barChart'>
        <BarChart data={data} />
      </div>
    </>
  )
}

export async function getServerSideProps(context:GetServerSidePropsContext) {
  const categoryId = Number(context.query.categoryId) || 0;
  const categoryUrls = ['35FqvuL1','qqkanfAM'];
  const categoryUrl = categoryId >= categoryUrls.length ? categoryUrls[0] : categoryUrls[categoryId];

//   OLD_ID = QYJfD25z
  const url = `${process.env.NEXT_PUBLIC_POSTHOG_HOST}/api/projects/${process.env.NEXT_PUBLIC_POSHOG_ID}/insights?short_id=${categoryUrl}`;
  const request = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_POSTHOG_PERSONAL_KEY}`
    }
  })

  const data = {
    labels: [] as string[],
    datasets: [
       {
         label: 'Top Searched Products',
         data: [] as number[]
       }

    ]
  };

    // Return response as prop
  const response = await request.json()
  const insights_data = response.results[0].result
  const labels: string[] = []
  const values: number[] = []
  for(let i=0; i<insights_data.length; i++){
    labels.push(insights_data[i].label);
    values.push(insights_data[i].count);
  }
  data.labels = labels.slice().sort((a, b) => values[labels.indexOf(b)] - values[labels.indexOf(a)]).slice(0, 3);
  data.datasets[0].data = values.filter((d, i) => data.labels.includes(labels[i]));

  return {
    props: {
      data
    }
  }
}
