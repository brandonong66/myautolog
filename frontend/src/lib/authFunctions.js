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
        reject(error.response.data)
      })
  })
}
