import Card from "../../../components/Card/Card"
import MonthlySpending from "./charts/MonthlySpending"
import CarSpending from "./charts/CarSpending"
import CategorySpending from "./charts/CategorySpending"

function Analytics() {
  return (
    <Card title="Analytics" className="min-w-[90rem]">
      <div className="flex justify-around">
        <Card
          title="Monthly Spending"
          titleVariant="h4"
          className="min-w-[40rem]"
        >
          <MonthlySpending />
        </Card>
        
          <Card title="Car Spending" titleVariant="h4">
            <CarSpending />
          </Card>
          <Card title="Category Spending" titleVariant="h4">
            <CategorySpending />
          </Card>
        
      </div>
    </Card>
  )
}

export default Analytics
