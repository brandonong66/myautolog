import Card from "../../../components/Card/Card"
import { useEffect, useState } from "react"
import { getCars } from "../../../lib/carFunctions"
import Typography from "../../../components/ui/typography"
import { Edit } from "lucide-react"

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
        console.log(cars)
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
          return (
            <Card
              key={car.carId}
              title={car.userLabel}
              className="max-w-[40rem] group"
            >
              <div className="px-2 pt-2">
                <div className="flex">
                  <div className="w-1/2">
                    <Typography variant="p">
                      <b>Year:</b> {car.year}
                    </Typography>
                    <Typography variant="p">
                      <b>Make:</b> {car.make}
                    </Typography>
                    <Typography variant="p">
                      <b>Model:</b> {car.model}
                    </Typography>
                  </div>
                  <div className=" w-1/2">
                    <Typography variant="p">
                      <b>Color:</b> {car.color}
                    </Typography>
                    <Typography variant="p">
                      <b>VIN:</b> {car.vin}
                    </Typography>
                    <Typography variant="p">
                      <b>License Plate:</b> {car.licensePlate}
                    </Typography>
                  </div>
                </div>
                <div className="mt-2 w-full">
                  <Typography variant="p">
                    <b>Notes:</b> {car.notes}
                  </Typography>
                </div>
                <div className=" mt-2 flex justify-center">
                  <span className="group-hover:block hidden hover:text-primary">
                    <Edit />
                  </span>
                </div>
              </div>
            </Card>
          )
        })}
    </div>
  )
}

export default CarList
