import { useEffect, useState } from "react"

//functions
import { getCarSpending } from "../../../../lib/statsFunctions"
import { cn } from "../../../../lib/utils"
import { getRandomColor } from "../../../../lib/statsFunctions"

//types
import { DoughnutData } from "../../../../types/stats"

// Chart components
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Bar, Doughnut } from "react-chartjs-2"
import Card from "../../../../components/Card"

ChartJS.register(ArcElement, Tooltip, Legend)
const options = {
  dougnut: {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "left" as const,
      },
    },
  },
  bar: {
    indexAxis: "y" as const,
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  },
}

// sample data
const cars = ["E30 M3", "FD RX7", "S197 Mustang"]
const backgroundColors = cars.map(() => getRandomColor())
const borderColors = cars.map(() => "rgb(0,0,0)")
const data = cars.map(() => parseFloat((Math.random() * 3000).toFixed(2)))
const sampleData: DoughnutData = {
  labels: cars,
  datasets: [
    {
      backgroundColor: backgroundColors,
      borderColor: borderColors,
      borderWidth: 1,
      data: data,
      label: "Car Spending",
    },
  ],
}

function CarSpending({ className }: { className?: string }) {
  const [carSpending, setCarSpending] = useState<DoughnutData>()

  useEffect(() => {
    getCarSpending().then((data) => {
      setCarSpending(data)
    })
  }, [])

  return (
    <Card title="car" className={cn("flex flex-col", className)}>
      <div className="grid flex-grow grid-cols-2 pb-4">
        <div>
          <Doughnut
            data={carSpending ? carSpending : sampleData}
            options={options.dougnut}
          />
        </div>

        <div>
          <Bar
            data={carSpending ? carSpending : sampleData}
            options={options.bar}
          />
        </div>
      </div>
    </Card>
  )
}

export default CarSpending
