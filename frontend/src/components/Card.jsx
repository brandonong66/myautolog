import React from "react"
import { Box, Paper } from "@mui/material"
function Card(props) {
  return (
    <Box
      component={Paper}
      sx={{ padding: "1rem", borderRadius: "10px", boxShadow: "20px red" }}
    >
      {props.children}
    </Box>
  )
}

export default Card
