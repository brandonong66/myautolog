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

// functions
import { deleteCollection } from "../../../lib/resourceFunctions"
import { updateCollection } from "../../../lib/resourceFunctions"

// icons
import { Pencil} from "lucide-react"

// types
import { CollectionType } from "../../../types/resources"

const collectionSchema = z.object({
  collectionId: z.number(),
  collectionName: z.string().nonempty().max(32),
})

function CollectionCard({
  className,
  collection,
  currentCollectionId,
  ...props
}: {
  className?: string
  collection: CollectionType
  currentCollectionId: number
  onClick? : () => void
}) {
  const [edit, setEdit] = useState(false)
  const form = useForm<z.infer<typeof collectionSchema>>({
    defaultValues: {
      collectionId: collection.collectionId,
      collectionName: collection.collectionName,
    },
    mode: "onChange",
    resolver: zodResolver(collectionSchema),
  })

  async function onSubmit(values: z.infer<typeof collectionSchema>) {
    updateCollection(values)
      .then(() => window.location.reload())
      .catch((err) => console.log(err))
  }
  return (
    <Card
      className={
        className +
        " group " +
        (currentCollectionId === collection.collectionId && "border-primary")
      }
      {...props}
    >
      {edit ? (
        <div>
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
                onCancel={() => setEdit(false)}
              />
            </form>
          </Form>
          <ConfirmedDelete
            onConfirm={() =>
              deleteCollection(collection.collectionId).then(() =>
                window.location.reload()
              )
            }
          />
        </div>
      ) : (
        <div className="grid grid-cols-[1fr,max-content] items-center">
          <div className={"overflow-hidden overflow-ellipsis"}>
            <Typography variant="small" className="truncate">
              {collection.collectionName}
            </Typography>
          </div>

          <Button
            className="invisible group-hover:visible"
            onClick={() => setEdit(true)}
            variant="outline"
          >
            <Pencil />
          </Button>
        </div>
      )}
    </Card>
  )
}

export default CollectionCard
