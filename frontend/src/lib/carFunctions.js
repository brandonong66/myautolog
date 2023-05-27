import axios from "axios"

export async function getCars(userId) {
  //to do
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
        reject(error.response.data)
      })
  })
}
