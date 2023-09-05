import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

// pages
import ExpensesPage from "./pages/Expenses/ExpensesPage"
import HomePage from "./pages/Home/HomePage"
import GaragePage from "./pages/Garage/GaragePage"
import LoginPage from "./pages/Login/LoginPage"
import ResourcesPage from "./pages/Resources/ResourcesPage"

//components
import Navbar from "./components/Navbar/Navbar"

// cscs
import "./App.css"

function App() {
  useEffect(() => {
    document.title = "myautolog"
  }, [])

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/garage" element={<GaragePage />} />
            <Route path="/login" element={<LoginPage initialTab="login" />} />
            <Route path="/signup" element={<LoginPage initialTab="signup" />} />
            <Route path="/resources" element={<ResourcesPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
