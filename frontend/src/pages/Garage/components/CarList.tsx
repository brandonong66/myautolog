import { useEffect, useState } from "react"
import { getCars } from "../../../lib/carFunctions"
import CarCard from "./CarCard"
import { Button } from "../../../components/ui/button"
import AddCarForm from "./AddCarForm"

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
  const [edit, setEdit] = useState(false)

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
      {edit ? (
        <AddCarForm onCancel={() => setEdit(false)} />
      ) : (
        <Button className="m-auto w-[25%]" onClick={() => setEdit(true)}>
          Add Car
        </Button>
      )}
    </div>
  )
}

export default CarList
