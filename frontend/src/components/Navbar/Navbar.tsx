// hooks
import { useState } from "react"
import { useLocation } from "react-router-dom"

// components
import Typography from "../ui/typography"

import "./Navbar.css"

// functions
import { validateToken, logout } from "../../lib/authFunctions"

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(validateToken())
  const location = useLocation()

  const isHomePage = location.pathname === "/"
  const isLoginPage =
    location.pathname === "/login" || location.pathname === "/signup"

  if (isLoginPage) {
    return (
      <header className="flex items-center justify-between px-8 pb-6 pt-5">
        <a className="text-primary" href="/">
          <Typography variant="h3">myautolog</Typography>
        </a>
      </header>
    )
  }

  return (
    <header
      className={
        "flex items-center justify-between px-8 pb-6 pt-5 " +
        (isHomePage ? "" : "bg-primary")
      }
    >
      <a className={isHomePage ? "text-primary" : "text-primary-100"} href="/">
        <Typography variant="h3">myautolog</Typography>
      </a>

      <nav>
        <ul className="flex gap-4">
          <li className="inline-block ">
            <a className="nav-link text-primary-100" href="/expenses">
              expenses
            </a>
          </li>
          <li className="inline-block ">
            <a className="nav-link text-primary-100" href="/resources">
              resources
            </a>
          </li>

          <li className="inline-block ">
            <a className="nav-link text-primary-100" href="/garage">
              garage
            </a>
          </li>
        </ul>
      </nav>
      {isLoggedIn ? (
        <a className="nav-link text-primary-100" href="" onClick={logout}>
          logout
        </a>
      ) : (
        <a className="nav-link text-primary-100" href="/login">
          login
        </a>
      )}
    </header>
  )
}

export default Navbar
