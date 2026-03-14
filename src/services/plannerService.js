const alternativeBlueprints = [
  {
    type: "Cheapest",
    badge: "Lower spend",
    tone: "good",
    summary:
      "Optimises around lower-cost progression and avoids unnecessary complexity early.",
    rationale: [
      "Favors efficient sequencing and fewer costly detours.",
      "Keeps flexibility for electives without overloading the first year.",
      "Useful when budget certainty matters alongside degree progress.",
    ],
    tradeoffs:
      "May leave less room for broad exploratory electives if cost minimisation stays the priority.",
  },
  {
    type: "Efficient",
    badge: "Faster progression",
    tone: "info",
    summary:
      "Streamlines the sequence so core requirements are unlocked as early as practical.",
    rationale: [
      "Reduces bottlenecks that can delay later-stage subjects.",
      "Builds momentum toward specialisation earlier in the degree.",
      "Helpful for students who want a cleaner, more direct path.",
    ],
    tradeoffs:
      "The pace can feel more intense because flexibility is traded for clearer sequencing.",
  },
  {
    type: "Internship-focused",
    badge: "Career signal",
    tone: "vivid",
    summary:
      "Shapes the pathway around employability, project experience, and time for professional exposure.",
    rationale: [
      "Preserves space for internships, projects, and resume-building electives.",
      "Prioritises subjects that create stronger evidence of applied capability.",
      "Useful when students want earlier industry alignment.",
    ],
    tradeoffs:
      "May prioritise practical outcomes over broader academic exploration in the short term.",
  },
  {
    type: "Balanced Lifestyle",
    badge: "Sustainable load",
    tone: "calm",
    summary:
      "Balances ambition with a steadier study rhythm and more room for extracurricular life.",
    rationale: [
      "Avoids stacking the hardest subjects too aggressively.",
      "Supports societies, part-time work, and personal recovery time.",
      "Helps maintain consistency across multiple terms.",
    ],
    tradeoffs:
      "Usually prioritises sustainability over absolute shortest completion time.",
  },
  {
    type: "Research-led",
    badge: "Deeper inquiry",
    tone: "scholar",
    summary:
      "Leans into theory, analytical depth, and stronger preparation for honours or research pathways.",
    rationale: [
      "Builds stronger grounding for advanced inquiry and independent investigation.",
      "Prioritises subjects with deeper conceptual challenge.",
      "Useful for students considering postgraduate study or research-heavy careers.",
    ],
    tradeoffs:
      "Can feel less immediately industry-focused compared with internship-led planning.",
  },
  {
    type: "Exchange-friendly",
    badge: "Global mobility",
    tone: "sun",
    summary:
      "Keeps progression flexible so students can more easily fit exchange or international experiences into the degree.",
    rationale: [
      "Protects flexibility in sequencing and elective choice.",
      "Avoids stacking too many rigid prerequisites early where possible.",
      "Useful when students care about optional travel or broader global exposure.",
    ],
    tradeoffs:
      "May require slightly more careful sequencing to preserve room later in the degree.",
  },
];

const pathwayLenses = [
  { label: "Double degree route", tone: "vivid" },
  { label: "Transfer-friendly start", tone: "sun" },
  { label: "Scholarship-aware pacing", tone: "good" },
  { label: "Exchange-safe sequencing", tone: "calm" },
];

function buildCoursePlan(topic, emphasis) {
  return [
    {
      year: "Year 1",
      tone: "good",
      terms: [
        {
          name: "Term 1",
          units: "12 UOC",
          tone: "good",
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
          tone: "info",
          courses: [
            {
              code: "UNSW1105",
              name: `${topic} Core Methods`,
              description:
                "Develops the main quantitative or analytical techniques relevant to this pathway.",
            },
            {
              code: "UNSW1120",
              name: `${emphasis} Elective`,
              description:
                "Adds early alignment with the planning angle highlighted in the recommendation.",
            },
          ],
        },
        {
          name: "Term 3",
          units: "12 UOC",
          tone: "vivid",
          courses: [
            {
              code: "UNSW1201",
              name: "Applied Projects in Context",
              description:
                "Connects first-year learning to realistic UNSW-style projects and teamwork scenarios.",
            },
            {
              code: "UNSW1230",
              name: "Exploratory Discipline Elective",
              description:
                "Creates room to test an adjacent interest or strengthen a complementary skill area.",
            },
          ],
        },
      ],
    },
    {
      year: "Year 2",
      tone: "sun",
      terms: [
        {
          name: "Term 1",
          units: "12 UOC",
          tone: "sun",
          courses: [
            {
              code: "UNSW2104",
              name: `${topic} Intermediate Practice`,
              description:
                "Moves into discipline-specific practice while keeping progression manageable.",
            },
            {
              code: "UNSW2140",
              name: "Professional Experience Preparation",
              description:
                "Prepares students for internships, projects, or more advanced team-based study.",
            },
          ],
        },
        {
          name: "Term 2",
          units: "12 UOC",
          tone: "scholar",
          courses: [
            {
              code: "UNSW2202",
              name: `${emphasis} Strategy Studio`,
              description:
                "Uses the chosen pathway angle as the lens for deeper planning and decision-making.",
            },
            {
              code: "UNSW2218",
              name: "Interdisciplinary Elective",
              description:
                "Broadens capability and keeps the overall pathway flexible for later refinement.",
            },
          ],
        },
      ],
    },
  ];
}

function getScoreTone(score) {
  if (score >= 95) return "good";
  if (score >= 90) return "info";
  if (score >= 85) return "sun";
  return "calm";
}

function buildPlannerResponse({ prompt, followUpPrompt, previousResultId }) {
  const cleanPrompt = prompt.trim();
  const refinement = followUpPrompt?.trim();
  const topic = cleanPrompt
    .replace(/^i want|help me|show me|find me/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 42) || "UNSW pathway";
  const emphasis = refinement ? "Refined Pathway" : "Recommended Pathway";
  const now = Date.now();
  const fitScore = refinement ? 96 : 94;

  return {
    id: previousResultId || `planner-${now}`,
    prompt: cleanPrompt,
    conversation: refinement
      ? [
          { role: "user", content: cleanPrompt },
          { role: "user", content: refinement },
        ]
      : [{ role: "user", content: cleanPrompt }],
    followUpSuggestions: [
      "Make this more internship-focused",
      "Reduce the workload in first year",
      "Optimise this for lower total cost",
      "Give me a stronger exchange-friendly version",
      "Show a double degree-friendly version",
      "Lean more toward research opportunities",
    ],
    recommended: {
      title: refinement ? "Refined Recommended Pathway" : "Recommended Pathway",
      subtitle: refinement
        ? `Updated to reflect: "${refinement}"`
        : "Best overall fit for progression, flexibility, and long-term opportunity.",
      fitScore,
      scoreTone: getScoreTone(fitScore),
      duration: refinement ? "3.0 years est." : "3.2 years est.",
      cost: refinement ? "$32,800 est." : "$33,900 est.",
      difficulty: refinement ? "Moderate" : "Moderate to ambitious",
      summary: refinement
        ? `Using your original prompt plus the follow-up "${refinement}", this pathway shifts the balance while keeping UNSW progression realistic.`
        : `Based on "${cleanPrompt}", this is the strongest overall mock recommendation for a polished UNSW planning experience.`,
      keyPoint:
        "Balances academic progression, employability, optionality, and a realistic student workload.",
      uniLife:
        "Designed to keep room for clubs, social life, and project work without turning every term into overload.",
      professional:
        "Keeps the pathway legible for future internships, graduate roles, and portfolio development.",
      why: [
        "Strong alignment with the student's prompt intent",
        "Good balance between foundations and later flexibility",
        "Clear enough to become a future backend-generated plan shape",
      ],
      stats: [
        { label: "Progress confidence", value: "High", tone: "good" },
        { label: "Flexibility", value: "Strong", tone: "info" },
        { label: "Career momentum", value: "High", tone: "vivid" },
        { label: "Lifestyle fit", value: "Balanced", tone: "calm" },
      ],
      breakdown: {
        overview:
          "The recommendation spaces foundational requirements first, then gradually introduces more career-relevant and exploratory study choices.",
        strengths: [
          "Early sequencing reduces common progression friction",
          "Maintains flexibility for electives and specialisation",
          "Supports both employability and sustainable workload",
        ],
        sampleCourses: [
          {
            code: "UNSW1001",
            name: `${topic} Foundations`,
            description:
              "Builds the first layer of knowledge and university study capability.",
          },
          {
            code: "UNSW2140",
            name: "Professional Experience Preparation",
            description:
              "Helps students translate academic choices into employability and internship readiness.",
          },
          {
            code: "UNSW2202",
            name: `${emphasis} Strategy Studio`,
            description:
              "Demonstrates how planning emphasis can influence subject choice and sequencing.",
          },
        ],
      },
      coursePlan: buildCoursePlan(topic, emphasis),
    },
    pathways: pathwayLenses,
    alternatives: alternativeBlueprints.map((item, index) => {
      const score = 83 + index * 2;
      return {
        id: `${item.type.toLowerCase().replace(/\s+/g, "-")}-${index}`,
        ...item,
        fitScore: score,
        scoreTone: getScoreTone(score),
        compactPlan: [
          `${item.type} Year 1 keeps core progression steady.`,
          `Year 2 introduces a stronger ${item.type.toLowerCase()} emphasis.`,
        ],
      };
    }),
    meta: {
      source: "mock-service",
      backendReady: true,
      retrievalLayer: "Elastic-ready",
      latency: refinement ? "240ms" : "176ms",
      generatedAt: new Date(now).toISOString(),
    },
  };
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
    window.setTimeout(resolve, followUpPrompt ? 750 : 900);
  });

  return buildPlannerResponse({ prompt, previousResultId, followUpPrompt });
}
