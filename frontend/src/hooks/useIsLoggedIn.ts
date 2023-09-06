import { useState } from "react"
import { validateToken } from "../lib/authFunctions"

export function useIsLoggedIn() {
  const [isLoggedIn] = useState(validateToken())
  return isLoggedIn
}
