import Card from "../../../components/Card/Card"
import MonthlySpending from "./charts/MonthlySpending"
import CarSpending from "./charts/CarSpending"

function Analytics() {
  return (
    <Card title="Analytics" className="min-w-[40rem]">
        <MonthlySpending />
        <CarSpending />
    </Card>
  )
}

export default Analytics