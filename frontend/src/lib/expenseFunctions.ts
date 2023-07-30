import axios from "axios"
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
  return new Promise((resolve, reject) => {
    axios
      .post(
        import.meta.env.VITE_APP_MY_API + "/expense/submitOrder",
        { order, items },
        {
          withCredentials: true,
        }
      )
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
