import React from "react"
import { Typography } from "@mui/material"
import "./CarCardContent.css"

function CarCardContent(props) {
  return (
    <div className="car-card-content__container">
      <div>
        <Typography variant="h6" component="h3">
          Year: {props.car.year}
        </Typography>
        <Typography variant="h6" component="h3">
          Make: {props.car.make}
        </Typography>
        <Typography variant="h6" component="h3">
          Model: {props.car.model}
        </Typography>
      </div>
      <div>
        <Typography variant="h6" component="h3">
          Mileage: {props.car.mileage}
        </Typography>
        <Typography variant="h6" component="h3">
          Vin: {props.car.vin}
        </Typography>
        <Typography variant="h6" component="h3">
          License Plate: {props.car.plate}
        </Typography>
      </div>
      <div>
        <Typography variant="h6" component="h3">
          Notes: {props.car.notes}
        </Typography>
      </div>
    </div>
  )
}

export default CarCardContent
