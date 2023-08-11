import axios from "axios"

import { CollectionType } from "../types/resources"

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
