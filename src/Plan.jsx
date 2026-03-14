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

function CoursePlanView({ plan }) {
  return (
    <div className="course-plan-layout">
      <aside className="course-plan-timeline">
        <span className="section-kicker">Progress</span>
        <h4>Degree timeline</h4>
        <p>Mock completion pacing so the plan feels tangible and staged.</p>

        <div className="timeline-list">
          {plan.map((yearBlock) => (
            <div key={yearBlock.year} className="timeline-item">
              <div className="timeline-copy">
                <strong>{yearBlock.year}</strong>
                <span>{yearBlock.completion}% complete</span>
              </div>
              <div className="timeline-track">
                <div
                  className={`timeline-fill ${scoreClass(yearBlock.completion)}`}
                  style={{ width: `${yearBlock.completion}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </aside>

      <div className="course-plan-wrap">
        {plan.map((yearBlock) => (
          <section key={yearBlock.year} className="year-block">
            <div className="year-heading">
              <div>
                <span className="section-kicker">Generated plan</span>
                <h4>{yearBlock.year}</h4>
              </div>
              <span className="meta-pill">{yearBlock.completion}% complete</span>
            </div>

            <div className="term-grid">
              {yearBlock.terms.map((term) => (
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
        ))}
      </div>
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
  const skipNextPromptSyncRef = useRef(false);

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

    setStatus("loading");
    setError("");

    try {
      const nextResult = await generatePlannerResult({
        prompt: prompt.trim(),
        previousResultId: result.id,
        followUpPrompt: refinement,
      });
      setResult(nextResult);
      setSelectedUniversity((current) => current || nextResult.defaultUniversity || "UNSW Sydney");
      setFollowUpPrompt("");
      setActivePanel("breakdown");
      setStatus("success");
    } catch (nextError) {
      setError(nextError.message || "Unable to refine the pathway right now.");
      setStatus("error");
    }
  };

  const toggleAlternative = (id) => {
    setExpandedAlternatives((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  return (
    <main className="plan-page">
      <section className="plan-hero glass-panel">
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
          <div className="loading-orb" />
          <span className="section-kicker">Generating planner output</span>
          <h2>Building a mock FlamingoBeavers recommendation flow...</h2>
          <p>
            Simulating the future request cycle: prompt in, retrieval-backed
            planning response out.
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
            <article className="recommended-card glass-panel">
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
                    Refine
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

            <aside className="results-rail glass-panel">
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
                          onChange={(event) => setSelectedUniversity(event.target.value)}
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

          <section className="universities-section glass-panel">
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
                  onSelect={() => setSelectedUniversity(item.name)}
                />
              ))}
            </div>
          </section>

          <section className="detail-panel glass-panel">
            <div className="detail-panel-top">
              <div>
                <span className="section-kicker">Deeper detail</span>
                <h3>Explore the recommendation</h3>
              </div>

              <div className="panel-toggle-group">
                <button
                  type="button"
                  className={`panel-toggle ${activePanel === "breakdown" ? "active" : ""}`}
                  onClick={() => setActivePanel("breakdown")}
                >
                  View breakdown
                </button>
                <button
                  type="button"
                  className={`panel-toggle ${activePanel === "coursePlan" ? "active" : ""}`}
                  onClick={() => setActivePanel("coursePlan")}
                >
                  View course plan
                </button>
              </div>
            </div>

            {activePanel === "breakdown" ? (
              <div className="detail-panel-body">
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
