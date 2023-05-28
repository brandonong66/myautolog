import React from "react"
import { Box, Paper, Typography } from "@mui/material"
import "./Card.css"

function Card(props) {
  return (
    <Box component={Paper} className="card">
      {props.title && (
        <div className="card-title">
          <Typography variant="h5" component="h2">
            {props.title}
          </Typography>
        </div>
      )}
      {props.children}
    </Box>
  )
}

export default Card
