interface CardProps {
  children?: React.ReactNode
  title?: string
  className?: string
}
import Typography from "../ui/typography"

function Card({ children, title, className }: CardProps) {
  return (
    <div className={"rounded-lg bg-white p-4 drop-shadow " + className}>
      {title && (
        <div className="border-l-8 border-primary pl-4 mb-2">
          <Typography variant="h2">{title}</Typography>
        </div>
      )}
      {children}
    </div>
  )
}

export default Card
