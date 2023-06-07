import { useEffect, useState } from "react"
import { getCars } from "../../../lib/carFunctions"
import CarCard from "./CarCard"

interface Car {
  carId: number
  userLabel?: string
  year: number
  make: string
  model: string
  color?: string
  vin?: string
  licensePlate?: string
  notes?: string
  mileage?: number
}

function CarList() {
  const [cars, setCars] = useState<Car[]>([])

  useEffect(() => {
    getCars()
      .then((cars) => {
        setCars(cars)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className="flex flex-col gap-4">
      {cars &&
        cars.map((car) => {
          return <CarCard key={car.carId} car={car} />
        })}
    </div>
  )
}

export default CarList
