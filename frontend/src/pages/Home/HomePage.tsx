// components
import Typography from "../../components/ui/typography"
import { Button } from "../../components/ui/button"

// css
import "./HomePage.css"

function HomePage() {
  return (
    <div className="hero-bg ">
      <div className="hero-content-container h-[50vh] min-h-[500px] w-full text-primary-100">
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

        <div className="hero-content-box"></div>
      </div>
    </div>
  )
}

export default HomePage
