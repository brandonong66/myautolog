import { useEffect, useState } from "react"

// chart
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Bar } from "react-chartjs-2"

// components
import Card from "../../../../components/Card"

// chart setup
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
const options = {
  // indexAxis: "y" as const,
  responsive: true,
  maintianAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
  },
}

// functions
import { getTopSources } from "../../../../lib/statsFunctions"
import { cn } from "../../../../lib/utils"

// typers
import { BarData } from "../../../../types/stats"

function TopSources({ className }: { className?: string }) {
  const [topSources, setTopSources] = useState<BarData>()

  useEffect(() => {
    getTopSources().then((data) => {
      setTopSources(data)
      console.log(data)
    })
  }, [])
  return (
    <Card title="top sources" className={cn("flex flex-col ", className)}>
      {topSources && (
        <div className="grid flex-grow">
          <Bar className="my-auto" options={options} data={topSources} />
        </div>
      )}
    </Card>
  )
}

export default TopSources
