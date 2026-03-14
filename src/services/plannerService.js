const alternativeBlueprints = [
  {
    type: "Cheapest",
    badge: "Lower spend",
    tone: "warning",
    summary:
      "Optimises around cost-efficiency while still keeping the pathway academically coherent.",
    rationale: [
      "Prefers cleaner sequencing with fewer detours.",
      "Keeps the workload manageable while reducing unnecessary complexity.",
      "Useful when budget certainty matters as much as fit.",
    ],
    tradeoffs:
      "May leave less room for broad exploration if lower total cost stays the main priority.",
  },
  {
    type: "Efficient",
    badge: "Faster progression",
    tone: "info",
    summary:
      "Streamlines the route so requirements unlock sooner and momentum stays high.",
    rationale: [
      "Reduces bottlenecks that can delay later-stage subjects.",
      "Builds a more direct path into advanced study.",
      "Useful for students who want a cleaner route to completion.",
    ],
    tradeoffs:
      "The pace can feel more intense because flexibility is traded for progression speed.",
  },
  {
    type: "Internship-focused",
    badge: "Career signal",
    tone: "success",
    summary:
      "Shapes the pathway around employability, projects, and room for professional exposure.",
    rationale: [
      "Preserves space for internships and portfolio-building electives.",
      "Prioritises subjects with stronger applied signals.",
      "Useful when students want earlier industry alignment.",
    ],
    tradeoffs:
      "May emphasise practical outcomes over broader academic exploration in the short term.",
  },
  {
    type: "Balanced Lifestyle",
    badge: "Sustainable load",
    tone: "neutral",
    summary:
      "Balances ambition with a steadier study rhythm and more room for extracurricular life.",
    rationale: [
      "Avoids stacking the hardest subjects too aggressively.",
      "Supports part-time work, societies, and recovery time.",
      "Useful for students who care about consistency across the year.",
    ],
    tradeoffs:
      "Usually prioritises sustainability over the shortest possible completion time.",
  },
];

const allowedUniversities = [
  {
    name: "Adelaide University",
    rationale: "Strong for students who want a research-aware environment with a calmer pace.",
    tags: ["research-heavy", "balanced lifestyle"],
  },
  {
    name: "The Australian National University",
    rationale: "A strong mock fit for academically driven pathways with policy or research interest.",
    tags: ["research-heavy", "high prestige"],
  },
  {
    name: "The University of Melbourne",
    rationale: "Useful for broad pathways that benefit from flexibility and strong academic reputation.",
    tags: ["broad curriculum", "global reputation"],
  },
  {
    name: "Monash University",
    rationale: "A compelling option when students want scale, practical options, and international visibility.",
    tags: ["industry-connected", "global reputation"],
  },
  {
    name: "UNSW Sydney",
    rationale: "Best mock fit for this planner because it aligns directly with the future UNSW backend pathway flow.",
    tags: ["backend-ready", "industry-connected"],
    backendReady: true,
  },
  {
    name: "The University of Queensland",
    rationale: "A good mock recommendation for balanced academic depth and a strong campus experience.",
    tags: ["balanced lifestyle", "research-heavy"],
  },
  {
    name: "The University of Sydney",
    rationale: "Useful for students wanting a high-profile metropolitan option with broad pathway flexibility.",
    tags: ["city-based", "high prestige"],
  },
  {
    name: "The University of Western Australia",
    rationale: "A strong mock option for students wanting a more spacious lifestyle and solid academic depth.",
    tags: ["balanced lifestyle", "research-heavy"],
  },
  {
    name: "University of Technology Sydney",
    rationale: "Best suited to students who want practical, city-based, industry-connected pathway planning.",
    tags: ["industry-connected", "internship-friendly"],
  },
  {
    name: "Macquarie University",
    rationale: "A good mock fit for students prioritising flexibility, accessibility, and employability.",
    tags: ["flexible", "career-oriented"],
  },
];

function buildCoursePlan(topic) {
  return [
    {
      year: "Year 1",
      completion: 38,
      terms: [
        {
          name: "Term 1",
          units: "12 UOC",
          courses: [
            {
              code: "UNSW1001",
              name: `${topic} Foundations`,
              description:
                "Introduces the discipline landscape, study habits, and core concepts needed for later progression.",
            },
            {
              code: "UNSW1020",
              name: "Academic Communication and Analysis",
              description:
                "Builds writing, collaboration, and evidence-based reasoning skills for university work.",
            },
          ],
        },
        {
          name: "Term 2",
          units: "12 UOC",
          courses: [
            {
              code: "UNSW1105",
              name: `${topic} Core Methods`,
              description:
                "Develops the main analytical techniques relevant to this pathway.",
            },
            {
              code: "UNSW1120",
              name: "Professional Elective",
              description:
                "Adds an early employability or interest-based angle to the plan.",
            },
          ],
        },
      ],
    },
    {
      year: "Year 2",
      completion: 71,
      terms: [
        {
          name: "Term 1",
          units: "12 UOC",
          courses: [
            {
              code: "UNSW2104",
              name: `${topic} Intermediate Practice`,
              description:
                "Moves into more discipline-specific work while keeping the progression stable.",
            },
            {
              code: "UNSW2140",
              name: "Professional Experience Preparation",
              description:
                "Prepares students for internships, projects, and later-stage planning choices.",
            },
          ],
        },
        {
          name: "Term 2",
          units: "12 UOC",
          courses: [
            {
              code: "UNSW2202",
              name: "Strategy Studio",
              description:
                "Uses the chosen planning direction to guide more advanced decision-making.",
            },
            {
              code: "UNSW2218",
              name: "Interdisciplinary Elective",
              description:
                "Keeps the route flexible while broadening the student profile.",
            },
          ],
        },
      ],
    },
    {
      year: "Year 3",
      completion: 100,
      terms: [
        {
          name: "Term 1",
          units: "12 UOC",
          courses: [
            {
              code: "UNSW3101",
              name: "Capstone Direction",
              description:
                "Pulls together the degree through a more advanced or project-based experience.",
            },
            {
              code: "UNSW3125",
              name: "Pathway Specialisation Elective",
              description:
                "Lets the student lean more into internships, research, or flexibility.",
            },
          ],
        },
      ],
    },
  ];
}

function buildUniversityRecommendations(prompt) {
  const mentionsUNSW = /unsw/i.test(prompt);

  return allowedUniversities.map((university, index) => ({
    id: university.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    ...university,
    cta: university.backendReady ? "Use this university" : "Explore pathway",
    tone: university.backendReady
      ? "success"
      : index < 3
        ? "info"
        : index < 7
          ? "neutral"
          : "warning",
    selected: university.name === "UNSW Sydney" && mentionsUNSW,
  }));
}

export async function generatePlannerResult({
  prompt,
  previousResultId,
  followUpPrompt,
}) {
  if (!prompt?.trim()) {
    throw new Error("Prompt is required to generate a pathway.");
  }

  await new Promise((resolve) => {
    window.setTimeout(resolve, followUpPrompt ? 700 : 900);
  });

  const cleanPrompt = prompt.trim();
  const refinement = followUpPrompt?.trim();
  const topic = cleanPrompt
    .replace(/^i want|help me|show me|find me/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 42) || "UNSW pathway";

  return {
    id: previousResultId || `planner-${Date.now()}`,
    prompt: cleanPrompt,
    recommended: {
      title: refinement ? "Refined Recommended Pathway" : "Recommended Pathway",
      subtitle: refinement
        ? `Updated using your follow-up: "${refinement}"`
        : "Best overall fit for progression, flexibility, and employability.",
      fitScore: refinement ? 95 : 93,
      summary: refinement
        ? `This refined path responds to "${refinement}" while keeping the original goal realistic and progression-safe.`
        : `Based on "${cleanPrompt}", this is the strongest overall mock recommendation for a premium AI planning flow.`,
      keyPoint:
        "Balances academic progression, career outcomes, and a realistic student workload.",
      badges: [
        {
          label: "Pace",
          value: "3.2 years est.",
          helper: "Normal pace",
          tone: "info",
        },
        {
          label: "Cost",
          value: "$33,900 est.",
          helper: "Higher than average",
          tone: "warning",
        },
        {
          label: "Workload",
          value: "Moderate to ambitious",
          helper: "Medium intensity",
          tone: "neutral",
        },
      ],
      metrics: [
        {
          label: "Progress confidence",
          value: "High",
          tone: "success",
        },
        {
          label: "Flexibility",
          value: "Strong",
          tone: "info",
        },
        {
          label: "Career momentum",
          value: "High",
          tone: "success",
        },
        {
          label: "Lifestyle fit",
          value: "Balanced",
          tone: "neutral",
        },
      ],
      uniLife:
        "Keeps room for clubs, social life, and project work without making every term feel overloaded.",
      professional:
        "Maintains a clear line into internships, graduate roles, and portfolio-building opportunities.",
      why: [
        "Strong alignment with the prompt intent",
        "Clear progression with enough flexibility for electives",
        "Good fit for both employability and sustainable study",
      ],
      breakdown: {
        overview:
          "This pathway front-loads foundations, unlocks later options early, and keeps enough flexibility for practical or lifestyle-driven adjustments.",
        strengths: [
          "Cleaner sequencing through early requirements",
          "Enough room for electives and pathway tuning",
          "Balanced between academic performance and employability",
        ],
        sampleCourses: [
          {
            code: "UNSW1001",
            name: `${topic} Foundations`,
            description:
              "Builds the base knowledge and study capability needed for the rest of the pathway.",
          },
          {
            code: "UNSW2140",
            name: "Professional Experience Preparation",
            description:
              "Connects academic planning with internships and applied outcomes.",
          },
          {
            code: "UNSW3101",
            name: "Capstone Direction",
            description:
              "Provides a strong finishing point for the pathway story.",
          },
        ],
      },
      coursePlan: buildCoursePlan(topic),
    },
    followUpSuggestions: [
      "Make this more internship-focused",
      "Reduce the workload in first year",
      "Optimise this for lower total cost",
      "Make this more research-heavy",
    ],
    alternatives: alternativeBlueprints.map((item, index) => ({
      id: `${item.type.toLowerCase().replace(/\s+/g, "-")}-${index}`,
      ...item,
      fitScore: 84 + index * 3,
      compactPlan: [
        `${item.type} Year 1 keeps progression stable and simple.`,
        `Later terms tilt more strongly toward the ${item.type.toLowerCase()} objective.`,
      ],
    })),
    recommendedUniversities: buildUniversityRecommendations(cleanPrompt),
    meta: {
      source: "mock-service",
      backendReady: true,
      retrievalLayer: "Elastic-ready",
      latency: refinement ? "224ms" : "176ms",
      selectedUniversitySupport: "UNSW Sydney only",
    },
  };
}
