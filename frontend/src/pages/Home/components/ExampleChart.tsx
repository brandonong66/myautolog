// chart components
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Bar, Doughnut } from "react-chartjs-2"

// components
import Card from "../../../components/Card"

// functions
import { getRandomColor } from "../../../lib/statsFunctions"

// types
import { DoughnutData } from "../../../types/stats"

// chart setup
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
const backgroundColors = [
  "RGB(40, 61, 161)",
  "RGB(107, 168, 229)",
  "RGB(30, 117, 136)",
  "RGB(89, 109, 127)",
  "RGB(138, 159, 207)",
]
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

function ExampleChart({ className }: { className?: string }) {
  return (
    <Card
      className={"flex flex-col " + className}
      title="spending by category"
    >
      <div className="grid flex-grow grid-cols-2 py-4">
        <div className="">
          <Doughnut data={sampleData} options={options.dougnut} />
        </div>

        <div>
          <Bar data={sampleData} options={options.bar} />
        </div>
      </div>
    </Card>
  )
}

export default ExampleChart
