import { useState } from "react"
import NavLink from "./NavLink"
import {
  DollarSign,
  Folders,
  Home,
  ListChecks,
  LogIn,
  LogOut,
  Warehouse,
} from "lucide-react"
import { validateToken, logout } from "../../lib/authFunctions"

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(validateToken())
  return (
    <div className="transition-width group fixed z-50 flex h-screen w-16 flex-col gap-4 bg-primary py-4 duration-200 ease-in-out hover:w-48">
      <NavLink text="MYAUTOLOG" href="/" icon={<Home />} />
      <NavLink text="EXPENSES" href="/expenses" icon={<DollarSign />} />

      <NavLink text="RESOURCES" href="/resources" icon={<Folders />} />
      <NavLink text="TASKS" href="/tasks" icon={<ListChecks />} />
      <NavLink text="GARAGE" href="/garage" icon={<Warehouse />} />
      {isLoggedIn ? (
        <NavLink text="LOGOUT" href="" icon={<LogOut />} onClick={logout}/>
      ) : (
        <NavLink text="LOGIN" href="/login" icon={<LogIn />} />
      )}
    </div>
  )
}

export default Navbar
