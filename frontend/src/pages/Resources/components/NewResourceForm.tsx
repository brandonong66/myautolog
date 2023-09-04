import { useEffect, useState } from "react"

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
import { Textarea } from "../../../components/ui/textarea"

// functions
import { createResource } from "../../../lib/resourceFunctions"

// icons
import { Plus } from "lucide-react"

const resourceSchema = z.object({
  collectionId: z.number(),
  resourceName: z.string().nonempty().max(32),
  resourceBody: z.string().nonempty().max(4096),
})

function NewResourceForm({
  currentCollectionId,
}: {
  currentCollectionId: number
}) {
  const [showForm, setShowForm] = useState(false)
  const form = useForm<z.infer<typeof resourceSchema>>({
    defaultValues: {
      collectionId: currentCollectionId,
      resourceName: "",
      resourceBody: "",
    },
    mode: "onChange",
    resolver: zodResolver(resourceSchema),
  })

  async function onSubmit(values: z.infer<typeof resourceSchema>) {
    console.log(values)
    createResource(values)
      .then(() => window.location.reload())
      .catch((err) => console.log(err))
  }

useEffect(() => {
    form.reset({
      collectionId: currentCollectionId,
      resourceName: "",
      resourceBody: "",
    });
  }, [currentCollectionId, form.reset, form]);

  return (
    <>
      {showForm ? (
        <Card className="mx-1" titleVariant="h4" title="New Resource">
          <Form {...form}>
            <form>
              <FormField
                control={form.control}
                name="collectionId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="hidden"
                        value={currentCollectionId}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="resourceName"
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
              <FormField
                control={form.control}
                name="resourceBody"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Body*</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
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
      ) : (
        <div className="flex justify-center">
          <Button variant="accent" onClick={() => setShowForm(true)}>
            <Plus />
          </Button>
        </div>
      )}
    </>
  )
}

export default NewResourceForm
