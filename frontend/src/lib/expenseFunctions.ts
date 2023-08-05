import axios, { AxiosError } from "axios"
import { OrderType, ItemType } from "../types/expenses"

interface expenseData {
  storeOrderId: string
  orderDate: string
  source: string
  url: string
  itemId: number
  itemName: string
  itemBrand: string
  partNumber: string
  notes: string
  quantity: number
  price: number
  itemTax: number
  userLabel: string
  category: string
}

export async function getExpenses(): Promise<expenseData[]> {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_APP_MY_API + "/expense/getExpenses", {
        withCredentials: true,
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data)
        } else {
          reject({
            message: "Unable to connect to the server. Please try again later.",
          })
        }
      })
  })
}

export async function getOrders(): Promise<OrderType[]> {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_APP_MY_API + "/expense/getOrders", {
        withCredentials: true,
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data)
        } else {
          reject({
            message: "Unable to connect to the server. Please try again later.",
          })
        }
      })
  })
}

export async function submitOrder(order: OrderType, items: ItemType[]) {
  try {
    const response = await axios.post(
      import.meta.env.VITE_APP_MY_API + "/expense/submitOrder",
      { order, items },
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

export async function deleteOrder(orderId: number) {
  try {
    const response = await axios.delete(
      import.meta.env.VITE_APP_MY_API + "/expense/deleteOrder",
      {
        withCredentials: true,
        params: { orderId: orderId },
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

export async function getOrderItems(orderId: string): Promise<ItemType[]> {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_APP_MY_API + "/expense/getOrderItems", {
        withCredentials: true,
        params: {
          orderId: orderId,
        },
      })
      .then((response) => {
        resolve(response.data)
      })
      .catch((error) => {
        if (error.response) {
          reject(error.response.data)
        } else {
          reject({
            message: "Unable to connect to the server. Please try again later.",
          })
        }
      })
  })
}

export async function getAllOrderItems() {
  try {
     const response =await  axios.get(import.meta.env.VITE_APP_MY_API + "/expense/getAllOrderItems", {
      withCredentials: true,
    })
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
