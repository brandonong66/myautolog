import React, { useState } from "react"
import { CarForm, CarList } from "./components"
import Page from "../../components/Page"

import "./Garage.css"

function Garage() {
  const [refreshCarList, setRefreshCarList] = useState(false)
  
  return (
    <Page title="Garage">
      <CarList triggerRefresh={refreshCarList} />
      <CarForm
        onFormSubmitSuccess={() => {
          setRefreshCarList(!refreshCarList)
        }}
      />
    </Page>
  )
}

export default Garage
