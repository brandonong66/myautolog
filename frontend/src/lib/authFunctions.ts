import axios from "axios"
import Cookies from "js-cookie"

interface userParams {
  email: string
  password: string
}

export function authenticateUser(params: userParams) {
  return new Promise((resolve, reject) => {
    axios
      .post(import.meta.env.VITE_APP_MY_API + "/auth/login", params, {
        withCredentials: true,
      })
      .then((response) => {
        resolve(response.data)
        window.location.href = "/expenses"
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

export function validateToken() {
  // if no token, return false
  const clientAuthToken = Cookies.get("clientAuthToken")
  if (clientAuthToken === undefined) {
    return false
  }

  // if token, check if expired
  else {
    const jwtPayload = JSON.parse(window.atob(clientAuthToken.split(".")[1]))
    const isValid = Date.now() < jwtPayload.exp * 1000

    //if expired, logout
    if (!isValid) {
      logout()
    }

    return isValid
  }
}

export function logout() {
  return new Promise((resolve, reject) => {
    axios
      .post(
        import.meta.env.VITE_APP_MY_API + "/auth/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        resolve(response.data)
        window.location.href = "/"
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
