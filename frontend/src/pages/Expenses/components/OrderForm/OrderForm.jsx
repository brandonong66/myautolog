import React from "react"
import Card from "../../../../components/Card/Card"
import { Chip, Divider, TextField, Typography } from "@mui/material"
import "./OrderForm.css"
function OrderForm() {
  return (
    <Card title="Order Input">
      <form className="order-form">
        <div className="order-form__order-info">
          <TextField
            fullWidth
            id="storeOrderId"
            label="Order ID"
            type="text"
            variant="outlined"
          />
          <div className="order-form__date-container">
            <TextField
              fullWidth
              id="orderDate"
              InputLabelProps={{
                shrink: true,
              }}
              label="Order Date"
              required
              type="date"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="expectedArrivalDate"
              label="ETA"
              InputLabelProps={{
                shrink: true,
              }}
              type="date"
              variant="outlined"
            />
          </div>
          <div className="order-form__source-container">
            <TextField
              fullWidth
              helperText="O'Reilly, junkyard, fcpeuro, etc..."
              id="source"
              label="Source"
              type="text"
              variant="outlined"
            />
            <TextField
              fullWidth
              helperText="URL to order page"
              id="url"
              label="URL"
              type="text"
              variant="outlined"
            />
          </div>
          <div className="order-form__price-container">
            <TextField
              fullWidth
              id="subtotalPrice"
              InputLabelProps={{
                shrink: true,
              }}
              label="Subtotal"
              type="number"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="orderTax"
              InputLabelProps={{
                shrink: true,
              }}
              label="Tax"
              type="number"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="shippingPrice"
              InputLabelProps={{
                shrink: true,
              }}
              label="Shipping"
              type="number"
              variant="outlined"
            />
            <TextField
              fullWidth
              id="totalPrice"
              InputLabelProps={{
                shrink: true,
              }}
              label="Total"
              type="number"
              variant="outlined"
            />
          </div>
        </div>
        <Divider variant="middle">
          <Chip label="Items" />
        </Divider>

        <div className="order-form__item-info">
          <div className="order-form__item-identifier-container">
            <TextField
              fullWidth
              id="itemName"
              label="Name"
              required
              type="text"
              variant="outlined"
              className="order-form__item-name"
            />
            <TextField
              id="itemBrand"
              label="Brand"
              type="text"
              variant="outlined"
              className="order-form__item-brand"
            />
            <TextField
              id="partNumber"
              label="Part Number"
              type="text"
              variant="outlined"
              className="order-form__item-part-number"
            />
          </div>

          <div className="order-form__item-selects-container">
            <TextField
              id="categoryId"
              label="Category"
              select
              variant="outlined"
              className="order-form__item-category"
            ></TextField>
            <TextField
              id="carId"
              label="Car"
              select
              variant="outlined"
              className="order-form__item-car"
            ></TextField>
            <div className="order-form__item-price-container">
              <TextField
                id="price"
                label="Price"
                required
                type="text"
                variant="outlined"
                className="order-form__item-price"
              />
              <TextField
                id="itemTax"
                label="Tax"
                required
                type="text"
                variant="outlined"
                className="order-form__item-tax"
              />
              <TextField
                id="quantity"
                label="Quantity"
                required
                type="text"
                variant="outlined"
                className="order-form__item-quantity"
              />
            </div>
          </div>
          <TextField id="notes" label="Notes" type="text" variant="outlined" />
        </div>
      </form>
    </Card>
  )
}

export default OrderForm
