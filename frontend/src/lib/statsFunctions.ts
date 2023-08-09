import axios from "axios"
import {
  MonthlySpendingType,
  MonthlySpendingFormatted,
  CarSpendingType,
  CarSpendingFormatted,
} from "../types/stats"

export async function getMonthlySpending(): Promise<MonthlySpendingFormatted> {
  try {
    const response = await axios.get(
      import.meta.env.VITE_APP_MY_API + "/stats/monthlySpending",
      {
        withCredentials: true,
      }
    )
    return formatMonthlySpending(response.data)
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

function formatMonthlySpending(
  data: MonthlySpendingType
): MonthlySpendingFormatted {
  const years = Object.keys(data)
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

export async function getCarSpending(): Promise<CarSpendingFormatted> {
  try {
    const response = await axios.get(
      import.meta.env.VITE_APP_MY_API + "/stats/carSpending",
      {
        withCredentials: true,
      }
    )
    return formatCarSpending(response.data)
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

function formatCarSpending(data: CarSpendingType[]): CarSpendingFormatted {
  const labels = data.map((carSpending: CarSpendingType) => {
    return carSpending.userLabel
  })
  const title = "Car Spending"
  const spending_data = data.map((carSpending: CarSpendingType) => {
    return carSpending.total_spending
  })
  const backgroundColor = data.map((carSpending: CarSpendingType) => {
    return (function () {
      const num = Math.round(0xffffff * Math.random())
      const r = num >> 16
      const g = (num >> 8) & 255
      const b = num & 255
      return "rgb(" + r + ", " + g + ", " + b + ")"
    })()
  })

  return {
    labels: labels,
    datasets: [
      {
        label: title,
        data: spending_data,
        backgroundColor: backgroundColor,
        borderColor: backgroundColor,
        borderWidth: 1,
      },
    ],
  }
}
