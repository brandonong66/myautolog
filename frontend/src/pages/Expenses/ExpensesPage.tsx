import PageLayout from "../../components/PageLayout"
import ExpenseTable from "./components/ExpenseTable"
import NewOrderForm from "./components/NewOrderForm"
import OrdersTable from "./components/OrdersTable"
import Analytics from "./components/Analytics"

function ExpensesPage() {
  return (
    <div className="flex flex-col items-center gap-4 mt-8">
      <Analytics />
      <NewOrderForm />
      <OrdersTable />
      <ExpenseTable />
    </div>
  )
}

export default ExpensesPage
