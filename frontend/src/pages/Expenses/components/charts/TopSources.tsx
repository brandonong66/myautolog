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
      display: false,
    },
  },
}

// functions
import { getTopSources } from "../../../../lib/statsFunctions"
import { cn } from "../../../../lib/utils"
import { getRandomColor } from "../../../../lib/statsFunctions"

// typers
import { BarData } from "../../../../types/stats"

// sample data
const sources = ["fcpeuro", "ebay", "rockauto", "marketplace"]
const backgroundColors = sources.map(() => getRandomColor())
const borderColors = sources.map(() => "rgb(0,0,0)")
const moneySpent = sources.map(() =>
  parseFloat((Math.random() * 3000).toFixed(2))
)
const sampleData: BarData = {
  labels: sources,
  datasets: [
    {
      backgroundColor: backgroundColors,
      borderColor: borderColors,
      borderWidth: 1,
      data: moneySpent,
      label: "top sources",
    },
  ],
}

function TopSources({ className }: { className?: string }) {
  const [topSources, setTopSources] = useState<BarData>()

  useEffect(() => {
    getTopSources().then((data) => {
      setTopSources(data)
    })
  }, [])
  return (
    <Card title="top sources" className={cn("flex flex-col ", className)}>
      <div className="grid flex-grow">
        <Bar
          className="my-auto"
          options={options}
          data={topSources ? topSources : sampleData}
        />
      </div>
    </Card>
  )
}

export default TopSources
