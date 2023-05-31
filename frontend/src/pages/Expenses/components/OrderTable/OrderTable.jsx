import React, { useEffect, useState } from "react"
import Card from "../../../../components/Card"
import { DataGrid } from "@mui/x-data-grid"
import { getOrders } from "../../../../lib/expenseFunctions"
import {
  formatDate,
  formatMoney,
} from "../../../../utilities/formattingFunctions"

const columns = [
  {
    field: "storeOrderId",
    headerName: "Order ID",
    minWidth: 150,
    renderCell: (params) => {
      return (
        <a href={params.row.url} style={{ color: "inherit" }}>
          {params.row.storeOrderId}
        </a>
      )
    },
  },
  { field: "source", headerName: "Source", minWidth: 150 },
  { field: "orderDate", headerName: "Date", minWidth: 120 },
  { field: "expectedArrivalDate", headerName: "ETA", minWidth: 120 },
  { field: "subtotalPrice", headerName: "Subtotal" },
  { field: "orderTax", headerName: "Tax" },
  { field: "shippingPrice", headerName: "Shipping" },
  { field: "totalPrice", headerName: "Total" },
]

function OrderTable() {
  const [rows, setRows] = useState([])

  useEffect(() => {
    getOrders()
      .then((res) => {
        console.log(res)
        let orders = []
        res.map((row) => {
          orders.push({
            id: row.orderId,
            storeOrderId: row.storeOrderId,
            source: row.source,
            url: row.url,
            orderDate: formatDate(row.orderDate),
            expectedArrivalDate: formatDate(row.expectedArrivalDate),
            subtotalPrice: formatMoney(row.subtotalPrice),
            orderTax: formatMoney(row.orderTax),
            shippingPrice: formatMoney(row.shippingPrice),
            totalPrice: formatMoney(row.totalPrice),
          })
        })

        setRows(orders)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Card title="Orders">
      <DataGrid
        rows={rows}
        columns={columns}
        intitialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20]}
        sx={{
          border: "none",
        }}
      />
    </Card>
  )
}

export default OrderTable
