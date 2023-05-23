import React from "react"
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from "@mui/material"

function DataTable(props) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell key="name">Name</TableCell>
            <TableCell key="brand">Brand</TableCell>
            <TableCell key="partnumber">Part Number</TableCell>
            <TableCell key="price">Price</TableCell>
            <TableCell key="tax">Tax</TableCell>
            <TableCell key="source">Source</TableCell>
            <TableCell key="orderID">Order ID</TableCell>
            <TableCell key="orderdate">Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data?.map((row) => (
            <TableRow
              key={row.itemId}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.itemName}
              </TableCell>
              <TableCell>{row.itemBrand}</TableCell>
              <TableCell>{row.partNumber}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.itemTax}</TableCell>
              <TableCell>{row.source}</TableCell>
              <TableCell>{row.storeOrderId}</TableCell>
              <TableCell>{row.orderDate}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DataTable
