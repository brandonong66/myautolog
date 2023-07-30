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
import { CarType } from "../../../types/car"
import { submitOrder } from "../../../lib/expenseFunctions"

const itemSchema = z.object({
  itemName: z.string().nonempty({ message: "Item name required" }),
  itemBrand: z.string(),
  partNumber: z.string(),
  price: z.coerce.number().nonnegative().default(0),
  itemTax: z.coerce.number().nonnegative().default(0),
  quantity: z.coerce.number().gt(0).default(1),
  category: z.string(),
  carId: z.coerce.number(),
  notes: z.string(),
})

const orderSchema = z.object({
  storeOrderId: z.string().nonempty({ message: "Order ID required" }),
  orderDate: z.date(),
  // expectedArrivalDate: z.date().optional(),
  source: z.string().optional(),
  url: z.string().optional(),
  subtotalPrice: z.coerce.number().nonnegative(),
  shippingPrice: z.coerce.number().nonnegative(),
  orderTax: z.coerce.number().nonnegative(),
  totalPrice: z.coerce.number().nonnegative(),
  items: z.array(itemSchema).nonempty(),
})

interface NewOrderFormProps {
  className?: string
}

function NewOrderForm({ className }: NewOrderFormProps) {
  const [cars, setCars] = useState<CarType[]>([])
  const form = useForm<z.infer<typeof orderSchema>>({
    defaultValues: {
      storeOrderId: "",
      orderDate: new Date(),
      source: "",
      url: "",
      subtotalPrice: 0, // string because it's auto formatted into a number
      shippingPrice: 0,
      orderTax: 0,
      totalPrice: 0,
      items: [
        {
          itemName: "",
          itemBrand: "",
          partNumber: "",
          price: 0,
          itemTax: 0,
          quantity: 1,
          carId: cars[0] ? cars[0].carId : 0,
          notes: "",
          category: "Other",
        },
      ],
    },
    mode: "onChange",
    resolver: zodResolver(orderSchema),
  })

  // for dynamic form fields
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "items",
  })

  async function onSubmit(values: z.infer<typeof orderSchema>) {
    console.log(values)
    const orderInfo = {
      storeOrderId: values.storeOrderId,
      orderDate: values.orderDate,
      source: values.source ? values.source : "",
      url: values.url ? values.url : "",
      subtotalPrice: values.subtotalPrice,
      shippingPrice: values.shippingPrice,
      orderTax: values.orderTax,
      totalPrice: values.totalPrice,
    }
    const items = values.items
    submitOrder(orderInfo, items)
  }

  // watch form data for changes
  const { watch } = form
  const watchItems = watch("items")
  const watchSubtotalPrice = watch("subtotalPrice", 0)
  const watchShippingPrice = watch("shippingPrice", 0)
  const watchTotalPrice = watch("totalPrice", 0)

  useEffect(() => {
    // step 1: calculate subtotal based on item prices and quantities
    let newSubtotal = 0
    watchItems.forEach((item) => {
      const itemSubtotal = item.price * item.quantity
      newSubtotal += itemSubtotal
    })
    form.setValue("subtotalPrice", parseFloat(newSubtotal.toFixed(2)))

    // step 2: calculate order tax based on total, subtotal, and shipping
    if (form.getValues("totalPrice") !== 0) {
      const newOrderTax =
        watchTotalPrice - watchSubtotalPrice - watchShippingPrice

      // make sure Total price is valid (greater than subtotal + shipping)
      if (
        newOrderTax < 0 ||
        watchTotalPrice < watchSubtotalPrice + watchShippingPrice
      ) {
        form.setError("totalPrice", {
          type: "manual",
          message: "Total must be greater than subtotal + shipping",
        })
      } else {
        form.clearErrors("totalPrice")
        form.setValue("orderTax", parseFloat(newOrderTax.toFixed(2)))
      }

      // step 3: once order tax is calculated, calculate individual item taxes
      watchItems.forEach((item, index) => {
        const itemTax = (item.price / watchSubtotalPrice) * newOrderTax
        form.setValue(`items.${index}.itemTax`, parseFloat(itemTax.toFixed(2)))
      })
    }
  }, [
    watchItems,
    JSON.stringify(watchItems),
    watchShippingPrice,
    watchSubtotalPrice,
    watchTotalPrice,
    form,
  ]) //stringify necessary for watching an update to an array item field but not the array itself i.e. a new item is added to the array

  useEffect(() => {
    getCars()
      .then((res) => {
        setCars(res)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <Card title="New Order" className={cn("", className)}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="flex gap-4">
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

            <FormField
              control={form.control}
              name="source"
              render={({ field }) => (
                <FormItem className="min-w-[200px]">
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
                <FormItem className="min-w-fit">
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DateInput
              control={form.control}
              name="orderDate"
              label="* Order Date"
              className="w-[200px]"
            />
            {/* <DateInput
              control={form.control}
              name="expectedArrivalDate"
              label="Expected Arrival Date"
              className="w-[200px]"
            /> */}
            <Separator orientation="vertical" />
            <FormField
              control={form.control}
              name="subtotalPrice"
              render={({ field }) => (
                <FormItem className="ml-auto w-20">
                  <FormLabel>* Subtotal</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="shippingPrice"
              render={({ field }) => (
                <FormItem className="w-20">
                  <FormLabel>* Shipping</FormLabel>
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
                <FormItem className="w-20">
                  <FormLabel>* Tax</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalPrice"
              render={({ field }) => (
                <FormItem className="w-20">
                  <FormLabel>* Total</FormLabel>
                  <FormControl>
                    <Input {...field} type="number" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Separator className="my-4" />

          <div className="flex flex-col gap-4">
            {fields.map((item, index) => (
              <Card
                key={item.id}
                title={"Item " + (index + 1)}
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
                  <div className="">
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

                  <div className="">
                    <FormField
                      control={form.control}
                      name={`items.${index}.itemBrand`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand</FormLabel>
                          <FormControl>
                            <Input {...field} type="text" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="">
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
                  <div className="w-28">
                    <FormField
                      control={form.control}
                      name={`items.${index}.category`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue="Other"
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Other">Other</SelectItem>
                                <SelectItem value="Performance">
                                  Performance
                                </SelectItem>
                                <SelectItem value="Maintenance">
                                  Maintenance
                                </SelectItem>
                                <SelectItem value="Cosmetic">
                                  Cosmetic
                                </SelectItem>
                                <SelectItem value="Interior">
                                  Interior
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-28">
                    <FormField
                      control={form.control}
                      name={`items.${index}.carId`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Car</FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={"0"}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="car" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem key={0} value={"0"}>
                                  None
                                </SelectItem>
                                {cars.map((car: CarType) => (
                                  <SelectItem
                                    key={car.carId}
                                    value={car.carId.toString()}
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
                  <Separator orientation="vertical" />
                  <div className="w-20">
                    <FormField
                      control={form.control}
                      name={`items.${index}.itemTax`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>* Tax</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" disabled />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="w-20">
                    <FormField
                      control={form.control}
                      name={`items.${index}.price`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>* Price</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="w-20">
                    <FormField
                      control={form.control}
                      name={`items.${index}.quantity`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>* Qty</FormLabel>
                          <FormControl>
                            <Input {...field} type="number" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-4 flex">
            <Button
              className="m-auto"
              onClick={() => {
                append({
                  itemName: "",
                  itemBrand: "",
                  partNumber: "",
                  notes: "",
                  carId: cars[0].carId,
                  price: 0,
                  itemTax: 0,
                  quantity: 1,
                  category: "Other",
                })
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
