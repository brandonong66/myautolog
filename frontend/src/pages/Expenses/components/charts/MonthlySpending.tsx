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
import { MonthlySpendingFormatted } from "../../../../types/stats"

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

function MonthlySpending() {
  const [monthlySpending, setMonthlySpending] =
    useState<MonthlySpendingFormatted>()

  useEffect(() => {
    getMonthlySpending().then((data) => {
      setMonthlySpending(data)
    })
  }, [])
  return (
    <>{monthlySpending && <Bar options={options} data={monthlySpending} />}</>
  )
}

export default MonthlySpending
