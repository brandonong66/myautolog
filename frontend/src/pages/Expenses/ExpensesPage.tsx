import PageLayout from "../../components/PageLayout"
import ExpenseTable from "./components/ExpenseTable"
import NewOrderForm from "./components/NewOrderForm"
import OrdersTable from "./components/OrdersTable"
import Analytics from "./components/Analytics"

function ExpensesPage() {
  return (
    <PageLayout title="Expenses">
      <div className="flex flex-col items-center gap-4">
        <Analytics />
        <NewOrderForm />
        <OrdersTable />
        <ExpenseTable />
      </div>
    </PageLayout>
  )
}

export default ExpensesPage
