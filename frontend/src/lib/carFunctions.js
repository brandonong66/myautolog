import axios from "axios"

export async function getCars() {
  return new Promise((resolve, reject) => {
    axios
      .get(process.env.REACT_APP_MY_API + "/car/getCars", {
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

export function addCar(params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_MY_API + "/car/add", params, {
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
