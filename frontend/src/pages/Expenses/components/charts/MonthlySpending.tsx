import { useEffect, useState } from "react"
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

import { getMonthlySpending } from "../../../../lib/statsFunctions"
import {
  MonthlySpendingFormatted,
  MonthlySpendingType,
} from "../../../../types/stats"

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Monthly Spending",
    },
  },
}

const labels = [
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

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => 10),
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
}

function MonthlySpending() {
  const [monthlySpending, setMonthlySpending] =
    useState<MonthlySpendingFormatted>()

  useEffect(() => {
    getMonthlySpending().then((data) => {
      setMonthlySpending(data)
      console.log(data)
    })
  }, [])
  return (
    <>{monthlySpending && <Bar options={options} data={monthlySpending} />}</>
  )
}

export default MonthlySpending
