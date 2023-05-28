import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Navbar } from "./components"
import {
  Expenses,
  Home,
  Garage,
  Landing,
  Login,
  Resources,
  Signup,
  Tasks,
} from "./pages"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar className="navbar" />
        <div className="main-container">
          <Routes>
            <Route exact path="/landing" element={<Landing />} />
            <Route exact path="/" element={<Home className="page-body" />} />
            <Route
              path="/expenses"
              element={<Expenses className="page-body" />}
            />
            <Route
              path="/resources"
              element={<Resources className="page-body" />}
            />
            <Route path="/garage" element={<Garage />} />
            <Route path="/tasks" element={<Tasks className="page-body" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
