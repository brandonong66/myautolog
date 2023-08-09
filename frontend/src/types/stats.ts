export type MonthlySpendingType = {
  [year: number]: {
    [month: string]: number
  }
}

export type MonthlySpendingFormatted = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string
  }[]
}

export type CarSpendingType = {
  userLabel: string
  total_spending: number
}

export type CarSpendingFormatted = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string[]
    borderColor: string[]
    borderWidth: number
  }[]
}

export type CategorySpending = {
  category: string
  total_spending: number
}

export type CategorySpendingFormatted = {
  labels: string[]
  datasets: {
    label: string
    data: number[]
    backgroundColor: string[]
    borderColor: string[]
    borderWidth: number
  }[]
}
