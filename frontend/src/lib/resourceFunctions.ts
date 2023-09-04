import axios from "axios"

import {
  CollectionType,
  ResourceType,
  CreateResourceType,
} from "../types/resources"

export async function getCollections(): Promise<CollectionType[]> {
  try {
    const response = await axios.get(
      import.meta.env.VITE_APP_MY_API + "/resources/getCollections",
      {
        withCredentials: true,
      }
    )
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "An error occurred")
    } else {
      throw new Error(
        "Unable to connect to the server. Please try again later."
      )
    }
  }
}

export async function createCollection(collectionName: string): Promise<void> {
  try {
    const response = await axios.post(
      import.meta.env.VITE_APP_MY_API + "/resources/createCollection",
      {
        collectionName,
      },
      {
        withCredentials: true,
      }
    )
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "An error occurred")
    } else {
      throw new Error(
        "Unable to connect to the server. Please try again later."
      )
    }
  }
}

export async function updateCollection(
  collection: CollectionType
): Promise<void> {
  try {
    const response = await axios.put(
      import.meta.env.VITE_APP_MY_API + "/resources/updateCollection",
      {
        collectionId: collection.collectionId,
        collectionName: collection.collectionName,
      },
      {
        withCredentials: true,
      }
    )
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "An error occurred")
    } else {
      throw new Error(
        "Unable to connect to the server. Please try again later."
      )
    }
  }
}

export async function deleteCollection(collectionId: number): Promise<void> {
  try {
    const response = await axios.delete(
      import.meta.env.VITE_APP_MY_API + "/resources/deleteCollection",
      {
        params: {
          collectionId,
        },
        withCredentials: true,
      }
    )
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "An error occurred")
    } else {
      throw new Error(
        "Unable to connect to the server. Please try again later."
      )
    }
  }
}

export async function getAllResources(): Promise<ResourceType[]> {
  try {
    const response = await axios.get(
      import.meta.env.VITE_APP_MY_API + "/resources/getAllResources",
      {
        withCredentials: true,
      }
    )
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "An error occurred")
    } else {
      throw new Error(
        "Unable to connect to the server. Please try again later."
      )
    }
  }
}

export async function createResource(
  resource: CreateResourceType
): Promise<void> {
  try {
    const response = await axios.post(
      import.meta.env.VITE_APP_MY_API + "/resources/createResource",
      {
        collectionId: resource.collectionId,
        resourceName: resource.resourceName,
        resourceBody: resource.resourceBody,
      },
      {
        withCredentials: true,
      }
    )
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "An error occurred")
    } else {
      throw new Error(
        "Unable to connect to the server. Please try again later."
      )
    }
  }
}

export async function updateResource(resource: ResourceType): Promise<void> {
  try {
    const response = await axios.put(
      import.meta.env.VITE_APP_MY_API + "/resources/updateResource",
      {
        resourceId: resource.resourceId,
        collectionId: resource.collectionId,
        resourceName: resource.resourceName,
        resourceBody: resource.resourceBody,
      },
      {
        withCredentials: true,
      }
    )
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "An error occurred")
    } else {
      throw new Error(
        "Unable to connect to the server. Please try again later."
      )
    }
  }
}

export async function deleteResource(resourceId: number): Promise<void> {
  try {
    const response = await axios.delete(
      import.meta.env.VITE_APP_MY_API + "/resources/deleteResource",
      {
        params: {
          resourceId,
        },
        withCredentials: true,
      }
    )
    return response.data
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.error || "An error occurred")
    } else {
      throw new Error(
        "Unable to connect to the server. Please try again later."
      )
    }
  }
}
