import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        FlamingoBeavers
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/plan">Plans</Link>
        <Link to="/#contact">Contact</Link>
      </div>

      <Link to="/plan" className="navbar-button">
        Get Started
      </Link>
    </nav>
  );
}

export default Navbar;