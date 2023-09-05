import { useMemo, useState } from "react"

// Components
import Card from "../../../components/Card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"

// Table Components
import { DataTableColumnHeader } from "../../../components/DataTable/DataTableColumnHeader"
import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import CustomCell from "../../../components/DataTable/CustomCell"

// sample data
const data: ExampleOrderType[] = [
  {
    orderDate: "2023-02-13T09:00:00.000Z",
    shippingPrice: 4.99,
    source: "FCP Euro",
    storeOrderId: "R576474059",
    totalPrice: 76.47,
    url: "https://www.fcpeuro.com/orders/R576474059",
  },
  {
    orderDate: "2023-02-15T11:30:00.000Z",
    shippingPrice: 6.99,
    source: "Ebay",
    storeOrderId: "E234567890",
    totalPrice: 111.69,
    url: "https://www.ebay.com/orders/E234567890",
  },
  {
    orderDate: "2023-02-18T14:45:00.000Z",
    shippingPrice: 25.0,
    source: "Ebay",
    storeOrderId: "E789012345",
    totalPrice: 1660.0,
    url: "https://www.ebay.com/orders/E789012345",
  },
  {
    orderDate: "2023-02-20T16:30:00.000Z",
    shippingPrice: 8.5,
    source: "FCP Euro",
    storeOrderId: "R576474062",
    totalPrice: 118.45,
    url: "https://www.fcpeuro.com/orders/R576474062",
  },
  {
    orderDate: "2023-02-25T17:45:00.000Z",
    shippingPrice: 10.0,
    source: "Ebay",
    storeOrderId: "E789012346",
    totalPrice: 594.1,
    url: "https://www.ebay.com/orders/E789012346",
  },
]

type ExampleOrderType = {
  storeOrderId: string
  orderDate: string
  source: string
  url: string
  shippingPrice: number
  totalPrice: number
}

function ExampleTable({ className }: { className?: string }) {
  const columns = useMemo<ColumnDef<ExampleOrderType>[]>(
    () => [
      {
        accessorKey: "storeOrderId",
        enableHiding: false,
        header: ({ column }) => (
          <div className="flex">
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
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })
  return (
    <Card className={" " + className} title="orders">
      <div className="flex flex-col gap-4">
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
                  return (
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
      </div>
    </Card>
  )
}

export default ExampleTable
