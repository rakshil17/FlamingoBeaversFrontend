import { FaArrowRight, FaChevronDown, FaPalette } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function formatAppearance(palette, theme) {
  return `${palette.charAt(0).toUpperCase()}${palette.slice(1)} / ${
    theme.charAt(0).toUpperCase() + theme.slice(1)
  }`;
}

const paletteOptions = ["classic", "sunset", "aurora", "lagoon"];
const themeOptions = ["dark", "light"];

function labelize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function Navbar({ theme, palette, onThemeChange, onPaletteChange }) {
  return (
    <header className="navbar-shell">
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-mark" />
          <span>
            <strong>FlamingoBeavers</strong>
            <small>AI pathway planning studio</small>
          </span>
        </Link>

        <div className="navbar-links" aria-label="Primary">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            Home
          </NavLink>
          <NavLink to="/plan" className={({ isActive }) => (isActive ? "active" : "")}>
            Planner
          </NavLink>
        </div>

        <div className="navbar-actions">
          <details className="appearance-dropdown">
            <summary className="appearance-summary">
              <FaPalette />
              <span>{formatAppearance(palette, theme)}</span>
              <FaChevronDown className="appearance-chevron" />
            </summary>

            <div className="appearance-panel">
              <div className="appearance-field">
                <span>Theme</span>
                <div className="appearance-option-row" role="group" aria-label="Palette theme">
                  {paletteOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`appearance-option ${palette === option ? "active" : ""}`}
                      onClick={() => onPaletteChange(option)}
                    >
                      {labelize(option)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="appearance-field">
                <span>Mode</span>
                <div className="appearance-option-row" role="group" aria-label="Light or dark mode">
                  {themeOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={`appearance-option ${theme === option ? "active" : ""}`}
                      onClick={() => onThemeChange(option)}
                    >
                      {labelize(option)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </details>

          <Link to="/plan" className="navbar-button">
            Open Planner
            <FaArrowRight />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;