import axios from "axios"


interface userParams {
    email: string
    password: string
  }

export function registerUser(params: userParams) {
  return new Promise((resolve, reject) => {
    axios
      .post(import.meta.env.VITE_APP_MY_API + "/user/signup", params)
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data)
        } else {
          reject({
            error: "Unable to connect to the server. Please try again later.",
          })
        }
      })
  })
}
