// components
import Typography from "../../components/ui/typography"
import ExampleChart from "./components/ExampleChart"
import ExampleTable from "./components/ExampleTable"

// css
import "./HomePage.css"

function HomePage() {
  return (
    <div className="hero-bg ">
      <div className="hero-content-container h-[50vh] min-h-[500px] w-full my-auto">
        <div className="hero-content-text-box">
          <Typography className="text-foreground" variant="h1">
            <span className="text-primary">Log</span> each step of your
            automotive journey
          </Typography>

          <Typography className="my-4 text-foreground" variant="p">
            Keep track of your expenses, maintenance, mileage, and more.
          </Typography>
          <div>
            <a
              className="rounded-md bg-accent p-3 text-accent-100 hover:bg-accent-400"
              href="/signup"
            >
              sign up
            </a>
          </div>
        </div>

        <div className="grid place-items-center">
          <div>
            <ExampleTable className="relative w-[800px]  drop-shadow-2xl" />
            <ExampleChart className="relative left-40 top-[-100px] w-[800px] drop-shadow-2xl" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
