import { Fragment, useEffect, useMemo, useState } from "react"

// Icons
import { ChevronRight, ChevronDown } from "lucide-react"
// Types
import { ItemType2, OrderType } from "../../../types/expenses"

// Functions
import { cn } from "../../../lib/utils"
import { getAllOrderItems, getOrders } from "../../../lib/expenseFunctions"
import { deleteOrder } from "../../../lib/expenseFunctions"

// Components
import { Button } from "../../../components/ui/button"
import Card from "../../../components/Card"
import { Input } from "../../../components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components/ui/alert-dialog"
import OrderSubtable from "./OrderSubtable"

// Table Components
import { DataTableColumnHeader } from "../../../components/DataTable/DataTableColumnHeader"
import {
  ColumnDef,
  ExpandedState,
  flexRender,
  SortingState,
  getCoreRowModel,
  getExpandedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import CustomCell from "../../../components/DataTable/CustomCell"
import { DataTablePagination } from "../../../components/DataTable/DataTablePagination"
import { DataTableViewOptions } from "../../../components/DataTable/DataTableViewOptions"
import NewOrderForm from "./NewOrderForm"
import ConfirmedDelete from "../../../components/ConfirmedDelete"

interface OrdersTableProps {
  className?: string
}

interface allOrderItems {
  [storeOrderId: string]: ItemType2[]
}
function OrdersTable({ className }: OrdersTableProps) {
  const [data, setData] = useState<OrderType[]>([])
  const [allOrderItems, setAllOrderitems] = useState<allOrderItems>()
  const columns = useMemo<ColumnDef<OrderType>[]>(
    () => [
      {
        accessorKey: "storeOrderId",
        enableHiding: false,
        header: ({ column }) => (
          <div className="flex">
            <button
              className="pr-3"
              {...{
                onClick: table.getToggleAllRowsExpandedHandler(),
              }}
            >
              {table.getIsAllRowsExpanded() ? (
                <ChevronDown />
              ) : (
                <ChevronRight />
              )}
            </button>
            <DataTableColumnHeader
              column={column}
              title="Order ID"
              className="inline-flex"
            />
          </div>
        ),

        cell: ({ row }) => {
          const storeOrderId: string = row.getValue("storeOrderId")
          return (
            <div className="flex">
              <button
                className="pr-3"
                {...{
                  onClick: () => row.toggleExpanded(),
                  style: { cursor: "default" },
                }}
              >
                {row.getIsExpanded() ? <ChevronDown /> : <ChevronRight />}
              </button>
              <CustomCell>
                <div className="flex">{storeOrderId}</div>
              </CustomCell>
            </div>
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
          <DataTableColumnHeader column={column} title="Subtotal" />
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
        accessorKey: "discount",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Discount" />
        ),
        cell: ({ row }) => {
          const discount: number = row.getValue("discount")
          const formattedDiscount = new Intl.NumberFormat("en-us", {
            style: "currency",
            currency: "USD",
          }).format(discount)
          return (
            <CustomCell>
              <>{formattedDiscount}</>
            </CustomCell>
          )
        },
      },
      {
        accessorKey: "shippingPrice",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Shipping" />
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
          <DataTableColumnHeader column={column} title="Tax" />
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
          <DataTableColumnHeader column={column} title="Total" />
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
    ],
    []
  )
  const [sorting, setSorting] = useState<SortingState>([])
  const [expanded, setExpanded] = useState<ExpandedState>({})

  const [globalFilter, setGlobalFilter] = useState("")

  const table = useReactTable({
    data,
    columns,
    onExpandedChange: setExpanded,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,

    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),

    state: {
      sorting,
      globalFilter,
      expanded,
    },
  })

  const delOrder = (storeOrderId: string) => {
    // get order id from data given storeOrderId
    const foundOrder = data.find((order) => order.storeOrderId === storeOrderId)
    if (foundOrder) {
      deleteOrder(foundOrder.orderId).then((_) => window.location.reload())
    }
  }

  useEffect(() => {
    getAllOrderItems()
      .then((res) => {
        setAllOrderitems(res)
      })
      .catch((err) => {
        console.log(err)
      })
    getOrders()
      .then((res) => {
        setData(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <div className={cn("min-w-[90rem]", className)}>
      <Card
        title="Orders"
        
      >
        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <div>
              <Input
                placeholder="Filter "
                onChange={(event) => setGlobalFilter(event.target.value)}
                className="max-w-sm"
              />
            </div>

            <div>
              <DataTableViewOptions table={table} />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => {
                    const soi: string = row.getValue("storeOrderId")
                    const rowItems = allOrderItems ? allOrderItems[soi] : null

                    return (
                      <Fragment key={row.id}>
                        <TableRow
                          key={row.id}
                          data-state={row.getIsSelected() && "selected"}
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                        {row.getIsExpanded() ? (
                          <TableRow>
                            <TableCell colSpan={columns.length}>
                              <OrderSubtable items={rowItems} />
                              
                              <ConfirmedDelete className="float-right" onConfirm={()=>delOrder(row.getValue("storeOrderId"))}/>
                            </TableCell>
                          </TableRow>
                        ) : null}
                      </Fragment>
                    )
                  })
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          <DataTablePagination table={table} />
        </div>
      </Card>
    </div>
  )
}

export default OrdersTable
