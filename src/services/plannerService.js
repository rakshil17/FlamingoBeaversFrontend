const DEFAULT_UNIVERSITY = "UNSW Sydney";

const alternativeBlueprints = [
  {
    type: "Recommended",
    badge: "Default fit",
    tone: "success",
    summary: "Uses career-goal relevance to build the most balanced recommendation.",
    rationale: [
      "Targets subjects that align with your stated direction.",
      "Keeps prerequisite flow coherent for long-term progression.",
      "Best first option when you want balanced outcomes.",
    ],
    tradeoffs:
      "May not be the absolute cheapest or lightest pathway because fit is prioritised over a single objective.",
  },
  {
    type: "Cheapest",
    badge: "Lower spend",
    tone: "warning",
    summary: "Optimises around cost-efficiency while keeping the pathway coherent.",
    rationale: [
      "Prefers cleaner sequencing with fewer detours.",
      "Keeps the workload manageable while reducing unnecessary complexity.",
      "Useful when budget certainty matters as much as fit.",
    ],
    tradeoffs:
      "May leave less room for broad exploration if lower total cost stays the main priority.",
  },
  {
    type: "Easiest",
    badge: "Manageable load",
    tone: "info",
    summary: "Prefers a smoother and more manageable pathway while preserving progression.",
    rationale: [
      "Reduces prerequisite friction when possible.",
      "Avoids unnecessary complexity in sequencing.",
      "Useful when consistency and lower stress matter most.",
    ],
    tradeoffs:
      "Progress can be steadier than an aggressively accelerated plan.",
  },
];

const universityCatalog = {
  "Adelaide University": {
    degree: "Bachelor of Commerce",
    tone: "neutral",
    rationale:
      "A major-led commerce option that can be narrated through accounting, banking and finance, marketing, and analytics variants.",
    tags: ["flexible majors", "semester-based"],
    pace: ["3 years est.", "Normal pace", "info"],
    cost: ["Fee on official page", "Variable by degree page", "neutral"],
    workload: ["Moderate", "Steady intensity", "neutral"],
    metrics: [["Good fit", "success"], ["Balanced", "info"], ["Stable", "info"], ["Comfortable", "neutral"]],
    uniLife:
      "The structure feels steadier and less frantic, so it suits students who want a sustainable first-year commerce experience.",
    professional:
      "Accounting, finance and business analytics pathways make it easy to frame the degree toward practical outcomes.",
    why: [
      "Balanced spread across core business disciplines",
      "Professional accreditation story feels easy to explain",
      "A straightforward commerce launchpad",
    ],
    overview:
      "This Adelaide demo plan reflects the new major-led presentation by combining accounting, economics, commercial law, analytics, finance and marketing across a clean semester structure.",
    strengths: [
      "Balanced first-year business coverage",
      "Calm roadmap with recognisable professional pathways",
      "Works well for students who want stability and clarity",
    ],
    coursePlan: [
      {
        year: "Year 1",
        completion: 34,
        terms: [
          {
            name: "Semester 1",
            units: "4 core units",
            courses: [
              {
                code: "ADL-COMM101",
                name: "Accounting Foundations",
                description:
                  "Introduces accounting systems and the interpretation of business financial information.",
              },
              {
                code: "ADL-COMM102",
                name: "Economics for Commerce",
                description: "Covers economic thinking relevant to commercial decision-making.",
              },
              {
                code: "ADL-COMM103",
                name: "Commercial Law Foundation",
                description: "Introduces the legal and commercial environment around business decisions.",
              },
              {
                code: "ADL-COMM104",
                name: "Business Analytics Foundation",
                description: "Builds quantitative and data readiness for later commerce study.",
              },
            ],
          },
          {
            name: "Semester 2",
            units: "4 core units",
            courses: [
              {
                code: "ADL-COMM105",
                name: "Finance Foundations",
                description:
                  "Builds introductory finance and valuation literacy for business contexts.",
              },
              {
                code: "ADL-COMM106",
                name: "Marketing Foundations",
                description:
                  "Introduces markets, customer value and competitive positioning.",
              },
              {
                code: "ADL-COMM107",
                name: "Business Lifecycles and Enterprise",
                description: "Frames organisations through strategy, enterprise and growth stages.",
              },
              {
                code: "ADL-COMM108",
                name: "Cultural Diversity and Professional Context",
                description: "Explores people, communication and professional context in commerce.",
              },
            ],
          },
        ],
      },
      {
        year: "Year 2",
        completion: 67,
        terms: [
          {
            name: "Semester 1",
            units: "Major launch",
            courses: [
              {
                code: "ADL-BA201",
                name: "Business Analytics Practice",
                description:
                  "Positions the degree toward applied data and analytical business work.",
              },
              {
                code: "ADL-FIN202",
                name: "Banking and Finance Pathway Studio",
                description:
                  "Mocks the move into Adelaide's surfaced commerce major directions with a finance-oriented focus.",
              },
            ],
          },
          {
            name: "Semester 2",
            units: "Applied core",
            courses: [
              {
                code: "ADL-MKT210",
                name: "Commercial Strategy and Value Creation",
                description:
                  "Extends management and market thinking into a more strategic context.",
              },
              {
                code: "ADL-ELE211",
                name: "Professional Elective",
                description:
                  "Keeps room for accounting, financial planning or property emphasis later in the degree.",
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
            name: "Capstone stage",
            units: "Integrated finish",
            courses: [
              {
                code: "ADL-CAP301",
                name: "Commerce Capstone",
                description:
                  "Pulls together the major direction with a practical commercial decision-making finish.",
              },
            ],
          },
        ],
      },
    ],
  },
  "The Australian National University": {
    degree: "Bachelor of Commerce",
    tone: "info",
    rationale:
      "A sharper commerce route for students who want economics, finance and quantitative depth early.",
    tags: ["flexible majors", "semester-based"],
    pace: ["3 years est.", "Structured pace", "info"],
    cost: ["Course-based fees", "Variable by load", "neutral"],
    workload: ["Moderate", "Analytical core", "info"],
    metrics: [["High confidence", "success"], ["Good options", "info"], ["Strong", "success"], ["Focused", "neutral"]],
    uniLife:
      "The first year feels academically focused and suits students comfortable with economics and quantitative methods early.",
    professional:
      "This route signals strong analytical grounding, especially for finance, economics and commercial strategy directions.",
    why: [
      "Official core includes reporting, economics, finance and quantitative methods",
      "Strong option for policy, economics or finance goals",
      "Feels especially credible for rigorous commerce planning",
    ],
    overview:
      "The ANU plan keeps Year 1 flexible around reporting, economics and quantitative reasoning, while leaving room for finance, marketing or accounting-oriented variants.",
    strengths: [
      "High academic credibility for finance and economics-oriented students",
      "Communication for Business rounds out the quantitative core",
      "A commerce plan with real analytical substance",
    ],
    coursePlan: [
      {
        year: "Year 1",
        completion: 34,
        terms: [
          {
            name: "Semester 1",
            units: "24 units",
            courses: [
              {
                code: "BUSN1001",
                name: "Business Reporting and Analysis",
                description: "Accounting and reporting foundation for early commerce study.",
              },
              {
                code: "ECON1101",
                name: "Microeconomics 1",
                description: "Economic behaviour, incentives and markets.",
              },
              {
                code: "STAT1008",
                name: "Quantitative Research Methods",
                description: "Core business quantitative literacy.",
              },
              {
                code: "MGMT2100",
                name: "Communication for Business",
                description: "Communication for business and professional writing.",
              },
            ],
          },
          {
            name: "Semester 2",
            units: "24 units",
            courses: [
              {
                code: "ECON1102",
                name: "Macroeconomics 1",
                description: "Builds macroeconomic understanding for policy and business context.",
              },
              {
                code: "FINM1001",
                name: "Foundations of Finance",
                description: "Finance foundation often suggested in official Year 1 examples.",
              },
              {
                code: "ANU-MAJ101",
                name: "Major Starter",
                description: "Represents ANU's first-year major or elective flexibility.",
              },
              {
                code: "ANU-ELE102",
                name: "Major or Elective Slot",
                description:
                  "Leaves space for accounting, marketing or another major-driven Year 1 choice.",
              },
            ],
          },
        ],
      },
      {
        year: "Year 2",
        completion: 68,
        terms: [
          {
            name: "Semester 1",
            units: "Major core",
            courses: [
              {
                code: "FINM2001",
                name: "Corporate Finance",
                description:
                  "Extends the finance pathway into more applied commercial decision-making.",
              },
              {
                code: "MGMT2007",
                name: "Organisational Behaviour",
                description: "Builds people and organisation insight after the first-year core.",
              },
            ],
          },
          {
            name: "Semester 2",
            units: "Elective balance",
            courses: [
              {
                code: "ANU-COM301",
                name: "Commerce Major Elective",
                description: "Represents the major-specific slot ANU uses in later study planning.",
              },
              {
                code: "ANU-INT302",
                name: "Professional Pathway Elective",
                description: "Keeps room for internships, policy-facing work or broader business skills.",
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
            name: "Final year",
            units: "Integrated finish",
            courses: [
              {
                code: "ANU-CAP401",
                name: "Advanced Commerce Capstone",
                description:
                  "Finishes the degree with a more integrated business, economics or finance narrative.",
              },
            ],
          },
        ],
      },
    ],
  },
  "The University of Melbourne": {
    degree: "Bachelor of Commerce",
    tone: "info",
    rationale:
      "A highly structured commerce option with economics, finance, quantitative work and breadth all contributing to the overall shape.",
    tags: ["breadth-friendly", "high prestige"],
    pace: ["3 years est.", "Structured breadth", "info"],
    cost: ["Subject-based fees", "Variable", "neutral"],
    workload: ["Moderate-high", "Quant-heavy core", "warning"],
    metrics: [["High confidence", "success"], ["Strong breadth", "info"], ["High", "success"], ["Ambitious", "warning"]],
    uniLife:
      "The degree feels polished and academically composed, but the breadth requirement means students need to plan their space intentionally.",
    professional:
      "Melbourne gives a strong reputation signal and a convincing narrative for finance, economics and management-facing roles.",
    why: [
      "Official structure clearly includes economics, finance and quantitative requirements",
      "Breadth adds flexibility without making the plan feel directionless",
      "A premium academic commerce identity",
    ],
    overview:
      "This Melbourne demo plan follows the breadth-friendly Year 1 structure from the new pack, combining finance, economics, quantitative work and non-commerce breadth.",
    strengths: [
      "Clear first-year commerce identity with strong economics foundations",
      "Breadth makes the roadmap look more intentional than narrow",
      "Feels polished for students weighing multiple business pathways",
    ],
    coursePlan: [
      {
        year: "Year 1",
        completion: 34,
        terms: [
          {
            name: "Semester 1",
            units: "4 subjects",
            courses: [
              {
                code: "ECON10003",
                name: "Introductory Macroeconomics",
                description:
                  "Macroeconomics foundation from the commerce foundation pool.",
              },
              {
                code: "FNCE10002",
                name: "Principles of Finance",
                description: "Introduces finance concepts central to commerce study.",
              },
              {
                code: "ECON10005",
                name: "Quantitative Methods 1",
                description:
                  "Quantitative and statistical foundation commonly associated with commerce progression.",
              },
              {
                code: "MELB-BRD101",
                name: "Breadth Subject",
                description: "Melbourne breadth outside commerce.",
              },
            ],
          },
          {
            name: "Semester 2",
            units: "4 subjects",
            courses: [
              {
                code: "ECON10004",
                name: "Introductory Microeconomics",
                description: "Microeconomics foundation from the commerce foundation pool.",
              },
              {
                code: "ACCT10001",
                name: "Accounting Reports and Analysis",
                description: "Accounting foundation and financial reporting style study.",
              },
              {
                code: "MGMT20001",
                name: "Organisational Behaviour",
                description: "Management and organisations foundation.",
              },
              {
                code: "MELB-BRD102",
                name: "Breadth Subject",
                description: "Second breadth subject outside commerce.",
              },
            ],
          },
        ],
      },
      {
        year: "Year 2",
        completion: 69,
        terms: [
          {
            name: "Semester 1",
            units: "Management layer",
            courses: [
              {
                code: "MGMT10003",
                name: "Organisation and Management",
                description:
                  "Examines the business environment and the role of the manager, including management history and contemporary organisations.",
              },
              {
                code: "MELB-BRD201",
                name: "Breadth Subject",
                description:
                  "Represents Melbourne's compulsory breadth requirement within the commercial roadmap.",
              },
            ],
          },
          {
            name: "Semester 2",
            units: "Applied core",
            courses: [
              {
                code: "MGMT20001",
                name: "Organisational Behaviour",
                description: "Extends organisation and management thinking into team and behaviour analysis.",
              },
              {
                code: "MELB-MAJ202",
                name: "Commerce Major Elective",
                description: "Allows the selected commerce discipline to start specialising more clearly.",
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
            name: "Final year",
            units: "Integrated finish",
            courses: [
              {
                code: "MELB-CAP301",
                name: "Commerce Integration Capstone",
                description:
                  "Brings together discipline knowledge, breadth and professional positioning.",
              },
            ],
          },
        ],
      },
    ],
  },
  "Monash University": {
    degree: "Bachelor of Commerce",
    tone: "accent",
    rationale:
      "A strong commerce plan with recognisable quantitative and legal foundations that feels practical from the first year onward.",
    tags: ["industry-connected", "quantitative core"],
    pace: ["3 years est.", "Fast-moving core", "info"],
    cost: ["Premium Go8 band", "Use live fees later", "warning"],
    workload: ["Moderate", "Major-led semester pace", "info"],
    metrics: [["High confidence", "success"], ["Good options", "info"], ["Very strong", "success"], ["Busy", "warning"]],
    uniLife:
      "The common path feels busy but coherent, which works well for students who like visible momentum and a practical business tone.",
    professional:
      "Accounting, law, statistics and marketing in the early map create a convincing employability story quickly.",
    why: [
      "The official progression map makes the first-year route feel concrete",
      "Commercial law and statistics add professional credibility early",
      "A strong choice when students want practical business identity with scale",
    ],
    overview:
      "This Monash roadmap follows the updated pack's mainstream semester structure with accounting, economics, statistics, management and finance visible early.",
    strengths: [
      "Clear progression map supports a believable semester-by-semester story",
      "Strong early mix of accounting, law, statistics and management",
      "Good fit for practical commerce students who still want analytical depth",
    ],
    coursePlan: [
      {
        year: "Year 1",
        completion: 35,
        terms: [
          {
            name: "Semester 1",
            units: "24 credit points",
            courses: [
              {
                code: "MON-COM101",
                name: "Accounting for Managers",
                description: "Accounting and business reporting foundation.",
              },
              {
                code: "ECC1000",
                name: "Introductory Microeconomics",
                description: "Microeconomics foundation for commerce.",
              },
              {
                code: "ETC1000",
                name: "Business Statistics",
                description: "Numeracy and quantitative methods foundation.",
              },
              {
                code: "MGC1010",
                name: "Management Foundations",
                description: "Management or commerce core with an organisational lens.",
              },
            ],
          },
          {
            name: "Semester 2",
            units: "24 credit points",
            courses: [
              {
                code: "ECC1100",
                name: "Introductory Macroeconomics",
                description: "Macroeconomics foundation.",
              },
              {
                code: "BFC2140",
                name: "Finance Foundations",
                description: "Early finance study for commerce progression.",
              },
              {
                code: "MKC1200",
                name: "Marketing Foundations",
                description: "Introductory business and marketing perspective.",
              },
              {
                code: "MON-MAJ102",
                name: "Major Starter",
                description: "Starts depth in the chosen commerce field.",
              },
            ],
          },
        ],
      },
      {
        year: "Year 2",
        completion: 70,
        terms: [
          {
            name: "Semester 1",
            units: "Major development",
            courses: [
              {
                code: "BFC2140",
                name: "Corporate Finance",
                description: "Moves the plan into more applied finance and capital decision-making.",
              },
              {
                code: "ECC1100",
                name: "Principles of Macroeconomics",
                description: "Extends the economics lens into economy-wide policy and performance.",
              },
            ],
          },
          {
            name: "Semester 2",
            units: "Applied options",
            courses: [
              {
                code: "MON-COM201",
                name: "Commerce Elective",
                description: "Leaves room for the specific major or commerce direction chosen.",
              },
              {
                code: "MON-PRO202",
                name: "Professional Practice Elective",
                description: "Keeps the plan employability-facing without cluttering the first year.",
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
            name: "Final year",
            units: "Capstone finish",
            courses: [
              {
                code: "MON-CAP301",
                name: "Commerce Strategy Capstone",
                description:
                  "Integrates the analytical, legal and strategic pieces into a final-year finish.",
              },
            ],
          },
        ],
      },
    ],
  },
  "UNSW Sydney": {
    degree: "Bachelor of Commerce",
    tone: "success",
    backendReady: true,
    rationale:
      "Best aligned with the current product roadmap because UNSW is the only selection already shaped for later backend integration.",
    tags: ["backend-ready", "trimester-based"],
    pace: ["3 years est.", "Normal pace", "info"],
    cost: ["Mock for now", "Pull live later", "neutral"],
    workload: ["Moderate to ambitious", "Trimester rhythm", "accent"],
    metrics: [["Very high", "success"], ["Strong", "info"], ["High", "success"], ["Balanced", "neutral"]],
    uniLife:
      "This plan keeps the study rhythm manageable across three terms while still feeling future-focused and practical.",
    professional:
      "UNSW's industry-connected positioning makes this the easiest mock path to align with internships and later backend retrieval.",
    why: [
      "Default recommendation stays closest to the future UNSW backend flow",
      "Flexible majors make it easy to steer the plan toward different business goals",
      "A clean choice for the hackathon demo because the system narrative stays consistent",
    ],
    overview:
      "The UNSW version stays placeholder-friendly and trimester-based, matching the new pack and preserving the backend-ready product narrative.",
    strengths: [
      "Directly compatible with the current frontend-to-backend product story",
      "Three-term structure makes the roadmap visually distinctive",
      "Strong fit for students who want a modern and practical business path",
    ],
    coursePlan: [
      {
        year: "Year 1",
        completion: 34,
        terms: [
          {
            name: "Term 1",
            units: "12 UOC",
            courses: [
              {
                code: "COMM1000",
                name: "Foundations of Business",
                description: "Placeholder commerce foundation aligned to the new UNSW demo pack.",
              },
              {
                code: "COMM1110",
                name: "Introductory Business Analytics",
                description: "Placeholder analytics introduction for the Year 1 UNSW path.",
              },
              {
                code: "COMM1120",
                name: "Economics for Commerce",
                description: "Placeholder economics foundation for the commerce roadmap.",
              },
            ],
          },
          {
            name: "Term 2",
            units: "3 courses",
            courses: [
              {
                code: "COMM1130",
                name: "Financial Literacy for Commerce",
                description: "Placeholder finance and accounting literacy for business students.",
              },
              {
                code: "COMM1140",
                name: "Business Communication",
                description: "Placeholder communication and professional expression for commerce.",
              },
              {
                code: "COMM1150",
                name: "Markets and Decision Making",
                description: "Placeholder markets and commercial choices foundation.",
              },
            ],
          },
          {
            name: "Term 3",
            units: "3 courses",
            courses: [
              {
                code: "COMM1160",
                name: "Data, Strategy and Organisations",
                description: "Placeholder integration of analytics, strategy and organisations.",
              },
              {
                code: "COMM1170",
                name: "Professional Practice in Commerce",
                description: "Placeholder professional practice and career orientation unit.",
              },
              {
                code: "COMM1180",
                name: "Elective or Exploratory Business Course",
                description: "Keeps room for early exploration before later specialisation.",
              },
            ],
          },
        ],
      },
      {
        year: "Year 2",
        completion: 68,
        terms: [
          {
            name: "Term 1",
            units: "12 UOC",
            courses: [
              {
                code: "COMM2100",
                name: "Career Accelerator Lab",
                description:
                  "Placeholder applied experience layer that keeps the UNSW demo career-facing.",
              },
              {
                code: "COMM2120",
                name: "Commerce Major Foundations",
                description:
                  "Represents the move from broad commerce into a chosen business discipline.",
              },
            ],
          },
          {
            name: "Term 2",
            units: "12 UOC",
            courses: [
              {
                code: "COMM2140",
                name: "Professional Experience Preparation",
                description: "Connects academic planning with internships and applied outcomes.",
              },
              {
                code: "COMM2160",
                name: "Strategy and Commercial Decisions",
                description:
                  "Builds commercial judgement and strategic thinking for later-stage work.",
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
            name: "Capstone stage",
            units: "Integrated finish",
            courses: [
              {
                code: "COMM3100",
                name: "Commerce Capstone Direction",
                description:
                  "Pulls together the degree through a more advanced or project-based finish.",
              },
            ],
          },
        ],
      },
    ],
  },
  "The University of Queensland": {
    degree: "Bachelor of Commerce",
    tone: "neutral",
    rationale:
      "A balanced commerce recommendation with clear accounting and business systems anchors but a lighter overall feel than the most quantitative variants.",
    tags: ["analytics-heavy", "semester-based"],
    pace: ["3 years est.", "Steady progression", "info"],
    cost: ["Premium Go8 band", "Use live fees later", "warning"],
    workload: ["Moderate", "Manageable core", "neutral"],
    metrics: [["Good fit", "success"], ["Strong", "info"], ["Solid", "info"], ["Balanced", "neutral"]],
    uniLife:
      "The surfaced UQ examples make the course feel broad and manageable, which suits students who want confidence without overload.",
    professional:
      "Accounting, systems and law together make the degree easy to present as both practical and commercially relevant.",
    why: [
      "The sample subjects read clearly and professionally even in a demo context",
      "Good option for students who want a broad commerce path with systems exposure",
      "Feels balanced rather than hyper-specialised",
    ],
    overview:
      "The UQ version now reflects the cleaner official 2026 Year 1 progression sheet, with a realistic four-course semester pattern.",
    strengths: [
      "Strong clarity in the first-year sample subjects",
      "Business information systems broadens the commerce story nicely",
      "Comfortable choice for students who want balance over intensity",
    ],
    coursePlan: [
      {
        year: "Year 1",
        completion: 34,
        terms: [
          {
            name: "Semester 1",
            units: "4 core units",
            courses: [
              {
                code: "ACCT1110",
                name: "Financial Reporting and Analysis",
                description: "Year 1 accounting and reporting foundation.",
              },
              {
                code: "BISM1201",
                name: "Transforming Business with Information Systems",
                description: "Information systems and digital business foundation.",
              },
              {
                code: "ECON1310",
                name: "Introductory Statistics for Social Sciences",
                description: "Introductory statistics and quantitative foundation.",
              },
              {
                code: "MGTS1301",
                name: "Introduction to Management",
                description: "Management foundation.",
              },
            ],
          },
          {
            name: "Semester 2",
            units: "4 core units",
            courses: [
              {
                code: "ACCT1102",
                name: "Introduction to Management Accounting",
                description: "Management accounting foundation.",
              },
              {
                code: "ECON1011",
                name: "Economics for Business",
                description: "Economics foundation for business students.",
              },
              {
                code: "FINM1415",
                name: "Introduction to Finance",
                description: "Early finance foundation.",
              },
              {
                code: "LAWS1100",
                name: "Business Law",
                description: "Law foundation for business and commerce.",
              },
            ],
          },
        ],
      },
      {
        year: "Year 2",
        completion: 67,
        terms: [
          {
            name: "Semester 1",
            units: "Applied commerce",
            courses: [
              {
                code: "UQ-COM201",
                name: "Introductory Finance",
                description: "Extends the accounting core into finance and investment reasoning.",
              },
              {
                code: "UQ-COM202",
                name: "Quantitative Methods for Commerce",
                description: "Adds numerical reasoning and analysis to the business toolkit.",
              },
            ],
          },
          {
            name: "Semester 2",
            units: "Major shaping",
            courses: [
              {
                code: "UQ-COM203",
                name: "Commerce Major Elective",
                description:
                  "Represents the move into accounting, business analytics, finance or systems.",
              },
              {
                code: "UQ-COM204",
                name: "Professional Development Elective",
                description: "Keeps the plan employability-facing without overcrowding it.",
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
            name: "Final year",
            units: "Integrated finish",
            courses: [
              {
                code: "UQ-CAP301",
                name: "Commerce Capstone",
                description:
                  "Brings together the chosen commerce direction with practical commercial judgement.",
              },
            ],
          },
        ],
      },
    ],
  },
  "The University of Sydney": {
    degree: "Bachelor of Commerce",
    tone: "info",
    rationale:
      "A clean metropolitan commerce pathway with a very legible degree core and room to shape majors and minors later.",
    tags: ["city-based", "flexible structure"],
    pace: ["3 years est.", "Clear core", "info"],
    cost: ["Calculator-based", "Variable by student type", "neutral"],
    workload: ["Moderate", "Professional core", "neutral"],
    metrics: [["High confidence", "success"], ["Strong", "info"], ["Strong", "success"], ["Balanced city life", "neutral"]],
    uniLife:
      "The core is easy to understand at a glance, which makes the roadmap feel calm and intentional even in a city-based high-profile setting.",
    professional:
      "Future of Business, quantitative analysis and accounting together create a polished business-school-style first impression.",
    why: [
      "Official core units are clear, modern and easy to visualise in a planner",
      "Major and minor structure gives the path room to evolve",
      "Strong choice for students who want a flexible city commerce identity",
    ],
    overview:
      "The Sydney recommendation keeps the official core visible and lets the major and minor structure do the rest of the planning work later.",
    strengths: [
      "Excellent clarity in the surfaced degree core",
      "Feels modern and professional without being too boxy",
      "Good fit for broad business students who still want structure",
    ],
    coursePlan: [
      {
        year: "Year 1",
        completion: 34,
        terms: [
          {
            name: "Semester 1",
            units: "12 credit points",
            courses: [
              {
                code: "BUSS1000",
                name: "Future of Business",
                description:
                  "Introductory business context, systems and contemporary business environment.",
              },
              {
                code: "BUSS1020",
                name: "Quantitative Business Analysis",
                description: "Quantitative reasoning and business analysis.",
              },
            ],
          },
          {
            name: "Semester 2",
            units: "12 credit points",
            courses: [
              {
                code: "BUSS1030",
                name: "Accounting for Decision Making",
                description: "Accounting information for business decisions.",
              },
              {
                code: "SYD-MAJ101",
                name: "Major or Elective Unit",
                description:
                  "Represents the major or elective space within the first-year Sydney structure.",
              },
            ],
          },
        ],
      },
      {
        year: "Year 2",
        completion: 67,
        terms: [
          {
            name: "Semester 1",
            units: "Core extension",
            courses: [
              {
                code: "BUSS2000",
                name: "Leading and Influencing in Business",
                description:
                  "Leadership, influence and professional capability in business settings.",
              },
              {
                code: "SYD-MIN201",
                name: "Minor or Second Major Unit",
                description:
                  "Allows the degree to keep its broad but directed business profile.",
              },
            ],
          },
          {
            name: "Semester 2",
            units: "Applied options",
            courses: [
              {
                code: "SYD-COM202",
                name: "Commerce Elective",
                description:
                  "Keeps the pathway adaptable while preserving the degree core story.",
              },
              {
                code: "SYD-PRO203",
                name: "Professional Pathway Elective",
                description:
                  "Adds room for internships, projects or discipline-specific focus.",
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
            name: "Final year",
            units: "Integrated finish",
            courses: [
              {
                code: "SYD-CAP301",
                name: "Commerce Integration Project",
                description:
                  "Finishes the degree with an integrated major and professional positioning story.",
              },
            ],
          },
        ],
      },
    ],
  },
  "The University of Western Australia": {
    degree: "Bachelor of Commerce",
    tone: "neutral",
    rationale:
      "A modern commerce option with communication, analytics and innovation visible early in the roadmap.",
    tags: ["balanced lifestyle", "analytics-forward"],
    pace: ["3 years est.", "Smooth progression", "info"],
    cost: ["Calculator-based", "Variable", "neutral"],
    workload: ["Moderate", "Business systems focus", "neutral"],
    metrics: [["Good fit", "success"], ["Strong", "info"], ["Steady", "info"], ["High lifestyle fit", "success"]],
    uniLife:
      "The foundation sequence looks modern and spacious, especially for students who want business plus communication and analytics without too much intensity.",
    professional:
      "Global business, analytics and innovation create a strong commercial narrative that still feels approachable.",
    why: [
      "The surfaced foundation units already read like a clean first-year roadmap",
      "Analytics and communication give the degree a modern flavour",
      "Good fit if you want business capability without an overly dense core",
    ],
    overview:
      "The UWA plan is guided by the surfaced foundation units, so the roadmap feels more contemporary and less textbook-heavy.",
    strengths: [
      "Very planner-friendly first-year sequence",
      "Strong communication and analytics blend",
      "Feels calm, modern and readable in a dark-mode roadmap",
    ],
    coursePlan: [
      {
        year: "Year 1",
        completion: 34,
        terms: [
          {
            name: "Semester 1",
            units: "2 foundation units",
            courses: [
              {
                code: "BUSN1103",
                name: "Foundations of Global Business",
                description: "Global business foundations.",
              },
              {
                code: "BUSN1104",
                name: "Business Communication for Change, Influence and Impact",
                description: "Communication and influence capability in business settings.",
              },
            ],
          },
          {
            name: "Semester 2",
            units: "2 foundation units",
            courses: [
              {
                code: "BUSN1200",
                name: "Data Analytics for Business",
                description: "Introductory analytics for business decisions.",
              },
              {
                code: "ENTR1342",
                name: "Introduction to Enterprise and Innovation",
                description:
                  "Enterprise and innovation lens for business problem solving.",
              },
            ],
          },
        ],
      },
      {
        year: "Year 2",
        completion: 67,
        terms: [
          {
            name: "Semester 1",
            units: "Applied business",
            courses: [
              {
                code: "ECON2245",
                name: "Business Economics",
                description: "Extends the business lens into applied economic reasoning.",
              },
              {
                code: "FINA2222",
                name: "Corporate Financial Policy",
                description: "Develops finance capability for commercial decision-making.",
              },
            ],
          },
          {
            name: "Semester 2",
            units: "Major shaping",
            courses: [
              {
                code: "UWA-COM201",
                name: "Commerce Major Elective",
                description: "Represents the chosen UWA commerce major direction.",
              },
              {
                code: "UWA-PRO202",
                name: "Professional Development Elective",
                description:
                  "Leaves room for work-integrated or professionally useful study.",
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
            name: "Final year",
            units: "Integrated finish",
            courses: [
              {
                code: "UWA-CAP301",
                name: "Commerce Innovation Capstone",
                description:
                  "Pulls together analytics, business communication and commercial judgement.",
              },
            ],
          },
        ],
      },
    ],
  },
  "University of Technology Sydney": {
    degree: "Bachelor of Business",
    tone: "success",
    rationale:
      "The most industry-styled alternative here, using UTS's broad business core as the commerce-style demo equivalent.",
    tags: ["industry-connected", "internship-friendly"],
    pace: ["3 years est.", "Applied pace", "info"],
    cost: ["$17,399 CSP guide", "Moderate", "neutral"],
    workload: ["Moderate", "Practice-led", "neutral"],
    metrics: [["Good fit", "success"], ["Strong", "info"], ["Career-ready", "success"], ["Balanced city life", "neutral"]],
    uniLife:
      "UTS feels practical and city-facing, so the overall experience reads as contemporary and employability-driven rather than overly theoretical.",
    professional:
      "Business and Social Impact, customer value and people management create a very usable business-school story for the demo.",
    why: [
      "Best choice when the user wants a practical and industry-connected option outside UNSW",
      "The core subjects read clearly even without a classic BCom label",
      "Strong fit for a demo that wants to look career-aware and modern",
    ],
    overview:
      "For the hackathon demo, UTS uses Bachelor of Business as the commerce-style equivalent and leans into its visible business-core identity.",
    strengths: [
      "Very easy to present as practical and contemporary",
      "Industry-connected tone feels natural",
      "Great contrast against the more academic commerce options",
    ],
    coursePlan: [
      {
        year: "Year 1",
        completion: 34,
        terms: [
          {
            name: "Autumn session",
            units: "2 core subjects",
            courses: [
              {
                code: "UTS-BUS101",
                name: "Business and Social Impact",
                description: "How business operates in society and creates impact.",
              },
              {
                code: "UTS-BUS102",
                name: "Marketing and Customer Value",
                description: "Customer-centred value creation and market understanding.",
              },
            ],
          },
          {
            name: "Spring session",
            units: "2 core subjects",
            courses: [
              {
                code: "UTS-BUS103",
                name: "People and Organisations",
                description: "Organisational behaviour, leadership and people management.",
              },
              {
                code: "UTS-BUS104",
                name: "Accounting in Business Context",
                description:
                  "Grounded placeholder that carries accounting literacy through the UTS business core.",
              },
            ],
          },
        ],
      },
      {
        year: "Year 2",
        completion: 67,
        terms: [
          {
            name: "Autumn session",
            units: "Applied business",
            courses: [
              {
                code: "UTS-BUS201",
                name: "Data, Decisions and Business",
                description:
                  "Grounded placeholder for analytics and decision-making in the business pathway.",
              },
              {
                code: "UTS-BUS202",
                name: "Business Major Subject",
                description:
                  "Represents the selected business major within the UTS course structure.",
              },
            ],
          },
          {
            name: "Spring session",
            units: "Professional direction",
            courses: [
              {
                code: "UTS-BUS203",
                name: "Industry Project Elective",
                description:
                  "Keeps the roadmap oriented toward practical experience and internships.",
              },
              {
                code: "UTS-BUS204",
                name: "Professional Pathway Elective",
                description:
                  "Adds flexibility for a customised business profile later in the degree.",
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
            name: "Final year",
            units: "Industry-facing finish",
            courses: [
              {
                code: "UTS-CAP301",
                name: "Business Practice Capstone",
                description:
                  "Finishes the pathway with an applied and industry-aware business narrative.",
              },
            ],
          },
        ],
      },
    ],
  },
  "Macquarie University": {
    degree: "Bachelor of Commerce",
    tone: "accent",
    rationale:
      "A flexible commerce pathway with a data-driven, interdisciplinary feel and a broad foundation year.",
    tags: ["flexible", "data-driven"],
    pace: ["3 years est.", "Flexible pace", "info"],
    cost: ["Band 4 guide", "Moderate", "neutral"],
    workload: ["Moderate", "Interdisciplinary", "accent"],
    metrics: [["Good fit", "success"], ["Very strong", "info"], ["Strong", "success"], ["Balanced", "neutral"]],
    uniLife:
      "The broad commerce base makes the degree feel adaptable and less boxed in, which suits students who want room to explore before locking a direction.",
    professional:
      "Data-driven decision-making and industry engagement give the plan a strong modern-business flavour even with placeholder first-year themes.",
    why: [
      "Strong fit for students who value flexibility and interdisciplinary options",
      "Commerce identity is broad enough to support multiple later directions",
      "The planner can show a grounded but not overly rigid roadmap here",
    ],
    overview:
      "Macquarie's public pages surface themes more than a compact first-year unit list, so this roadmap uses grounded foundation areas to stay credible.",
    strengths: [
      "Flexible story is easy to explain in UI",
      "Data-driven identity modernises the commerce plan",
      "Good contrast against more tightly structured Go8 options",
    ],
    coursePlan: [
      {
        year: "Year 1",
        completion: 34,
        terms: [
          {
            name: "Session 1",
            units: "2 foundation units",
            courses: [
              {
                code: "MQ-COM101",
                name: "Accounting Foundations",
                description: "Accounting language and financial reporting basics.",
              },
              {
                code: "MQ-COM102",
                name: "Introductory Economics",
                description: "Economic reasoning for business environments.",
              },
            ],
          },
          {
            name: "Session 2",
            units: "2 foundation units",
            courses: [
              {
                code: "MQ-COM103",
                name: "Finance Foundations",
                description: "Core finance concepts and financial decisions.",
              },
              {
                code: "MQ-COM104",
                name: "Quantitative Methods for Commerce",
                description: "Numerical reasoning and business analytics.",
              },
            ],
          },
        ],
      },
      {
        year: "Year 2",
        completion: 67,
        terms: [
          {
            name: "Session 1",
            units: "Applied commerce",
            courses: [
              {
                code: "MQ-COM201",
                name: "Marketing Foundations",
                description: "Builds market and customer fundamentals within the commerce structure.",
              },
              {
                code: "MQ-COM202",
                name: "Management Foundations",
                description:
                  "Introduces organisation and management capability for broader business work.",
              },
            ],
          },
          {
            name: "Session 2",
            units: "Industry shaping",
            courses: [
              {
                code: "MQ-COM203",
                name: "Business Analytics Foundations",
                description:
                  "Extends the data-driven decision-making identity Macquarie highlights publicly.",
              },
              {
                code: "MQ-COM204",
                name: "Commerce Major Elective",
                description: "Leaves the later direction open while keeping the plan grounded.",
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
            name: "Final year",
            units: "Integrated finish",
            courses: [
              {
                code: "MQ-CAP301",
                name: "Commerce Integration Capstone",
                description:
                  "Pulls together the data, commerce and professional strands into a final-year finish.",
              },
            ],
          },
        ],
      },
    ],
  },
};

const universityMeta = {
  "UNSW Sydney": {
    duration: "3 years",
    studyRhythm: "Trimester-based",
    difficultyBand: "Moderate to ambitious",
  },
  "The University of Sydney": {
    duration: "3 years",
    studyRhythm: "Semester-based",
    difficultyBand: "Moderate to ambitious",
  },
  "The University of Melbourne": {
    duration: "3 years",
    studyRhythm: "Semester-based",
    difficultyBand: "Moderate to ambitious",
  },
  "The Australian National University": {
    duration: "3 years",
    studyRhythm: "Semester-based",
    difficultyBand: "Moderate",
  },
  "Monash University": {
    duration: "3 years",
    studyRhythm: "Semester-based",
    difficultyBand: "Moderate",
  },
  "The University of Queensland": {
    duration: "3 years",
    studyRhythm: "Semester-based",
    difficultyBand: "Moderate",
  },
  "The University of Western Australia": {
    duration: "3 years",
    studyRhythm: "Semester-based",
    difficultyBand: "Moderate",
  },
  "Adelaide University": {
    duration: "3 years",
    studyRhythm: "Semester-based",
    difficultyBand: "Moderate",
  },
  "Macquarie University": {
    duration: "3 years",
    studyRhythm: "Semester-based",
    difficultyBand: "Moderate",
  },
  "University of Technology Sydney": {
    duration: "3 years",
    studyRhythm: "Semester-based",
    difficultyBand: "Moderate",
  },
};

const universityOrder = [
  "UNSW Sydney",
  "The University of Sydney",
  "The University of Melbourne",
  "The Australian National University",
  "Monash University",
  "The University of Queensland",
  "The University of Western Australia",
  "Adelaide University",
  "Macquarie University",
  "University of Technology Sydney",
];

const BACKEND_BASE_URL =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_BACKEND_BASE_URL) || "";

const BACKEND_BASE_CANDIDATES = [
  BACKEND_BASE_URL,
  "/api",
  "http://localhost:5004",
].filter((value, index, all) => value !== undefined && value !== null && all.indexOf(value) === index);

const BACKEND_TERM_RANK = {
  "term 1": 1,
  "term 2": 2,
  "term 3": 3,
};

function toTitleTerm(termValue) {
  const normalized = String(termValue || "").trim().toLowerCase();
  if (normalized === "term 1") return "Term 1";
  if (normalized === "term 2") return "Term 2";
  if (normalized === "term 3") return "Term 3";
  return String(termValue || "Term");
}

function toCurrency(rawValue) {
  const token = String(rawValue ?? "").replace(/[^\d.\-]/g, "");
  if (!token) return null;
  const value = Number(token);
  return Number.isFinite(value) ? value : null;
}

function computeApproxFee(planData) {
  const feeType = String(planData?.fee_type || "hecs").toLowerCase();
  const fees = [];

  for (const term of planData?.terms || []) {
    for (const course of term?.courses || []) {
      const fromFeeMap = course?.fees?.[feeType];
      const parsed = toCurrency(fromFeeMap);
      if (parsed !== null) {
        fees.push(parsed);
      }
    }
  }

  if (!fees.length) return "Not available";
  const total = fees.reduce((sum, value) => sum + value, 0);
  return `~$${Math.round(total).toLocaleString()}`;
}

function mapBackendCoursePlan(terms) {
  const groupedByYear = new Map();

  for (const term of terms || []) {
    const year = Number(term?.year);
    if (!Number.isFinite(year)) continue;
    if (!groupedByYear.has(year)) groupedByYear.set(year, []);
    groupedByYear.get(year).push(term);
  }

  const years = [...groupedByYear.keys()].sort((a, b) => a - b);
  const totalYears = Math.max(years.length, 1);

  return years.map((year, index) => {
    const yearTerms = [...groupedByYear.get(year)].sort((left, right) => {
      const leftRank = BACKEND_TERM_RANK[String(left?.term || "").toLowerCase()] || 99;
      const rightRank = BACKEND_TERM_RANK[String(right?.term || "").toLowerCase()] || 99;
      return leftRank - rightRank;
    });

    return {
      year: `Year ${index + 1}`,
      completion: Math.round(((index + 1) / totalYears) * 100),
      terms: yearTerms.map((term) => ({
        name: toTitleTerm(term?.term),
        units: `${Number(term?.uoc || 0)} UOC`,
        courses: (term?.courses || []).map((course) => ({
          code: course?.course_code || "TBD0000",
          name: course?.title || course?.course_code || "Untitled course",
          description:
            course?.description ||
            "No description is available for this course in the current backend payload.",
        })),
      })),
    };
  });
}

function createBackendRecommendation({ planData, prompt, modeLabel }) {
  const mode = String(planData?.mode || "recommended").toLowerCase();
  const mappedModeLabel = modeLabel || capitalizePhrase(mode);
  const coursePlan = mapBackendCoursePlan(planData?.terms || []);
  const flattenedCourses = coursePlan.flatMap((year) => year.terms.flatMap((term) => term.courses));
  const approxFee = computeApproxFee(planData);
  const unmetCount = Object.keys(planData?.unmet_requirements || {}).length;

  const modeCopy =
    mode === "cheapest"
      ? {
          fitScore: 93,
          keyPoint: "Prioritises lower-fee sequencing while preserving the degree structure.",
          summary: "This pathway is generated from the backend cheapest-mode planner.",
          uniLife: "Budget pressure is reduced by prioritising lower-cost subjects when possible.",
          professional:
            "Keeps progression intact while using a cost-aware selection strategy for electives.",
          why: [
            "Backend plan mode: cheapest",
            "Course ordering favours lower fee subjects",
            "Useful when cost control is the primary objective",
          ],
        }
      : mode === "easiest"
        ? {
            fitScore: 91,
            keyPoint: "Prioritises a smoother and easier progression pathway.",
            summary: "This pathway is generated from the backend easiest-mode planner.",
            uniLife: "The sequence is tuned toward a steadier rhythm with less friction across terms.",
            professional:
              "Builds long-term progression while keeping term-to-term complexity manageable.",
            why: [
              "Backend plan mode: easiest",
              "Designed for lower-friction sequencing",
              "Useful when workload sustainability is a core priority",
            ],
          }
        : {
            fitScore: 95,
            keyPoint: "Aligns course selection with the provided career goal.",
            summary: "This pathway is generated from the backend recommended-mode planner.",
            uniLife: "Balances progression, direction fit, and practical term-by-term pacing.",
            professional:
              "Uses career-interest guidance to rank and prioritise relevant electives.",
            why: [
              "Backend plan mode: recommended",
              "Career-goal-driven elective ranking",
              "Best balanced option when fit matters most",
            ],
          };

  return {
    id: "unsw-sydney",
    university: DEFAULT_UNIVERSITY,
    degree: "3707-SENGAH",
    title: `${mappedModeLabel} plan at ${DEFAULT_UNIVERSITY}`,
    subtitle: `Generated for "${prompt}"`,
    duration: "4 years",
    studyRhythm: "Trimester-based",
    difficultyBand: mode === "easiest" ? "Manageable" : "Moderate to ambitious",
    fitScore: modeCopy.fitScore,
    keyPoint: modeCopy.keyPoint,
    summary: modeCopy.summary,
    badges: [
      {
        label: "Pace",
        value: mode === "easiest" ? "Steady progression" : "Standard progression",
        helper: `Mode: ${mappedModeLabel}`,
        tone: "info",
      },
      {
        label: "Cost",
        value: approxFee,
        helper: `Fee lens: ${String(planData?.fee_type || "hecs").toUpperCase()}`,
        tone: mode === "cheapest" ? "success" : "neutral",
      },
      {
        label: "Workload",
        value: mode === "easiest" ? "Lower friction" : "Balanced",
        helper: `${flattenedCourses.length} courses in current plan`,
        tone: mode === "easiest" ? "success" : "info",
      },
    ],
    metrics: [
      { label: "Progress confidence", value: unmetCount ? "Watch constraints" : "Strong", tone: unmetCount ? "warning" : "success" },
      { label: "Flexibility", value: "Guided", tone: "info" },
      { label: "Career momentum", value: mode === "recommended" ? "High" : "Good", tone: "success" },
      { label: "Lifestyle fit", value: mode === "easiest" ? "Better" : "Balanced", tone: "neutral" },
    ],
    uniLife: modeCopy.uniLife,
    professional: modeCopy.professional,
    why: modeCopy.why,
    breakdown: {
      overview: `${modeCopy.summary} Generated directly from the backend planner pipeline for ${DEFAULT_UNIVERSITY}.`,
      strengths: [
        `Uses backend mode: ${mode}`,
        `Includes ${coursePlan.length} year blocks with trimester sequencing`,
        unmetCount ? `Found ${unmetCount} unmet requirement categories to monitor` : "No unmet requirements reported in this plan",
      ],
      sampleCourses: flattenedCourses.slice(0, 4),
    },
    coursePlan,
    backendReady: true,
  };
}

async function callBackendPlanner({ mode, prompt, residencyStatus = "domestic" }) {
  const normalizedMode = String(mode || "recommended").toLowerCase();
  const requestedFeeType = residencyStatus === "international" ? "international" : "domestic";
  const endpoint =
    normalizedMode === "recommended"
      ? "/planning/recommended"
      : normalizedMode === "cheapest"
        ? "/planning/cheapest"
        : "/planning/easiest";

  let lastError = null;

  for (const baseUrl of BACKEND_BASE_CANDIDATES) {
    try {
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fee_type: requestedFeeType,
          ...(normalizedMode === "recommended" ? { career_goal: prompt } : {}),
        }),
      });

      if (!response.ok) {
        const errorPayload = await response.json().catch(() => ({}));
        throw new Error(errorPayload?.error || `Backend ${normalizedMode} plan request failed.`);
      }

      return response.json();
    } catch (error) {
      lastError = error;
    }
  }

  throw new Error(lastError?.message || `Backend ${normalizedMode} plan request failed.`);
}

const slugify = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "-");

function capitalizePhrase(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function createPlaceholderCourse(universityName, yearBlock, term, index) {
  const prefix = slugify(universityName).slice(0, 3).toUpperCase();
  const area = yearBlock.year === "Year 1"
    ? ["Business Core", "Professional Skills", "Commercial Context", "Major Discovery"][index]
    : yearBlock.year === "Year 2"
      ? ["Major Development", "Industry Application", "Analytical Practice", "Elective Breadth"][index]
      : ["Capstone Support", "Advanced Elective", "Professional Project", "Strategy Integration"][index];

  return {
    code: `${prefix}-${yearBlock.year.replace(/[^0-9]/g, "") || "3"}${term.name.replace(/[^A-Z]/gi, "").slice(0, 2).toUpperCase()}${index + 1}`,
    name: area,
    description: `Planner placeholder to keep the ${term.name.toLowerCase()} load at a realistic four-course semester while preserving the ${universityName} pathway story.`,
  };
}

function normalizeCoursePlan(universityName, plan) {
  if (universityName === "UNSW Sydney") return plan;

  return plan.map((yearBlock) => ({
    ...yearBlock,
    terms: yearBlock.terms.map((term) => {
      const courses = [...term.courses];
      while (courses.length < 4) {
        courses.push(createPlaceholderCourse(universityName, yearBlock, term, courses.length));
      }

      return {
        ...term,
        units: "4 courses",
        courses,
      };
    }),
  }));
}

function createRecommendation(universityName, prompt, refinement) {
  const config = universityCatalog[universityName];
  const [confidence, flexibility, momentum, lifestyle] = config.metrics;
  const meta = universityMeta[universityName];
  const coursePlan = normalizeCoursePlan(universityName, config.coursePlan);

  return {
    id: slugify(universityName),
    university: universityName,
    degree: config.degree,
    title: `${config.degree} at ${universityName}`,
    subtitle: refinement ? `Refined around "${refinement}"` : `Recommended for ${prompt}`,
    duration: meta.duration,
    studyRhythm: meta.studyRhythm,
    difficultyBand: meta.difficultyBand,
    fitScore: universityName === DEFAULT_UNIVERSITY ? 95 : config.backendReady ? 94 : 88,
    keyPoint: config.rationale,
    summary: refinement
      ? `This refined pathway for ${universityName} responds to "${refinement}" while staying grounded in a commerce-based degree structure.`
      : `For "${prompt}", ${universityName} is presented as a grounded ${config.degree.toLowerCase()} recommendation with a semester-by-semester roadmap.`,
    badges: [
      { label: "Pace", value: config.pace[0], helper: config.pace[1], tone: config.pace[2] },
      { label: "Cost", value: config.cost[0], helper: config.cost[1], tone: config.cost[2] },
      {
        label: "Workload",
        value: config.workload[0],
        helper: config.workload[1],
        tone: config.workload[2],
      },
    ],
    metrics: [
      { label: "Progress confidence", value: confidence[0], tone: confidence[1] },
      { label: "Flexibility", value: flexibility[0], tone: flexibility[1] },
      { label: "Career momentum", value: momentum[0], tone: momentum[1] },
      { label: "Lifestyle fit", value: lifestyle[0], tone: lifestyle[1] },
    ],
    uniLife: config.uniLife,
    professional: config.professional,
    why: config.why,
    breakdown: {
      overview: config.overview,
      strengths: config.strengths,
      sampleCourses: coursePlan.flatMap((yearBlock) =>
        yearBlock.terms.flatMap((term) => term.courses)
      ).slice(0, 4),
    },
    coursePlan,
    backendReady: Boolean(config.backendReady),
  };
}

function buildRecommendedUniversities(selectedUniversity) {
  return universityOrder.map((name) => {
    const config = universityCatalog[name];

    return {
      id: slugify(name),
      name,
      rationale: config.rationale,
      tags: config.tags,
      cta: "Use this university",
      tone: config.tone || "neutral",
      duration: universityMeta[name].duration,
      studyRhythm: universityMeta[name].studyRhythm,
      difficultyBand: universityMeta[name].difficultyBand,
      backendReady: Boolean(config.backendReady),
      selected: name === selectedUniversity,
    };
  });
}

function getRefinementSignals(refinement) {
  const lowered = refinement.toLowerCase();

  if (/(internship|industry|career|job|placement)/.test(lowered)) {
    return {
      emphasis: "internship-focused",
      tone: "success",
      summary:
        "Shifts the same plan toward internships, practical experience, and employability signals.",
      uniLife:
        "Keeps the same study structure but nudges extracurricular time toward societies, internships and practical portfolio-building.",
      professional:
        "Highlights applied subjects, networking value and industry-readiness language more strongly.",
      timeline:
        "Later terms now read as stronger launch points for internship applications and practical experience.",
    };
  }

  if (/(cheap|cost|afford|budget|price|fee)/.test(lowered)) {
    return {
      emphasis: "cost-aware",
      tone: "warning",
      summary:
        "Keeps the current plan structure while reframing it around lower-cost choices and cleaner sequencing.",
      uniLife:
        "Aims to reduce financial pressure by making the plan feel more controlled and predictable term to term.",
      professional:
        "Preserves commercial credibility while using more conservative tradeoff language around optional extras.",
      timeline:
        "The roadmap now emphasises fewer detours and steadier progression to keep total effort and spend feeling more controlled.",
    };
  }

  if (/(workload|lighter|manageable|balance|stress|easier)/.test(lowered)) {
    return {
      emphasis: "lighter-load",
      tone: "info",
      summary:
        "Refines the same pathway to feel more manageable, especially in the earlier stages of the degree.",
      uniLife:
        "Creates more breathing room for rest, part-time work and consistency across the year.",
      professional:
        "Keeps the career narrative intact without making every term feel maximally packed.",
      timeline:
        "The roadmap now reads as a steadier build rather than a maximum-intensity sprint.",
    };
  }

  if (/(research|academic|honours|theory)/.test(lowered)) {
    return {
      emphasis: "research-led",
      tone: "accent",
      summary:
        "Keeps the same university path but repositions it as a more academic and theory-aware commerce route.",
      uniLife:
        "Leans more toward analytical depth, deeper reading and a slightly more academic student rhythm.",
      professional:
        "Frames the plan as strong preparation for research, honours-style thinking or analytically demanding roles.",
      timeline:
        "The roadmap now highlights the analytical and theory-building side of the same sequence.",
    };
  }

  return {
    emphasis: "goal-adjusted",
    tone: "accent",
    summary:
      "Adjusts the same plan more locally, keeping the structure stable while shifting the emphasis of the advice.",
    uniLife:
      "Keeps the existing student rhythm intact while tailoring the tone of the recommendation to your new preference.",
    professional:
      "Reframes the current plan so the benefits line up more closely with the new goal you added.",
    timeline:
      "The roadmap remains the same pathway, but the emphasis of each stage is tuned to your refinement.",
  };
}

function refineRecommendation(recommendation, refinement) {
  const signals = getRefinementSignals(refinement);
  const emphasisLabel = capitalizePhrase(signals.emphasis.replace(/-/g, " "));
  const refinedWhy = [
    `Adjusted locally for a ${signals.emphasis} outcome`,
    ...recommendation.why.slice(0, 2),
  ];

  return {
    ...recommendation,
    subtitle: `Refined around "${refinement}"`,
    keyPoint: `${recommendation.keyPoint} The current pathway is now weighted more toward ${signals.emphasis}.`,
    summary: `${signals.summary} This is still the same ${recommendation.degree.toLowerCase()} plan at ${recommendation.university}.`,
    uniLife: signals.uniLife,
    professional: signals.professional,
    why: refinedWhy,
    badges: recommendation.badges.map((badge) =>
      badge.label === "Workload" && signals.emphasis === "lighter-load"
        ? { ...badge, value: "Moderate", helper: "More manageable emphasis", tone: "info" }
        : badge.label === "Cost" && signals.emphasis === "cost-aware"
          ? { ...badge, helper: "Tighter budget emphasis", tone: "warning" }
          : badge
    ),
    breakdown: {
      ...recommendation.breakdown,
      overview: `${recommendation.breakdown.overview} ${signals.timeline}`,
      strengths: [
        `${emphasisLabel} refinement applied without replacing the current planner context.`,
        ...recommendation.breakdown.strengths.slice(0, 2),
      ],
    },
    coursePlan: recommendation.coursePlan.map((yearBlock, yearIndex) => ({
      ...yearBlock,
      terms: yearBlock.terms.map((term, termIndex) => ({
        ...term,
        courses: term.courses.map((course, courseIndex) => (
          yearIndex === 0 && termIndex === 0 && courseIndex === 0
            ? {
                ...course,
                description: `${course.description} Refined emphasis: ${signals.timeline}`,
              }
            : course
        )),
      })),
    })),
  };
}

function applyAlternativeScenario(recommendation, alternative, residencyStatus) {
  const residencyLabel = residencyStatus === "international" ? "international" : "domestic";
  const residencyCostHelper =
    residencyStatus === "international"
      ? "International fee lens"
      : "Domestic fee lens";

  const adjustedBadges = recommendation.badges.map((badge) => {
    if (alternative.type === "Cheapest" && badge.label === "Cost") {
      return {
        ...badge,
        value: residencyStatus === "international" ? "High but reduced path" : "Lower cost path",
        helper: residencyCostHelper,
        tone: residencyStatus === "international" ? "warning" : "success",
      };
    }

    if (alternative.type === "Easiest" && badge.label === "Pace") {
      return {
        ...badge,
        value: "Steady progression",
        helper: "Lower-friction sequencing",
        tone: "info",
      };
    }

    if (alternative.type === "Recommended" && badge.label === "Workload") {
      return {
        ...badge,
        value: "Balanced",
        helper: "Career-fit prioritised",
        tone: "accent",
      };
    }

    return badge;
  });

  return {
    ...recommendation,
    keyPoint: `${recommendation.keyPoint} Scenario update: ${alternative.type.toLowerCase()} lens applied.`,
    summary: `${alternative.summary} The ${recommendation.university} plan is now reframed through a ${alternative.type.toLowerCase()} lens${alternative.type === "Cheapest" ? ` for a ${residencyLabel} student` : ""}.`,
    uniLife:
      alternative.type === "Easiest"
        ? "This angle softens the study rhythm and protects time for recovery, clubs and part-time work."
        : alternative.type === "Recommended"
          ? "This angle balances progression, fit, and practical readiness as a default planning strategy."
          : recommendation.uniLife,
    professional:
      alternative.type === "Easiest"
        ? "This angle prioritises smoother prerequisite flow and manageable term complexity."
        : alternative.type === "Cheapest"
          ? `This angle tightens the sequencing and cost language around ${residencyLabel} fee sensitivity without discarding the main university path.`
          : recommendation.professional,
    why: [
      `${alternative.type} scenario applied as an update-ready planning mode`,
      ...alternative.rationale.slice(0, 2),
    ],
    badges: adjustedBadges,
    breakdown: {
      ...recommendation.breakdown,
      overview: `${recommendation.breakdown.overview} ${alternative.tradeoffs}`,
      strengths: [
        `${alternative.type} update keeps the same planner structure while changing the planning emphasis.`,
        ...recommendation.breakdown.strengths.slice(0, 2),
      ],
    },
  };
}

export async function refinePlannerResult({
  currentResult,
  selectedUniversity,
  followUpPrompt,
}) {
  if (!currentResult || !followUpPrompt?.trim()) {
    throw new Error("Current result and follow-up prompt are required to refine the planner.");
  }

  await new Promise((resolve) => {
    window.setTimeout(resolve, 480);
  });

  const refinement = followUpPrompt.trim();
  const existingRecommendation = currentResult.universities?.[selectedUniversity];

  if (!existingRecommendation) {
    throw new Error("Unable to find the selected university to refine.");
  }

  const refinedRecommendation = refineRecommendation(existingRecommendation, refinement);
  const universities = {
    ...currentResult.universities,
    [selectedUniversity]: refinedRecommendation,
  };

  return {
    ...currentResult,
    universities,
    recommended:
      selectedUniversity === DEFAULT_UNIVERSITY
        ? refinedRecommendation
        : currentResult.recommended,
    meta: {
      ...currentResult.meta,
      latency: "96ms",
    },
  };
}

export async function applyAlternativeResult({
  currentResult,
  selectedUniversity,
  alternativeId,
  residencyStatus = "domestic",
}) {
  if (!currentResult || !selectedUniversity || !alternativeId) {
    throw new Error("Current result, university, and alternative are required.");
  }

  const recommendation = currentResult.universities?.[selectedUniversity];
  const alternative = currentResult.alternatives.find((item) => item.id === alternativeId);

  if (!recommendation || !alternative) {
    throw new Error("Unable to apply the requested planning angle.");
  }

  const backendModeMap = {
    Recommended: "recommended",
    Cheapest: "cheapest",
    Easiest: "easiest",
  };

  if (selectedUniversity === DEFAULT_UNIVERSITY && backendModeMap[alternative.type]) {
    const mode = backendModeMap[alternative.type];
    const backendPlan = await callBackendPlanner({
      mode,
      prompt: currentResult.prompt,
      residencyStatus,
    });

    const updatedRecommendation = createBackendRecommendation({
      planData: backendPlan,
      prompt: currentResult.prompt,
      modeLabel: alternative.type,
    });

    const universities = {
      ...currentResult.universities,
      [selectedUniversity]: updatedRecommendation,
    };

    return {
      ...currentResult,
      universities,
      recommended: updatedRecommendation,
      activeScenario: {
        alternativeId,
        alternativeType: alternative.type,
        residencyStatus,
        mode,
      },
      meta: {
        ...currentResult.meta,
        source: "backend+mock",
        requestMode: mode,
        selectedUniversitySupport: "UNSW live backend, all others frontend mock",
      },
    };
  }

  await new Promise((resolve) => {
    window.setTimeout(resolve, 500);
  });

  const updatedRecommendation = applyAlternativeScenario(
    recommendation,
    alternative,
    residencyStatus
  );
  const universities = {
    ...currentResult.universities,
    [selectedUniversity]: updatedRecommendation,
  };

  return {
    ...currentResult,
    universities,
    recommended:
      selectedUniversity === DEFAULT_UNIVERSITY
        ? updatedRecommendation
        : currentResult.recommended,
    activeScenario: {
      alternativeId,
      alternativeType: alternative.type,
      residencyStatus,
    },
    meta: {
      ...currentResult.meta,
      latency: "412ms",
      requestMode: "scenario-update",
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

  const cleanPrompt = prompt.trim();
  const refinement = followUpPrompt?.trim();
  const universities = universityOrder.reduce((accumulator, universityName) => {
    accumulator[universityName] = createRecommendation(universityName, cleanPrompt, refinement);
    return accumulator;
  }, {});

  let backendAvailable = false;
  let backendError = "";
  try {
    const backendPlan = await callBackendPlanner({
      mode: "recommended",
      prompt: cleanPrompt,
      residencyStatus: "domestic",
    });

    universities[DEFAULT_UNIVERSITY] = createBackendRecommendation({
      planData: backendPlan,
      prompt: cleanPrompt,
      modeLabel: "Recommended",
    });
    backendAvailable = true;
  } catch (error) {
    backendError = error?.message || "Backend planner unavailable.";
  }

  return {
    id: previousResultId || `planner-${Date.now()}`,
    prompt: cleanPrompt,
    defaultUniversity: DEFAULT_UNIVERSITY,
    universities,
    recommended: universities[DEFAULT_UNIVERSITY],
    recommendedUniversities: buildRecommendedUniversities(DEFAULT_UNIVERSITY),
    followUpSuggestions: [
      "Make this easiest",
      "Optimise this for lower total cost",
      "Keep this as recommended",
      "Reduce the workload in first year",
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
    meta: {
      source: backendAvailable ? "backend+mock" : "mock-service",
      backendReady: backendAvailable,
      retrievalLayer: "Elastic-ready",
      latency: backendAvailable ? "live" : refinement ? "238ms" : "182ms",
      selectedUniversitySupport: backendAvailable
        ? "UNSW live backend, all others frontend mock"
        : "UNSW fallback mock (backend unavailable), all others frontend mock",
      backendError,
    },
  };
}
