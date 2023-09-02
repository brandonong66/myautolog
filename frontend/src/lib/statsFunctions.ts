import axios from "axios"
import {
  BarData,
  DoughnutData,
  MonthlySpendingType,
  LineData,
  CarSpendingType,
  CategorySpending,
  TopSource,
} from "../types/stats"

export async function getMonthlySpending(): Promise<LineData> {
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

// formats data for chartJS line chart component
function formatMonthlySpending(data: MonthlySpendingType): LineData {
  const years = Object.keys(data)
  const datasets = years.map((year: string) => {
    const color = getRandomColor()
    const monthlySpendingCurrentYear = data[year]
    return {
      label: year,
      data: months.map((month) => monthlySpendingCurrentYear[month]),
      borderColor: color,
      backgroundColor: color,
      fill: false,
      tension: 0.1,
    }
  })
  return {
    labels: months,
    datasets: datasets,
  }
}

export async function getCarSpending(): Promise<DoughnutData> {
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

function formatCarSpending(data: CarSpendingType[]): DoughnutData {
  const labels = data.map((carSpending: CarSpendingType) => {
    return carSpending.userLabel
  })
  const title = "Car Spending"
  const spending_data = data.map((carSpending: CarSpendingType) => {
    return carSpending.total_spending
  })
  const backgroundColor = data.map(() => {
    return (function () {
      const num = Math.round(0xffffff * Math.random())
      const r = num >> 16
      const g = (num >> 8) & 255
      const b = num & 255
      return "rgba(" + r + ", " + g + ", " + b + ", 0.7)"
    })()
  })

  const borderColor = data.map(() => {
    return "rgb(0,0,0)"
  })

  return {
    labels: labels,
    datasets: [
      {
        label: title,
        data: spending_data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  }
}

export async function getCategorySpending(): Promise<DoughnutData> {
  try {
    const response = await axios.get(
      import.meta.env.VITE_APP_MY_API + "/stats/categorySpending",
      {
        withCredentials: true,
      }
    )
    return formatCategorySpending(response.data)
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

function formatCategorySpending(data: CategorySpending[]): DoughnutData {
  const labels = data.map((categorySpending: CategorySpending) => {
    return categorySpending.category
  })
  const title = "Category Spending"
  const spending_data = data.map((categorySpending: CategorySpending) => {
    return categorySpending.total_spending
  })
  const backgroundColor = data.map(() => {
    return (function () {
      const num = Math.round(0xffffff * Math.random())
      const r = num >> 16
      const g = (num >> 8) & 255
      const b = num & 255
      return "rgb(" + r + ", " + g + ", " + b + ", 0.7)"
    })()
  })

  const borderColor = data.map(() => {
    return "rgb(0,0,0)"
  })

  return {
    labels: labels,
    datasets: [
      {
        label: title,
        data: spending_data,
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  }
}

export async function getTopSources(): Promise<BarData> {
  try {
    const response = await axios.get(
      import.meta.env.VITE_APP_MY_API + "/stats/topSources",
      {
        withCredentials: true,
      }
    )

    const topSources: TopSource[] = response.data

    const labels = topSources.map((topSource: TopSource) => {
      return topSource.source
    })

    const backgroundColors = topSources.map(() => getRandomColor())
    const borderColors = topSources.map(() => "rgb(0,0,0)")

    const datasets = [
      {
        label: "Top Sources",
        data: topSources.map((topSource: TopSource) => {
          return topSource.totalSpent
        }),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ]

    return {
      labels: labels,
      datasets: datasets,
    }
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

function getRandomColor() {
  const num = Math.round(0xffffff * Math.random())
  const r = num >> 16
  const g = (num >> 8) & 255
  const b = num & 255
  return "rgba(" + r + ", " + g + ", " + b + ", 0.7)"
}
