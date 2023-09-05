// components
import LoginSignupBox from "./LoginSignupBox"

// css
import "./LoginPage.css"

function LoginPage({
  initialTab = "login",
}: {
  initialTab: "login" | "signup"
}) {
  return (
    <div className="login-bg">
      <div className="grid min-h-screen max-w-3xl place-items-center overflow-auto bg-white">
        <LoginSignupBox initialTab={initialTab} />
      </div>
    </div>
  )
}

export default LoginPage
