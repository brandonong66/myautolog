import { useState } from "react"

// components
import Card from "../../../components/Card"
import Typography from "../../../components/ui/typography"
import { Button } from "../../../components/ui/button"
import ConfirmedDelete from "../../../components/ConfirmedDelete"
import ConfirmedSubmit from "../../../components/ConfirmedSubmit"

// form components
import { Input } from "../../../components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Textarea } from "../../../components/ui/textarea"

// functions
import { deleteCar, updateCar } from "../../../lib/carFunctions"

// icons
import { Pencil } from "lucide-react"

interface Car {
  carId: number
  userLabel?: string
  year: number
  make: string
  model: string
  color?: string
  vin?: string
  licensePlate?: string
  notes?: string
}

const formSchema = z.object({
  carId: z.number(),
  userLabel: z.string(),
  year: z.number().min(1900).max(2100),
  make: z.string(),
  model: z.string(),
  color: z.string(),
  vin: z.string(),
  licensePlate: z.string(),
  notes: z.string(),
})

function CarCard({ car }: { car: Car }) {
  const [edit, setEdit] = useState(false)

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      carId: car.carId,
      userLabel: car.userLabel,
      year: car.year,
      make: car.make,
      model: car.model,
      color: car.color || "",
      vin: car.vin || "",
      licensePlate: car.licensePlate || "",
      notes: car.notes || "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    updateCar(values)
      .then((res) => {
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <Card title={car.userLabel} className="group w-[40rem]">
      <div>
        {!edit ? (
          <>
            <div className="flex">
              <div className="w-1/2">
                <Typography variant="p">
                  <b>Year:</b> {car.year}
                </Typography>
                <Typography variant="p">
                  <b>Make:</b> {car.make}
                </Typography>
                <Typography variant="p">
                  <b>Model:</b> {car.model}
                </Typography>
              </div>
              <div className=" w-1/2">
                <Typography variant="p">
                  <b>Color:</b> {car.color}
                </Typography>
                <Typography variant="p">
                  <b>VIN:</b> {car.vin}
                </Typography>
                <Typography variant="p">
                  <b>License Plate:</b> {car.licensePlate}
                </Typography>
              </div>
            </div>

            <div className="mt-2 w-full">
              <Typography variant="p">
                <b>Notes:</b> {car.notes}
              </Typography>
            </div>
          </>
        ) : (
          <>
            <Typography variant="h4"> Edit Car</Typography>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="userLabel"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Label</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
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
                          <Input {...field} type="number" />
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
                          <Input {...field} type="text" />
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
                          <Input {...field} type="text" />
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
                          <Input {...field} type="text" />
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
                          <Input {...field} type="text" />
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
                          <Input {...field} type="text" />
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
                <div className="grid grid-cols-2">
                  <ConfirmedDelete
                    className="my-0"
                    onConfirm={() => {
                      deleteCar(car.carId).then(() => window.location.reload())
                    }}
                  />

                  <ConfirmedSubmit
                    className="my-0 ml-auto"
                    onCancel={() => setEdit(false)}
                    onConfirm={form.handleSubmit(onSubmit)}
                  />
                </div>
              </form>
            </Form>
          </>
        )}

        {!edit && (
          <div className=" mt-2 flex gap-2">
            <Button
              className="ml-auto invisible group-hover:visible"
              onClick={() => setEdit(true)}
              variant="outline"
            >
              <Pencil />
            </Button>
          </div>
        )}
      </div>
    </Card>
  )
}

export default CarCard
