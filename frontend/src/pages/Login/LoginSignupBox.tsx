import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../components/ui/tabs"
import LoginForm from "./LoginForm"
import SignupForm from "./SignupForm"

function LoginSignupBox({ initialTab }: { initialTab: "login" | "signup" }) {
  return (
    <Tabs defaultValue={initialTab} className="w-[400px]">
      <TabsList className="w-full">
        <TabsTrigger value="login" className="w-[50%]">
          Login
        </TabsTrigger>
        <TabsTrigger value="signup" className="w-[50%]">
          Sign Up
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <LoginForm />
      </TabsContent>
      <TabsContent value="signup">
        <SignupForm />
      </TabsContent>
    </Tabs>
  )
}

export default LoginSignupBox
