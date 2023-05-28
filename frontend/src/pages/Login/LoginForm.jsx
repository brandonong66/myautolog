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
import { authenticateUser } from "../../lib/authFunctions"
import "./LoginForm.css"

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
      <div className="login-container">
        <form onSubmit={handleSubmit}>
          <Stack spacing={2} direction="column">
            <Typography
              variant="h4"
              component="h1"
              sx={{ textAlign: "center" }}
            >
              Login
            </Typography>
            {loginStatus.error && (
              <Alert severity="error">{loginStatus.message}</Alert>
            )}
            <TextField
              id="email"
              label="email"
              variant="standard"
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
              variant="standard"
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
      </div>
    </Card>
  )
}

export default LoginForm
