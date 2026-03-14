import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float } from "@react-three/drei";
import Typewriter from "typewriter-effect";
import { FaSearch, FaUniversity, FaBook, FaArrowDown } from "react-icons/fa";
import "./Home.css";

// A simple 3D Background Component
const Scene = () => {
  return (
    <div className="canvas-container">
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 1, 1]} />
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <Sphere args={[1, 100, 200]} scale={2.5}>
            <MeshDistortMaterial
              color="indigo"
              attach="material"
              distort={0.4}
              speed={1.5}
              roughness={0}
            />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
};

const Home = () => {
  return (
    <div className="page-wrapper">
      <section className="hero">
        <Scene />
        
        <div className="hero-content">
          <h1>
            <Typewriter
              options={{
                strings: [
                  "Plan your future.",
                  "Prepare Your Studies",
                  "Get personalised recommendations.",
                ],
                autoStart: true,
                loop: true,
                delay: 50,
              }}
            />
          </h1>
          <p className="subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>

          <div className="search-box">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Search institution or study area" />
          </div>

          <div className="browse-links">
            <div className="browse-item">
            </div>
            <div className="browse-item">
              <FaBook className="browse-icon" />
              Browse all study areas
            </div>
          </div>

          <div className="scroll-btn" onClick={() => window.scrollTo({top: window.innerHeight, behavior: 'smooth'})}>
            <FaArrowDown />
          </div>
        </div>
      </section>

      {/* New Content Section */}
      <section className="content-section">
        <div className="container">
          <h2>Why Choose Our Platform?</h2>
          <div className="grid">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card">
                <div className="card-icon"><FaBook /></div>
                <h3>Feature {i}</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;