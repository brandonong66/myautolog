interface CardProps {
  children?: React.ReactNode
  title?: string
  className?: string
}
import Typography from "../ui/typography"
import { cn } from "../../lib/utils"

function Card({ children, title, className }: CardProps) {
  return (
    <div className={cn("rounded-lg bg-white p-4 drop-shadow", className)}>
      {title && (
        <div className="mb-2 border-l-8 border-primary pl-4">
          <Typography variant="h2">{title}</Typography>
        </div>
      )}
      {children}
    </div>
  )
}

export default Card
