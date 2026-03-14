import React, { useState, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, PerspectiveCamera, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Typewriter from "typewriter-effect";
import { FaSearch, FaBook, FaArrowDown } from "react-icons/fa";
import { motion } from "framer-motion";
import "./Home.css";

const Scene = () => {
  return (
    <div className="canvas-container">
      <Canvas>
        <ambientLight intensity={1} />
        <directionalLight position={[2, 1, 1]} />

        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
          <Sphere args={[1, 100, 200]} scale={2.5}>
            <MeshDistortMaterial
              color="#6C63FF"
              emissive="#6C63FF"
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

// --- UPDATED COMPONENT: COLOR-MATCHED MOBIUS STRIP ---
const MobiusStrip = () => {
  const geometry = useMemo(() => {
    // p=1, q=2 creates the single-twist loop characteristic of a Mobius strip
    return new THREE.TorusKnotGeometry(10, 3, 100, 16, 1, 2);
  }, []);

  return (
    <mesh geometry={geometry} rotation={[Math.PI / 2, 0, 0]}>
      {/* Changed from meshNormalMaterial to MeshDistortMaterial 
        to match the color and emissive properties of the sphere.
        Setting distort={0} keeps the geometry stable while applying the color.
      */}
      <MeshDistortMaterial
        color="blue"
        emissive="blue"
        distort={0} // No distortion needed, just the color
        speed={1.5}
        roughness={2}
        side={THREE.DoubleSide} // Crucial for a Mobius strip to render both sides
      />
    </mesh>
  );
};

const MobiusScene = () => {
  return (
    <div className="mobius-container" style={{ height: "400px", width: "100%", cursor: "grab" }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 35]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* OrbitControls allows mouse rotation, zooming, and panning */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          makeDefault 
        />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <MobiusStrip />
        </Float>
      </Canvas>
    </div>
  );
};
// ----------------------------------

const Home = () => {
  const unswDegrees = [
    { code: "3778", title: "Bachelor of Computer Science" },
    { code: "3779", title: "Bachelor of Advanced Computer Science (Honours)" },
    { code: "3781", title: "Bachelor of Cyber Security" },
    { code: "3959", title: "Bachelor of Data Science and Decisions" },
    { code: "3707", title: "Bachelor of Engineering – Aerospace Engineering" },
    { code: "3707", title: "Bachelor of Engineering – Biomedical Engineering" },
    { code: "3707", title: "Bachelor of Engineering – Chemical Engineering" },
    { code: "3707", title: "Bachelor of Engineering – Civil Engineering" },
    { code: "3707", title: "Bachelor of Engineering – Computer Engineering" },
    { code: "3707", title: "Bachelor of Engineering – Electrical Engineering" },
    { code: "3707", title: "Bachelor of Engineering – Mechanical Engineering" },
    { code: "3707", title: "Bachelor of Engineering – Mechatronic Engineering" },
    { code: "3707", title: "Bachelor of Engineering – Software Engineering" },
    { code: "3502", title: "Bachelor of Commerce" },
    { code: "3506", title: "Bachelor of Economics" },
    { code: "3509", title: "Bachelor of Information Systems" },
    { code: "3970", title: "Bachelor of Science" },
    { code: "3971", title: "Bachelor of Advanced Science (Honours)" },
    { code: "3932", title: "Bachelor of Arts" },
    { code: "3931", title: "Bachelor of International Studies" },
    { code: "3925", title: "Bachelor of Media" },
    { code: "3926", title: "Bachelor of Fine Arts" },
    { code: "3927", title: "Bachelor of Music" },
    { code: "3936", title: "Bachelor of Medical Science" },
    { code: "3946", title: "Bachelor of Architecture (Honours)" },
    { code: "3944", title: "Bachelor of Interior Architecture (Honours)" },
    { code: "3945", title: "Bachelor of Landscape Architecture (Honours)" },
    { code: "3947", title: "Bachelor of Aviation (Flying)" },
    { code: "3948", title: "Bachelor of Aviation (Management)" }
  ];

  const [showDropdown, setShowDropdown] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const rankedResults = searchTerm
    ? unswDegrees
        .map((degree) => {
          const title = degree.title.toLowerCase();
          const term = searchTerm.toLowerCase();
          let score = 0;
          if (title.startsWith(term)) score += 100;
          if (title.split(" ").some(w => w.startsWith(term))) score += 50;
          if (title.includes(term)) score += 10;
          return { ...degree, score };
        })
        .filter(d => d.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
    : unswDegrees.slice(0, 10);

  const highlight = (text) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, i) =>
      part.toLowerCase() === searchTerm.toLowerCase()
        ? <mark key={i}>{part}</mark>
        : part
    );
  };

  const handleKeyDown = (e) => {
    if (!showDropdown) return;
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) => (prev + 1) % rankedResults.length);
    }
    if (e.key === "ArrowUp") {
      setSelectedIndex((prev) =>
        prev === 0 ? rankedResults.length - 1 : prev - 1
      );
    }
    if (e.key === "Enter") {
      const degree = rankedResults[selectedIndex];
      if (degree) {
        window.open(
          `https://www.handbook.unsw.edu.au/undergraduate/programs/${degree.code}`,
          "_blank"
        );
      }
    };
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  return (
    <div className="page-wrapper">
      <section className="hero">
        <Scene />
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>
            <Typewriter
              options={{
                strings: [
                  "Plan your future.",
                  "Prepare Your Studies",
                  "Get personalised recommendations."
                ],
                autoStart: true,
                loop: true,
                delay: 50
              }}
            />
          </h1>
          <p className="subtitle">
            Discover degrees and build your academic pathway.
          </p>
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              placeholder="Search institution or study area"
              onKeyDown={handleKeyDown}
            />
          </div>
          <div className="browse-links">
            <div
              className="browse-item"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <FaBook />
              Browse all study areas
            </div>
          </div>
          {showDropdown && (
            <div className="degree-dropdown">
              <input
                className="degree-search"
                placeholder="Search degrees..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDown}
              />
              {rankedResults.map((degree, i) => (
                <a
                  key={degree.code + degree.title}
                  href={`https://www.handbook.unsw.edu.au/undergraduate/programs/${degree.code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="degree-item"
                  style={{
                    background: i === selectedIndex ? "#f0f0f0" : "transparent"
                  }}
                >
                  {highlight(degree.title)}
                </a>
              ))}
            </div>
          )}
          <div
            className="scroll-btn"
            onClick={() =>
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth"
              })
            }
          >
            <FaArrowDown />
          </div>
        </motion.div>
      </section>

      <section className="content-section">
        <div className="container">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose Our Platform?
          </motion.h2>

          <MobiusScene />

          <div className="grid">
            {[1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="card"
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className="card-icon">
                  <FaBook />
                </div>
                <h3>Feature {i}</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;