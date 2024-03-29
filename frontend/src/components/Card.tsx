interface CardProps {
  children?: React.ReactNode
  topRight?: React.ReactNode
  title?: string
  titleVariant?: string
  className?: string
  onClick?: () => void
}
import Typography from "./ui/typography"
import { cn } from "../lib/utils"

function Card({
  children,
  className,
  title,
  titleVariant,
  topRight,
  onClick,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "rounded-lg border-2 border-slate-300 bg-white p-4 shadow-xl",
        className
      )}
      onClick={onClick}
      {...props}
    >
      <div className="grid grid-cols-[1fr,max-content]">
        {title && (!titleVariant || titleVariant === "h1") && (
          <div className="mb-2 border-l-8 border-primary pl-4">
            <Typography variant="h2">{title}</Typography>
          </div>
        )}
        {title && titleVariant === "h2" && (
          <div className="mb-2 border-l-8 border-primary-300 pl-4">
            <Typography variant="h3">{title}</Typography>
          </div>
        )}
        {title && titleVariant === "h3" && (
          <div className="border-primary-200 mb-2 border-l-8 pl-4">
            <Typography variant="h3">{title}</Typography>
          </div>
        )}
        {title && titleVariant === "h4" && (
          <div className="mb-2 border-l-8 border-primary-100 pl-4">
            <Typography variant="h4">{title}</Typography>
          </div>
        )}
        {topRight && <div className="ml-auto">{topRight}</div>}
      </div>
      {children}
    </div>
  )
}

export default Card
