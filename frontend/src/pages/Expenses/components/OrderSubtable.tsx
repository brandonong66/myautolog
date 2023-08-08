import { useMemo, useState } from "react"

// types
import { ItemType2 } from "../../../types/expenses"

// components
import { Button } from "../../../components/ui/button"
import { ArrowUpDown } from "lucide-react"

// table components
import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { DataTableColumnHeader } from "../../../components/DataTable/DataTableColumnHeader"
import CustomCell from "../../../components/DataTable/CustomCell"
import { ColumnHeaderToggle } from "../../../components/DataTable/ColumnHeaderToggle"

import { cn } from "../../../lib/utils"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table"

function OrderSubtable({
  className,
  items,
}: {
  className?: string
  items: ItemType2[] | null
}) {
  const columns = useMemo<ColumnDef<ItemType2>[]>(
    () => [
      {
        accessorKey: "itemName",
        header: ({ column }) => (
          <ColumnHeaderToggle column={column} title="Item" />
        ),
        cell: ({ row }) => {
          const itemName: string = row.getValue("itemName")
          return (
            <CustomCell>
              <p>{itemName}</p>
            </CustomCell>
          )
        },
      },
      {
        accessorKey: "itemBrand",
        header: ({ column }) => (
          <ColumnHeaderToggle column={column} title="Brand" />
        ),
        cell: ({ row }) => {
          const itemBrand: string = row.getValue("itemBrand")
          return (
            <CustomCell>
              <>{itemBrand}</>
            </CustomCell>
          )
        },
      },
      {
        accessorKey: "partNumber",
        header: ({ column }) => (
          <ColumnHeaderToggle column={column} title="Part Number" />
        ),
        cell: ({ row }) => {
          const partNumber: string = row.getValue("partNumber")
          return (
            <CustomCell>
              <>{partNumber}</>
            </CustomCell>
          )
        },
      },
      {
        accessorKey: "category",
        header: ({ column }) => (
          <ColumnHeaderToggle column={column} title="Category" />
        ),
        cell: ({ row }) => {
          const category: string = row.getValue("category")
          return (
            <CustomCell>
              <>{category}</>
            </CustomCell>
          )
        },
      },
      {
        accessorKey: "price",
        header: ({ column }) => (
          <ColumnHeaderToggle column={column} title="Price" />
        ),
        cell: ({ row }) => {
          const price: number = row.getValue("price")
          const formattedPrice = price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })

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
          <ColumnHeaderToggle column={column} title="Tax" />
        ),
        cell: ({ row }) => {
          const itemTax: number = row.getValue("itemTax")
          const formattedItemTax = new Intl.NumberFormat("en-US", {
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
        accessorKey: "quantity",
        header: ({ column }) => (
          <ColumnHeaderToggle column={column} title="Quantity" />
        ),
        cell: ({ row }) => {
          const quantity: number = row.getValue("quantity")
          return (
            <CustomCell>
              <>{quantity}</>
            </CustomCell>
          )
        },
      },
      {
        accessorKey: "carUserLabel",
        header: ({ column }) => (
          <ColumnHeaderToggle column={column} title="Car" />
        ),
        cell: ({ row }) => {
          const carUserLabel: string = row.getValue("carUserLabel")
          return (
            <CustomCell>
              <>{carUserLabel}</>
            </CustomCell>
          )
        },
      },
    ],
    []
  )
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data: items,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
    },
  })
  return (
    <div className={cn("", className)}>
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
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default OrderSubtable
