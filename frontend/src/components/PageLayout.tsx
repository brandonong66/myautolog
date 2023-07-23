import Typography from "./ui/typography"
interface pageLayoutProps {
  children: React.ReactNode
  title: string
}

function PageLayout({ children, title }: pageLayoutProps) {
  return (
    <div>
      <div className="mb-8 text-center">
        <Typography variant="h1">{title}</Typography>
      </div>
      {children}
    </div>
  )
}

export default PageLayout
