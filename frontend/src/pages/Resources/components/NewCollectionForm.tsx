import { useState } from "react"

// components
import Card from "../../../components/Card"
import { Button } from "../../../components/ui/button"
import ConfirmedSubmit from "../../../components/ConfirmedSubmit"

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

// icons
import { Plus } from "lucide-react"

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
        <div className="flex justify-center">
          <Button onClick={() => setShowForm(true)}>
            <Plus />
          </Button>
        </div>
      ) : (
        <Card className="mx-1" titleVariant="h4" title="New Collection">
          <Form {...form}>
            <form>
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
              <ConfirmedSubmit
                className="float-right"
                onConfirm={form.handleSubmit(onSubmit)}
                onCancel={() => setShowForm(false)}
              />
            </form>
          </Form>
        </Card>
      )}
    </>
  )
}

export default NewCollectionForm
