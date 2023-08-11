import { useState } from "react"

// components
import Card from "../../../components/Card"
import { Button } from "../../../components/ui/button"

// form components
import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form"
import { Input } from "../../../components/ui/input"

// functions
import { createCollection } from "../../../lib/resourceFunctions"

const collectionSchema = z.object({
  collectionName: z.string().nonempty().max(32),
})
function NewCollectionForm() {
  const [showForm, setShowForm] = useState(false)
  const form = useForm<z.infer<typeof collectionSchema>>({
    defaultValues: {
      collectionName: "",
    },
    mode: "onChange",
    resolver: zodResolver(collectionSchema),
  })

  async function onSubmit(values: z.infer<typeof collectionSchema>) {
    createCollection(values.collectionName)
      .then((_) => window.location.reload())
      .catch((err) => console.log(err))
  }
  return (
    <>
      {!showForm ? (
        <Button className="h-14 w-full" onClick={() => setShowForm(true)}>
          +
        </Button>
      ) : (
        <Card className="mx-1" titleVariant="h4" title="New Collection">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="collectionName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name*</FormLabel>
                    <FormControl>
                      <Input {...field} type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="mt-4 flex justify-end gap-4">
                <Button
                  className="w-full bg-background hover:bg-background/90"
                  onClick={() => setShowForm(false)}
                  variant="outline"
                >
                  Cancel
                </Button>
                <Button className="w-full" type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </Card>
      )}
    </>
  )
}

export default NewCollectionForm
