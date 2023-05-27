import React from "react"
import { Container, Typography } from "@mui/material"
import CarForm from "./CarForm.jsx"
import Page from "../../components/Page"

function Garage() {
  return (
    <Page title="Garage">
      <CarForm />
    </Page>
  )
}

export default Garage
