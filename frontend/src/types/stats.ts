export type MonthlySpendingType = {
  [year: number]: {
    [month: string]: number
  }
}

export type CarSpendingType = {
  userLabel: string
  total_spending: number
}

export type CategorySpending = {
  category: string
  total_spending: number
}

// chart data types
export type DoughnutData = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string[]
    borderColor: string[]
    borderWidth: number
  }[]
}

export type BarData = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    borderColor: string[]
    backgroundColor: string[]
    borderWidth: number
  }[]
}

export type TopSource = {
  source: string
  totalSpent: number
}

export type LineData = {
  labels: string[] // x-axis
  datasets: {
    label: string // label in legend
    data: number[] 
    fill: boolean // fill under line
    backgroundColor: string // fill color
    borderColor: string // color of line
    tension: number // curve of line
  }[]
}

