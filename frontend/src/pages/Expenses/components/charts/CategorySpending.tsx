import { useEffect, useState } from "react"

//functions
import { getCategorySpending } from "../../../../lib/statsFunctions"

//types
import { CategorySpendingFormatted } from "../../../../types/stats"

// Chart components
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

function CategorySpending() {
  const [categorySpending, setCategorySpending] =
    useState<CategorySpendingFormatted>()

  useEffect(() => {
    getCategorySpending().then((data) => {
      setCategorySpending(data)
    })
  }, [])

  return <>{categorySpending && <Doughnut data={categorySpending} />}</>
}

export default CategorySpending
