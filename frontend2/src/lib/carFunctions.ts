import axios from "axios"

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
}

export async function getCars(): Promise<Car[]> {
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
  mileage?: number
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

export function updateCar(params: Car) {
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
