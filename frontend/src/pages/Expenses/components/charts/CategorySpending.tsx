import { useEffect, useState } from "react"

//functions
import { getCategorySpending } from "../../../../lib/statsFunctions"
import { cn } from "../../../../lib/utils"
import { getRandomColor } from "../../../../lib/statsFunctions"

//types
import { DoughnutData } from "../../../../types/stats"

// Chart components
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Bar, Doughnut } from "react-chartjs-2"

// components
import Card from "../../../../components/Card"
import { useIsLoggedIn } from "../../../../hooks/useIsLoggedIn"

ChartJS.register(ArcElement, Tooltip, Legend)
const options = {
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

// sample data
const categories = [
  "Maintenance",
  "Performance",
  "Interior",
  "Cosmetic",
  "Other",
]
const backgroundColors = categories.map(() => getRandomColor())
const borderColors = categories.map(() => "rgb(0,0,0)")
const data = categories.map(() => parseFloat((Math.random() * 3000).toFixed(2)))
const sampleData: DoughnutData = {
  labels: categories,
  datasets: [
    {
      backgroundColor: backgroundColors,
      borderColor: borderColors,
      borderWidth: 1,
      data: data,
      label: "category spending",
    },
  ],
}

function CategorySpending({ className }: { className?: string }) {
  const [categorySpending, setCategorySpending] = useState<DoughnutData>()
  const isLoggedIn = useIsLoggedIn()
  useEffect(() => {
    if (isLoggedIn) {
      getCategorySpending().then((data) => {
        setCategorySpending(data)
      })
    }
  }, [])

  return (
    <Card className={cn("flex flex-col", className)} title="category">
      <div className="grid flex-grow grid-cols-2 pb-4">
        <div className="">
          <Doughnut
            data={categorySpending ? categorySpending : sampleData}
            options={options.dougnut}
          />
        </div>

        <div>
          <Bar
            data={categorySpending ? categorySpending : sampleData}
            options={options.bar}
          />
        </div>
      </div>
    </Card>
  )
}

export default CategorySpending
