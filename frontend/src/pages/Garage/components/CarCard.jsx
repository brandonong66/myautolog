import React, { useEffect, useState } from "react"
import Card from "../../../components/Card"
import "./CarCard.css"
import E30Icon from "../../../assets/icons/E30Icon"
import EditIcon from "@mui/icons-material/Edit"
import { Button, Typography } from "@mui/material"
import CarCardContent from "./CarCardContent"
import EditCarForm from "./EditCarForm"
import "./CarCard.css"

function CarCard(props) {
  const [edit, setEdit] = useState(false)

  useEffect(() => {}, [edit])

  return (
    <Card>
      <div className="car-card">
        <div className="car-card__title-container">
          <div className="car-icon-container">
            <E30Icon className="car-icon" fill="#000000" />
          </div>
          <div className="car-card__title">
            <Typography variant="h5" component="h2">
              {props.car.label
                ? props.car.label
                : `${props.car.year} ${props.car.make} ${props.car.model}`}
            </Typography>
          </div>

          {!edit && (
            <div className="edit-icon-container">
              <Button className="edit-button" onClick={() => setEdit(true)}>
                <EditIcon className="edit-icon" />
              </Button>
            </div>
          )}
        </div>
        {!edit && <CarCardContent car={props.car} />}
        {edit && (
          <EditCarForm car={props.car} onCancel={() => setEdit(false)} />
        )}
      </div>
    </Card>
  )
}

export default CarCard
