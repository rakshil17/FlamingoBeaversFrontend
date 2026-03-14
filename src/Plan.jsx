import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";

function buildMockData(searchText) {
  const clean = searchText?.trim() || "your query";

  return {
    headline: "Recommended pathway",
    keyPoint:
      "This pathway best balances progression, employability, manageable workload, and long-term flexibility.",
    summary: `Based on "${clean}", this is a polished mock recommendation flow. Later, your backend + Elastic pipeline can replace all of this with real retrieved and generated content.`,
    recommended: {
      title: "Recommended Pathway",
      subtitle:
        "Strong overall academic structure with good flexibility, practical relevance, and healthy progression.",
      fitScore: 94,
      duration: "3.2 years",
      cost: "$33,900 est.",
      difficulty: "Medium",
      uniLife:
        "Gives a balanced experience with a manageable academic load while still leaving room for societies, projects, and networking.",
      professional:
        "Strong balance for graduate opportunities, portfolio building, internships, and long-term role flexibility.",
      why: [
        "Strong alignment with your search intent",
        "Balanced course progression across terms",
        "Good mix of foundational and higher-value subjects",
      ],
      breakdown: {
        overview:
          "This plan spaces core subjects sensibly, keeps progression clear, and avoids overloading early terms too aggressively.",
        strengths: [
          "Smooth academic progression",
          "Flexible enough for electives and exploration",
          "Good fit for both academic success and employability",
        ],
        sampleCourses: [
          {
            code: "COURSE1001",
            name: "Foundations of University Study",
            description:
              "Builds core academic, analytical, and planning skills that support later terms.",
          },
          {
            code: "COURSE1021",
            name: "Discipline Fundamentals",
            description:
              "Introduces the main ideas and technical base of the chosen pathway.",
          },
          {
            code: "COURSE2040",
            name: "Applied Professional Skills",
            description:
              "Focuses on teamwork, communication, and project-style applied learning.",
          },
        ],
      },
      coursePlan: [
        {
          year: "Year 1",
          terms: [
            {
              name: "Term 1",
              units: "12 UOC",
              courses: [
                {
                  code: "COURSE1001",
                  name: "Foundations of University Study",
                  description:
                    "Introduces the core skills needed for success in the degree.",
                },
                {
                  code: "COURSE1010",
                  name: "Introductory Concepts",
                  description:
                    "Builds base-level conceptual understanding for future study.",
                },
              ],
            },
            {
              name: "Term 2",
              units: "12 UOC",
              courses: [
                {
                  code: "COURSE1021",
                  name: "Discipline Fundamentals",
                  description:
                    "Covers the foundational principles most relevant to the pathway.",
                },
                {
                  code: "COURSE1035",
                  name: "Quantitative Thinking",
                  description:
                    "Develops analytical and structured problem-solving skills.",
                },
              ],
            },
            {
              name: "Term 3",
              units: "12 UOC",
              courses: [
                {
                  code: "COURSE1040",
                  name: "Applications in Context",
                  description:
                    "Applies earlier theory to realistic problems and scenarios.",
                },
                {
                  code: "COURSE1050",
                  name: "Elective Exploration",
                  description:
                    "Lets students broaden their experience or test related interests.",
                },
              ],
            },
          ],
        },
      ],
    },
    categories: [
      {
        type: "Cheapest",
        summary:
          "Optimised for cost-efficiency and avoiding unnecessary complexity where possible.",
      },
      {
        type: "Efficient",
        summary:
          "Focused on cleaner progression and completing requirements in a streamlined way.",
      },
      {
        type: "Internship-focused",
        summary:
          "Leaves more room for professional development, practical experience, and employability signals.",
      },
      {
        type: "Balanced Lifestyle",
        summary:
          "Designed to better support workload balance, extracurriculars, and sustainable study.",
      },
    ],
    meta: {
      source: "frontend-mock",
      latency: "176ms",
      backendReady: true,
    },
  };
}

function CategoryCard({ item }) {
  return (
    <article className="category-card">
      <div className="category-top">
        <span className="category-pill">{item.type}</span>
      </div>
      <p>{item.summary}</p>
      <button className="secondary-card-btn">Explore angle</button>
    </article>
  );
}

function CoursePlanView({ plan }) {
  return (
    <div className="course-plan-wrap">
      {plan.map((yearBlock) => (
        <div key={yearBlock.year} className="year-block">
          <div className="year-heading">
            <h3>{yearBlock.year}</h3>
            <span className="meta-pill">Mock generated plan</span>
          </div>

          <div className="term-grid">
            {yearBlock.terms.map((term) => (
              <div key={term.name} className="term-card">
                <div className="term-header">
                  <h4>{term.name}</h4>
                  <span>{term.units}</span>
                </div>

                <div className="term-course-list">
                  {term.courses.map((course) => (
                    <div key={course.code} className="term-course">
                      <strong>{course.code}</strong>
                      <h5>{course.name}</h5>
                      <p>{course.description}</p>
                    </div>
                  ))}
                </div>

                <button className="secondary-card-btn">Add / swap placeholder</button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Plan() {
  const location = useLocation();
  const initialPrompt = location.state?.prompt || "";

  const [prompt, setPrompt] = useState(initialPrompt);
  const [hasSearched, setHasSearched] = useState(Boolean(initialPrompt));
  const [loading, setLoading] = useState(false);
  const [followUpPrompt, setFollowUpPrompt] = useState("");
  const [recommendedExpanded, setRecommendedExpanded] = useState(false);
  const [showCoursePlan, setShowCoursePlan] = useState(false);

  const results = useMemo(() => buildMockData(prompt), [prompt]);

  const handleSearch = () => {
    if (!prompt.trim()) return;
    setLoading(true);

    setTimeout(() => {
      setHasSearched(true);
      setRecommendedExpanded(false);
      setShowCoursePlan(false);
      setLoading(false);
    }, 600);
  };

  const handleFollowUp = () => {
    if (!followUpPrompt.trim()) return;
    setRecommendedExpanded(true);
  };

  return (
    <div className="plan-page">
      <div className="plan-orb orb-1"></div>
      <div className="plan-orb orb-2"></div>

      <div className="plan-shell">
        <section className="plan-top">
          <div className="top-badge">UNSW AI Planner</div>

          <h1 className="plan-heading">
            Search for <span>any degree, pathway, or career goal</span>
          </h1>

          <p className="plan-subtext">
            Enter what degree you want to study, what kind of pathway you want,
            or what you care about most. Later this will connect to your backend
            and Elastic to generate real recommendations dynamically.
          </p>

          <div className="search-wrap">
            <textarea
              className="search-box"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder='Try: "I want a UNSW degree pathway that is efficient, internship-friendly, and manageable"'
            />

            <button className="search-btn" onClick={handleSearch}>
              {loading ? "Generating..." : "Search"}
            </button>
          </div>
        </section>

        {hasSearched && (
          <section className="results-section">
            <div className="results-header">
              <div>
                <p className="results-kicker">Generated output</p>
                <h2>{results.headline}</h2>
              </div>

              <div className="meta-pills">
                <span className="meta-pill">{results.meta.source}</span>
                <span className="meta-pill">{results.meta.latency}</span>
                <span className="meta-pill">backend-ready</span>
              </div>
            </div>

            <div className="summary-card main-summary-card">
              <div className="recommended-header">
                <div>
                  <span className="plan-type">Recommended</span>
                  <h3>{results.recommended.title}</h3>
                  <p className="key-point">{results.keyPoint}</p>
                </div>
                <div className="fit-score large-fit-score">
                  {results.recommended.fitScore}/100
                </div>
              </div>

              <p className="recommended-summary">{results.summary}</p>

              <div className="plan-meta">
                <span>{results.recommended.duration}</span>
                <span>{results.recommended.cost}</span>
                <span>{results.recommended.difficulty}</span>
              </div>

              <div className="recommended-two-col">
                <div className="insight-box">
                  <h4>Uni life impact</h4>
                  <p>{results.recommended.uniLife}</p>
                </div>
                <div className="insight-box">
                  <h4>Professional benefits</h4>
                  <p>{results.recommended.professional}</p>
                </div>
              </div>

              <div className="bullet-list">
                {results.recommended.why.map((point) => (
                  <div key={point} className="bullet-item">
                    {point}
                  </div>
                ))}
              </div>

              <div className="followup-box">
                <label className="followup-label">Prompt further into the AI</label>
                <div className="followup-row">
                  <input
                    className="followup-input"
                    value={followUpPrompt}
                    onChange={(e) => setFollowUpPrompt(e.target.value)}
                    placeholder="e.g. Make this more internship-focused, lower workload, or more cost-efficient"
                  />
                  <button className="primary-card-btn" onClick={handleFollowUp}>
                    Refine
                  </button>
                </div>
              </div>

              <div className="card-actions">
                <button
                  className="primary-card-btn"
                  onClick={() => setRecommendedExpanded((v) => !v)}
                >
                  {recommendedExpanded ? "Hide breakdown" : "View breakdown"}
                </button>
                <button
                  className="secondary-card-btn"
                  onClick={() => setShowCoursePlan((v) => !v)}
                >
                  {showCoursePlan ? "Hide course plan" : "View course plan"}
                </button>
              </div>

              {recommendedExpanded && (
                <div className="expanded-panel">
                  <h4>Breakdown</h4>
                  <p>{results.recommended.breakdown.overview}</p>

                  <div className="expanded-grid">
                    <div className="expanded-card">
                      <h5>Key strengths</h5>
                      <div className="bullet-list compact">
                        {results.recommended.breakdown.strengths.map((item) => (
                          <div key={item} className="bullet-item">
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="expanded-card">
                      <h5>Sample courses</h5>
                      <div className="sample-course-list">
                        {results.recommended.breakdown.sampleCourses.map((course) => (
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
              )}

              {showCoursePlan && (
                <div className="expanded-panel">
                  <h4>Generated course plan</h4>
                  <CoursePlanView plan={results.recommended.coursePlan} />
                </div>
              )}
            </div>

            <div className="categories-section">
              <div className="section-mini-head">
                <h3>Alternative angles</h3>
                <p>
                  These can later be AI-generated perspectives on different
                  aspects of university life, planning strategy, and professional outcomes.
                </p>
              </div>

              <div className="category-grid">
                {results.categories.map((item) => (
                  <CategoryCard key={item.type} item={item} />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>

      <style>{`
        .plan-page {
          min-height: 100vh;
          padding: 32px 18px 80px;
          color: #f4f7ff;
          background:
            radial-gradient(circle at 10% 10%, rgba(160, 92, 255, 0.18), transparent 25%),
            radial-gradient(circle at 90% 15%, rgba(73, 201, 255, 0.16), transparent 25%),
            radial-gradient(circle at 50% 90%, rgba(255, 84, 174, 0.14), transparent 25%),
            linear-gradient(180deg, #07101d 0%, #0a1220 45%, #08111a 100%);
          position: relative;
          overflow-x: hidden;
        }

        .plan-orb {
          position: fixed;
          border-radius: 999px;
          filter: blur(100px);
          pointer-events: none;
          z-index: 0;
        }

        .orb-1 {
          width: 280px;
          height: 280px;
          top: 60px;
          left: -60px;
          background: rgba(181, 93, 255, 0.22);
        }

        .orb-2 {
          width: 320px;
          height: 320px;
          right: -90px;
          bottom: 40px;
          background: rgba(82, 187, 255, 0.18);
        }

        .plan-shell {
          width: min(1240px, 100%);
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .plan-top {
          padding: 40px 34px 34px;
          border-radius: 32px;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 24px 70px rgba(0,0,0,0.24);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
        }

        .top-badge {
          display: inline-block;
          padding: 8px 14px;
          border-radius: 999px;
          font-size: 0.82rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #9de6ff;
          background: rgba(157, 230, 255, 0.1);
          border: 1px solid rgba(157, 230, 255, 0.18);
        }

        .plan-heading {
          margin: 20px 0 14px;
          font-size: clamp(2.5rem, 5vw, 5rem);
          line-height: 0.95;
          letter-spacing: -0.05em;
        }

        .plan-heading span {
          background: linear-gradient(135deg, #f3f6ff 0%, #84dfff 35%, #cb7bff 70%, #ff88bc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .plan-subtext {
          max-width: 850px;
          font-size: 1.02rem;
          line-height: 1.75;
          color: rgba(240, 245, 255, 0.72);
          margin-bottom: 26px;
        }

        .search-wrap {
          display: grid;
          grid-template-columns: 1fr 180px;
          gap: 14px;
          align-items: stretch;
        }

        .search-box {
          min-height: 120px;
          width: 100%;
          resize: vertical;
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 24px;
          background: rgba(255,255,255,0.07);
          color: white;
          padding: 20px 20px;
          font: inherit;
          font-size: 1rem;
          line-height: 1.6;
          outline: none;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.05);
        }

        .search-box::placeholder {
          color: rgba(255,255,255,0.4);
        }

        .search-btn {
          width: 180px;
          height: auto;
          border: none;
          border-radius: 24px;
          padding: 18px 20px;
          font: inherit;
          font-weight: 800;
          font-size: 1rem;
          color: #07101d;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #7fe8ff, #c77bff, #ff8ec0);
          background-size: 200% 200%;
          box-shadow:
            0 16px 30px rgba(181, 106, 255, 0.24),
            0 6px 14px rgba(73, 201, 255, 0.16);
          transition: transform 0.22s ease, box-shadow 0.22s ease, filter 0.22s ease;
        }

        .search-btn:hover {
          transform: translateY(-2px);
          filter: brightness(1.03);
          box-shadow:
            0 22px 40px rgba(181, 106, 255, 0.28),
            0 8px 18px rgba(73, 201, 255, 0.18);
        }

        .results-section {
          margin-top: 28px;
          padding: 28px;
          border-radius: 30px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.1);
          box-shadow: 0 22px 60px rgba(0,0,0,0.2);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .results-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 18px;
        }

        .results-kicker {
          margin: 0 0 6px;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          font-size: 0.78rem;
          font-weight: 800;
          color: #9de6ff;
        }

        .results-header h2 {
          margin: 0;
          font-size: 2rem;
        }

        .meta-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .meta-pill {
          padding: 9px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.82);
          font-size: 0.88rem;
          font-weight: 600;
        }

        .summary-card,
        .category-card,
        .expanded-card,
        .term-card,
        .insight-box {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 22px;
        }

        .main-summary-card {
          padding: 24px;
          margin-bottom: 24px;
        }

        .recommended-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 12px;
        }

        .plan-type {
          display: inline-flex;
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 10px;
        }

        .main-summary-card h3,
        .section-mini-head h3,
        .year-heading h3 {
          margin: 0;
        }

        .key-point {
          color: rgba(240,245,255,0.9);
          font-weight: 600;
          margin-top: 8px;
        }

        .large-fit-score {
          font-size: 1.2rem;
          font-weight: 800;
          color: #9fe7ff;
          white-space: nowrap;
        }

        .recommended-summary {
          color: rgba(240,245,255,0.72);
          line-height: 1.7;
          margin-bottom: 16px;
        }

        .plan-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 18px;
        }

        .plan-meta span {
          padding: 8px 12px;
          border-radius: 999px;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.82);
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .recommended-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-bottom: 18px;
        }

        .insight-box {
          padding: 16px;
        }

        .insight-box h4,
        .expanded-panel h4,
        .term-header h4,
        .sample-course h6,
        .term-course h5,
        .expanded-card h5 {
          margin-top: 0;
          margin-bottom: 8px;
        }

        .insight-box p,
        .bullet-item,
        .category-card p,
        .expanded-panel p,
        .sample-course p,
        .term-course p {
          color: rgba(240,245,255,0.72);
          line-height: 1.65;
          margin: 0;
        }

        .bullet-list {
          display: grid;
          gap: 10px;
          margin: 0 0 20px;
        }

        .bullet-list.compact {
          margin-bottom: 0;
        }

        .bullet-item {
          padding: 12px 14px;
          border-radius: 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.07);
        }

        .followup-box {
          margin-top: 4px;
          margin-bottom: 18px;
        }

        .followup-label {
          display: block;
          font-size: 0.92rem;
          font-weight: 700;
          margin-bottom: 10px;
          color: rgba(255,255,255,0.9);
        }

        .followup-row {
          display: grid;
          grid-template-columns: 1fr 140px;
          gap: 10px;
        }

        .followup-input {
          width: 100%;
          border: 1px solid rgba(255,255,255,0.1);
          background: rgba(255,255,255,0.06);
          color: white;
          border-radius: 16px;
          padding: 14px 15px;
          font: inherit;
          outline: none;
        }

        .card-actions {
          display: flex;
          gap: 10px;
          margin-top: 6px;
        }

        .primary-card-btn,
        .secondary-card-btn {
          border: none;
          border-radius: 14px;
          padding: 12px 14px;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .primary-card-btn {
          color: #07101d;
          background: linear-gradient(135deg, #80e8ff, #ca7bff, #ff92c3);
          box-shadow: 0 12px 24px rgba(191, 117, 255, 0.2);
        }

        .secondary-card-btn {
          color: white;
          background: rgba(255,255,255,0.07);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .primary-card-btn:hover,
        .secondary-card-btn:hover {
          transform: translateY(-2px);
        }

        .expanded-panel {
          margin-top: 18px;
          padding-top: 18px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }

        .expanded-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
          margin-top: 14px;
        }

        .expanded-card {
          padding: 16px;
        }

        .sample-course-list,
        .term-course-list {
          display: grid;
          gap: 12px;
        }

        .sample-course,
        .term-course {
          padding: 12px 14px;
          border-radius: 16px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.07);
        }

        .categories-section {
          margin-top: 8px;
        }

        .section-mini-head {
          margin-bottom: 14px;
        }

        .section-mini-head p {
          color: rgba(240,245,255,0.7);
          margin: 8px 0 0;
          line-height: 1.65;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        .category-card {
          padding: 18px;
          box-shadow: 0 18px 44px rgba(0,0,0,0.12);
        }

        .category-top {
          margin-bottom: 10px;
        }

        .category-pill {
          display: inline-flex;
          padding: 8px 11px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.08);
        }

        .category-card p {
          margin-bottom: 14px;
        }

        .course-plan-wrap {
          margin-top: 10px;
        }

        .year-block + .year-block {
          margin-top: 18px;
        }

        .year-heading {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .term-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
        }

        .term-card {
          padding: 16px;
        }

        .term-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }

        .term-header span {
          color: rgba(255,255,255,0.68);
          font-size: 0.9rem;
        }

        @media (max-width: 1100px) {
          .category-grid,
          .term-grid,
          .expanded-grid,
          .recommended-two-col {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 760px) {
          .plan-top,
          .results-section {
            padding: 22px 18px;
            border-radius: 24px;
          }

          .search-wrap,
          .followup-row {
            grid-template-columns: 1fr;
          }

          .search-btn {
            width: 100%;
          }

          .results-header,
          .recommended-header,
          .card-actions,
          .year-heading {
            flex-direction: column;
            align-items: flex-start;
          }

          .category-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}