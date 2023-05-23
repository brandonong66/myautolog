import React from "react"
import { Box, Button, Typography } from "@mui/material"
import "./Navbar.css"
function Navbar() {
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
          <Button variant="ghost" href="/login">Login</Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Navbar
