import { formatCopy, getCopy } from "../i18n";

function buildCoursePlan(topic, emphasis, serviceCopy) {
  return [
    {
      year: serviceCopy.year1,
      tone: "good",
      terms: [
        {
          name: serviceCopy.term1,
          units: "12 UOC",
          tone: "good",
          courses: [
            {
              code: "UNSW1001",
              name: `${topic} ${serviceCopy.foundations}`,
              description: serviceCopy.introducesLandscape,
            },
            {
              code: "UNSW1020",
              name: serviceCopy.academicCommunication,
              description: serviceCopy.academicCommunicationDescription,
            },
          ],
        },
        {
          name: serviceCopy.term2,
          units: "12 UOC",
          tone: "info",
          courses: [
            {
              code: "UNSW1105",
              name: `${topic} ${serviceCopy.coreMethods}`,
              description: serviceCopy.developsTechniques,
            },
            {
              code: "UNSW1120",
              name: `${emphasis} ${serviceCopy.elective}`,
              description: serviceCopy.addsEarlyAlignment,
            },
          ],
        },
        {
          name: serviceCopy.term3,
          units: "12 UOC",
          tone: "vivid",
          courses: [
            {
              code: "UNSW1201",
              name: serviceCopy.appliedProjects,
              description: serviceCopy.appliedProjectsDescription,
            },
            {
              code: "UNSW1230",
              name: serviceCopy.exploratoryElective,
              description: serviceCopy.exploratoryElectiveDescription,
            },
          ],
        },
      ],
    },
    {
      year: serviceCopy.year2,
      tone: "sun",
      terms: [
        {
          name: serviceCopy.term1,
          units: "12 UOC",
          tone: "sun",
          courses: [
            {
              code: "UNSW2104",
              name: `${topic} ${serviceCopy.intermediatePractice}`,
              description: serviceCopy.movesIntoPractice,
            },
            {
              code: "UNSW2140",
              name: serviceCopy.professionalExperiencePreparation,
              description: serviceCopy.professionalExperiencePreparationDescription,
            },
          ],
        },
        {
          name: serviceCopy.term2,
          units: "12 UOC",
          tone: "scholar",
          courses: [
            {
              code: "UNSW2202",
              name: `${emphasis} ${serviceCopy.strategyStudio}`,
              description: serviceCopy.deeperPlanning,
            },
            {
              code: "UNSW2218",
              name: serviceCopy.interdisciplinaryElective,
              description: serviceCopy.interdisciplinaryElectiveDescription,
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

function buildPlannerResponse({ prompt, followUpPrompt, previousResultId, locale }) {
  const serviceCopy = getCopy(locale).plannerService;
  const cleanPrompt = prompt.trim();
  const refinement = followUpPrompt?.trim();
  const topic = cleanPrompt
    .replace(/^i want|help me|show me|find me/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 42) || "UNSW pathway";
  const emphasis = refinement ? serviceCopy.refinedPathway : serviceCopy.recommendedPathway;
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
    followUpSuggestions: serviceCopy.followUps,
    recommended: {
      title: refinement ? serviceCopy.refinedRecommendedTitle : serviceCopy.recommendedPathway,
      subtitle: refinement
        ? formatCopy(serviceCopy.updatedToReflect, { refinement })
        : serviceCopy.bestFitSubtitle,
      fitScore,
      scoreTone: getScoreTone(fitScore),
      duration: refinement ? serviceCopy.durationRefined : serviceCopy.durationBase,
      cost: refinement ? serviceCopy.costRefined : serviceCopy.costBase,
      difficulty: refinement ? serviceCopy.difficultyRefined : serviceCopy.difficultyBase,
      summary: refinement
        ? formatCopy(serviceCopy.refinedSummary, { refinement })
        : formatCopy(serviceCopy.baseSummary, { prompt: cleanPrompt }),
      keyPoint: serviceCopy.keyPoint,
      uniLife: serviceCopy.uniLife,
      professional: serviceCopy.professional,
      why: serviceCopy.why,
      stats: serviceCopy.stats,
      breakdown: {
        overview: serviceCopy.overview,
        strengths: serviceCopy.strengths,
        sampleCourses: [
          {
            code: "UNSW1001",
            name: `${topic} ${serviceCopy.foundations}`,
            description: serviceCopy.sampleFoundationDescription,
          },
          {
            code: "UNSW2140",
            name: serviceCopy.professionalExperiencePreparation,
            description: serviceCopy.sampleProfessionalDescription,
          },
          {
            code: "UNSW2202",
            name: `${emphasis} ${serviceCopy.strategyStudio}`,
            description: serviceCopy.sampleStrategyDescription,
          },
        ],
      },
      coursePlan: buildCoursePlan(topic, emphasis, serviceCopy),
    },
    pathways: serviceCopy.pathwayLenses,
    alternatives: serviceCopy.alternativeBlueprints.map((item, index) => {
      const score = 83 + index * 2;
      return {
        id: `${index}-${item.type.toLowerCase().replace(/\s+/g, "-")}`,
        iconKey: index,
        tone: ["good", "info", "vivid", "calm", "scholar", "sun"][index] || "info",
        ...item,
        fitScore: score,
        scoreTone: getScoreTone(score),
        compactPlan: [
          formatCopy(serviceCopy.compactPlanYear1, { type: item.type }),
          formatCopy(serviceCopy.compactPlanYear2, { type: item.type.toLowerCase() }),
        ],
      };
    }),
    meta: {
      source: serviceCopy.source,
      backendReady: true,
      backendReadyLabel: serviceCopy.backendReady,
      mockOnlyLabel: serviceCopy.mockOnly,
      retrievalLayer: serviceCopy.retrievalLayer,
      latency: refinement ? "240ms" : "176ms",
      generatedAt: new Date(now).toISOString(),
    },
  };
}

export async function generatePlannerResult({
  prompt,
  previousResultId,
  followUpPrompt,
  locale = "en",
}) {
  if (!prompt?.trim()) {
    throw new Error(getCopy(locale).plannerService.promptRequired);
  }

  await new Promise((resolve) => {
    window.setTimeout(resolve, followUpPrompt ? 750 : 900);
  });

  return buildPlannerResponse({ prompt, previousResultId, followUpPrompt, locale });
}
