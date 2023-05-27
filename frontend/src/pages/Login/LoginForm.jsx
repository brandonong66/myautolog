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
import axios from "axios"
import { authenticateUser } from "../../lib/authFunctions"

function LoginForm() {
  const [loginInfo, setLoginInfo] = useState({})
  const [loginStatus, setLoginStatus] = useState({
    success: false,
    error: false,
    message: "",
  })
  const handleSubmit = async (e) => {
    e.preventDefault()

    authenticateUser(loginInfo)
      .then((res) => {
        window.location.assign("/")
      })
      .catch((err) => {
        setLoginStatus({
          success: false,
          error: true,
          message: err.error,
        })
      })
  }
  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction="column">
          <Typography variant="h4" component="h1" sx={{ textAlign: "center" }}>
            Login
          </Typography>
          {loginStatus.error && (
            <Alert severity="error">{loginStatus.message}</Alert>
          )}
          <TextField
            id="email"
            label="email"
            variant="outlined"
            type="email"
            required
            onChange={(e) =>
              setLoginInfo({ ...loginInfo, email: e.target.value })
            }
          />
          <TextField
            id="password"
            label="password"
            type="password"
            variant="outlined"
            required
            onChange={(e) => {
              setLoginInfo({ ...loginInfo, password: e.target.value })
            }}
          />
          <Button variant="outlined" type="submit">
            Submit
          </Button>
          <Typography variant="body1" component="p">
            Don't have an account? <Link href="/signup">Sign Up</Link>
          </Typography>
        </Stack>
      </form>
    </Card>
  )
}

export default LoginForm
