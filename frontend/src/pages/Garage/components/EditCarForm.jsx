import React, { useState } from "react"
import { Button, TextField } from "@mui/material"
import { updateCar } from "../../../lib/carFunctions"
import "./CarForm.css"

function CarCardEditForm(props) {
  const [formData, setFormData] = useState({
    carId: props.car.carId,
    userLabel: props.car.userLabel || "",
    year: props.car.year || "",
    make: props.car.make || "",
    model: props.car.model || "",
    mileage: props.car.mileage || "",
    vin: props.car.vin || "",
    licensePlate: props.car.licensePlate || "",
    notes: props.car.notes || "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    updateCar(formData)
      .then((res) => {
        props.onFormSubmitSuccess()
        setFormData({
          carId: props.carId,
          userLabel: "",
          year: "",
          make: "",
          model: "",
          mileage: "",
          vin: "",
          licensePlate: "",
          notes: "",
        })
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const handleChange = (e) => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  return (
    <form className="car-form__form" onSubmit={handleSubmit}>
      <div className="car-form__content-container">
        <div className="car-form__label-container">
          <TextField
            className="car-form__label-input"
            fullWidth
            id="userLabel"
            label="label"
            onChange={handleChange}
            type="text"
            value={formData.userLabel}
            variant="outlined"
          />
        </div>
        <div className="car-form__body">
          <div className="car-form__required-container">
            <TextField
              id="year"
              InputLabelProps={{
                shrink: true,
              }}
              label="year"
              onChange={handleChange}
              required
              type="number"
              value={formData.year}
              variant="outlined"
            />
            <TextField
              id="make"
              label="make"
              onChange={handleChange}
              required
              type="text"
              value={formData.make}
              variant="outlined"
            />
            <TextField
              id="model"
              label="model"
              onChange={handleChange}
              required
              type="text"
              value={formData.model}
              variant="outlined"
            />
          </div>
          <div className="car-form__optional-container">
            <TextField
              id="mileage"
              InputLabelProps={{
                shrink: true,
              }}
              label="mileage"
              onChange={handleChange}
              type="number"
              value={formData.mileage}
              variant="outlined"
            />
            <TextField
              id="vin"
              label="vin"
              onChange={handleChange}
              type="text"
              value={formData.vin}
              variant="outlined"
            />
            <TextField
              id="licensePlate"
              label="license plate"
              type="text"
              variant="outlined"
              value={formData.licensePlate}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="car-form__notes-container">
          <TextField
            className="car-form__notes-input"
            fullWidth
            id="notes"
            label="notes"
            multiline
            rows={4}
            type="text"
            variant="outlined"
            onChange={handleChange}
          />
        </div>
        <div className="car-form__button-container">
          <Button type="submit" variant="outlined" className="car-form__submit">
            Submit
          </Button>
          <Button color="error" onClick={props.onCancel}>
            Cancel
          </Button>
          <Button
            color="error"
            onClick={() => window.confirm("delete")}
            sx={{ marginRight: "auto" }}
          >
            Delete
          </Button>
        </div>
      </div>
    </form>
  )
}

export default CarCardEditForm
