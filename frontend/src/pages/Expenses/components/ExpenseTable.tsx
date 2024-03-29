import { useEffect, useState } from "react"

// components
import Card from "../../../components/Card"
import CustomCell from "../../../components/DataTable/CustomCell"
import { DataTable } from "../../../components/DataTable/DataTable"
import { DataTableColumnHeader } from "../../../components/DataTable/DataTableColumnHeader"

// functions
import { getExpenses } from "../../../lib/expenseFunctions"
import { cn } from "../../../lib/utils"

import { ColumnDef } from "@tanstack/react-table"

// sample data
import { sampleAllItems } from "../data/sampleData"
import { useIsLoggedIn } from "../../../hooks/useIsLoggedIn"
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
  category: string
}
const columns: ColumnDef<expenseData>[] = [
  {
    accessorKey: "orderDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
    cell: ({ row }) => {
      const orderDate = new Date(row.getValue("orderDate"))
      const formattedDate = new Intl.DateTimeFormat("en-us", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }).format(orderDate)

      return (
        <CustomCell>
          <>{formattedDate}</>
        </CustomCell>
      )
    },
  },
  {
    accessorKey: "itemName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Item Name" />
    ),
    cell: ({ row }) => {
      const itemName: string = row.getValue("itemName")
      return (
        <CustomCell className="max-w-[200px]">
          <>{itemName}</>
        </CustomCell>
      )
    },
  },
  {
    accessorKey: "userLabel",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Car" />
    ),
  },
  {
    accessorKey: "storeOrderId",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order ID" />
    ),
    cell: ({ row }) => {
      const storeOrderId: string = row.getValue("storeOrderId")
      return (
        <CustomCell>
          <>{storeOrderId}</>
        </CustomCell>
      )
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
    cell: ({ row }) => {
      const url: string = row.getValue("url")
      return (
        <CustomCell>
          <a href={url}>{url}</a>
        </CustomCell>
      )
    },
  },

  {
    accessorKey: "itemBrand",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand" />
    ),
  },
  {
    accessorKey: "partNumber",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Part Number" />
    ),
  },

  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Qty" />
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

      return (
        <CustomCell>
          <>{formattedPrice}</>
        </CustomCell>
      )
    },
  },
  {
    accessorKey: "itemTax",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tax" />
    ),
    cell: ({ row }) => {
      const itemTax = parseFloat(row.getValue("itemTax"))
      const formattedItemTax = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      }).format(itemTax)

      return (
        <CustomCell>
          <>{formattedItemTax}</>
        </CustomCell>
      )
    },
  },
  {
    accessorKey: "total",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"))
      const itemTax = parseFloat(row.getValue("itemTax"))
      const total = (price + itemTax) * parseInt(row.getValue("quantity"))
      const formattedTotal = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      }).format(total)

      return (
        <CustomCell>
          <>{formattedTotal}</>
        </CustomCell>
      )
    },
  },

  {
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notes" />
    ),
    cell: ({ row }) => {
      const notes: string = row.getValue("notes")
      return (
        <CustomCell className="max-w-[100px]">
          <p className="truncate">{notes}</p>
        </CustomCell>
      )
    },
  },

  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
  },
]
interface expenseTableProps {
  className?: string
}
function ExpenseTable({ className }: expenseTableProps) {
  const [data, setData] = useState<expenseData[]>(sampleAllItems)
  const isLoggedIn = useIsLoggedIn()
  useEffect(() => {
    if (isLoggedIn) {
      getExpenses()
        .then((data) => {
          setData(data)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [])

  return (
    <div className={cn("w-[90rem]", className)}>
      <Card title="all items">
        <DataTable
          columns={columns}
          data={data}
          visibility={{ notes: false, url: false }}
        />
      </Card>
    </div>
  )
}

export default ExpenseTable
