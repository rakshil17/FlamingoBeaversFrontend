import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Plan from "./Plan";
import Navbar from "./components/Navbar";
import TTS from "./components/TTS";
import { getCopy, languageOptions } from "./i18n";
import "./App.css";

const THEME_KEY = "flamingobeavers-theme";
const PALETTE_KEY = "flamingobeavers-palette";
const LANGUAGE_KEY = "flamingobeavers-language";
const paletteOptions = ["classic", "sunset", "aurora", "lagoon"];

const getInitialTheme = () => {
  const storedTheme = window.localStorage.getItem(THEME_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
};

const getInitialPalette = () => {
  const storedPalette = window.localStorage.getItem(PALETTE_KEY);
  return paletteOptions.includes(storedPalette) ? storedPalette : "classic";
};

const getInitialLanguage = () => {
  const storedLanguage = window.localStorage.getItem(LANGUAGE_KEY);
  return languageOptions.some((option) => option.code === storedLanguage) ? storedLanguage : "en";
};

const App = () => {
  const [theme, setTheme] = useState(getInitialTheme);
  const [palette, setPalette] = useState(getInitialPalette);
  const [language, setLanguage] = useState(getInitialLanguage);
  const [pointerPosition, setPointerPosition] = useState({ x: 50, y: 24 });
  const copy = getCopy(language);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.dataset.palette = palette;
    window.localStorage.setItem(PALETTE_KEY, palette);
  }, [palette]);

  useEffect(() => {
    document.documentElement.lang = copy.meta.htmlLang;
    window.localStorage.setItem(LANGUAGE_KEY, language);
  }, [copy.meta.htmlLang, language]);

  useEffect(() => {
    const handlePointerMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 100;
      const y = (event.clientY / window.innerHeight) * 100;
      setPointerPosition({ x, y });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, []);

  return (
    <Router>
      <div className="app-shell">
        <div className="site-background-grid" />
        <div className="aurora aurora-one" />
        <div className="aurora aurora-two" />
        <div className="aurora aurora-three" />
        <div
          className="pointer-glow"
          style={{
            left: `${pointerPosition.x}%`,
            top: `${pointerPosition.y}%`,
          }}
        />

        <Navbar
          copy={copy}
          theme={theme}
          palette={palette}
          language={language}
          languages={languageOptions}
          onThemeChange={setTheme}
          onPaletteChange={setPalette}
          onLanguageChange={setLanguage}
        />

        <TTS language={language} unsupportedMessage={copy.meta.ttsUnsupported} />

        <Routes>
          <Route path="/" element={<Home copy={copy} />} />
          <Route path="/plan" element={<Plan copy={copy} language={language} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
