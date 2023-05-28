import React, { useEffect, useState } from "react"
import axios from "axios"
import { Box, Container, Typography } from "@mui/material"
import Card from "../../components/Card"
import DataTable from "../../components/Table/DataTable.jsx"
import MainExpenseTable from "../../components/Table/MainExpenseTable.jsx"
import Page from "../../components/Page"

import "./Expenses.css"
function Expenses() {
  const [expenseData, setExpenseData] = useState()
  useEffect(() => {
    axios
      .get("http://localhost:3001/expenses")
      .then((res) => {
        setExpenseData(res.data)
        console.log(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Container className="page-body">
      <Typography variant="h3" component="h1" sx={{ textAlign: "center" }}>
        Expenses
      </Typography>
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
    </Container>
  )
}

export default Expenses
