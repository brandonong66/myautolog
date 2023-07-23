import React from "react"

interface NavLinkProps {
  text: string
  href: string
  icon: React.ReactNode
  onClick?: () => void
}

function NavLink({ text, href, icon, onClick }: NavLinkProps) {
  return (
    <a href={href} className="ml-3 last:mt-auto" onClick={onClick}>
      <div className="flex w-full items-center p-2 text-primary-foreground hover:text-secondary-foreground">
        <div>{icon}</div>
        <div className="hidden pl-4 group-hover:flex">{text}</div>
      </div>
    </a>
  )
}

export default NavLink
