export type CollectionType = {
  collectionId: number
  collectionName: string
}

export type ResourceType = {
  resourceId: number
  collectionId: number
  resourceName: string
  resourceBody: string
}

// for creating resource, no resourceId because it's auto-incremented
export type CreateResourceType = {
  collectionId: number
  resourceName: string
  resourceBody: string
}
