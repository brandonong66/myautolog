// hooks
import { useState } from "react"
import { useLocation } from "react-router-dom"

// components
import Typography from "../ui/typography"
import * as HoverCard from "@radix-ui/react-hover-card"

// functions
import { validateToken, logout } from "../../lib/authFunctions"

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(validateToken())
  const location = useLocation()

  const isHomePage = location.pathname === "/"
  const isLoginPage = location.pathname === "/login"

  if (isLoginPage) {
    return (
      <header className="space flex justify-between px-8 py-6">
        <a className="text-primary" href="/">
          <Typography variant="h3">myautolog</Typography>
        </a>
      </header>
    )
  }

  return (
    <header
      className={
        "space flex justify-between px-8 py-6 " +
        (isHomePage ? "" : "bg-primary")
      }
    >
      <a className={isHomePage ? "text-primary" : "text-primary-100"} href="/">
        <Typography variant="h3">myautolog</Typography>
      </a>

      <nav>
        <ul className="flex gap-4">
          <li className="inline-block ">
            <a className="text-primary-100" href="/expenses">
              expenses
            </a>
          </li>
          <li className="inline-block ">
            <a className="text-primary-100" href="/resources">
              resources
            </a>
          </li>

          <li className="inline-block ">
            <a className="text-primary-100" href="/garage">
              garage
            </a>
          </li>
        </ul>
      </nav>
      {isLoggedIn ? (
        <a className="text-primary-100" href="" onClick={logout}>
          logout
        </a>
      ) : (
        <a className="text-primary-100" href="/login">
          login
        </a>
      )}
    </header>
  )
}

export default Navbar
