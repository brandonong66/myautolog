interface CardProps {
  children?: React.ReactNode
  topRight?: React.ReactNode
  title?: string
  titleVariant?: string
  className?: string
}
import Typography from "../ui/typography"
import { cn } from "../../lib/utils"

function Card({
  children,
  className,
  title,
  titleVariant,
  topRight,
}: CardProps) {
  return (
    <div className={cn("rounded-lg bg-white p-4 drop-shadow", className)}>
      <div className="flex">
        {title && !titleVariant && (
          <div className="mb-2 border-l-8 border-primary pl-4">
            <Typography variant="h2">{title}</Typography>
          </div>
        )}
        {title && titleVariant === "h2" && (
          <div className="mb-2 border-l-8 border-secondary pl-4">
            <Typography variant="h3">{title}</Typography>
          </div>
        )}
        {title && titleVariant === "h3" && (
          <div className="mb-2 border-l-8 border-secondary pl-4">
            <Typography variant="h3">{title}</Typography>
          </div>
        )}
        {title && titleVariant === "h4" && (
          <div className="mb-2 border-l-8 border-secondary pl-4">
            <Typography variant="h4">{title}</Typography>
          </div>
        )}
        <div className="ml-auto">{topRight}</div>
      </div>
      {children}
    </div>
  )
}

export default Card
