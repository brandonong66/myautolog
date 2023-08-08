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
