import Card from "../../../components/Card/Card"
import MonthlySpending from "./charts/MonthlySpending"

function Analytics() {
  return (
    <Card title="Analytics" className="min-w-[40rem]">
        <MonthlySpending />
    </Card>
  )
}

export default Analytics