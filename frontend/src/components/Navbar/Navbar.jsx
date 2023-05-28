import React, { useState } from "react"
import { Box } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import FolderIcon from "@mui/icons-material/Folder"
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import GarageIcon from "@mui/icons-material/Garage"
import NavLink from "./NavLink"
import "./Navbar.css"

import { validateToken, logout } from "../../lib/authFunctions"
function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(validateToken)

  return (
    <Box className="navbar">
      <NavLink href="/" icon={<HomeIcon />} text="Home" />
      <NavLink href="/expenses" icon={<AttachMoneyIcon />} text="Expenses" />
      <NavLink href="/resources" icon={<FolderIcon />} text="Resources" />
      <NavLink href="/tasks" icon={<FormatListNumberedIcon />} text="Tasks" />
      <NavLink href="/garage" icon={<GarageIcon />} text="Garage" />

      {isLoggedIn ? (
        <NavLink icon={<LogoutIcon />} text="Logout" onClick={logout} />
      ) : (
        <NavLink href="/login" icon={<LoginIcon />} text="Login" />
      )}
    </Box>
  )
}

export default Navbar
