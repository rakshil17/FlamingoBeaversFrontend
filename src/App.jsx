import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Plan from "./Plan";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <div className="site-background-grid" />

      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/plan" element={<Plan />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;