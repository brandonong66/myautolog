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

// types
import { LineData } from "../../../../types/stats"

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
export const options = {
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

function MonthlySpending({ className }: { className?: string }) {
  const [monthlySpending, setMonthlySpending] = useState<LineData>()

  useEffect(() => {
    getMonthlySpending().then((data) => {
      setMonthlySpending(data)
    })
  }, [])
  return (
    <Card title="monthly spending" className={cn("flex flex-col", className)}>
      {monthlySpending && (
        <div className="flex-grow">
          <Line options={options} data={monthlySpending} />
        </div>
      )}
    </Card>
  )
}

export default MonthlySpending
