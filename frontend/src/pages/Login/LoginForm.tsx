import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Button } from "../../components/ui/button"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"
import { useState } from "react"
import { AlertDestructive } from "../../components/ui/alertdestructive"

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string(),
})

export default function LoginForm() {
  const [loginError, setLoginError] = useState()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const { authenticateUser } = await import("../../lib/authFunctions")
    console.log(values)
    authenticateUser(values)
      .then((res) => {
        // window.location.assign("/")
      })
      .catch((err) => {
        setLoginError(err.error)
        console.log(err)
      })
  }

  return (
    <Form {...form}>
      {loginError && <AlertDestructive description={loginError} />}
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} type="text" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex">
          <Button type="submit" className="ml-auto">
            Login
          </Button>
        </div>
      </form>
    </Form>
  )
}
