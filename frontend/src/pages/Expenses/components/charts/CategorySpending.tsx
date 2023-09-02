import { useEffect, useState } from "react"

//functions
import { getCategorySpending } from "../../../../lib/statsFunctions"
import { cn } from "../../../../lib/utils"

//types
import { DoughnutData } from "../../../../types/stats"

// Chart components
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Bar, Doughnut } from "react-chartjs-2"

// components
import Card from "../../../../components/Card"

ChartJS.register(ArcElement, Tooltip, Legend)
export const options = {
  dougnut: {
    indexAxis: "y" as const,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "left" as const,
      },
    },
  },
  bar: {
    indexAxis: "y" as const,
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
}

function CategorySpending({ className }: { className?: string }) {
  const [categorySpending, setCategorySpending] = useState<DoughnutData>()

  useEffect(() => {
    getCategorySpending().then((data) => {
      setCategorySpending(data)
    })
  }, [])

  return (
    <Card className={cn("flex flex-col", className)} title="category">
      <div className="grid grid-cols-2 flex-grow pb-4">
        {categorySpending && (
          <div className="">
            <Doughnut data={categorySpending} options={options.dougnut} />
          </div>
        )}
        {categorySpending && (
          <div>
            <Bar data={categorySpending} options={options.bar} />
          </div>
        )}
      </div>
    </Card>
  )
}

export default CategorySpending
