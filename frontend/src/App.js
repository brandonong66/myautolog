import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Navbar from "./components/Navbar/Navbar"
import Footer from "./components/Footer/Footer"
import Expenses from "./pages/Expenses"
import Resources from "./pages/Resources"
import Tasks from "./pages/Tasks"
import Landing from "./pages/Landing/Landing"

function App() {
  return (
    <Router>
      <div className="App grid-container">
        <Navbar className="navbar" />
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
        </Routes>
        <Footer className="footer" />
      </div>
    </Router>
  )
}

export default App
