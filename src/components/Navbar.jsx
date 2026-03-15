import { FaArrowRight, FaChevronDown, FaGlobe, FaPalette } from "react-icons/fa";
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

function Navbar({
  copy,
  theme,
  palette,
  language,
  languages,
  onThemeChange,
  onPaletteChange,
  onLanguageChange,
}) {
  return (
    <header className="navbar-shell">
      <nav className="navbar">
        <Link to="/" className="navbar-logo">
          <span className="navbar-logo-mark" />
          <span>
            <strong>FlamingoBeavers</strong>
            <small>{copy.meta.brandSubtitle}</small>
          </span>
        </Link>

        <div className="navbar-links" aria-label="Primary">
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")}>
            {copy.nav.home}
          </NavLink>
          <NavLink to="/plan" className={({ isActive }) => (isActive ? "active" : "")}>
            {copy.nav.planner}
          </NavLink>
        </div>

        <div className="navbar-actions">
          <details className="appearance-dropdown">
            <summary className="appearance-summary">
              <FaGlobe />
              <span>{languages.find((option) => option.code === language)?.label || "English"}</span>
              <FaChevronDown className="appearance-chevron" />
            </summary>

            <div className="appearance-panel">
              <div className="appearance-field">
                <span>{copy.nav.language}</span>
                <div className="appearance-option-row" role="group" aria-label={copy.nav.language}>
                  {languages.map((option) => (
                    <button
                      key={option.code}
                      type="button"
                      className={`appearance-option ${language === option.code ? "active" : ""}`}
                      onClick={() => onLanguageChange(option.code)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </details>

          <details className="appearance-dropdown">
            <summary className="appearance-summary">
              <FaPalette />
              <span>{formatAppearance(palette, theme)}</span>
              <FaChevronDown className="appearance-chevron" />
            </summary>

            <div className="appearance-panel">
              <div className="appearance-field">
                <span>{copy.nav.theme}</span>
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
                <span>{copy.nav.mode}</span>
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
            {copy.nav.openPlanner}
            <FaArrowRight />
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
