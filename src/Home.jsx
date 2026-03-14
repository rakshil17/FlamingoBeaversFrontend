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

const featuredPrompts = [
  "I want a flexible UNSW pathway into psychology with room for exchange.",
  "Show me the cheapest pathway into engineering with solid job prospects.",
  "Help me compare internship-focused options for commerce and data.",
];

const signals = [
  {
    icon: <FaCompass />,
    title: "Prompt-first planning",
    copy:
      "Students describe goals in natural language and receive a structured pathway recommendation.",
  },
  {
    icon: <FaLayerGroup />,
    title: "Multiple planning angles",
    copy:
      "The AI returns a recommended route plus cheaper, faster, internship-focused, and lifestyle-balanced perspectives.",
  },
  {
    icon: <FaCalendarAlt />,
    title: "Course plan visibility",
    copy:
      "Every answer can unfold into terms, courses, and rationale so the recommendation feels tangible.",
  },
];

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
function Home() {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const hasPrompt = prompt.trim().length > 0;

  const previewCopy = useMemo(() => {
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt) {
      return {
        title: "Start typing to preview the planner",
        body:
          "As soon as the user describes a degree, pathway style, or what matters most, the preview card wakes up and starts mirroring the AI planning flow.",
        score: "--/100",
        duration: "Awaiting prompt",
        angle: "Recommended view",
        nextStep: "Type to activate preview",
      };
    }

    return {
      title: trimmedPrompt.length > 58 ? `${trimmedPrompt.slice(0, 58)}...` : trimmedPrompt,
      body:
        "The planner will turn this into a recommended pathway, alternatives, a course-plan breakdown, and richer planning lenses.",
      score: "94/100",
      duration: "3.1 years est.",
      angle: "Internship-focused alternative",
      nextStep: "Launch planner with this prompt",
    };
  }, [prompt]);

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
            FlamingoBeavers pathway planning
          </div>

          <h1>AI-guided degree planning.</h1>

          <p className="hero-description">
            Describe the degree you want, the pathway style you prefer, or what
            matters most. FlamingoBeavers turns that into a recommended academic
            path with colorful alternative angles you can refine in follow-up prompts.
          </p>

          <form className="hero-search" onSubmit={handleSubmit}>
            <div className={`hero-search-shell ${hasPrompt ? "active" : ""}`}>
              <FaSearch className="hero-search-icon" />
              <textarea
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder='Try: "I want a balanced UNSW commerce pathway with internship opportunities and manageable workload."'
                aria-label="Describe the UNSW pathway you want help planning"
              />
            </div>

            <div className="hero-action-row">
              <button type="submit" className="hero-search-button">
                Launch Planner
                <FaArrowRight />
              </button>

              <div className="hero-helper-copy">
                Natural-language input, structured output, backend-ready request flow.
              </div>
            </div>
          </form>

          <div className="prompt-row">
            {featuredPrompts.map((item) => (
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
            <div className="stat-card">
              <span>Primary answer</span>
              <strong>Recommended Pathway</strong>
            </div>
            <div className="stat-card">
              <span>Alt perspectives</span>
              <strong>Cost, speed, research, exchange</strong>
            </div>
            <div className="stat-card">
              <span>Backend-ready</span>
              <strong>Prepared for API + Elastic</strong>
            </div>
          </div>
        </div>

        <aside
          className={`hero-preview fade-up fade-up-delay-1 ${
            hasPrompt ? "visible" : "idle"
          }`}
        >
          <div className="preview-topline">
            <span className="preview-pill">AI planner preview</span>
            <span className="preview-status">{hasPrompt ? "Live prompt" : "Idle"}</span>
          </div>

          <div className="preview-card">
            <div className="preview-title">
              <FaBrain />
              {hasPrompt ? "Prompt detected" : "Waiting for a prompt"}
            </div>
            <h2>{previewCopy.title}</h2>
            <p>{previewCopy.body}</p>
          </div>

          <div className="preview-grid">
            <div className="mini-panel preview-good">
              <span>Fit score</span>
              <strong>{previewCopy.score}</strong>
            </div>
            <div className="mini-panel preview-calm">
              <span>Duration</span>
              <strong>{previewCopy.duration}</strong>
            </div>
            <div className="mini-panel preview-warm">
              <span>Alternative</span>
              <strong>{previewCopy.angle}</strong>
            </div>
            <div className="mini-panel preview-vivid">
              <span>Next step</span>
              <strong>{previewCopy.nextStep}</strong>
            </div>
          </div>
        </aside>
      </section>

      <section className="signals-section">
        <div className="section-heading">
          <span className="section-kicker">Why it feels useful</span>
          <h2>Built for exploratory students, not just rigid course checklists.</h2>
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
