import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ExpensesPage from "./pages/Expenses/ExpensesPage"
import HomePage from "./pages/Home/HomePage"
import GaragePage from "./pages/Garage/GaragePage"
import LoginPage from "./pages/Login/LoginPage"
import Navbar from "./components/Navbar/Navbar"
import "./App.css"
import ResourcesPage from "./pages/Resources/ResourcesPage"

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="main-container ml-16 p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/expenses" element={<ExpensesPage />} />
            <Route path="/garage" element={<GaragePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/resources" element={<ResourcesPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
