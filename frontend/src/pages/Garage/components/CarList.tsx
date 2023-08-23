import { useEffect, useState } from "react"

// functions
import { getCars } from "../../../lib/carFunctions"

// components
import CarCard from "./CarCard"
import { Button } from "../../../components/ui/button"

// icons
import { Plus } from "lucide-react"
// form
import AddCarForm from "./AddCarForm"

// types
import { CarType } from "../../../types/car"


function CarList() {
  const [cars, setCars] = useState<CarType[]>([])
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
        <Button className="m-auto" onClick={() => setEdit(true)}>
          <Plus />
        </Button>
      )}
    </div>
  )
}

export default CarList
