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
            <Route exact path="/" element={<Home />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/garage" element={<Garage />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
