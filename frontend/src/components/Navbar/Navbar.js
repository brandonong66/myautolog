import React, { useEffect, useState } from "react"
import { Box, Button, Typography } from "@mui/material"
import Cookies from "js-cookie"
import "./Navbar.css"

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get("accessToken")!==undefined)


  console.log(isLoggedIn)
  const handleLogout = () => {
    Cookies.remove("accessToken")
    window.location.href = "/"
  }
  return (
    <Box className="navbar">
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box>
          <Button variant="ghost" href="/">
            Home
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="ghost" href="/expenses">
            Expenses
          </Button>
          <Button variant="ghost" href="/resources">
            Resources
          </Button>
          <Button variant="ghost" href="/tasks">
            Tasks
          </Button>
        </Box>
        <Box>
          {isLoggedIn ? (
            <Button variant="ghost" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button variant="ghost" href="/login">
              Login
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
