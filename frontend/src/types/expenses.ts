export type OrderType = {
  orderId: number
  storeOrderId: string
  orderDate: Date
  source: string
  url: string
  subtotalPrice: number
  orderTax: number
  shippingPrice: number
  discount: number
  totalPrice: number
}

export type ItemType = {
  itemName: string
  itemBrand: string
  partNumber: string
  notes: string
  category: string
  carId: number
  price: number
  itemTax: number
  quantity: number
}
  // same as ItemType but with carUserLabel instead of carId
  export type ItemType2 ={
    itemName: string
    itemBrand: string
    partNumber: string
    notes: string
    category: string
    price: number
    itemTax: number
    quantity: number
    carUserLabel: string
  }
  