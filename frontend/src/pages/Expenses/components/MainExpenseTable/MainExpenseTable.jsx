import React, { useState, useEffect } from "react"

import { DataGrid } from "@mui/x-data-grid"
import { getExpenses } from "../../../../lib/expenseFunctions"
import Card from "../../../../components/Card"

const columns = [
  { field: "itemName", headerName: "Name", width: 250, hideable: false },
  { field: "itemBrand", headerName: "Brand", width: 120 },
  { field: "partNumber", headerName: "Part Number" },
  { field: "price", headerName: "Price" },
  { field: "itemTax", headerName: "Tax" },
  { field: "source", headerName: "Source" },
  { field: "storeOrderId", headerName: "Order ID", width: 100 },
  { field: "orderDate", headerName: "Date" },
  { field: "car", headerName: "Car", width: 200 },
  { field: "notes", headerName: "Notes", width: 200 },
  {field: "quantity", headerName: "Quantity", width: 100},
]

function MainExpenseTable() {
  const [rows, setRows] = useState([])

  useEffect(() => {
    getExpenses()
      .then((res) => {
        let items = []
        res.map((row) => {
          items.push({
            id: row.itemId, //data grid component requires all rows to have a unique `id` property.
            itemName: row.itemName,
            itemBrand: row.itemBrand,
            partNumber: row.partNumber,
            price: row.price,
            itemTax: row.itemTax,
            source: row.source,
            storeOrderId: row.storeOrderId,
            orderDate: row.orderDate,
            car: row.car,
            notes: row.notes,
            quantity: row.quantity,
          })
        })
        setRows(items)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div>
      {rows && (
        <Card title="Main Expense Table">
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10, 20]}
            // checkboxSelection
            sx={{
              border: "none",
            }}
          />
        </Card>
      )}
    </div>
  )
}

export default MainExpenseTable
