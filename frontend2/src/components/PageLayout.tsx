import Typography from "./ui/typography"
interface pageLayoutProps {
  children: React.ReactNode
  title: string
}

function PageLayout({ children, title }: pageLayoutProps) {
  return (
    <div>
      <Typography variant="h1">{title}</Typography>
      {children}
    </div>
  )
}

export default PageLayout
