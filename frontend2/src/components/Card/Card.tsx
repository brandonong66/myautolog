interface CardProps {
  children: React.ReactNode
}

function Card({ children }: CardProps) {
  return <div className="rounded-lg bg-white drop-shadow p-4">{children}</div>
}

export default Card
