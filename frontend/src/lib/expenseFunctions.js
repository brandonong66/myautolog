import axios from "axios"

export async function getExpenses() {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_APP_MY_API + "/expense/getExpenses", {
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

export async function getOrders(){
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_APP_MY_API + "/expense/getOrders", {
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