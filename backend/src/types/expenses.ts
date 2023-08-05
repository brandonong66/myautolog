export type OrderType = {
    orderId: number
    storeOrderId: string
    orderDate: Date
    source: string
    url: string
    subtotalPrice: number
    orderTax: number
    shippingPrice: number
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
  