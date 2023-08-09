export type MonthlySpendingType = {
  [year: number]: {
    [month: string]: number
  }
}
export type CarSpendingType ={
  userLabel: string
  total_spending: number
}