import PageLayout from "../../components/PageLayout"
import CarList from "./components/CarList"

function GaragePage() {
  return (
    <PageLayout title="Garage">
      <div className="flex justify-center">
        <CarList />
      </div>
    </PageLayout>
  )
}

export default GaragePage
