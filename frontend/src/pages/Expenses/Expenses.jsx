import React, { useEffect, useState } from "react"
import MainExpenseTable from "./components/MainExpenseTable/MainExpenseTable.jsx"
import Page from "../../components/Page"
import OrderForm from "./components/OrderForm"
import OrderTable from './components/OrderTable'

import "./Expenses.css"
function Expenses() {
  return (
    <Page title="Expenses">
      <OrderForm />
      <OrderTable />
      <div className="expenses-container">
        {/* <Card className="car-selection">
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque fuga
            quia assumenda eveniet, voluptatum vitae facilis. Quidem recusandae
            molestiae provident mollitia magnam consectetur a, porro quia
            similique, reiciendis accusantium voluptate.
          </p>
        </Card> */}
        <MainExpenseTable className="data-table" />
        
      </div>
      
    </Page>
  )
}

export default Expenses
