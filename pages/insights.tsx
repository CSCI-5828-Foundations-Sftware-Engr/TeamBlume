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
  const category_url = ['qqkanfAM', '35FqvuL1']
//   OLD_ID = QYJfD25z
  const url = `${process.env.NEXT_PUBLIC_POSTHOG_HOST}/api/projects/${process.env.NEXT_PUBLIC_POSHOG_ID}/insights?short_id=${category_url[0]}`;

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
  const labels = []
  const values = []
  for(let i=0; i<insights_data.length; i++){
    labels.push(insights_data[i].label);
    values.push(insights_data[i].count);
  }
  const toplabels = labels.slice().sort((a, b) => values[labels.indexOf(b)] - values[labels.indexOf(a)]).slice(0, 3);
  const topvalues = values.filter((d, i) => toplabels.includes(labels[i]));
  console.log(topvalues)
  console.log(toplabels)
  data.labels = toplabels;
  data.datasets[0].data = topvalues;
  return {
    props: {
      data
    }
  }
}
