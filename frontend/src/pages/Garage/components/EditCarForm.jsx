import React, { useState } from "react"
import { Button, TextField } from "@mui/material"
import "./CarForm.css"

function CarCardEditForm(props) {
  const [formData, setFormData] = useState(props.car)
  
  const handleSubmit = (e) => {
    e.preventDefault()
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
            id="label"
            label="label"
            onChange={handleChange}
            type="text"
            value={formData.label}
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
              type="text"
              value={formData.vin}
              variant="outlined"
            />
            <TextField
              id="plate"
              label="license plate"
              type="text"
              variant="outlined"
              value={formData.plate}
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
          <Button variant="outlined" className="car-form__submit">
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
