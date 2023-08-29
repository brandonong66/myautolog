// components
import LoginSignupBox from "./LoginSignupBox"

// css
import "./LoginPage.css"

function LoginPage() {
  return (
    <div className="login-bg">
      <div className="grid min-h-screen place-items-center max-w-3xl bg-white overflow-auto">
        <LoginSignupBox />
      </div>
    </div>
  )
}

export default LoginPage
