import axios from "axios"

export async function getMakes(year) {
  try {
    const response = await axios.get(
      "https://vpic.nhtsa.dot.gov/api/vehicles/getallmakes?format=json"
    )

    let makes = []
    response.data.Results.map((make) => {
      makes.push(make.Make_Name)
    })
    console.log(makes)
  } catch (error) {
    if (error.response) {
      console.log(error)
    }
  }
}

export async function getModels(make) {
  //to do
}
