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
import { AlertSuccess } from "../../components/ui/alertsuccess"

import { registerUser } from "../../lib/userFunctions"

const formSchema = z
  .object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export default function SignupForm() {
  const [success, setSuccess] = useState(false)
  const [emailError, setEmailError] = useState()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    registerUser(values)
      .then((res) => {
        setEmailError(undefined)
        setSuccess(true)
        console.log(res)
      })
      .catch((err) => {
        setSuccess(false)
        setEmailError(err.error)
        console.log(err)
      })

    console.log(values)
  }

  return (
    <Form {...form}>
      {emailError && <AlertDestructive description={emailError} />}
      {success && <AlertSuccess description="Account Created" />}
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
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex">
          <Button className="ml-auto" variant="accent" type="submit" >
            Sign Up
          </Button>
        </div>
      </form>
    </Form>
  )
}
