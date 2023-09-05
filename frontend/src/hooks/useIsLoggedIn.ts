import { useState, useEffect } from "react"
import { validateToken } from "../lib/authFunctions"

export function useIsLoggedIn() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    setIsLoggedIn(validateToken())
  }, [])
  return isLoggedIn
}
