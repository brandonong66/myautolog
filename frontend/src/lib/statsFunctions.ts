import axios from "axios"
import { MonthlySpendingType, MonthlySpendingFormatted } from "../types/stats"

export async function getMonthlySpending(): Promise<MonthlySpendingFormatted> {
  try {
    const response = await axios.get(
      import.meta.env.VITE_APP_MY_API + "/stats/monthlySpending",
      {
        withCredentials: true,
      }
    )
    return formatForChartJS(response.data.monthlySpending)
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "An error occurred")
    } else {
      throw new Error(
        "Unable to connect to the server. Please try again later."
      )
    }
  }
}

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

function formatForChartJS(data: MonthlySpendingType): MonthlySpendingFormatted {
  const years = Object.keys(data)
  console.log(years)
  const datasets = years.map((year: string) => {
    const monthlySpendingCurrentYear = data[year]
    return {
      label: year,
      data: months.map((month) => monthlySpendingCurrentYear[month]),
      backgroundColor: (function () {
        const num = Math.round(0xffffff * Math.random())
        const r = num >> 16
        const g = (num >> 8) & 255
        const b = num & 255
        return "rgb(" + r + ", " + g + ", " + b + ")"
      })(),
    }
  })
  return {
    labels: months,
    datasets: datasets,
  }
}
