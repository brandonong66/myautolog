import React from "react"
import { Box, Typography } from "@mui/material"
import "./Footer.css"
function Footer() {
  return (
    <Box className="footer">
      <Box>
        <Typography variant="body1">About</Typography>
      </Box>
      <Box>
        <Typography variant="body1">Data Privacy</Typography>
      </Box>
    </Box>
  )
}

export default Footer
