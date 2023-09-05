import { useState } from "react"

// components
import { AlertDestructive } from "../../../components/ui/alertdestructive"
import { Button } from "../../../components/ui/button"
import Card from "../../../components/Card"
import ConfirmedSubmit from "../../../components/ConfirmedSubmit"

// form components
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"
import { Textarea } from "../../../components/ui/textarea"

// functions
import { addCar } from "../../../lib/carFunctions"

interface AddCarFormProps {
  onCancel: () => void
}

const formSchema = z.object({
  userLabel: z.string(),
  year: z.string().transform((val, ctx) => {
    const parsedInt = parseInt(val)
    if (isNaN(parsedInt)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Year must be a number",
      })
      return z.NEVER
    }
    return parsedInt
  }),
  make: z.string(),
  model: z.string(),
  color: z.string(),
  vin: z.string(),
  licensePlate: z.string(),
  notes: z.string(),
})

function AddCarForm({ onCancel }: AddCarFormProps) {
  const [formError, setFormError] = useState()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userLabel: "",
      year: 2000,
      make: "",
      model: "",
      color: "",
      vin: "",
      licensePlate: "",
      notes: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    addCar(values)
      .then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((err) => {
        setFormError(err.error)
        console.log(err)
      })
  }
  return (
    <Card className="w-[40rem]" title="Add Car">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {formError && <AlertDestructive description={formError} />}
          <FormField
            control={form.control}
            name="userLabel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="make"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Make</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>VIN</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="licensePlate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>License Plate</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex">
            <ConfirmedSubmit
              className="my-0 ml-auto"
              onConfirm={form.handleSubmit(onSubmit)}
              onCancel={onCancel}
            />
          </div>
        </form>
      </Form>
    </Card>
  )
}

export default AddCarForm
