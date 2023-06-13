import PageLayout from "../../components/PageLayout"
import ExpenseTable from "./components/ExpenseTable"
import NewOrderForm from "./components/NewOrderForm"
import OrdersTable from "./components/OrdersTable"

function ExpensesPage() {
  return (
    <PageLayout title="Expenses">
      <div className="flex flex-col items-center gap-4">
        <NewOrderForm className="max-w-3xl" />
        <ExpenseTable className="" />
        <OrdersTable />
      </div>
    </PageLayout>
  )
}

export default ExpensesPage
