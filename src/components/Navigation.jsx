import { Link, useLocation } from "react-router-dom"
// Import the logo from your images folder
import logo from "../images/ambrocast-logo.png.png"

export const Navigation = () => {
  const location = useLocation()

  return (
    <nav className="nav-container">
      <div className="nav-logo">
        <Link to="/">
          <img src={logo || "/placeholder.svg"} alt="AmbroCast Logo" />
        </Link>
      </div>
      <div className="nav-links">
        <Link to="/" className={`nav-link ${location.pathname === "/" ? "active" : ""}`}>
          Home
        </Link>
        <Link to="/favorites" className={`nav-link ${location.pathname === "/favorites" ? "active" : ""}`}>
          Favorites
        </Link>
        <Link to="/settings" className={`nav-link ${location.pathname === "/settings" ? "active" : ""}`}>
          Settings
        </Link>
      </div>
    </nav>
  )
}
