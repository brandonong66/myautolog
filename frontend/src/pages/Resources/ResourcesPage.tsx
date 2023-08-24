import { useEffect, useState } from "react"

// components
import Card from "../../components/Card"
import PageLayout from "../../components/PageLayout"
import { ScrollArea } from "../../components/ui/scroll-area"
import ConfirmedDelete from "../../components/ConfirmedDelete"
import Typography from "../../components/ui/typography"

// functions
import {
  deleteCollection,
  deleteResource,
  getAllResources,
  getCollections,
} from "../../lib/resourceFunctions"

// types
import { CollectionType, ResourceType } from "../../types/resources"

// forms
import NewCollectionForm from "./components/NewCollectionForm"
import NewResourceForm from "./components/NewResourceForm"

import "./ResourcesPage.css"

function ResourcesPage() {
  const [collections, setCollections] = useState<CollectionType[]>([])
  const [resources, setResources] = useState<ResourceType[]>([])
  const [currentCollectionId, setCurrentCollectionId] = useState<number>()

  useEffect(() => {
    getCollections().then((res) => {
      setCollections(res)
      setCurrentCollectionId(res[0].collectionId)
    })
    getAllResources().then((res) => {
      setResources(res)
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
                    className={
                      "mx-[4px] flex hover:drop-shadow-md" +
                      (currentCollectionId === collection.collectionId
                        ? " border-2 border-primary"
                        : "")
                    }
                    onClick={() =>
                      setCurrentCollectionId(collection.collectionId)
                    }
                    key={collection.collectionId}
                  >
                    <div className="flex w-full items-center justify-between">
                      <div className="flex-grow overflow-hidden overflow-ellipsis">
                        <Typography variant="small" className="truncate">
                          {collection.collectionName}
                        </Typography>
                      </div>

                      <div className="ml-2">
                        <ConfirmedDelete
                          onConfirm={() =>
                            deleteCollection(collection.collectionId).then(() =>
                              window.location.reload()
                            )
                          }
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              <NewCollectionForm />
            </div>
          </ScrollArea>
        </Card>
        <Card title="Resources" className="w-[90rem]">
          <ScrollArea className="h-[70vh] p-3">
            <div className="flex flex-col gap-3 ">
              {resources &&
                resources.map(
                  (resource) =>
                    resource.collectionId === currentCollectionId && (
                      <Card
                        className="mx-[4px]  hover:drop-shadow-md"
                        key={resource.resourceId}
                      >
                        <div>
                          <Typography variant="h4" className="text-center">
                            {resource.resourceName}
                          </Typography>
                        </div>
                        <div>
                          <Typography variant="small">
                            {resource.resourceBody}
                          </Typography>
                        </div>
                        <ConfirmedDelete
                          className="float-right"
                          onConfirm={() =>
                            deleteResource(resource.resourceId).then(() =>
                              window.location.reload()
                            )
                          }
                        />
                      </Card>
                    )
                )}
              {currentCollectionId && (
                <NewResourceForm currentCollectionId={currentCollectionId} />
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>
    </PageLayout>
  )
}

export default ResourcesPage
