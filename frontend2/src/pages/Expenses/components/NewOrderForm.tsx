import { useEffect, useState } from "react"
import Card from "../../../components/Card/Card"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm, useFieldArray } from "react-hook-form"
import { Button } from "../../../components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form"
import { DateInput } from "../../../components/DateInput"
import { Input } from "../../../components/ui/input"
import { Separator } from "../../../components/ui/separator"
import { cn } from "../../../lib/utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select"
import { getCars } from "../../../lib/carFunctions"

const itemSchema = z.object({
  itemName: z.string(),
  itemBrand: z.string().optional(),
  partNumber: z.string().optional(),
  price: z.string().transform((val, ctx) => {
    const parsedInt = parseInt(val)
    if (isNaN(parsedInt)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Price must be a number",
      })
      return z.NEVER
    }
    return parsedInt
  }),
  itemTax: z.string().transform((val, ctx) => {
    const parsedInt = parseInt(val)
    if (isNaN(parsedInt)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Item Tax must be a number",
      })
      return z.NEVER
    }
    return parsedInt
  }),
  quantity: z.string().transform((val, ctx) => {
    const parsedInt = parseInt(val)
    if (isNaN(parsedInt)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Quantity must be a number",
      })
      return z.NEVER
    }
    return parsedInt
  }),
  categoryId: z.number().optional(),
  carId: z.number().optional(),
  notes: z.string().optional(),
})

const formSchema = z.object({
  storeOrderId: z.string(),
  orderDate: z.date(),
  expectedArrivalDate: z.date().optional(),
  source: z.string().optional(),
  url: z.string().optional(),
  subtotalPrice:
    z.number() ||
    z.string().transform((val, ctx) => {
      const parsedInt = parseInt(val)
      if (isNaN(parsedInt)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Subtotal Price must be a number",
        })
        return z.NEVER
      }
      return parsedInt
    }),
  shippingPrice:
    z.number() ||
    z.string().transform((val, ctx) => {
      const parsedInt = parseInt(val)
      if (isNaN(parsedInt)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Shipping Price must be a number",
        })
        return z.NEVER
      }
      return parsedInt
    }),
  orderTax:
    z.number() ||
    z.string().transform((val, ctx) => {
      const parsedInt = parseInt(val)
      if (isNaN(parsedInt)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Order Tax must be a number",
        })
        return z.NEVER
      }
      return parsedInt
    }),
  totalPrice:
    z.number() ||
    z.string().transform((val, ctx) => {
      const parsedInt = parseInt(val)
      if (isNaN(parsedInt)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Total Price must be a number",
        })
        return z.NEVER
      }
      return parsedInt
    }),
  items: z.array(itemSchema),
})

interface NewOrderFormProps {
  className?: string
}

function NewOrderForm({ className }: NewOrderFormProps) {
  const [cars, setCars] = useState([])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeOrderId: "",
      orderDate: new Date(),
      source: "",
      url: "",
      subtotalPrice: 0,
      shippingPrice: 0,
      orderTax: 0,
      totalPrice: 0,
      items: [{ quantity: "1" }], // string because it's auto formatted into a number
    },
  })

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
  }

  useEffect(() => {
    getCars()
      .then((res) => {
        console.log(res)
        setCars(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Card title="New Order" className={cn("", className)}>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="storeOrderId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>*Order Id</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-4">
            <DateInput
              control={form.control}
              name="orderDate"
              label="* Order Date"
              className="w-full"
            />
            <DateInput
              control={form.control}
              name="expectedArrivalDate"
              label="Expected Arrival Date"
              className="w-full"
            />
            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Source</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex w-full gap-4">
            <FormField
              control={form.control}
              name="subtotalPrice"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>* Subtotal Price</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingPrice"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>* Shipping Price</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="orderTax"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>* Order Tax</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalPrice"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>* Total Price</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator />
          <div className="flex flex-col gap-4">
            {fields.map((item, index) => (
              <Card
                key={item.id}
                title="Item 1"
                titleVariant="h3"
                topRight={
                  <Button
                    onClick={() => {
                      remove(index)
                    }}
                    variant="destructive"
                  >
                    delete
                  </Button>
                }
              >
                <div className="flex gap-4">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name={`items.${index}.itemName`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>* Item Name</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-[100px]">
                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>* Quantity</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" defaultValue={1} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-full">
                    {" "}
                    <FormField
                      control={form.control}
                      name={`items.${index}.itemBrand`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Item Brand</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name={`items.${index}.partNumber`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Part Number</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name={`items.${index}.itemTax`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>* Tax</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name={`items.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>* Price</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name={`items.${index}.categoryId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-full">
                    <FormField
                      control={form.control}
                      name={`items.${index}.carId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Car</FormLabel>
                          <FormControl>
                            <Select>
                              <SelectTrigger>
                                <SelectValue {...field} placeholder="car" />
                              </SelectTrigger>
                              <SelectContent>
                                {cars.map((car) => (
                                  <SelectItem
                                    key={car.carId}
                                    value={car.carId}
                                  >
                                    {car.userLabel}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name={`items.${index}.notes`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </Card>
            ))}
          </div>
          <div className="flex">
            <Button
              className="m-auto"
              onClick={() => {
                append({ itemName: "" })
              }}
            >
              Add Item
            </Button>
          </div>
          <div className="flex">
            <Button type="submit" className="ml-auto">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </Card>
  )
}

export default NewOrderForm
