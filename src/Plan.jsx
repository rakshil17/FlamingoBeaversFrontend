import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import {
  FaArrowRight,
  FaBrain,
  FaCheckCircle,
  FaCircle,
  FaClock,
  FaCoins,
  FaLightbulb,
  FaUniversity,
} from "react-icons/fa";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  applyAlternativeResult,
  generatePlannerResult,
  refinePlannerResult,
} from "./services/plannerService";

const alternativeIcons = {
  Recommended: <FaCheckCircle />,
  Cheapest: <FaCoins />,
  Easiest: <FaClock />,
};

let hasPlayedPlanTitleAnimation = false;

function toneClass(tone) {
  return `tone-${tone || "neutral"}`;
}

function scoreClass(score) {
  if (score >= 90) return "status-good";
  if (score >= 80) return "status-mid";
  return "status-bad";
}

function getPlanCopy(copy) {
  return copy?.plan || {};
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

function UniversityCard({ item, selected, onSelect, ui }) {
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
            {ui.universityBackendReady}
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

function getYearAdvice(year, ui) {
  if (year.includes("Year 1")) {
    return {
      focus: ui.year1Focus,
      advice: ui.year1Advice,
    };
  }

  if (year.includes("Year 2")) {
    return {
      focus: ui.year2Focus,
      advice: ui.year2Advice,
    };
  }

  return {
    focus: ui.finalYearFocus,
    advice: ui.finalYearAdvice,
  };
}

function CoursePlanView({ plan, ui }) {
  const [activeYear, setActiveYear] = useState(plan[0]?.year || "");
  const [progressAnimation, setProgressAnimation] = useState("");
  const [progressPulseKey, setProgressPulseKey] = useState(0);
  const [displayProgressPercent, setDisplayProgressPercent] = useState(0);
  const resolvedActiveYear = plan.some((yearBlock) => yearBlock.year === activeYear)
    ? activeYear
    : plan[0]?.year || "";
  const activeBlock = plan.find((yearBlock) => yearBlock.year === resolvedActiveYear) || plan[0];
  const yearAdvice = getYearAdvice(activeBlock.year, ui);
  const activeIndex = Math.max(
    0,
    plan.findIndex((yearBlock) => yearBlock.year === activeBlock.year)
  );
  const progressPercent = plan.length > 1 ? (activeIndex / (plan.length - 1)) * 100 : 100;

  useEffect(() => {
    setDisplayProgressPercent(progressPercent);
  }, [progressPercent]);

  const handleYearSelect = (nextYear) => {
    const nextIndex = plan.findIndex((yearBlock) => yearBlock.year === nextYear);
    if (nextIndex === -1 || nextYear === activeBlock.year) return;
    const nextProgressPercent = plan.length > 1 ? (nextIndex / (plan.length - 1)) * 100 : 100;

    setProgressAnimation(nextIndex > activeIndex ? "forward" : "backward");
    setProgressPulseKey((current) => current + 1);
    setActiveYear(nextYear);
    window.setTimeout(() => {
      setDisplayProgressPercent(nextProgressPercent);
    }, 35);
    window.setTimeout(() => {
      setProgressAnimation("");
    }, 1250);
  };

  return (
    <div className="course-plan-workspace">
      <div className="timeline-bar-shell">
        <div className="timeline-bar-line" />
        <div className="timeline-progress-track">
          <div
            key={progressPulseKey}
            className={`timeline-progress-fill ${progressAnimation || "steady"}`}
            style={{ width: `${displayProgressPercent}%` }}
          >
            <span className="timeline-particle particle-a" />
            <span className="timeline-particle particle-b" />
            <span className="timeline-particle particle-c" />
            <span className="timeline-particle particle-d" />
            <span className="timeline-particle particle-e" />
            <span className="timeline-particle particle-f" />
          </div>
        </div>
        <div className="timeline-year-row">
          {plan.map((yearBlock) => (
            <button
              key={yearBlock.year}
              type="button"
              className={`timeline-year-button ${yearBlock.year === activeBlock.year ? "active" : ""}`}
              onClick={() => handleYearSelect(yearBlock.year)}
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
            <span className="section-kicker">{ui.activeStage}</span>
            <h4>{activeBlock.year}</h4>
          </div>
          <span className="meta-pill">{activeBlock.completion}% {ui.pathwayStoryMapped}</span>
        </div>

        <div className="year-advice-strip">
          <div className="year-advice-lead">
            <span className="section-kicker">{ui.focus}</span>
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

function AlternativeCard({
  item,
  expanded,
  onToggle,
  residencyStatus,
  onResidencyChange,
  onApplyScenario,
  ui,
}) {
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

      {item.type === "Cheapest" && (
        <div className="alternative-control-row">
          <div className="scenario-toggle" role="group" aria-label={ui.residencyStatus}>
            <button
              type="button"
              className={`scenario-toggle-option ${
                residencyStatus === "domestic" ? "active" : ""
              }`}
              onClick={() => onResidencyChange("domestic")}
            >
              {ui.domesticResidency}
            </button>
            <button
              type="button"
              className={`scenario-toggle-option ${
                residencyStatus === "international" ? "active" : ""
              }`}
              onClick={() => onResidencyChange("international")}
            >
              {ui.internationalResidency}
            </button>
          </div>
        </div>
      )}

      <div className="alternative-actions">
        <button type="button" className="inline-action" onClick={onApplyScenario}>
          {ui.exploreAngle}
        </button>
        <button type="button" className="inline-action secondary" onClick={onToggle}>
          {expanded ? ui.hideDetails : ui.viewDetails}
        </button>
      </div>

      {expanded && (
        <div className="alternative-expanded">
          <div className="alternative-column">
            <h5>{ui.whyAngleWorks}</h5>
            <div className="bullet-list compact">
              {item.rationale.map((point) => (
                <div key={point} className="bullet-item">
                  {point}
                </div>
              ))}
            </div>
          </div>

          <div className="alternative-column">
            <h5>{ui.tradeoff}</h5>
            <p>{item.tradeoffs}</p>
            <h5>{ui.coursePlanShape}</h5>
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

function FullscreenSwitchOverlay({ university, ui }) {
  return (
    <div className="fullscreen-switch-overlay">
      <SwitchOverlayScene />
      <div className="fullscreen-switch-copy">
        <span className="section-kicker">{ui.switchingUniversity}</span>
        <h2>{ui.openingPrefix} {university}</h2>
        <p>{ui.switchingUniversityBody}</p>
      </div>
    </div>
  );
}

function FullscreenSearchOverlay({ prompt, ui }) {
  return (
    <div className="fullscreen-switch-overlay search-overlay">
      <SwitchOverlayScene />
      <div className="fullscreen-switch-copy">
        <span className="section-kicker">{ui.generatingPlanner}</span>
        <h2>{ui.buildingPathway}</h2>
        <p>
          {ui.refreshingPlannerFor} {prompt ? `"${prompt}"` : ui.newSearch}.
        </p>
      </div>
    </div>
  );
}

function FullscreenScenarioOverlay({ alternativeType, residencyStatus, ui }) {
  const residencyLabel =
    residencyStatus === "international" ? ui.internationalShortLabel : ui.domesticShortLabel;

  return (
    <div className="fullscreen-switch-overlay search-overlay">
      <SwitchOverlayScene />
      <div className="fullscreen-switch-copy">
        <span className="section-kicker">{ui.updatingPlannerAngle}</span>
        <h2>{alternativeType}</h2>
        <p>
          {alternativeType === "Cheapest"
            ? `${ui.applyingCostLensPrefix} ${residencyLabel} ${ui.applyingCostLensSuffix}`
            : `${ui.refreshingPlannerWithAnglePrefix} ${alternativeType.toLowerCase()} ${ui.refreshingPlannerWithAngleSuffix}`}
        </p>
      </div>
    </div>
  );
}

function FloatingLoadingShapes({ variant = "default" }) {
  const groupRef = useRef(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.z += delta * 0.08;
      groupRef.current.rotation.y += delta * 0.18;
    }
  });

  const spread = variant === "overlay" ? 2.45 : 1.85;
  const depth = variant === "overlay" ? -1.8 : -1.2;

  return (
    <group ref={groupRef}>
      <Float speed={1.25} rotationIntensity={0.75} floatIntensity={0.8}>
        <mesh position={[-spread, 0.68, depth]} rotation={[0.6, 0.3, 0.2]}>
          <icosahedronGeometry args={[0.32, 1]} />
          <MeshDistortMaterial color="#69ddff" roughness={0.08} metalness={0.48} distort={0.18} speed={1.1} />
        </mesh>
      </Float>
      <Float speed={1.1} rotationIntensity={0.7} floatIntensity={0.72}>
        <mesh position={[spread, -0.34, depth - 0.2]} rotation={[0.45, 0.82, 0.35]}>
          <boxGeometry args={[0.36, 0.36, 0.36]} />
          <MeshDistortMaterial color="#ff7fbc" roughness={0.12} metalness={0.36} distort={0.1} speed={1} />
        </mesh>
      </Float>
      <Float speed={1.38} rotationIntensity={0.8} floatIntensity={0.66}>
        <mesh position={[0.12, 1.45, depth - 0.55]} rotation={[0.18, 0.26, 0.96]}>
          <torusKnotGeometry args={[0.26, 0.08, 120, 18]} />
          <MeshDistortMaterial color="#b56dff" roughness={0.1} metalness={0.68} distort={0.08} speed={1.2} />
        </mesh>
      </Float>
      <Float speed={1.2} rotationIntensity={0.62} floatIntensity={0.72}>
        <mesh position={[0.32, -1.22, depth - 0.35]} rotation={[0.32, 0.18, 0.22]}>
          <octahedronGeometry args={[0.24, 0]} />
          <MeshDistortMaterial color="#ffd166" roughness={0.08} metalness={0.42} distort={0.08} speed={1} />
        </mesh>
      </Float>
    </group>
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
        <FloatingLoadingShapes />
      </Canvas>
      <div className="planner-loading-glow planner-loading-glow-a" />
      <div className="planner-loading-glow planner-loading-glow-b" />
    </div>
  );
}

function SwitchOverlayScene() {
  return (
    <div className="switch-overlay-scene" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6.2], fov: 36 }}>
        <ambientLight intensity={0.95} />
        <directionalLight position={[4, 5, 5]} intensity={2.1} color="#8ce3ff" />
        <directionalLight position={[-4, -3, 3]} intensity={1.1} color="#ff8dc7" />
        <Environment preset="sunset" />
        <FloatingLoadingShapes variant="overlay" />
      </Canvas>
      <div className="switch-overlay-glow glow-a" />
      <div className="switch-overlay-glow glow-b" />
      <div className="switch-overlay-glow glow-c" />
    </div>
  );
}

export default function Plan({ copy, language }) {
  const planCopy = getPlanCopy(copy);
  const ui = {
    activeStage: planCopy.activeStage || "Active stage",
    pathwayStoryMapped: planCopy.pathwayStoryMapped || "of pathway story mapped",
    focus: planCopy.focus || "Focus",
    residencyStatus: planCopy.residencyStatus || "Residency status",
    domesticResidency: planCopy.domesticResidency || "Domestic (HECS/CSP)",
    internationalResidency: planCopy.internationalResidency || "International",
    domesticShortLabel: planCopy.domesticShortLabel || "domestic",
    internationalShortLabel: planCopy.internationalShortLabel || "international",
    viewDetails: planCopy.viewDetails || "View details",
    switchingUniversity: planCopy.switchingUniversity || "Switching university",
    openingPrefix: planCopy.openingPrefix || "Opening",
    switchingUniversityBody:
      planCopy.switchingUniversityBody ||
      "Reframing the same planner workspace around a new university-specific pathway.",
    generatingPlanner: planCopy.generatingPlanner || "Generating planner",
    buildingPathway: planCopy.buildingPathway || "Building your pathway",
    refreshingPlannerFor: planCopy.refreshingPlannerFor || "Refreshing the full planner view for",
    newSearch: planCopy.newSearch || "your new search",
    updatingPlannerAngle: planCopy.updatingPlannerAngle || "Updating planner angle",
    applyingCostLensPrefix: planCopy.applyingCostLensPrefix || "Applying a",
    applyingCostLensSuffix: planCopy.applyingCostLensSuffix || "cost lens to the current plan.",
    refreshingPlannerWithAnglePrefix:
      planCopy.refreshingPlannerWithAnglePrefix || "Refreshing the planner with a",
    refreshingPlannerWithAngleSuffix:
      planCopy.refreshingPlannerWithAngleSuffix || "scenario update.",
    generating: planCopy.generating || "Generating...",
    search: planCopy.search || "Search",
    idleKicker: planCopy.idleKicker || "Start with a prompt",
    idleTitle: planCopy.idleTitle || "Your recommended pathway will appear here.",
    idleBody:
      planCopy.idleBody ||
      "Ask for a degree route, a transfer pathway, or the planning style you care about most. The frontend is already structured for a future API response shape.",
    loadingKicker: planCopy.loadingKicker || "Generating planner output",
    loadingTitle: planCopy.loadingTitle || "Generating your planner workspace...",
    loadingBody:
      planCopy.loadingBody ||
      "Simulating the future request cycle with a premium AI planning handoff: prompt in, recommendation and roadmap out.",
    errorKicker: planCopy.errorKicker || "Something went wrong",
    errorTitle: planCopy.errorTitle || "We couldn't generate the pathway.",
    primaryAnswer: planCopy.primaryAnswer || "Primary answer",
    fitScore: planCopy.fitScore || "Fit score",
    uniLifeImpact: planCopy.uniLifeImpact || "Uni life impact",
    professionalBenefits: planCopy.professionalBenefits || "Professional benefits",
    refineLabel: planCopy.refineLabel || "Refine the AI answer",
    refinePlaceholder:
      planCopy.refinePlaceholder ||
      "Make it more internship-focused, lower workload, or more cost-efficient",
    refineButton: planCopy.refineButton || "Refine",
    refining: planCopy.refining || "Refining...",
    summarySignals: planCopy.summarySignals || "Summary signals",
    selectedUniversity: planCopy.selectedUniversity || "Selected university",
    switchUniversity: planCopy.switchUniversity || "Switch university",
    switchUniversityBody:
      planCopy.switchUniversityBody ||
      "Changing this updates the recommendation, signals, and roadmap instantly.",
    updating: planCopy.updating || "Updating",
    backendNote:
      planCopy.backendNote ||
      "UNSW is the only current frontend selection prepared for later backend compatibility.",
    selectUniversityFallback:
      planCopy.selectUniversityFallback || "Select a university recommendation below.",
    serviceState: planCopy.serviceState || "Service state",
    recommendedUniversities: planCopy.recommendedUniversities || "Recommended universities",
    universitiesTitle: planCopy.universitiesTitle || "Australian university options to explore next",
    universitiesBody:
      planCopy.universitiesBody ||
      "Mock recommendations for the currently allowed Australian universities: Go8 plus UTS and Macquarie University.",
    plannerWorkspace: planCopy.plannerWorkspace || "Planner workspace",
    deeperDetail: planCopy.deeperDetail || "Deeper detail",
    usingPrefix: planCopy.usingPrefix || "Using",
    exploreRecommendation: planCopy.exploreRecommendation || "Explore the recommendation",
    viewBreakdown: planCopy.viewBreakdown || "View breakdown",
    viewCoursePlan: planCopy.viewCoursePlan || "View course plan",
    useThisUniversityHint:
      planCopy.useThisUniversityHint ||
      "Choose Use this university on any recommendation card to open a deeper planner workspace with a timeline roadmap, goals, and advice.",
    goals: planCopy.goals || "Goals",
    advice: planCopy.advice || "Advice",
    activeAngle: planCopy.activeAngle || "Active angle",
    keyStrengths: planCopy.keyStrengths || "Key strengths",
    sampleCourses: planCopy.sampleCourses || "Sample courses",
    primaryGoal: planCopy.primaryGoal || "Primary goal",
    guidance: planCopy.guidance || "Guidance",
    angleEmphasis: planCopy.angleEmphasis || "Angle emphasis",
    alternativesKicker: planCopy.alternativesKicker || "Alternative perspectives",
    alternativesTitle: planCopy.alternativesTitle || "Explore other ways to shape the same goal",
    alternativesBody:
      planCopy.alternativesBody ||
      "These stay secondary to the primary recommendation and expand only when needed.",
    whyAngleWorks: planCopy.whyAngleWorks || "Why this angle works",
    tradeoff: planCopy.tradeoff || "Tradeoff",
    coursePlanShape: planCopy.coursePlanShape || "Course plan shape",
    hideDetails: planCopy.hideDetails || "Hide details",
    exploreAngle: planCopy.exploreAngle || "Explore this angle",
    universityBackendReady: planCopy.universityBackendReady || "UNSW backend-ready",
    generateError: planCopy.generateError || "Unable to generate the pathway right now.",
    refineError: planCopy.refineError || "Unable to refine the pathway right now.",
    applyAngleError: planCopy.applyAngleError || "Unable to apply this planning angle right now.",
    year1Focus:
      planCopy.year1Focus || "Build your base properly and start showing curiosity outside class.",
    year1Advice: planCopy.year1Advice || [
      "Join case comps, societies, and beginner business events early.",
      "Start small portfolio projects or a LinkedIn-ready profile.",
      "Use first year to test majors before locking in a narrow path.",
    ],
    year2Focus:
      planCopy.year2Focus || "Turn coursework into signals that employers and mentors can actually see.",
    year2Advice: planCopy.year2Advice || [
      "Start applying for internships, insight programs, and winter experiences.",
      "Take on team projects, competitions, or analyst-style extracurricular work.",
      "Shape electives around the kind of role you want after graduation.",
    ],
    finalYearFocus:
      planCopy.finalYearFocus || "Package the degree into a confident finish and convert momentum into outcomes.",
    finalYearAdvice: planCopy.finalYearAdvice || [
      "Prioritise capstone quality, interviews, and graduate applications.",
      "Use final-year projects as proof of your analytical or commercial capability.",
      "Turn mentors, internships, and campus involvement into concrete references.",
    ],
  };

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
  const [isSearching, setIsSearching] = useState(false);
  const [isScenarioLoading, setIsScenarioLoading] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [isWorkspaceExpanded, setIsWorkspaceExpanded] = useState(false);
  const [activeAngleId, setActiveAngleId] = useState("");
  const [residencyStatus, setResidencyStatus] = useState("domestic");
  const [pendingUniversity, setPendingUniversity] = useState("");
  const [pendingScenario, setPendingScenario] = useState(null);
  const [titleSettled, setTitleSettled] = useState(hasPlayedPlanTitleAnimation);
  const skipNextPromptSyncRef = useRef(false);
  const workspaceRef = useRef(null);

  useEffect(() => {
    setPrompt(initialPrompt);
  }, [initialPrompt]);

  useEffect(() => {
    if (hasPlayedPlanTitleAnimation) {
      setTitleSettled(true);
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      hasPlayedPlanTitleAnimation = true;
      setTitleSettled(true);
    }, 2350);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, []);

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
        const nextResult = await generatePlannerResult({ prompt: initialPrompt, locale: language });
        if (!isActive) return;
        setResult(nextResult);
        setSelectedUniversity(nextResult.defaultUniversity || "UNSW Sydney");
        setStatus("success");
      } catch (nextError) {
        if (!isActive) return;
        setError(nextError.message || ui.generateError);
        setStatus("error");
      }
    };

    loadInitialResult();

    return () => {
      isActive = false;
    };
  }, [initialPrompt, language]);

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
    setIsSearching(true);
    setError("");
    setExpandedAlternatives({});
    setActivePanel("breakdown");
    setIsWorkspaceExpanded(false);
    syncPromptToUrl(trimmedPrompt);

    try {
      const nextResult = await generatePlannerResult({ prompt: trimmedPrompt, locale: language });
      setResult(nextResult);
      setSelectedUniversity(nextResult.defaultUniversity || "UNSW Sydney");
      setStatus("success");
    } catch (nextError) {
      setError(nextError.message || ui.generateError);
      setStatus("error");
    } finally {
      setIsSearching(false);
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
        locale: language,
      });
      setResult(nextResult);
      setFollowUpPrompt("");
    } catch (nextError) {
      setError(nextError.message || ui.refineError);
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
    }, 220);
    window.setTimeout(() => {
      setIsDetailLoading(false);
    }, 420);
  };

  const toggleAlternative = (id) => {
    setExpandedAlternatives((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  const activeAngle = result?.alternatives.find((item) => item.id === activeAngleId) || null;

  const handleAlternativeScenario = async (item) => {
    if (!result) return;

    setIsScenarioLoading(true);
    setPendingScenario({
      type: item.type,
      residencyStatus: item.type === "Cheapest" ? residencyStatus : "domestic",
    });
    setExpandedAlternatives((current) => ({
      ...current,
      [item.id]: true,
    }));

    try {
      const nextResult = await applyAlternativeResult({
        currentResult: result,
        selectedUniversity,
        alternativeId: item.id,
        residencyStatus: item.type === "Cheapest" ? residencyStatus : "domestic",
      });
      setResult(nextResult);
      setActiveAngleId(item.id);
      setIsWorkspaceExpanded(true);
      setActivePanel("breakdown");
      window.setTimeout(() => {
        workspaceRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 40);
    } catch (nextError) {
      setError(nextError.message || ui.applyAngleError);
    } finally {
      setIsScenarioLoading(false);
      setPendingScenario(null);
    }
  };

  return (
    <main className="plan-page">
      {isSearching && <FullscreenSearchOverlay prompt={prompt.trim()} ui={ui} />}
      {isScenarioLoading && pendingScenario && (
        <FullscreenScenarioOverlay
          alternativeType={pendingScenario.type}
          residencyStatus={pendingScenario.residencyStatus}
          ui={ui}
        />
      )}
      {isSwitchingUniversity && (
        <FullscreenSwitchOverlay university={pendingUniversity || selectedUniversity} ui={ui} />
      )}

      <section className="plan-hero glass-panel">
        <div className="plan-hero-background">
          <PlannerHeroScene />
        </div>
        <div className="plan-hero-copy">
          <div className="eyebrow">
            <FaBrain />
            {planCopy.eyebrow || "FlamingoBeavers AI planner"}
          </div>

          <h1 className={`plan-hero-title ${titleSettled ? "is-settled" : "is-shuffling"}`}>
            {planCopy.title || "Search for any degree, pathway, or student priority."}
          </h1>

          <p className="plan-subtext">
            {planCopy.subtext ||
              "Enter a natural-language prompt and FlamingoBeavers returns a primary recommended pathway, alternative angles, and a generated course plan structure ready for a future backend and Elastic pipeline."}
          </p>
        </div>

        <div className="planner-search-shell">
          <label className="composer-label" htmlFor="planner-prompt">
            {planCopy.label || "What do you want to study or optimise for?"}
          </label>

          <div className="planner-search-box">
            <textarea
              id="planner-prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder={
                planCopy.placeholder ||
                'Try: "I want a UNSW pathway into engineering that is efficient, internship-friendly, and manageable."'
              }
            />

            <button type="button" className="search-btn" onClick={handleSearch}>
              {status === "loading" ? ui.generating : ui.search}
              <FaArrowRight />
            </button>
          </div>
        </div>
      </section>

      {status === "idle" && (
        <section className="empty-state glass-panel fade-up">
          <span className="section-kicker">{ui.idleKicker}</span>
          <h2>{ui.idleTitle}</h2>
          <p>{ui.idleBody}</p>
        </section>
      )}

      {status === "loading" && (
        <section className="loading-state glass-panel fade-up">
          <PlannerLoadingScene />
          <span className="section-kicker">{ui.loadingKicker}</span>
          <h2>{ui.loadingTitle}</h2>
          <p>{ui.loadingBody}</p>
        </section>
      )}

      {status === "error" && (
        <section className="error-state glass-panel fade-up">
          <span className="section-kicker">{ui.errorKicker}</span>
          <h2>{ui.errorTitle}</h2>
          <p>{error}</p>
        </section>
      )}

      {status === "success" && result && activeRecommendation && (
        <section className="results-section fade-up">
          <div className="results-layout">
            <article className={`recommended-card glass-panel ${isRefining || isSwitchingUniversity ? "section-updating" : ""}`}>
              <div className="recommended-header">
                <div>
                  <span className="plan-type">{ui.primaryAnswer}</span>
                  <h2>{activeRecommendation.title}</h2>
                  <p className="key-point">{activeRecommendation.keyPoint}</p>
                </div>

                <div className={`fit-score-panel ${scoreClass(activeRecommendation.fitScore)}`}>
                  <span>{ui.fitScore}</span>
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
                  <h4>{ui.uniLifeImpact}</h4>
                  <p>{activeRecommendation.uniLife}</p>
                </div>
                <div className="insight-box">
                  <h4>{ui.professionalBenefits}</h4>
                  <p>{activeRecommendation.professional}</p>
                </div>
              </div>

              <div className="followup-box">
                <label className="composer-label" htmlFor="follow-up-prompt">
                  {ui.refineLabel}
                </label>

                <div className="followup-row">
                  <input
                    id="follow-up-prompt"
                    className="followup-input"
                    value={followUpPrompt}
                    onChange={(event) => setFollowUpPrompt(event.target.value)}
                    placeholder={ui.refinePlaceholder}
                  />
                  <button type="button" className="primary-card-btn" onClick={handleFollowUp}>
                    {isRefining ? ui.refining : ui.refineButton}
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
                <span className="section-kicker">{ui.summarySignals}</span>
                <div className="bullet-list compact">
                  {activeRecommendation.why.map((point) => (
                    <div key={point} className="bullet-item">
                      {point}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rail-block">
                <span className="section-kicker">{ui.selectedUniversity}</span>
                {selectedUniversityData ? (
                  <div className="selected-university-card">
                    <div className="university-select-shell">
                      <div className="university-select-copy">
                        <label className="composer-label" htmlFor="selected-university">
                          {ui.switchUniversity}
                        </label>
                        <p>{ui.switchUniversityBody}</p>
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
                          {ui.updating}
                        </span>
                      )}
                    </div>
                    <p>{selectedUniversityData.rationale}</p>
                    {activeRecommendation.backendReady && (
                      <div className="backend-note tone-success">
                        {ui.backendNote}
                      </div>
                    )}
                  </div>
                ) : (
                  <p>{ui.selectUniversityFallback}</p>
                )}
              </div>

              <div className="rail-block">
                <span className="section-kicker">{ui.serviceState}</span>
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
              <span className="section-kicker">{ui.recommendedUniversities}</span>
              <h3>{ui.universitiesTitle}</h3>
              <p>{ui.universitiesBody}</p>
            </div>

            <div className="universities-grid">
              {result.recommendedUniversities.map((item) => (
                <UniversityCard
                  key={item.id}
                  item={item}
                  selected={item.name === selectedUniversity}
                  ui={ui}
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
                  {isWorkspaceExpanded ? ui.plannerWorkspace : ui.deeperDetail}
                </span>
                <h3>
                  {isWorkspaceExpanded
                    ? `${ui.usingPrefix} ${selectedUniversityData?.name || selectedUniversity}`
                    : ui.exploreRecommendation}
                </h3>
              </div>

              <div className="panel-toggle-group">
                <button
                  type="button"
                  className={`panel-toggle ${activePanel === "breakdown" ? "active" : ""}`}
                  onClick={() => handlePanelChange("breakdown")}
                >
                  {ui.viewBreakdown}
                </button>
                <button
                  type="button"
                  className={`panel-toggle ${activePanel === "coursePlan" ? "active" : ""}`}
                  onClick={() => handlePanelChange("coursePlan")}
                >
                  {ui.viewCoursePlan}
                </button>
              </div>
            </div>

            {!isWorkspaceExpanded ? (
              <div className="detail-panel-body workspace-closed">
                <p>{ui.useThisUniversityHint}</p>
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
                      <span className="section-kicker">{ui.goals}</span>
                      <p>{activeRecommendation.summary}</p>
                    </div>
                    <div className="workspace-note">
                      <span className="section-kicker">{ui.advice}</span>
                      <p>{activeRecommendation.professional}</p>
                    </div>
                    {activeAngle && (
                      <div className="workspace-note accent-note">
                        <span className="section-kicker">{ui.activeAngle}</span>
                        <p>{activeAngle.summary}</p>
                      </div>
                    )}
                  </div>
                </div>

                <p>{activeRecommendation.breakdown.overview}</p>

                <div className="expanded-grid">
                  <div className="expanded-card">
                    <h5>{ui.keyStrengths}</h5>
                    <div className="bullet-list compact">
                      {activeRecommendation.breakdown.strengths.map((item) => (
                        <div key={item} className="bullet-item">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="expanded-card">
                    <h5>{ui.sampleCourses}</h5>
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
                      <span className="section-kicker">{ui.primaryGoal}</span>
                      <p>{activeRecommendation.keyPoint}</p>
                    </div>
                    <div className="workspace-note">
                      <span className="section-kicker">{ui.guidance}</span>
                      <p>{activeRecommendation.uniLife}</p>
                    </div>
                    {activeAngle && (
                      <div className="workspace-note accent-note">
                        <span className="section-kicker">{ui.angleEmphasis}</span>
                        <p>{activeAngle.tradeoffs}</p>
                      </div>
                    )}
                  </div>
                </div>
                <CoursePlanView plan={activeRecommendation.coursePlan} ui={ui} />
              </div>
            )}
          </section>

          <section className="alternatives-section">
            <div className="section-heading planner-section-heading">
              <span className="section-kicker">{ui.alternativesKicker}</span>
              <h3>{ui.alternativesTitle}</h3>
              <p>{ui.alternativesBody}</p>
            </div>

            <div className="alternative-grid">
              {result.alternatives.map((item) => (
                <AlternativeCard
                  key={item.id}
                  item={item}
                  expanded={Boolean(expandedAlternatives[item.id])}
                  onToggle={() => toggleAlternative(item.id)}
                  residencyStatus={residencyStatus}
                  onResidencyChange={setResidencyStatus}
                  onApplyScenario={() => handleAlternativeScenario(item)}
                  ui={ui}
                />
              ))}
            </div>
          </section>
        </section>
      )}
    </main>
  );
}
