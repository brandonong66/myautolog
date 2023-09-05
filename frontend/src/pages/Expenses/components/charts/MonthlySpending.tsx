import { useEffect, useState } from "react"

// chart components
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Line } from "react-chartjs-2"

// components
import Card from "../../../../components/Card"

// functions
import { getMonthlySpending } from "../../../../lib/statsFunctions"
import { cn } from "../../../../lib/utils"
import { getRandomColor } from "../../../../lib/statsFunctions"

// types
import { LineData } from "../../../../types/stats"
import { useIsLoggedIn } from "../../../../hooks/useIsLoggedIn"

// chart setup
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)
const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top" as const,
    },
    // title: {
    //   display: true,
    //   text: "Monthly Spending",
    // },
  },
}

// sample data
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const years = ["2021", "2022"]
const sampleDatasets = years.map((year) => {
  const color = getRandomColor()
  return {
    backgroundColor: color,
    borderColor: color,
    data: months.map(() => parseFloat((Math.random() * 3000).toFixed(2))),
    fill: false,
    label: year,
    tension: 0.1,
  }
})

const sampleData: LineData = {
  labels: months,
  datasets: sampleDatasets,
}

function MonthlySpending({ className }: { className?: string }) {
  const [monthlySpending, setMonthlySpending] = useState<LineData>()
  const isLoggedIn = useIsLoggedIn()
  useEffect(() => {
    if (isLoggedIn) {
      getMonthlySpending().then((data) => {
        setMonthlySpending(data)
      })
    }
  }, [])
  return (
    <Card title="monthly spending" className={cn("flex flex-col", className)}>
      <div className="flex-grow">
        <Line
          options={options}
          data={monthlySpending ? monthlySpending : sampleData}
        />
      </div>
    </Card>
  )
}

export default MonthlySpending
