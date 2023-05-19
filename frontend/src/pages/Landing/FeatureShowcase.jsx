import React from "react"
import { Box, Typography } from "@mui/material"
import "./FeatureShowcase.css"
function FeatureShowcase(props) {
  return (
    <div className={"container-" + props?.type}>
      <Box className="text">
        <Typography variant="h1">{props?.title}</Typography>
        <Typography variant="body1">{props?.description}</Typography>
      </Box>
      <Box className="card">
        <p>test</p>
      </Box>
    </div>
  )
}

export default FeatureShowcase
