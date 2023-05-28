import React from "react"
import { Typography } from "@mui/material"
import "./NavLink.css"

function NavLink(props) {
  return (
    <a className="nav-link" href={props.href} onClick={props.onClick}>
      <div className="nav-item">
        <div>{props.icon}</div>
        <div>
          <Typography className="nav-text" variant="h6" underline="none">
            {props.text}
          </Typography>
        </div>
      </div>
    </a>
  )
}

export default NavLink
