import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import Expenses from "./pages/Expenses/Expenses"
import Resources from "./pages/Resources"
import Tasks from "./pages/Tasks"
import Landing from "./pages/Landing/Landing"
import Login from "./pages/Login/Login"
import Signup from "./pages/Signup/Signup"

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
