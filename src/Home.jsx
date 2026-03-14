import React from "react";
import "./Home.css";
import { FaSearch, FaUniversity, FaBook, FaArrowDown } from "react-icons/fa";

const Home = () => {
  return (
    <div className="hero">

      <h1>
        Explore and compare institutions and study areas based on
        real life student experiences
      </h1>

      <div className="search-box">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search institution or study area"
        />
      </div>

      <div className="browse-links">
        <div className="browse-item">
          <FaUniversity className="browse-icon"/>
          Browse all institutions
        </div>

        <div className="browse-item">
          <FaBook className="browse-icon"/>
          Browse all study areas
        </div>
      </div>

      <p className="qilt-text">
        QILT survey responses allow you to explore the experiences of
        2 million students and graduates of different institutions
        and study areas to help inform your study choices.
      </p>

      <div className="scroll-btn">
        <FaArrowDown />
      </div>

    </div>
  );
};

export default Home;