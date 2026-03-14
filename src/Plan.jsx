import { useEffect, useMemo, useRef, useState } from "react";
import {
  FaArrowRight,
  FaBolt,
  FaBrain,
  FaClock,
  FaCoins,
  FaLightbulb,
  FaMapMarkedAlt,
  FaRegCompass,
  FaShapes,
} from "react-icons/fa";
import { useLocation, useSearchParams } from "react-router-dom";
import { generatePlannerResult } from "./services/plannerService";

const alternativeIcons = {
  Cheapest: <FaCoins />,
  Efficient: <FaBolt />,
  "Internship-focused": <FaMapMarkedAlt />,
  "Balanced Lifestyle": <FaClock />,
};

function toneClass(tone) {
  return `tone-${tone || "info"}`;
}

function CoursePlanView({ plan }) {
  return (
    <div className="course-plan-wrap">
      {plan.map((yearBlock) => (
        <section key={yearBlock.year} className={`year-block ${toneClass(yearBlock.tone)}`}>
          <div className="year-heading">
            <div>
              <span className="section-kicker">Generated plan</span>
              <h4>{yearBlock.year}</h4>
            </div>
            <span className="meta-pill">Placeholder academic structure</span>
          </div>

          <div className="term-grid">
            {yearBlock.terms.map((term) => (
              <article key={term.name} className={`term-card ${toneClass(term.tone)}`}>
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
  );
}

function AlternativeCard({ item, expanded, onToggle }) {
  return (
    <article className={`alternative-card ${toneClass(item.tone)} ${expanded ? "expanded" : ""}`}>
      <div className="alternative-card-top">
        <div className="alternative-main">
          <div className="alternative-icon">{alternativeIcons[item.type] || <FaLightbulb />}</div>
          <div>
            <span className="alternative-badge">{item.badge}</span>
            <h4>{item.type}</h4>
          </div>
        </div>
        <span className={`alternative-score ${toneClass(item.scoreTone)}`}>{item.fitScore}/100</span>
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

  const metaPills = useMemo(() => {
    if (!result) return [];

    return [
      result.meta.source,
      result.meta.latency,
      result.meta.retrievalLayer,
      result.meta.backendReady ? "backend-ready" : "mock-only",
    ];
  }, [result]);

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

      {status === "success" && result && (
        <section className="results-section fade-up">
          <div className="results-layout">
            <article className={`recommended-card glass-panel ${toneClass(result.recommended.scoreTone)}`}>
              <div className="recommended-header">
                <div>
                  <span className="plan-type">Primary answer</span>
                  <h2>{result.recommended.title}</h2>
                  <p className="key-point">{result.recommended.keyPoint}</p>
                </div>

                <div className={`fit-score-panel ${toneClass(result.recommended.scoreTone)}`}>
                  <span>Fit score</span>
                  <strong>{result.recommended.fitScore}/100</strong>
                </div>
              </div>

              <p className="recommended-summary">{result.recommended.summary}</p>

              <div className="plan-meta">
                <span>{result.recommended.duration}</span>
                <span>{result.recommended.cost}</span>
                <span>{result.recommended.difficulty}</span>
              </div>

              <div className="pathway-strip">
                {result.pathways.map((pathway) => (
                  <span key={pathway.label} className={`pathway-pill ${toneClass(pathway.tone)}`}>
                    {pathway.label}
                  </span>
                ))}
              </div>

              <div className="metrics-grid">
                {result.recommended.stats.map((item) => (
                  <div key={item.label} className={`metric-card ${toneClass(item.tone)}`}>
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>

              <div className="recommended-two-col">
                <div className="insight-box tone-calm">
                  <h4>Uni life impact</h4>
                  <p>{result.recommended.uniLife}</p>
                </div>
                <div className="insight-box tone-vivid">
                  <h4>Professional benefits</h4>
                  <p>{result.recommended.professional}</p>
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
                <span className="section-kicker">Response metadata</span>
                <div className="meta-pills">
                  {metaPills.map((item) => (
                    <span key={item} className="meta-pill">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rail-block">
                <span className="section-kicker">Why this route</span>
                <div className="bullet-list compact">
                  {result.recommended.why.map((point) => (
                    <div key={point} className="bullet-item">
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rail-block route-accent tone-scholar">
                <div className="route-accent-icon">
                  <FaRegCompass />
                </div>
                <h4>Recommendation focus</h4>
                <p>
                  Strong overall fit with enough flexibility to refine toward cost,
                  speed, internships, exchange, or research balance.
                </p>
              </div>

              <div className="rail-block route-accent tone-sun">
                <div className="route-accent-icon">
                  <FaShapes />
                </div>
                <h4>Extra pathway options</h4>
                <p>
                  Explore additional route shapes like double degree planning,
                  transfer starts, scholarship pacing, and exchange-safe sequencing.
                </p>
              </div>
            </aside>
          </div>

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
                <p>{result.recommended.breakdown.overview}</p>

                <div className="expanded-grid">
                  <div className="expanded-card tone-info">
                    <h5>Key strengths</h5>
                    <div className="bullet-list compact">
                      {result.recommended.breakdown.strengths.map((item) => (
                        <div key={item} className="bullet-item">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="expanded-card tone-vivid">
                    <h5>Sample courses</h5>
                    <div className="sample-course-list">
                      {result.recommended.breakdown.sampleCourses.map((course) => (
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
                <CoursePlanView plan={result.recommended.coursePlan} />
              </div>
            )}
          </section>

          <section className="alternatives-section">
            <div className="section-heading">
              <span className="section-kicker">Alternative perspectives</span>
              <h3>Explore other ways to shape the same UNSW goal.</h3>
              <p>
                These cards use the same response contract as the recommended
                answer, so they can later be fed by real backend retrieval and generation.
              </p>
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
