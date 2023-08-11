import { useEffect, useState } from "react"

// icons
import { Trash2 } from "lucide-react"

// components
import { Button } from "../../components/ui/button"
import Card from "../../components/Card"
import PageLayout from "../../components/PageLayout"
import { ScrollArea } from "../../components/ui/scroll-area"

// functions
import { getCollections } from "../../lib/resourceFunctions"
import { CollectionType } from "../../types/resources"
import NewCollectionForm from "./components/NewCollectionForm"
import Typography from "../../components/ui/typography"

function ResourcesPage() {
  const [collections, setCollections] = useState<CollectionType[]>([])

  useEffect(() => {
    getCollections().then((res) => {
      setCollections(res)
    })
  }, [])

  return (
    <PageLayout title="Resources">
      <div className="flex justify-center gap-4">
        <Card title="Collections" className="w-[25rem]">
          <ScrollArea className="h-[70vh]">
            <div className="flex flex-col gap-3">
              {collections &&
                collections.map((collection) => (
                  <Card
                    className="m-[2px] flex hover:drop-shadow-md"
                    key={collection.collectionId}
                  >
                    <Typography className="leading-[100%]" variant="small">
                      {collection.collectionName}
                    </Typography>
                    {/* <Button className="ml-auto display:none" variant="destructive">
                      <Trash2 />
                    </Button> */}
                  </Card>
                ))}
              <NewCollectionForm />
            </div>
          </ScrollArea>
        </Card>
        <Card title="Resources" className="w-[90rem]">
          <ScrollArea className="h-[70vh] p-3">
            <div className="flex flex-col gap-3 ">
              <div className="h-20 rounded-md border-2 hover:bg-secondary/90">
                <p>test</p>
              </div>
              <Button className="h-20 w-full">+</Button>
            </div>
          </ScrollArea>
        </Card>
      </div>
    </PageLayout>
  )
}

export default ResourcesPage
