import React, { useEffect, useState } from "react"
import { Box, Button, Typography } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import FolderIcon from "@mui/icons-material/Folder"
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"
import GarageIcon from "@mui/icons-material/Garage"
import NavLink from "./NavLink"
import Cookies from "js-cookie"
import "./Navbar.css"

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    Cookies.get("accessToken") !== undefined
  )

  const handleLogout = () => {
    Cookies.remove("accessToken")
    window.location.href = "/"
  }
  return (
    <Box className="navbar">
      <NavLink href="/" icon={<HomeIcon />} text="Home" />
      <NavLink href="/expenses" icon={<AttachMoneyIcon />} text="Expenses" />
      <NavLink href="/resources" icon={<FolderIcon />} text="Resources" />
      <NavLink href="/tasks" icon={<FormatListNumberedIcon />} text="Tasks" />
      <NavLink href="/garage" icon={<GarageIcon />} text="Garage" />

      {isLoggedIn ? (
        <NavLink icon={<LogoutIcon />} text="Logout" onClick={handleLogout} />
      ) : (
        <NavLink href="/login" icon={<LoginIcon />} text="Login" />
      )}
    </Box>
  )
}

export default Navbar
