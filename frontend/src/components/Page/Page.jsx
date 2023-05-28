import React from 'react'
import { Typography } from '@mui/material'
import './Page.css'

function Page(props) {
  return (
    <div className="page">
        <Typography variant="h2" component="h1" sx={{ textAlign: "center" }}>
            {props.title}
        </Typography>
        {props.children}
    </div>
  )
}

export default Page