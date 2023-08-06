import { Column } from "@tanstack/react-table"

import { cn } from "../../lib/utils"
import { Button } from "../ui/button"
import { ArrowUpDown } from "lucide-react"
interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function ColumnHeaderToggle<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>
  }

  return (
    <Button
      className="-ml-4"
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}
