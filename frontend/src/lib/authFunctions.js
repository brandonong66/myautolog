import axios from "axios"

export function authenticateUser(params = {}) {
  return new Promise((resolve, reject) => {
    axios
      .post(process.env.REACT_APP_MY_API + "/auth/login", params, {
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
            error: "Unable to connect to the server. Please try again later.",
          })
        }
      })
  })
}
