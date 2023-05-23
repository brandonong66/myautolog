import axios from "axios"
import React, { useState } from "react"
import Card from "../../components/Card"
import {
  Alert,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
} from "@mui/material"

function SignupForm() {
  const [signupInfo, setSignupInfo] = useState({})
  const [passwordMatchError, setPasswordMatchError] = useState(false)
  const [signupStatus, setSignupStatus] = useState({
    success: false,
    error: false,
    message: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (signupInfo.password !== signupInfo.confirmPassword) {
      setPasswordMatchError(true)
      return
    }
    setPasswordMatchError(false)
    axios
      .post("http://localhost:3001/user/signup", {
        email: signupInfo.email,
        password: signupInfo.password,
      })
      .then((res) => {
        setSignupStatus({
          success: true,
          error: false,
          message: "Account Successfully Created",
        })
      })
      .catch((err) => {
        setSignupStatus({
          success: false,
          error: true,
          message: err.response.data.error,
        })
      })
  }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="column">
          <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
            Sign Up
          </Typography>
          {!signupStatus.success && signupStatus.error && (
            <Alert severity="error">{signupStatus.message}</Alert>
          )}
          {signupStatus.success && !signupStatus.error && (
            <Alert severity="success">{signupStatus.message}</Alert>
          )}
          <TextField
            id="email"
            label="email"
            variant="outlined"
            type="email"
            required
            onChange={(e) =>
              setSignupInfo({ ...signupInfo, email: e.target.value })
            }
          />
          <TextField
            id="password"
            label="password"
            type="password"
            variant="outlined"
            required
            onChange={(e) => {
              setSignupInfo({ ...signupInfo, password: e.target.value })
            }}
          />
          <TextField
            id="confirm-password"
            label="confirm password"
            type="password"
            variant="outlined"
            required
            error={passwordMatchError}
            helperText={passwordMatchError && "Passwords do not match"}
            onChange={(e) => {
              setSignupInfo({ ...signupInfo, confirmPassword: e.target.value })
              setPasswordMatchError(false)
            }}
          />
          <Button
            type="submit"
            variant="outlined"
            disabled={passwordMatchError}
          >
            Submit
          </Button>
          <Typography variant="body1" component="p" sx={{ textAlign: "center" }}>
            Already have an account? <Link href="/login">Login</Link>
          </Typography>
        </Stack>
      </form>
    </Card>
  )
}

export default SignupForm
