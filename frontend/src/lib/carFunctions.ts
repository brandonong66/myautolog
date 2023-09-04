import axios from "axios"
import { CarType } from "../types/car"

export async function getCars(): Promise<CarType[]> {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_APP_MY_API + "/car/getCars", {
        withCredentials: true,
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data)
        } else {
          reject({
            message: "Unable to connect to the server. Please try again later.",
          })
        }
      })
  })
}

interface addCarParams {
  userLabel?: string
  year: number
  make: string
  model: string
  color?: string
  vin?: string
  licensePlate?: string
  notes?: string
  mileage?: number // for initial mileage tracking
}
export function addCar(params: addCarParams) {
  return new Promise((resolve, reject) => {
    axios
      .post(import.meta.env.VITE_APP_MY_API + "/car/add", params, {
        withCredentials: true,
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data)
        } else {
          reject({
            message: "Unable to connect to the server. Please try again later.",
          })
        }
      })
  })
}

export function updateCar(params: CarType) {
  return new Promise((resolve, reject) => {
    axios
      .put(import.meta.env.VITE_APP_MY_API + "/car/update", params, {
        withCredentials: true,
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data)
        } else {
          reject({
            message: "Unable to connect to the server. Please try again later.",
          })
        }
      })
  })
}

export async function deleteCar(carId: number): Promise<any> {
  try {
    const response = await axios.delete(
      import.meta.env.VITE_APP_MY_API + "/car/delete",
      {
        withCredentials: true,
        params: { carId: carId },
      }
    )
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "An error occurred")
    } else {
      throw new Error(
        "Unable to connect to the server. Please try again later."
      )
    }
  }
}
