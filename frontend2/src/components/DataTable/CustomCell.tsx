import { cn } from "../../lib/utils"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"

interface CustomCellProps {
  className?: string
  children?: React.ReactNode
}

function CustomCell({ className, children }: CustomCellProps) {
  return (
    <div
      className={cn(
        "max-w-[150px] overflow-hidden overflow-ellipsis whitespace-nowrap",
        className
      )}
    >
      <HoverCard>
        <HoverCardTrigger asChild>{children}</HoverCardTrigger>
        <HoverCardContent className="w-full">{children}</HoverCardContent>
      </HoverCard>
    </div>
  )
}

export default CustomCell
