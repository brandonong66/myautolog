import React, { useEffect, useState } from "react"
import { Box, Button, Typography } from "@mui/material"
import HomeIcon from "@mui/icons-material/Home"
import FormatListNumberedIcon from "@mui/icons-material/FormatListNumbered"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import FolderIcon from "@mui/icons-material/Folder"
import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"

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
      <a className="nav-link" href="/" underline="none" color="black">
        <div className="nav-item">
          <div>
            <HomeIcon className="nav-icon" />
          </div>
          <div>
            <Typography className="nav-text" variant="h6" underline="none">
              Home
            </Typography>
          </div>
        </div>
      </a>

      <a className="nav-link" href="/expenses">
        <div className="nav-item">
          <div>
            <AttachMoneyIcon className="nav-icon" />
          </div>
          <div>
            <Typography className="nav-text" variant="h6" underline="none">
              Expenses
            </Typography>
          </div>
        </div>
      </a>

      <a className="nav-link" href="/resources">
        <div className="nav-item">
          <div>
            <FolderIcon className="nav-icon" />
          </div>
          <div>
            <Typography className="nav-text" variant="h6" underline="none">
              Resources
            </Typography>
          </div>
        </div>
      </a>

      <a className="nav-link" href="/tasks" underline="none" color="black">
        {" "}
        <div className="nav-item">
          <div>
            <FormatListNumberedIcon className="nav-icon" />
          </div>
          <div>
            <Typography className="nav-text" variant="h6" underline="none">
              Tasks
            </Typography>
          </div>
        </div>
      </a>

      {isLoggedIn ? (
        <a className="nav-link" href="" onClick={handleLogout}>
          <div className="nav-item">
            <div>
              <LogoutIcon className="nav-icon" />
            </div>
            <div>
              <Typography className="nav-text" variant="h6" underline="none">
                Logout
              </Typography>
            </div>
          </div>
        </a>
      ) : (
        <a className="nav-link" href="/login">
          <div className="nav-item">
            <div>
              <LoginIcon className="nav-icon" />
            </div>
            <div>
              <Typography className="nav-text" variant="h6" underline="none">
                Login
              </Typography>
            </div>
          </div>
        </a>
      )}
    </Box>
  )
}

export default Navbar
