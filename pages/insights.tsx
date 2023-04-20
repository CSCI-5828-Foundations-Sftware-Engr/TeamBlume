// pages/insights.tsx
import { Card, Text, Metric, Title, LineChart } from "@tremor/react";

export default function Insights({ count, chartData }) {
  return (
    <>
      <Card className="max-w-xs mx-auto">
        <Text>Insights created</Text>
        <Metric>{count}</Metric>
      </Card>
    </>
  )
}

export async function getServerSideProps(context) {
  const url = `${process.env.NEXT_PUBLIC_POSTHOG_HOST}/api/projects/${process.env.NEXT_PUBLIC_POSHOG_ID}/insights?short_id=nT97N4lg`;

  const request = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.NEXT_POSTHOG_PERSONAL_KEY}`
    }
  })

    // Return response as prop
  const response = await request.json()
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
