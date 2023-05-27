import React, { useEffect, useState } from "react"
import Card from "../../components/Card"
import { Button, MenuItem, TextField, Typography } from "@mui/material"
import { getMakes } from "../../lib/vehicleAPI"
import "./CarForm.css"

const commonMakes = [
  { name: "Acura", value: "acura" },
  { name: "Audi", value: "audi" },
  { name: "BMW", value: "bmw" },
  { name: "Buick", value: "buick" },
  { name: "Cadillac", value: "cadillac" },
  { name: "Chevrolet", value: "chevrolet" },
  { name: "Chrysler", value: "chrysler" },
  { name: "Dodge", value: "dodge" },
  { name: "Fiat", value: "fiat" },
  { name: "Ford", value: "ford" },
  { name: "Geo", value: "geo" },
  { name: "GMW", value: "gmw" },
  { name: "Honda", value: "honda" },
  { name: "Hummer", value: "hummer" },
  { name: "Hyundai", value: "hyundai" },
  { name: "Infiniti", value: "infiniti" },
  { name: "Isuzu", value: "isuzu" },
  { name: "Jaguar", value: "jaguar" },
  { name: "Jeep", value: "jeep" },
  { name: "Kia", value: "kia" },
  { name: "Land Rover", value: "rover" },
  { name: "Lexus", value: "lexus" },
  { name: "Lincoln", value: "lincoln" },
  { name: "Mazda", value: "mazda" },
  { name: "Mercedes Benz", value: "mercedes-benz" },
  { name: "Mercury", value: "mercury" },
  { name: "Mini", value: "mini" },
  { name: "Mitsubishi", value: "mitsubishi" },
  { name: "Nissan", value: "nissan" },
  { name: "Oldsmobile", value: "oldsmobile" },
  { name: "Peugeot", value: "peugeot" },
  { name: "Plymouth", value: "plymouth" },
  { name: "Pontiac", value: "pontiac" },
  { name: "Porsche", value: "porsche" },
  { name: "Ram", value: "ram" },
  { name: "Renault", value: "renault" },
  { name: "Saab", value: "saab" },
  { name: "Saturn", value: "saturn" },
  { name: "Scion", value: "scion" },
  { name: "Smart", value: "smart" },
  { name: "Subaru", value: "subaru" },
  { name: "Suzuki", value: "suzuki" },
  { name: "Tesla", value: "tesla" },
  { name: "Toyota", value: "toyota" },
  { name: "Volkswagen", value: "volkswagen" },
  { name: "Volvo", value: "volvo" },
]
const years = []
for (let i = new Date().getFullYear(); i >= 1940; i--) {
  years.push(i)
}
function CarForm() {
  const [year, setYear] = useState(null)
  const [make, setMake] = useState(null)
  const [model, setModel] = useState(null)
  const [vin, setVin] = useState(null)
  const [notes, setNotes] = useState(null)

  return (
    <Card title="add a new car">
      <form className="car-form__form">
        <div className="car-form__content-container">
          <div className="car-form__label-container">
            <TextField
              className="car-form__label-input"
              fullWidth
              id="label"
              label="label"
              type="text"
              variant="outlined"
            />
          </div>
          <div className="car-form__required-container">
            <TextField
              id="year"
              label="year"
              required
              type="tel"
              variant="outlined"
            />
            <TextField
              id="make"
              label="make"
              required
              type="text"
              variant="outlined"
            />
            <TextField
              id="model"
              label="model"
              required
              type="text"
              variant="outlined"
            />
          </div>
          <div className="car-form__optional-container">
            <TextField
              id="mileage"
              label="mileage"
              type="tel"
              variant="outlined"
            />
            <TextField id="vin" label="vin" type="text" variant="outlined" />
            <TextField
              id="plate"
              label="license plate"
              type="text"
              variant="outlined"
            />
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
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            className="car-form__submit"
          >
            Submit
          </Button>
        </div>
      </form>
    </Card>
  )
}

export default CarForm
