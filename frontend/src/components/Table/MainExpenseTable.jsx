import React, { useState, useEffect } from "react"
import axios from "axios"
import { DataGrid } from "@mui/x-data-grid"

const columns = [
  { field: "name", headerName: "Name", width: 250 , hideable: false},
  { field: "brand", headerName: "Brand", width: 120 },
  { field: "partnumber", headerName: "Part Number" },
  { field: "price", headerName: "Price" },
  { field: "tax", headerName: "Tax" },
  { field: "source", headerName: "Source" },
  { field: "orderID", headerName: "Order ID", width: 100 },
  { field: "orderdate", headerName: "Date" },
]

function MainExpenseTable() {
  const [rows, setRows] = useState()

  useEffect(() => {
    axios
      .get("http://localhost:3001/expenses")
      .then((res) => {
        let items = []
        res.data.map((row) => {
          items.push({
            id: row.itemId,
            name: row.itemName,
            brand: row.itemBrand,
            partnumber: row.partNumber,
            price: row.price,
            tax: row.itemTax,
            source: row.source,
            orderID: row.storeOrderId,
            orderdate: row.orderDate,
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
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          pageSizeOptions={[5, 10, 20]}
          checkboxSelection
        />
      )}
    </div>
  )
}

export default MainExpenseTable
