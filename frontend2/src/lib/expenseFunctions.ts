import axios from "axios"

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

type orderData = {
  storeOrderId: string
  orderDate: string
  source: string
  url: string
  expectedArrivalDate: string
  subtotalPrice: number
  orderTax: number
  shippingPrice: number
  totalPrice: number
}
export async function getOrders(): Promise<orderData[]> {
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
