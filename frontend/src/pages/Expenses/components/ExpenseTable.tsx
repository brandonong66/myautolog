import { useEffect, useState } from "react"
import { DataTable } from "../../../components/DataTable/DataTable"
import { DataTableColumnHeader } from "../../../components/DataTable/DataTableColumnHeader"
import { getExpenses } from "../../../lib/expenseFunctions"
import { ColumnDef } from "@tanstack/react-table"
import Card from "../../../components/Card/Card"
import { cn } from "../../../lib/utils"
import CustomCell from "../../../components/DataTable/CustomCell"

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
    accessorKey: "orderDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Date" />
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
      <DataTableColumnHeader column={column} title="Item Tax" />
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
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notes" />
    ),
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
  const [data, setData] = useState<expenseData[]>([])
  useEffect(() => {
    getExpenses()
      .then((data) => {
        setData(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className={cn("", className)}>
      <Card title="Main Expenses">
        <DataTable columns={columns} data={data} />
      </Card>
    </div>
  )
}

export default ExpenseTable
