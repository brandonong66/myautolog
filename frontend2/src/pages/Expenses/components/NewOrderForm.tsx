import Card from "../../../components/Card/Card"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
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

const formSchema = z.object({
  storeOrderId: z.string(),
  orderDate: z.date(),
  expectedArrivalDate: z.date(),
  source: z.string(),
  url: z.string(),
  subtotalPrice: z.number(),
  shippingPrice: z.number(),
  orderTax: z.number(),
  totalPrice: z.number(),
})

function NewOrderForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storeOrderId: "",
      source: "",
      url: "",
      subtotalPrice: 0,
      shippingPrice: 0,
      orderTax: 0,
      totalPrice: 0,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    console.log("test")
  }

  return (
    <Card title="New Order">
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
                <FormLabel>Order ID</FormLabel>
                <FormControl>
                  <Input {...field} type="text" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <div className="flex gap-4">
            <DateInput control={form.control} name="orderDate" />
          </div>
          <div className="flex gap-4">
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
          </div> */}
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
