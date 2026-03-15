import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import {
  FaArrowRight,
  FaBolt,
  FaBrain,
  FaCheckCircle,
  FaCircle,
  FaClock,
  FaCoins,
  FaLightbulb,
  FaMapMarkedAlt,
  FaUniversity,
} from "react-icons/fa";
import { useLocation, useSearchParams } from "react-router-dom";
import { generatePlannerResult, refinePlannerResult } from "./services/plannerService";

const alternativeIcons = {
  Cheapest: <FaCoins />,
  Efficient: <FaBolt />,
  "Internship-focused": <FaMapMarkedAlt />,
  "Balanced Lifestyle": <FaClock />,
};

function toneClass(tone) {
  return `tone-${tone || "neutral"}`;
}

function scoreClass(score) {
  if (score >= 90) return "status-good";
  if (score >= 80) return "status-mid";
  return "status-bad";
}

function SemanticBadge({ item }) {
  return (
    <div className={`semantic-badge ${toneClass(item.tone)}`}>
      <span className="semantic-badge-label">{item.label}</span>
      <strong>{item.value}</strong>
      <small>{item.helper}</small>
    </div>
  );
}

function MetricCard({ item }) {
  return (
    <div className={`metric-card ${toneClass(item.tone)}`}>
      <span>{item.label}</span>
      <strong>{item.value}</strong>
    </div>
  );
}

function UniversityCard({ item, selected, onSelect }) {
  return (
    <article className={`university-card ${selected ? "selected" : ""}`}>
      <div className="university-card-top">
        <div>
          <h4>{item.name}</h4>
          <p>{item.rationale}</p>
        </div>
        {item.backendReady && (
          <span className="university-status tone-success">
            <FaCheckCircle />
            UNSW backend-ready
          </span>
        )}
      </div>

      <div className="university-tags">
        {item.tags.map((tag) => (
          <span
            key={tag}
            className={`university-tag ${
              tag.includes("research")
                ? "tone-info"
                : tag.includes("industry") || tag.includes("internship")
                  ? "tone-success"
                  : tag.includes("balanced")
                    ? "tone-neutral"
                    : "tone-warning"
            }`}
          >
            {tag}
          </span>
        ))}
      </div>

      <button type="button" className="university-cta" onClick={onSelect}>
        {item.cta}
      </button>
    </article>
  );
}

function getYearAdvice(year) {
  if (year.includes("Year 1")) {
    return {
      focus: "Build your base properly and start showing curiosity outside class.",
      advice: [
        "Join case comps, societies, and beginner business events early.",
        "Start small portfolio projects or a LinkedIn-ready profile.",
        "Use first year to test majors before locking in a narrow path.",
      ],
    };
  }

  if (year.includes("Year 2")) {
    return {
      focus: "Turn coursework into signals that employers and mentors can actually see.",
      advice: [
        "Start applying for internships, insight programs, and winter experiences.",
        "Take on team projects, competitions, or analyst-style extracurricular work.",
        "Shape electives around the kind of role you want after graduation.",
      ],
    };
  }

  return {
    focus: "Package the degree into a confident finish and convert momentum into outcomes.",
    advice: [
      "Prioritise capstone quality, interviews, and graduate applications.",
      "Use final-year projects as proof of your analytical or commercial capability.",
      "Turn mentors, internships, and campus involvement into concrete references.",
    ],
  };
}

function CoursePlanView({ plan }) {
  const [activeYear, setActiveYear] = useState(plan[0]?.year || "");
  const resolvedActiveYear = plan.some((yearBlock) => yearBlock.year === activeYear)
    ? activeYear
    : plan[0]?.year || "";
  const activeBlock = plan.find((yearBlock) => yearBlock.year === resolvedActiveYear) || plan[0];
  const yearAdvice = getYearAdvice(activeBlock.year);

  return (
    <div className="course-plan-workspace">
      <div className="timeline-bar-shell">
        <div className="timeline-bar-line" />
        <div className="timeline-year-row">
          {plan.map((yearBlock) => (
            <button
              key={yearBlock.year}
              type="button"
              className={`timeline-year-button ${yearBlock.year === activeBlock.year ? "active" : ""}`}
              onClick={() => setActiveYear(yearBlock.year)}
            >
              <span className="timeline-year-label">{yearBlock.year}</span>
              <strong>{yearBlock.completion}%</strong>
            </button>
          ))}
        </div>
      </div>

      <section className="year-stage">
        <div className="year-stage-header">
          <div>
            <span className="section-kicker">Active stage</span>
            <h4>{activeBlock.year}</h4>
          </div>
          <span className="meta-pill">{activeBlock.completion}% of pathway story mapped</span>
        </div>

        <div className="year-advice-strip">
          <div className="year-advice-lead">
            <span className="section-kicker">Focus</span>
            <p>{yearAdvice.focus}</p>
          </div>
          <div className="year-advice-points">
            {yearAdvice.advice.map((item) => (
              <div key={item} className="year-advice-item">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="term-grid">
          {activeBlock.terms.map((term) => (
            <article key={term.name} className="term-card">
              <div className="term-header">
                <h5>{term.name}</h5>
                <span>{term.units}</span>
              </div>

              <div className="term-course-list">
                {term.courses.map((course) => (
                  <div key={course.code} className="term-course">
                    <strong>{course.code}</strong>
                    <h6>{course.name}</h6>
                    <p>{course.description}</p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

function AlternativeCard({ item, expanded, onToggle }) {
  return (
    <article className="alternative-card">
      <div className="alternative-card-top">
        <div className="alternative-main">
          <div className={`alternative-icon ${toneClass(item.tone)}`}>
            {alternativeIcons[item.type] || <FaLightbulb />}
          </div>
          <div>
            <span className="alternative-badge">{item.badge}</span>
            <h4>{item.type}</h4>
          </div>
        </div>
        <span className={`alternative-score ${scoreClass(item.fitScore)}`}>{item.fitScore}/100</span>
      </div>

      <p>{item.summary}</p>

      <button type="button" className="inline-action" onClick={onToggle}>
        {expanded ? "Hide details" : "Explore this angle"}
      </button>

      {expanded && (
        <div className="alternative-expanded">
          <div className="alternative-column">
            <h5>Why this angle works</h5>
            <div className="bullet-list compact">
              {item.rationale.map((point) => (
                <div key={point} className="bullet-item">
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="alternative-column">
            <h5>Tradeoff</h5>
            <p>{item.tradeoffs}</p>
            <h5>Course plan shape</h5>
            <div className="bullet-list compact">
              {item.compactPlan.map((point) => (
                <div key={point} className="bullet-item">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

function PlannerHeroScene() {
  return (
    <>
      <Canvas camera={{ position: [0, 0, 5.4], fov: 42 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[3, 4, 4]} intensity={1.6} color="#8bd8ff" />
        <directionalLight position={[-3, -2, 2]} intensity={0.8} color="#ff7fbc" />
        <Environment preset="city" />
        <Float speed={1.6} rotationIntensity={0.75} floatIntensity={1.1}>
          <mesh position={[-0.95, 0.45, 0]}>
            <icosahedronGeometry args={[0.8, 1]} />
            <MeshDistortMaterial color="#69ddff" roughness={0.1} metalness={0.35} distort={0.35} speed={1.5} />
          </mesh>
        </Float>
        <Float speed={1.2} rotationIntensity={1} floatIntensity={1.4}>
          <mesh position={[1.15, -0.1, -0.5]} rotation={[0.4, 0.6, 0.2]}>
            <torusKnotGeometry args={[0.62, 0.2, 150, 20]} />
            <MeshDistortMaterial color="#b56dff" roughness={0.16} metalness={0.6} distort={0.22} speed={1.2} />
          </mesh>
        </Float>
        <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1}>
          <mesh position={[0.45, 0.95, -1.1]} rotation={[0.6, 0.3, 0.5]}>
            <boxGeometry args={[0.62, 0.62, 0.62]} />
            <MeshDistortMaterial color="#ff7fbc" roughness={0.18} metalness={0.28} distort={0.18} speed={1.3} />
          </mesh>
        </Float>
      </Canvas>
      <div className="plan-hero-glow plan-hero-glow-a" />
      <div className="plan-hero-glow plan-hero-glow-b" />
    </>
  );
}

function FullscreenSwitchOverlay({ university }) {
  return (
    <div className="fullscreen-switch-overlay">
      <PlannerLoadingScene />
      <div className="fullscreen-switch-copy">
        <span className="section-kicker">Switching university</span>
        <h2>Opening {university}</h2>
        <p>Reframing the same planner workspace around a new university-specific pathway.</p>
      </div>
    </div>
  );
}

function PlannerLoadingScene({ compact = false }) {
  return (
    <div className={`planner-loading-scene ${compact ? "compact" : ""}`} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 5.8], fov: 38 }}>
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 5, 4]} intensity={1.8} color="#89e1ff" />
        <directionalLight position={[-4, -2, 2]} intensity={0.9} color="#ff8acc" />
        <Environment preset="sunset" />
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.1}>
          <mesh position={[0, 0.1, 0]} rotation={[0.5, 0.2, 0.1]}>
            <sphereGeometry args={[0.94, 64, 64]} />
            <MeshDistortMaterial color="#69ddff" roughness={0.05} metalness={0.52} distort={0.34} speed={1.5} />
          </mesh>
        </Float>
        <Float speed={1.2} rotationIntensity={0.9} floatIntensity={1.3}>
          <mesh position={[0, 0.1, -0.25]} rotation={[1.2, 0.2, 0.4]}>
            <torusGeometry args={[1.36, 0.08, 32, 180]} />
            <MeshDistortMaterial color="#b56dff" roughness={0.08} metalness={0.7} distort={0.08} speed={1.2} />
          </mesh>
        </Float>
        <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1}>
          <mesh position={[0.48, -0.62, -1.2]}>
            <icosahedronGeometry args={[0.24, 1]} />
            <MeshDistortMaterial color="#ff7fbc" roughness={0.12} metalness={0.34} distort={0.22} speed={1.7} />
          </mesh>
        </Float>
      </Canvas>
      <div className="planner-loading-glow planner-loading-glow-a" />
      <div className="planner-loading-glow planner-loading-glow-b" />
    </div>
  );
}

export default function Plan() {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const queryPrompt = searchParams.get("prompt") || "";
  const statePrompt = location.state?.prompt || "";
  const initialPrompt = queryPrompt || statePrompt;

  const [prompt, setPrompt] = useState(initialPrompt);
  const [followUpPrompt, setFollowUpPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState(initialPrompt ? "loading" : "idle");
  const [error, setError] = useState("");
  const [activePanel, setActivePanel] = useState("breakdown");
  const [expandedAlternatives, setExpandedAlternatives] = useState({});
  const [selectedUniversity, setSelectedUniversity] = useState("");
  const [isRefining, setIsRefining] = useState(false);
  const [isSwitchingUniversity, setIsSwitchingUniversity] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isWorkspaceExpanded, setIsWorkspaceExpanded] = useState(false);
  const [activeAngleId, setActiveAngleId] = useState("");
  const [pendingUniversity, setPendingUniversity] = useState("");
  const skipNextPromptSyncRef = useRef(false);
  const workspaceRef = useRef(null);

  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt]);

  useEffect(() => {
    if (!initialPrompt) return;
    if (skipNextPromptSyncRef.current) {
      skipNextPromptSyncRef.current = false;
      return;
    }

    let isActive = true;

    const loadInitialResult = async () => {
      setStatus("loading");
      setError("");

      try {
        const nextResult = await generatePlannerResult({ prompt: initialPrompt });
        if (!isActive) return;
        setResult(nextResult);
        setSelectedUniversity(nextResult.defaultUniversity || "UNSW Sydney");
        setStatus("success");
      } catch (nextError) {
        if (!isActive) return;
        setError(nextError.message || "Unable to generate the pathway right now.");
        setStatus("error");
      }
    };

    loadInitialResult();

    return () => {
      isActive = false;
    };
  }, [initialPrompt]);

  const selectedUniversityData = useMemo(() => {
    if (!result) return null;
    return result.recommendedUniversities.find((item) => item.name === selectedUniversity) || null;
  }, [result, selectedUniversity]);

  const activeRecommendation = useMemo(() => {
    if (!result) return null;
    return result.universities?.[selectedUniversity] || result.recommended;
  }, [result, selectedUniversity]);

  const syncPromptToUrl = (nextPrompt) => {
    const trimmedPrompt = nextPrompt.trim();
    if (!trimmedPrompt) {
      setSearchParams({});
      return;
    }

    skipNextPromptSyncRef.current = true;
    setSearchParams({ prompt: trimmedPrompt });
  };

  const handleSearch = async () => {
    const trimmedPrompt = prompt.trim();
    if (!trimmedPrompt) return;

    setStatus("loading");
    setError("");
    setExpandedAlternatives({});
    setActivePanel("breakdown");
    setIsWorkspaceExpanded(false);
    syncPromptToUrl(trimmedPrompt);

    try {
      const nextResult = await generatePlannerResult({ prompt: trimmedPrompt });
      setResult(nextResult);
      setSelectedUniversity(nextResult.defaultUniversity || "UNSW Sydney");
      setStatus("success");
    } catch (nextError) {
      setError(nextError.message || "Unable to generate the pathway right now.");
      setStatus("error");
    }
  };

  const handleFollowUp = async () => {
    const refinement = followUpPrompt.trim();
    if (!refinement || !result) return;

    setIsRefining(true);
    setError("");

    try {
      const nextResult = await refinePlannerResult({
        currentResult: result,
        selectedUniversity,
        followUpPrompt: refinement,
      });
      setResult(nextResult);
      setFollowUpPrompt("");
    } catch (nextError) {
      setError(nextError.message || "Unable to refine the pathway right now.");
    } finally {
      setIsRefining(false);
    }
  };

  const handleUniversitySelection = (nextUniversity, { expandWorkspace = false } = {}) => {
    if (!result) return;
    if (nextUniversity === selectedUniversity && expandWorkspace) {
      setIsWorkspaceExpanded(true);
      setActivePanel("coursePlan");
      window.setTimeout(() => {
        workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 40);
      return;
    }
    if (nextUniversity === selectedUniversity) return;

    setIsSwitchingUniversity(true);
    setPendingUniversity(nextUniversity);
    window.setTimeout(() => {
      setSelectedUniversity(nextUniversity);
      if (expandWorkspace) {
        setIsWorkspaceExpanded(true);
        setActivePanel("coursePlan");
        window.setTimeout(() => {
          workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 40);
      }
      setIsSwitchingUniversity(false);
      setPendingUniversity("");
    }, 1200);
  };

  const handlePanelChange = (nextPanel) => {
    if (nextPanel === activePanel) return;

    setIsDetailLoading(true);
    window.setTimeout(() => {
      setActivePanel(nextPanel);
      setIsDetailLoading(false);
    }, 220);
  };

  const toggleAlternative = (id) => {
    setExpandedAlternatives((current) => ({
      ...current,
      [id]: !current[id],
    }));
    setActiveAngleId((current) => (current === id ? "" : id));
    setIsWorkspaceExpanded(true);
    setActivePanel("breakdown");
  };

  const activeAngle = result?.alternatives.find((item) => item.id === activeAngleId) || null;

  return (
    <main className="plan-page">
      {isSwitchingUniversity && (
        <FullscreenSwitchOverlay university={pendingUniversity || selectedUniversity} />
      )}

      <section className="plan-hero glass-panel">
        <div className="plan-hero-background">
          <PlannerHeroScene />
        </div>
        <div className="plan-hero-copy">
          <div className="eyebrow">
            <FaBrain />
            FlamingoBeavers AI planner
          </div>

          <h1>Search for any degree, pathway, or student priority.</h1>

          <p className="plan-subtext">
            Enter a natural-language prompt and FlamingoBeavers returns a primary
            recommended pathway, alternative angles, and a generated course plan
            structure ready for a future backend and Elastic pipeline.
          </p>
        </div>

        <div className="planner-search-shell">
          <label className="composer-label" htmlFor="planner-prompt">
            What do you want to study or optimise for?
          </label>

          <div className="planner-search-box">
            <textarea
              id="planner-prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder='Try: "I want a UNSW pathway into engineering that is efficient, internship-friendly, and manageable."'
            />

            <button type="button" className="search-btn" onClick={handleSearch}>
              {status === "loading" ? "Generating..." : "Search"}
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {status === "idle" && (
        <section className="empty-state glass-panel fade-up">
          <span className="section-kicker">Start with a prompt</span>
          <h2>Your recommended pathway will appear here.</h2>
          <p>
            Ask for a degree route, a transfer pathway, or the planning style
            you care about most. The frontend is already structured for a future
            API response shape.
          </p>
        </section>
      )}

      {status === "loading" && (
        <section className="loading-state glass-panel fade-up">
          <PlannerLoadingScene />
          <span className="section-kicker">Generating planner output</span>
          <h2>Generating your planner workspace...</h2>
          <p>
            Simulating the future request cycle with a premium AI planning handoff:
            prompt in, recommendation and roadmap out.
          </p>
        </section>
      )}

      {status === "error" && (
        <section className="error-state glass-panel fade-up">
          <span className="section-kicker">Something went wrong</span>
          <h2>We couldn&apos;t generate the pathway.</h2>
          <p>{error}</p>
        </section>
      )}

      {status === "success" && result && activeRecommendation && (
        <section className="results-section fade-up">
          <div className="results-layout">
            <article className={`recommended-card glass-panel ${isRefining || isSwitchingUniversity ? "section-updating" : ""}`}>
              <div className="recommended-header">
                <div>
                  <span className="plan-type">Primary answer</span>
                  <h2>{activeRecommendation.title}</h2>
                  <p className="key-point">{activeRecommendation.keyPoint}</p>
                </div>

                <div className={`fit-score-panel ${scoreClass(activeRecommendation.fitScore)}`}>
                  <span>Fit score</span>
                  <strong>{activeRecommendation.fitScore}/100</strong>
                </div>
              </div>

              <p className="recommended-summary">{activeRecommendation.summary}</p>

              <div className="semantic-badge-row">
                {activeRecommendation.badges.map((item) => (
                  <SemanticBadge key={item.label} item={item} />
                ))}
              </div>

              <div className="metrics-grid">
                {activeRecommendation.metrics.map((item) => (
                  <MetricCard key={item.label} item={item} />
                ))}
              </div>

              <div className="recommended-two-col">
                <div className="insight-box">
                  <h4>Uni life impact</h4>
                  <p>{activeRecommendation.uniLife}</p>
                </div>
                <div className="insight-box">
                  <h4>Professional benefits</h4>
                  <p>{activeRecommendation.professional}</p>
                </div>
              </div>

              <div className="followup-box">
                <label className="composer-label" htmlFor="follow-up-prompt">
                  Refine the AI answer
                </label>

                <div className="followup-row">
                  <input
                    id="follow-up-prompt"
                    className="followup-input"
                    value={followUpPrompt}
                    onChange={(event) => setFollowUpPrompt(event.target.value)}
                    placeholder="Make it more internship-focused, lower workload, or more cost-efficient"
                  />
                  <button type="button" className="primary-card-btn" onClick={handleFollowUp}>
                    {isRefining ? "Refining..." : "Refine"}
                  </button>
                </div>

                <div className="suggestion-row">
                  {result.followUpSuggestions.map((item) => (
                    <button
                      key={item}
                      type="button"
                      className="prompt-chip"
                      onClick={() => setFollowUpPrompt(item)}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            </article>

            <aside className={`results-rail glass-panel ${isRefining || isSwitchingUniversity ? "section-updating" : ""}`}>
              <div className="rail-block">
                <span className="section-kicker">Summary signals</span>
                <div className="bullet-list compact">
                  {activeRecommendation.why.map((point) => (
                    <div key={point} className="bullet-item">
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rail-block">
                <span className="section-kicker">Selected university</span>
                {selectedUniversityData ? (
                  <div className="selected-university-card">
                    <div className="university-select-shell">
                      <div className="university-select-copy">
                        <label className="composer-label" htmlFor="selected-university">
                          Switch university
                        </label>
                        <p>Changing this updates the recommendation, signals, and roadmap instantly.</p>
                      </div>
                      <div className="university-select-wrap">
                        <select
                          id="selected-university"
                          className="university-select"
                          value={selectedUniversity}
                          onChange={(event) => handleUniversitySelection(event.target.value)}
                        >
                          {result.recommendedUniversities.map((item) => (
                            <option key={item.id} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="selected-university-top">
                      <FaUniversity />
                      <div>
                        <strong>{selectedUniversityData.name}</strong>
                        <span>{activeRecommendation.degree}</span>
                      </div>
                    </div>
                    <div className="selected-university-meta">
                      <span className="meta-pill">{activeRecommendation.duration}</span>
                      <span className="meta-pill">{activeRecommendation.studyRhythm}</span>
                      <span className="meta-pill">{activeRecommendation.difficultyBand}</span>
                      {isSwitchingUniversity && (
                        <span className="meta-pill active-loading-pill">
                          <FaCircle />
                          Updating
                        </span>
                      )}
                    </div>
                    <p>{selectedUniversityData.rationale}</p>
                    {activeRecommendation.backendReady && (
                      <div className="backend-note tone-success">
                        UNSW is the only current frontend selection prepared for later backend compatibility.
                      </div>
                    )}
                  </div>
                ) : (
                  <p>Select a university recommendation below.</p>
                )}
              </div>

              <div className="rail-block">
                <span className="section-kicker">Service state</span>
                <div className="meta-pills">
                  <span className="meta-pill">{result.meta.source}</span>
                  <span className="meta-pill">{result.meta.latency}</span>
                  <span className="meta-pill">{result.meta.retrievalLayer}</span>
                  <span className="meta-pill">{result.meta.selectedUniversitySupport}</span>
                </div>
              </div>
            </aside>
          </div>

          <section className={`universities-section glass-panel ${isWorkspaceExpanded ? "workspace-hidden" : ""}`}>
            <div className="section-heading planner-section-heading">
              <span className="section-kicker">Recommended universities</span>
              <h3>Australian university options to explore next</h3>
              <p>
                Mock recommendations for the currently allowed Australian universities:
                Go8 plus UTS and Macquarie University.
              </p>
            </div>

            <div className="universities-grid">
              {result.recommendedUniversities.map((item) => (
                <UniversityCard
                  key={item.id}
                  item={item}
                  selected={item.name === selectedUniversity}
                  onSelect={() =>
                    handleUniversitySelection(item.name, { expandWorkspace: true })
                  }
                />
              ))}
            </div>
          </section>

          <section
            ref={workspaceRef}
            className={`detail-panel glass-panel ${isRefining || isSwitchingUniversity ? "section-updating" : ""} ${isWorkspaceExpanded ? "workspace-expanded" : ""}`}
          >
            <div className="detail-panel-top">
              <div>
                <span className="section-kicker">
                  {isWorkspaceExpanded ? "Planner workspace" : "Deeper detail"}
                </span>
                <h3>
                  {isWorkspaceExpanded
                    ? `Using ${selectedUniversityData?.name || selectedUniversity}`
                    : "Explore the recommendation"}
                </h3>
              </div>

              <div className="panel-toggle-group">
                <button
                  type="button"
                  className={`panel-toggle ${activePanel === "breakdown" ? "active" : ""}`}
                  onClick={() => handlePanelChange("breakdown")}
                >
                  View breakdown
                </button>
                <button
                  type="button"
                  className={`panel-toggle ${activePanel === "coursePlan" ? "active" : ""}`}
                  onClick={() => handlePanelChange("coursePlan")}
                >
                  View course plan
                </button>
              </div>
            </div>

            {!isWorkspaceExpanded ? (
              <div className="detail-panel-body workspace-closed">
                <p>
                  Choose <strong>Use this university</strong> on any recommendation card to
                  open a deeper planner workspace with a timeline roadmap, goals, and advice.
                </p>
              </div>
            ) : isDetailLoading || isSwitchingUniversity ? (
              <div className="detail-panel-body detail-loading-state">
                <PlannerLoadingScene compact />
                <div className="shimmer-line long" />
                <div className="shimmer-grid">
                  <div className="shimmer-card" />
                  <div className="shimmer-card" />
                </div>
              </div>
            ) : activePanel === "breakdown" ? (
              <div className="detail-panel-body">
                <div className="workspace-summary">
                  <div className="workspace-notes">
                    <div className="workspace-note">
                      <span className="section-kicker">Goals</span>
                      <p>{activeRecommendation.summary}</p>
                    </div>
                    <div className="workspace-note">
                      <span className="section-kicker">Advice</span>
                      <p>{activeRecommendation.professional}</p>
                    </div>
                    {activeAngle && (
                      <div className="workspace-note accent-note">
                        <span className="section-kicker">Active angle</span>
                        <p>{activeAngle.summary}</p>
                      </div>
                    )}
                  </div>
                </div>

                <p>{activeRecommendation.breakdown.overview}</p>

                <div className="expanded-grid">
                  <div className="expanded-card">
                    <h5>Key strengths</h5>
                    <div className="bullet-list compact">
                      {activeRecommendation.breakdown.strengths.map((item) => (
                        <div key={item} className="bullet-item">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="expanded-card">
                    <h5>Sample courses</h5>
                    <div className="sample-course-list">
                      {activeRecommendation.breakdown.sampleCourses.map((course) => (
                        <div key={course.code} className="sample-course">
                          <strong>{course.code}</strong>
                          <h6>{course.name}</h6>
                          <p>{course.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="detail-panel-body">
                <div className="workspace-summary">
                  <div className="workspace-notes">
                    <div className="workspace-note">
                      <span className="section-kicker">Primary goal</span>
                      <p>{activeRecommendation.keyPoint}</p>
                    </div>
                    <div className="workspace-note">
                      <span className="section-kicker">Guidance</span>
                      <p>{activeRecommendation.uniLife}</p>
                    </div>
                    {activeAngle && (
                      <div className="workspace-note accent-note">
                        <span className="section-kicker">Angle emphasis</span>
                        <p>{activeAngle.tradeoffs}</p>
                      </div>
                    )}
                  </div>
                </div>
                <CoursePlanView plan={activeRecommendation.coursePlan} />
              </div>
            )}
          </section>

          <section className="alternatives-section">
            <div className="section-heading planner-section-heading">
              <span className="section-kicker">Alternative perspectives</span>
              <h3>Explore other ways to shape the same goal</h3>
              <p>These stay secondary to the primary recommendation and expand only when needed.</p>
            </div>

            <div className="alternative-grid">
              {result.alternatives.map((item) => (
                <AlternativeCard
                  key={item.id}
                  item={item}
                  expanded={Boolean(expandedAlternatives[item.id])}
                  onToggle={() => toggleAlternative(item.id)}
                />
              ))}
            </div>
          </section>
        </section>
      )}
    </main>
  );
}
