import React, { useEffect, useState } from "react"
import "./CarList.css"
import { getCars } from "../../../lib/carFunctions"
import CarCard from "./CarCard"

function CarList(props) {
  const [carsList, setCarsList] = useState(null)
  useEffect(() => {
    getCars()
      .then((res) => {
        setCarsList(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [props.triggerRefresh])

  return (
    <div className="car-list">
      {carsList &&
        carsList.map((car) => {
          return <CarCard car={car} key={car.carId} />
        })}
    </div>
  )
}

export default CarList
