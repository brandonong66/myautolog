import MonthlySpending from "./charts/MonthlySpending"
import CarSpending from "./charts/CarSpending"
import CategorySpending from "./charts/CategorySpending"
import TopSources from "./charts/TopSources"

import "./Analytics.css"
function Analytics() {
  return (
    <div className="analytics-grid">
      <MonthlySpending className="analytics-item" />
      <TopSources className="analytics-item" />
      <CarSpending className="analytics-item " />
      <CategorySpending className="analytics-item" />
    </div>
  )
}

export default Analytics
