import { useEffect, useState } from "react"
import { DataTable } from "../../../components/DataTable/DataTable"
import { DataTableColumnHeader } from "../../../components/DataTable/DataTableColumnHeader"
import { ColumnDef } from "@tanstack/react-table"
import Card from "../../../components/Card/Card"
import { cn } from "../../../lib/utils"
import CustomCell from "../../../components/DataTable/CustomCell"
import { getOrders } from "../../../lib/expenseFunctions"

type orderData = {
  storeOrderId: string
  orderDate: string
  source: string
  url: string
  expectedArrivalDate: string
  subtotalPrice: number
  orderTax: number
  shippingPrice: number
  totalPrice: number
}
const columns: ColumnDef<orderData>[] = [
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
    cell: ({ row }) => {
      const source: string = row.getValue("source")
      return (
        <CustomCell>
          <>{source}</>
        </CustomCell>
      )
    },
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
    accessorKey: "subtotalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Subtotal Price" />
    ),
    cell: ({ row }) => {
      const subtotalPrice: number = row.getValue("subtotalPrice")
      const formattedSubtotalPrice = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      }).format(subtotalPrice)
      return (
        <CustomCell>
          <>{formattedSubtotalPrice}</>
        </CustomCell>
      )
    },
  },

  {
    accessorKey: "shippingPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Shipping Price" />
    ),
    cell: ({ row }) => {
      const shippingPrice: number = row.getValue("shippingPrice")
      const formattedShippingPrice = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      }).format(shippingPrice)
      return (
        <CustomCell>
          <>{formattedShippingPrice}</>
        </CustomCell>
      )
    },
  },
  {
    accessorKey: "orderTax",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Order Tax" />
    ),
    cell: ({ row }) => {
      const orderTax: number = row.getValue("orderTax")
      const formattedOrderTax = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      }).format(orderTax)
      return (
        <CustomCell>
          <>{formattedOrderTax}</>
        </CustomCell>
      )
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Price" />
    ),
    cell: ({ row }) => {
      const totalPrice: number = row.getValue("totalPrice")
      const formattedTotalPrice = new Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      }).format(totalPrice)
      return (
        <CustomCell>
          <>{formattedTotalPrice}</>
        </CustomCell>
      )
    },
  },
]

interface OrdersTableProps {
  className?: string
}
function OrdersTable({ className }: OrdersTableProps) {
  const [orders, setOrders] = useState<orderData[]>([])
  useEffect(() => {
    getOrders()
      .then((res) => {
        setOrders(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])
  return (
    <div className={cn("", className)}>
      <Card title="Orders">
        <DataTable columns={columns} data={orders} />
      </Card>
    </div>
  )
}

export default OrdersTable
