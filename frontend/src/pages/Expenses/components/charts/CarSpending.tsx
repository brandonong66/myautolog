import { useEffect, useState } from "react"

//functions
import { getCarSpending } from "../../../../lib/statsFunctions"
import { cn } from "../../../../lib/utils"
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

function CarSpending({ className }: { className?: string }) {
  const [carSpendingDoughnut, setCarSpendingDoughnut] = useState<DoughnutData>()

  useEffect(() => {
    getCarSpending().then((data) => {
      setCarSpendingDoughnut(data)
    })
  }, [])

  return (
    <Card title="car" className={cn("flex flex-col", className)}>
      <div className="grid grid-cols-2 flex-grow pb-4">
        {carSpendingDoughnut && (
          <div >
            <Doughnut data={carSpendingDoughnut} options={options.dougnut} />
          </div>
        )}

        {carSpendingDoughnut && (
          <div >
            <Bar data={carSpendingDoughnut} options={options.bar} />
          </div>
        )}
      </div>
    </Card>
  )
}

export default CarSpending
