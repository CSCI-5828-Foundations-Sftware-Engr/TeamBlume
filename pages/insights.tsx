// pages/insights.tsx
//import { Card, Text, Metric, Title, LineChart } from "@tremor/react";
import BarChart from '../components/BarChart'
const data = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'My First dataset',
      backgroundColor: 'rgba(75,192,192,0.4)',
      borderColor: 'rgba(75,192,192,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    },
    {
      label: 'My Second dataset',
      backgroundColor: 'rgba(0,0,255,0.4)',
      borderColor: 'rgba(0,0,255,1)',

      data: [80, 60, 40, 31, 76, 85, 80]
    }

  ]
};

export default function Insights({ count, chartData }) {
  return (
    <>
      <div>
        <BarChart data={data} />
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const url = `${process.env.NEXT_PUBLIC_POSTHOG_HOST}/api/projects/${process.env.NEXT_PUBLIC_POSHOG_ID}/insights?short_id=QYJfD25z`;

  const request = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_POSTHOG_PERSONAL_KEY}`
    }
  })

    // Return response as prop
  const response = await request.json()
  console.log(response.results[0].result)
  const dataPoints = response.results[0].result[0].data
  const labels = response.results[0].result[0].labels
  const count=response.results[0].result[0].count
  const chartData = dataPoints.map((point, index) => {
    return {
      date: labels[index],
      pageviews: point
    }
  })
  return {
    props: {
      count,
      chartData
    }
  }
}
