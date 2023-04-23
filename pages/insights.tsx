// pages/insights.tsx
//import { Card, Text, Metric, Title, LineChart } from "@tremor/react";
import { GetServerSidePropsContext } from 'next';
import BarChart from '../components/BarChart'

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
      <div>
        <BarChart data={data} />
      </div>
    </>
  )
}

export async function getServerSideProps(context:GetServerSidePropsContext) {
  const url = `${process.env.NEXT_PUBLIC_POSTHOG_HOST}/api/projects/${process.env.NEXT_PUBLIC_POSHOG_ID}/insights?short_id=QYJfD25z`;

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
  for(let i=0; i<insights_data.length; i++){
    data.labels.push(insights_data[i].label);
    data.datasets[0].data.push(insights_data[i].count);
  }
  return {
    props: {
      data
    }
  }
}
