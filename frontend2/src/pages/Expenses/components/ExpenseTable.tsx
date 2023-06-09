import { useEffect, useState } from "react"
import { DataTable } from "../../../components/DataTable/DataTable"
import { DataTableColumnHeader } from "../../../components/DataTable/DataTableColumnHeader"

import { getExpenses } from "../../../lib/expenseFunctions"

import { ColumnDef } from "@tanstack/react-table"

import Card from "../../../components/Card/Card"

//define columns
type expenseData = {
  storeOrderId: string
  orderDate: string
  source: string
  url: string
  itemId: number
  itemName: string
  itemBrand: string
  partNumber: string
  notes: string
  quantity: number
  price: number
  itemTax: number
  userLabel: string
}
const columns: ColumnDef<expenseData>[] = [
  {
    accessorKey: "storeOrderId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
  },
  {
    accessorKey: "orderDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date" />
    ),
    cell: ({ row }) => {
      const orderDate = new Date(row.getValue("orderDate"))
      const formattedDate = new Intl.DateTimeFormat("en-us", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(orderDate)

      return <div>{formattedDate}</div>
    },
  },
  {
    accessorKey: "source",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Source" />
    ),
  },
  {
    accessorKey: "url",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="URL" />
    ),
  },
  {
    accessorKey: "itemId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item ID" />
    ),
  },
  {
    accessorKey: "itemName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item Name" />
    ),
  },
  {
    accessorKey: "itemBrand",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item Brand" />
    ),
  },
  {
    accessorKey: "partNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Part Number" />
    ),
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notes" />
    ),
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const formattedPrice = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      }).format(price)

      return <div>{formattedPrice}</div>
    },
  },
  {
    accessorKey: "itemTax",
    header: "Item Tax",
    cell: ({ row }) => {
      const itemTax = parseFloat(row.getValue("itemTax"))
      const formattedItemTax = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      }).format(itemTax)
      return <div>{formattedItemTax}</div>
    },
  },
  {
    accessorKey: "userLabel",
    header: "User Label",
  },
]

function ExpenseTable() {
  const [data, setData] = useState<expenseData[]>([])
  useEffect(() => {
    getExpenses()
      .then((data) => {
        setData(data)
        console.log(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Card title="Main Expenses">
      <DataTable columns={columns} data={data} />
    </Card>
  )
}

export default ExpenseTable
