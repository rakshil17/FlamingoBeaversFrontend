import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">FlamingoBeavers</div>

      <div className="navbar-links">
        <a href="#features">Features</a>
        <a href="#plans">Plans</a>
        <a href="#contact">Contact</a>
      </div>

      <button className="navbar-button">Get Started</button>
    </nav>
  );
}

export default Navbar;