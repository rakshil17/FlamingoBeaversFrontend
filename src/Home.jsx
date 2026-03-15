import { Suspense, useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Sphere, Stars } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import {
  FaArrowRight,
  FaBrain,
  FaCalendarAlt,
  FaCompass,
  FaLayerGroup,
  FaSearch,
  FaUniversity,
} from "react-icons/fa";
import "./Home.css";

function HeroScene() {
  return (
    <div className="hero-scene">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[3, 2, 2]} intensity={1.4} />
          <pointLight position={[-3, -2, 2]} intensity={1} color="#70e8ff" />
          <Stars radius={40} depth={12} count={1200} factor={3} saturation={0} fade speed={0.6} />

          <Float speed={1.8} rotationIntensity={1.2} floatIntensity={1.4}>
            <Sphere args={[1.25, 64, 64]} position={[-1.1, 0.55, 0]}>
              <MeshDistortMaterial color="#7fe6ff" distort={0.4} speed={1.8} roughness={0.15} />
            </Sphere>
          </Float>

          <Float speed={2.2} rotationIntensity={1.4} floatIntensity={1.1}>
            <Icosahedron args={[1.05, 0]} position={[1.5, -0.35, -0.4]}>
              <MeshDistortMaterial color="#ff88c7" distort={0.25} speed={1.5} roughness={0.22} />
            </Icosahedron>
          </Float>

          <Float speed={1.6} rotationIntensity={1.3} floatIntensity={0.8}>
            <Sphere args={[0.58, 48, 48]} position={[0.2, 1.65, -1.2]}>
              <MeshDistortMaterial color="#a97dff" distort={0.5} speed={2.4} roughness={0.08} />
            </Sphere>
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}
function Home({ copy }) {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const hasPrompt = prompt.trim().length > 0;
  const signals = [
    { icon: <FaCompass />, ...copy.home.signals[0] },
    { icon: <FaLayerGroup />, ...copy.home.signals[1] },
    { icon: <FaCalendarAlt />, ...copy.home.signals[2] },
  ];

  const previewCopy = useMemo(() => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      return {
        title: copy.home.preview.emptyTitle,
        body: copy.home.preview.emptyBody,
        score: copy.home.preview.emptyScore,
        duration: copy.home.preview.emptyDuration,
        angle: copy.home.preview.emptyAngle,
        nextStep: copy.home.preview.emptyNextStep,
      };
    }

    return {
      title: trimmedPrompt.length > 58 ? `${trimmedPrompt.slice(0, 58)}...` : trimmedPrompt,
      body: copy.home.preview.filledBody,
      score: "94/100",
      duration: copy.home.preview.filledDuration,
      angle: copy.home.preview.filledAngle,
      nextStep: copy.home.preview.filledNextStep,
    };
  }, [copy.home.preview, prompt]);

  const submitPrompt = (value) => {
    const nextPrompt = value.trim();
    if (!nextPrompt) return;

    navigate(
      {
        pathname: "/plan",
        search: `?prompt=${encodeURIComponent(nextPrompt)}`,
      },
      {
        state: { prompt: nextPrompt },
      }
    );
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    submitPrompt(prompt);
  };

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-backdrop">
          <HeroScene />
          <div className="hero-blob hero-blob-a" />
          <div className="hero-blob hero-blob-b" />
          <div className="hero-blob hero-blob-c" />
        </div>

        <div className="hero-copy fade-up">
          <div className="eyebrow">
            <FaUniversity />
            {copy.home.eyebrow}
          </div>

          <h1>{copy.home.title}</h1>

          <p className="hero-description">{copy.home.description}</p>

          <form className="hero-search" onSubmit={handleSubmit}>
            <div className={`hero-search-shell ${hasPrompt ? "active" : ""}`}>
              <FaSearch className="hero-search-icon" />
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder={copy.home.textareaPlaceholder}
                aria-label={copy.home.textareaAria}
              />
            </div>

            <div className="hero-action-row">
              <button type="submit" className="hero-search-button">
                {copy.home.launchPlanner}
                <FaArrowRight />
              </button>

              <div className="hero-helper-copy">{copy.home.helperCopy}</div>
            </div>
          </form>

          <div className="prompt-row">
            {copy.home.featuredPrompts.map((item) => (
              <button
                key={item}
                type="button"
                className="prompt-chip"
                onClick={() => submitPrompt(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <div className="hero-stats">
            {copy.home.stats.map((item) => (
              <div key={item.label} className="stat-card">
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <aside
          className={`hero-preview fade-up fade-up-delay-1 ${
            hasPrompt ? "visible" : "idle"
          }`}
        >
          <div className="preview-topline">
            <span className="preview-pill">{copy.home.preview.pill}</span>
            <span className="preview-status">{hasPrompt ? copy.home.preview.live : copy.home.preview.idle}</span>
          </div>

          <div className="preview-card">
            <div className="preview-title">
              <FaBrain />
              {hasPrompt ? copy.home.preview.detected : copy.home.preview.waiting}
            </div>
            <h2>{previewCopy.title}</h2>
            <p>{previewCopy.body}</p>
          </div>

          <div className="preview-grid">
            <div className="mini-panel preview-good">
              <span>{copy.home.preview.fitScore}</span>
              <strong>{previewCopy.score}</strong>
            </div>
            <div className="mini-panel preview-calm">
              <span>{copy.home.preview.duration}</span>
              <strong>{previewCopy.duration}</strong>
            </div>
            <div className="mini-panel preview-warm">
              <span>{copy.home.preview.alternative}</span>
              <strong>{previewCopy.angle}</strong>
            </div>
            <div className="mini-panel preview-vivid">
              <span>{copy.home.preview.nextStep}</span>
              <strong>{previewCopy.nextStep}</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="signals-section">
        <div className="section-heading">
          <span className="section-kicker">{copy.home.why.kicker}</span>
          <h2>{copy.home.why.title}</h2>
        </div>

        <div className="signals-grid">
          {signals.map((item, index) => (
            <article
              key={item.title}
              className={`signal-card glass-panel fade-up fade-up-delay-${index + 1}`}
            >
              <div className="signal-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Home;
