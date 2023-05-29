import React, { useState } from "react"
import { Button, TextField } from "@mui/material"
import Card from "../../../components/Card"
import { addCar } from "../../../lib/carFunctions"
import AddIcon from "@mui/icons-material/Add"
import "./CarForm.css"

// const commonMakes = [
//   { name: "Acura", value: "acura" },
//   { name: "Audi", value: "audi" },
//   { name: "BMW", value: "bmw" },
//   { name: "Buick", value: "buick" },
//   { name: "Cadillac", value: "cadillac" },
//   { name: "Chevrolet", value: "chevrolet" },
//   { name: "Chrysler", value: "chrysler" },
//   { name: "Dodge", value: "dodge" },
//   { name: "Fiat", value: "fiat" },
//   { name: "Ford", value: "ford" },
//   { name: "Geo", value: "geo" },
//   { name: "GMW", value: "gmw" },
//   { name: "Honda", value: "honda" },
//   { name: "Hummer", value: "hummer" },
//   { name: "Hyundai", value: "hyundai" },
//   { name: "Infiniti", value: "infiniti" },
//   { name: "Isuzu", value: "isuzu" },
//   { name: "Jaguar", value: "jaguar" },
//   { name: "Jeep", value: "jeep" },
//   { name: "Kia", value: "kia" },
//   { name: "Land Rover", value: "rover" },
//   { name: "Lexus", value: "lexus" },
//   { name: "Lincoln", value: "lincoln" },
//   { name: "Mazda", value: "mazda" },
//   { name: "Mercedes Benz", value: "mercedes-benz" },
//   { name: "Mercury", value: "mercury" },
//   { name: "Mini", value: "mini" },
//   { name: "Mitsubishi", value: "mitsubishi" },
//   { name: "Nissan", value: "nissan" },
//   { name: "Oldsmobile", value: "oldsmobile" },
//   { name: "Peugeot", value: "peugeot" },
//   { name: "Plymouth", value: "plymouth" },
//   { name: "Pontiac", value: "pontiac" },
//   { name: "Porsche", value: "porsche" },
//   { name: "Ram", value: "ram" },
//   { name: "Renault", value: "renault" },
//   { name: "Saab", value: "saab" },
//   { name: "Saturn", value: "saturn" },
//   { name: "Scion", value: "scion" },
//   { name: "Smart", value: "smart" },
//   { name: "Subaru", value: "subaru" },
//   { name: "Suzuki", value: "suzuki" },
//   { name: "Tesla", value: "tesla" },
//   { name: "Toyota", value: "toyota" },
//   { name: "Volkswagen", value: "volkswagen" },
//   { name: "Volvo", value: "volvo" },
// ]
const years = []
for (let i = new Date().getFullYear(); i >= 1940; i--) {
  years.push(i)
}
function CarForm(props) {
  const [formData, setFormData] = useState({
    label: "",
    year: "",
    make: "",
    model: "",
    mileage: "",
    vin: "",
    licensePlate: "",
    notes: "",
  })
  const [showForm, setShowForm] = useState(false)

  const handleChange = (e) => {
    e.preventDefault()
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    addCar(formData)
      .then((res) => {
        console.log(res)
        props.onFormSubmitSuccess()
        setFormData({
          label: "",
          year: "",
          make: "",
          model: "",
          mileage: "",
          vin: "",
          licensePlate: "",
          notes: "",
        })
        setShowForm(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div>
      {!showForm && (
        <button className="new-car-button" onClick={() => setShowForm(true)}>
          <AddIcon className="add-car-icon" />
        </button>
      )}
      {showForm && (
        <Card title="add a new car">
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
                <Button
                  type="submit"
                  variant="outlined"
                  className="car-form__submit"
                >
                  Submit
                </Button>
                <Button color="error" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </form>
        </Card>
      )}
    </div>
  )
}

export default CarForm
