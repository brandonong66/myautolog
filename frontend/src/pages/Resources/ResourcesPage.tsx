import { useEffect, useState } from "react"

// components
import Card from "../../components/Card"
import { ScrollArea } from "../../components/ui/scroll-area"
import ResourceCard from "./components/ResourceCard"
import CollectionCard from "./components/CollectionCard"

// functions
import {
  getAllResources,
  getCollections,
} from "../../lib/resourceFunctions"


// sample data
import { sampleCollections, sampleResources } from "./data/sampleData"

// types
import { CollectionType, ResourceType } from "../../types/resources"

// forms
import NewCollectionForm from "./components/NewCollectionForm"
import NewResourceForm from "./components/NewResourceForm"

import "./ResourcesPage.css"

function ResourcesPage() {
  const [collections, setCollections] =
    useState<CollectionType[]>(sampleCollections)
  const [resources, setResources] = useState<ResourceType[]>(sampleResources)
  const [currentCollectionId, setCurrentCollectionId] = useState<number>(-1)

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
    <div className="m-8 flex justify-center gap-4">
      <Card title="collections" className="w-[25rem]">
        <ScrollArea className="h-[70vh] mt-2 p-2">
          <div className="flex flex-col gap-3">
            {collections &&
              collections.map((collection) => (
                <CollectionCard
                  className="hover:cursor-pointer"
                  collection={collection}
                  currentCollectionId={currentCollectionId}
                  onClick={() =>
                    setCurrentCollectionId(collection.collectionId)
                  }
                  key={collection.collectionId}
                />
              ))}
            <NewCollectionForm />
          </div>
        </ScrollArea>
      </Card>
      <Card title="resources" className="w-[90rem]">
        <ScrollArea className="h-[70vh] mt-2 p-2">
          <div className="flex flex-col gap-3 ">
            {resources &&
              resources.map(
                (resource) =>
                  resource.collectionId === currentCollectionId && (
                    <ResourceCard
                      currentCollectionId={currentCollectionId}
                      resource={resource}
                      key={resource.resourceId}
                    />
                  )
              )}
            {currentCollectionId && (
              <NewResourceForm currentCollectionId={currentCollectionId} />
            )}
          </div>
        </ScrollArea>
      </Card>
    </div>
  )
}

export default ResourcesPage
