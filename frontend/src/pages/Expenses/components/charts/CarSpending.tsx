import { useEffect, useState } from "react"

//functions
import { getCarSpending } from "../../../../lib/statsFunctions"

//types
import { CarSpendingFormatted } from "../../../../types/stats"

// Chart components
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

function CarSpending() {
  const [carSpending, setCarSpending] = useState<CarSpendingFormatted>()

  useEffect(() => {
    getCarSpending().then((data) => {
      setCarSpending(data)
    })
  }, [])

  return <>{carSpending && <Doughnut data={carSpending} />}</>
}

export default CarSpending
