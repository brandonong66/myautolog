import { useState } from "react"

// components
import { Button } from "../../../components/ui/button"
import Card from "../../../components/Card"
import ConfirmedDelete from "../../../components/ConfirmedDelete"
import ConfirmedSubmit from "../../../components/ConfirmedSubmit"
import Typography from "../../../components/ui/typography"

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
import { deleteResource } from "../../../lib/resourceFunctions"
import { updateResource } from "../../../lib/resourceFunctions"

// icons
import { Pencil } from "lucide-react"

// types
import { ResourceType } from "../../../types/resources"

const resourceSchema = z.object({
  collectionId: z.number(),
  resourceId: z.number(),
  resourceName: z.string().nonempty().max(32),
  resourceBody: z.string().nonempty().max(4096),
})

function ResourceCard({
  resource,
  currentCollectionId,
}: {
  resource: ResourceType
  currentCollectionId: number
}) {
  const [edit, setEdit] = useState(false)

  const form = useForm<z.infer<typeof resourceSchema>>({
    defaultValues: {
      collectionId: currentCollectionId,
      resourceId: resource.resourceId,
      resourceName: resource.resourceName,
      resourceBody: resource.resourceBody,
    },
    mode: "onChange",
    resolver: zodResolver(resourceSchema),
  })

  async function onSubmit(values: z.infer<typeof resourceSchema>) {
    updateResource(values)
      .then(() => window.location.reload())
      .catch((err) => console.log(err))
  }

  return (
    <Card
      className="mx-[4px] group"
      title={edit ? "edit resource" : resource.resourceName}
      titleVariant="h4"
      topRight={
        !edit && (
          <Button
          className="invisible group-hover:visible"
            onClick={() => {
              setEdit(true)
            }}
            variant="outline"
          >
            <Pencil />
          </Button>
        )
      }
    >
      {edit ? (
        <div>
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
                name="resourceId"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        {...field}
                        type="hidden"
                        value={resource.resourceId}
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
                    <FormMessage>
                      {form.formState.errors.resourceName?.message}
                    </FormMessage>
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
                    <FormMessage>
                      {form.formState.errors.resourceBody?.message}
                    </FormMessage>
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2">
                <ConfirmedDelete
                  onConfirm={() =>
                    deleteResource(resource.resourceId).then(() =>
                      window.location.reload()
                    )
                  }
                />
                <ConfirmedSubmit
                  className="ml-auto"
                  onConfirm={form.handleSubmit(onSubmit)}
                  onCancel={() => setEdit(false)}
                />
              </div>
            </form>
          </Form>
        </div>
      ) : (
        <div className="mt-3 whitespace-pre-wrap border-t-2 border-t-slate-300 pt-2">
          <Typography variant="small">{resource.resourceBody}</Typography>
        </div>
      )}
    </Card>
  )
}

export default ResourceCard
