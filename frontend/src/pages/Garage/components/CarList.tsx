import { useEffect, useState } from "react"

// components
import CarCard from "./CarCard"
import { Button } from "../../../components/ui/button"

// form
import AddCarForm from "./AddCarForm"

// functions
import { getCars } from "../../../lib/carFunctions"

// icons
import { Plus } from "lucide-react"

// sample data
import { sampleCars } from "./sampledata"

// types
import { CarType } from "../../../types/car"
import { useIsLoggedIn } from "../../../hooks/useIsLoggedIn"

function CarList() {
  const [cars, setCars] = useState<CarType[]>(sampleCars)
  const [edit, setEdit] = useState(false)
  const isLoggedIn = useIsLoggedIn()
  useEffect(() => {
    if (isLoggedIn) {
      getCars()
        .then((cars) => {
          setCars(cars)
        })
        .catch((error) => {
          console.log(error)
        })
    }
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
        <Button
          className="m-auto"
          onClick={() => setEdit(true)}
          variant="accent"
        >
          <Plus />
        </Button>
      )}
    </div>
  )
}

export default CarList
