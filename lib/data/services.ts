import { placeholderImage } from "@/lib/images";
import type { Service } from "@/lib/types";

export const services: Service[] = [
  {
    slug: "construction",
    icon: "HardHat",
    title: { en: "Construction" },
    shortDescription: {
      en: "General contracting and self-perform construction delivered to international quality and safety standards.",
    },
    heroImage: placeholderImage("service-construction-hero", 1920, 1080, "Construction crew on an active high-rise site at dusk"),
    gallery: [
      placeholderImage("service-construction-1", 1200, 900, "Structural steel erection"),
      placeholderImage("service-construction-2", 1200, 900, "Concrete pour on a commercial tower"),
      placeholderImage("service-construction-3", 1200, 900, "Site engineers reviewing drawings"),
    ],
    description: [
      {
        en: "Our construction division self-performs core scopes and manages specialist subcontractors across commercial, industrial and infrastructure projects, giving clients a single point of accountability for cost, schedule and quality.",
      },
      {
        en: "We combine lean construction methods with rigorous project controls to keep complex, multi-package builds on programme — from early works and substructure through to fit-out and commissioning.",
      },
    ],
    benefits: [
      { en: "Single point of accountability across all site trades" },
      { en: "Lean scheduling that compresses programme without compromising quality" },
      { en: "In-house plant, logistics and site management capability" },
      { en: "Transparent, real-time cost and progress reporting" },
    ],
    process: [
      { en: "Constructability review during design development" },
      { en: "Detailed method statements and site mobilisation planning" },
      { en: "Phased execution with continuous quality and safety inspection" },
      { en: "Testing, commissioning and structured handover" },
    ],
    faq: [
      {
        question: { en: "Do you self-perform or subcontract construction works?" },
        answer: { en: "Both — we self-perform core structural and civil scopes with our own workforce, and manage a vetted network of specialist subcontractors for MEP and finishing trades under a single integrated schedule." },
      },
      {
        question: { en: "What project sizes do you typically deliver?" },
        answer: { en: "Our construction teams deliver projects ranging from $5M refurbishments to $500M+ greenfield developments." },
      },
    ],
    relatedServiceSlugs: ["project-management", "quality-assurance", "hse"],
  },
  {
    slug: "project-management",
    icon: "ClipboardList",
    title: { en: "Project Management" },
    shortDescription: {
      en: "End-to-end project leadership that protects cost, schedule and scope from feasibility to handover.",
    },
    heroImage: placeholderImage("service-pm-hero", 1920, 1080, "Project managers reviewing a master schedule in a site office"),
    gallery: [
      placeholderImage("service-pm-1", 1200, 900, "Team reviewing a Gantt chart"),
      placeholderImage("service-pm-2", 1200, 900, "Site inspection walk"),
      placeholderImage("service-pm-3", 1200, 900, "Progress meeting in a control room"),
    ],
    description: [
      { en: "Our project management teams act as the client's trusted representative, coordinating design, procurement and construction to a single integrated programme." },
      { en: "We deploy structured governance, transparent reporting and disciplined change control to keep stakeholders aligned and projects predictable." },
    ],
    benefits: [
      { en: "Independent, client-side representation at every stage" },
      { en: "Integrated master schedules across design, procurement and construction" },
      { en: "Proactive risk identification and mitigation" },
      { en: "Structured governance and stakeholder reporting" },
    ],
    process: [
      { en: "Project charter, governance structure and success criteria" },
      { en: "Integrated master schedule and procurement strategy" },
      { en: "Ongoing cost, risk and progress management" },
      { en: "Close-out, lessons learned and asset handover" },
    ],
    faq: [
      { question: { en: "Can you manage projects where you are not the contractor?" }, answer: { en: "Yes — a significant share of our project management work is delivered independently of our construction division, representing the client's interests across third-party design and construction teams." } },
    ],
    relatedServiceSlugs: ["planning", "cost-management", "engineering-consultancy"],
  },
  {
    slug: "design-management",
    icon: "PenTool",
    title: { en: "Design Management" },
    shortDescription: {
      en: "Coordinated multidisciplinary design delivery that resolves conflicts before they reach site.",
    },
    heroImage: placeholderImage("service-design-hero", 1920, 1080, "Architects reviewing drawings on a light table"),
    gallery: [
      placeholderImage("service-design-1", 1200, 900, "BIM coordination review on screen"),
      placeholderImage("service-design-2", 1200, 900, "Design workshop with stakeholders"),
      placeholderImage("service-design-3", 1200, 900, "Architectural model review"),
    ],
    description: [
      { en: "We coordinate architects, engineers and specialist consultants through a single design management framework, ensuring buildability, compliance and budget alignment at every design stage." },
      { en: "Structured design reviews and clash detection remove costly rework once construction is underway." },
    ],
    benefits: [
      { en: "Single design management framework across all disciplines" },
      { en: "Early clash detection reduces site rework" },
      { en: "Design-to-budget alignment at every stage gate" },
      { en: "Regulatory and code compliance built in from concept" },
    ],
    process: [
      { en: "Design brief and stage-gate framework definition" },
      { en: "Multidisciplinary coordination and clash detection" },
      { en: "Value engineering and design freeze" },
      { en: "Construction-ready issue for tender/build" },
    ],
    faq: [
      { question: { en: "Do you design in-house or manage external architects?" }, answer: { en: "We typically manage a client's chosen design consultants, providing the coordination framework, BIM standards and quality gates that keep the design process on schedule." } },
    ],
    relatedServiceSlugs: ["bim", "engineering-consultancy", "planning"],
  },
  {
    slug: "planning",
    icon: "CalendarClock",
    title: { en: "Planning" },
    shortDescription: {
      en: "Feasibility, programme and risk planning that gives every project a credible, defensible roadmap.",
    },
    heroImage: placeholderImage("service-planning-hero", 1920, 1080, "Planning team at a strategy session with site plans"),
    gallery: [
      placeholderImage("service-planning-1", 1200, 900, "Master programme on a wall planner"),
      placeholderImage("service-planning-2", 1200, 900, "Feasibility study documents"),
      placeholderImage("service-planning-3", 1200, 900, "Site logistics planning"),
    ],
    description: [
      { en: "Our planning specialists build defensible master programmes underpinned by resourced logic networks, giving clients confidence in delivery dates from day one." },
      { en: "We stress-test schedules against risk scenarios so contingency is planned rather than reactive." },
    ],
    benefits: [
      { en: "Resourced, logic-linked master programmes" },
      { en: "Scenario and risk-based schedule stress-testing" },
      { en: "Clear critical path visibility for all stakeholders" },
      { en: "Ongoing programme monitoring and recovery planning" },
    ],
    process: [
      { en: "Feasibility and options appraisal" },
      { en: "Master programme development and resourcing" },
      { en: "Risk register and contingency planning" },
      { en: "Continuous monitoring and re-baselining" },
    ],
    faq: [
      { question: { en: "Can you recover a delayed programme already in progress?" }, answer: { en: "Yes — schedule recovery is one of our most requested engagements. We re-baseline the programme, identify float and resequencing opportunities, and implement accelerated delivery plans." } },
    ],
    relatedServiceSlugs: ["project-management", "cost-management", "construction"],
  },
  {
    slug: "engineering-consultancy",
    icon: "Compass",
    title: { en: "Engineering Consultancy" },
    shortDescription: {
      en: "Multidisciplinary structural, civil and MEP engineering that turns ambitious designs into buildable reality.",
    },
    heroImage: placeholderImage("service-engineering-hero", 1920, 1080, "Structural engineers inspecting steel frame"),
    gallery: [
      placeholderImage("service-engineering-1", 1200, 900, "Structural analysis on workstation"),
      placeholderImage("service-engineering-2", 1200, 900, "Site engineering inspection"),
      placeholderImage("service-engineering-3", 1200, 900, "MEP coordination drawings"),
    ],
    description: [
      { en: "Our engineering teams provide structural, civil, geotechnical and MEP consultancy, validating design intent against buildability, code compliance and life-cycle performance." },
      { en: "We work alongside architects and contractors from concept design through to site engineering support." },
    ],
    benefits: [
      { en: "Multidisciplinary in-house engineering capability" },
      { en: "Independent design verification and peer review" },
      { en: "Site engineering support through construction" },
      { en: "Life-cycle performance and resilience analysis" },
    ],
    process: [
      { en: "Concept engineering and options analysis" },
      { en: "Detailed design and code compliance verification" },
      { en: "Design-for-construction coordination" },
      { en: "Site engineering support and as-built verification" },
    ],
    faq: [
      { question: { en: "Do you provide independent design checks for third-party engineers?" }, answer: { en: "Yes — we regularly provide independent peer review and design verification services for lenders, insurers and public authorities." } },
    ],
    relatedServiceSlugs: ["design-management", "bim", "quality-assurance"],
  },
  {
    slug: "cost-management",
    icon: "Calculator",
    title: { en: "Cost Management" },
    shortDescription: {
      en: "Quantity surveying and cost control that protects budgets from feasibility through final account.",
    },
    heroImage: placeholderImage("service-cost-hero", 1920, 1080, "Cost management team reviewing budget reports"),
    gallery: [
      placeholderImage("service-cost-1", 1200, 900, "Budget spreadsheet review"),
      placeholderImage("service-cost-2", 1200, 900, "Tender evaluation meeting"),
      placeholderImage("service-cost-3", 1200, 900, "Final account reconciliation"),
    ],
    description: [
      { en: "Our quantity surveyors provide cost planning, tendering and post-contract cost control, giving clients budget certainty at every stage gate." },
      { en: "Transparent change control and value engineering keep projects within approved budgets without compromising design intent." },
    ],
    benefits: [
      { en: "Stage-gated cost planning with benchmarked data" },
      { en: "Competitive, transparent tender management" },
      { en: "Rigorous change control and variation management" },
      { en: "Final account reconciliation and audit support" },
    ],
    process: [
      { en: "Order-of-magnitude and elemental cost planning" },
      { en: "Tender documentation and bid evaluation" },
      { en: "Post-contract cost control and reporting" },
      { en: "Final account agreement and close-out" },
    ],
    faq: [
      { question: { en: "How do you keep budgets on track during construction?" }, answer: { en: "Through monthly cost reporting, early warning on variations, and a disciplined change control process that requires approval before any budget impact is committed." } },
    ],
    relatedServiceSlugs: ["planning", "project-management", "quality-assurance"],
  },
  {
    slug: "quality-assurance",
    icon: "BadgeCheck",
    title: { en: "Quality Assurance" },
    shortDescription: {
      en: "ISO-certified quality systems, inspection and testing that leave nothing to chance.",
    },
    heroImage: placeholderImage("service-qa-hero", 1920, 1080, "Quality inspector checking finishes with a checklist"),
    gallery: [
      placeholderImage("service-qa-1", 1200, 900, "Materials testing laboratory"),
      placeholderImage("service-qa-2", 1200, 900, "Site inspection checklist"),
      placeholderImage("service-qa-3", 1200, 900, "Snagging walk-through"),
    ],
    description: [
      { en: "Our quality management system, certified to ISO 9001, governs inspection and test plans across every project phase, from incoming materials to final commissioning." },
      { en: "Independent quality audits and structured non-conformance tracking ensure defects are caught before they become costly rework." },
    ],
    benefits: [
      { en: "ISO 9001-certified quality management system" },
      { en: "Structured inspection and test plans (ITPs)" },
      { en: "Independent third-party audits" },
      { en: "Digital non-conformance tracking and close-out" },
    ],
    process: [
      { en: "Project quality plan and ITP development" },
      { en: "Materials and workmanship inspection" },
      { en: "Non-conformance tracking and corrective action" },
      { en: "Final inspection, snagging and commissioning sign-off" },
    ],
    faq: [
      { question: { en: "What quality certifications do you hold?" }, answer: { en: "Our integrated management system is certified to ISO 9001 (Quality), ISO 14001 (Environmental) and ISO 45001 (Occupational Health & Safety)." } },
    ],
    relatedServiceSlugs: ["hse", "construction", "engineering-consultancy"],
  },
  {
    slug: "hse",
    icon: "ShieldCheck",
    title: { en: "HSE" },
    shortDescription: {
      en: "Health, safety and environmental management built around a zero-harm culture.",
    },
    heroImage: placeholderImage("service-hse-hero", 1920, 1080, "Safety officer briefing site workers"),
    gallery: [
      placeholderImage("service-hse-1", 1200, 900, "Toolbox talk on site"),
      placeholderImage("service-hse-2", 1200, 900, "PPE inspection"),
      placeholderImage("service-hse-3", 1200, 900, "Safety audit walk"),
    ],
    description: [
      { en: "Our HSE teams embed a zero-harm culture across every project, backed by ISO 45001 certification, rigorous risk assessment and continuous workforce training." },
      { en: "Every employee — regardless of seniority — holds the authority to stop unsafe work, reinforcing safety as a shared, non-negotiable responsibility." },
    ],
    benefits: [
      { en: "ISO 45001-certified safety management system" },
      { en: "Stop-work authority for every employee" },
      { en: "Continuous site safety training and audits" },
      { en: "Proactive environmental impact management" },
    ],
    process: [
      { en: "Project-specific HSE plan and risk assessment" },
      { en: "Workforce induction and continuous training" },
      { en: "Daily site safety inspections and audits" },
      { en: "Incident investigation and lessons-learned sharing" },
    ],
    faq: [
      { question: { en: "What is your Lost Time Injury Frequency Rate (LTIFR)?" }, answer: { en: "Our group-wide LTIFR is maintained below 0.15 per 200,000 hours worked, well ahead of the industry benchmark." } },
    ],
    relatedServiceSlugs: ["quality-assurance", "construction", "project-management"],
  },
  {
    slug: "digital-construction",
    icon: "Cpu",
    title: { en: "Digital Construction" },
    shortDescription: {
      en: "Data-driven construction — drones, IoT sensors and digital twins that give you real-time site intelligence.",
    },
    heroImage: placeholderImage("service-digital-hero", 1920, 1080, "Drone flying over an active construction site"),
    gallery: [
      placeholderImage("service-digital-1", 1200, 900, "Digital twin visualisation on tablet"),
      placeholderImage("service-digital-2", 1200, 900, "Drone survey control room"),
      placeholderImage("service-digital-3", 1200, 900, "IoT sensor installation on site"),
    ],
    description: [
      { en: "We deploy drone surveying, IoT progress sensors and digital twin technology to give project stakeholders real-time visibility into site progress, quality and risk." },
      { en: "Digital construction tools shorten decision cycles and reduce the cost of rework by catching deviations early." },
    ],
    benefits: [
      { en: "Weekly drone-based progress and volumetric surveys" },
      { en: "Real-time IoT monitoring of critical site conditions" },
      { en: "Digital twin models for stakeholder visualisation" },
      { en: "Data-backed decision making at every stage gate" },
    ],
    process: [
      { en: "Digital execution plan and technology selection" },
      { en: "Site sensor and capture deployment" },
      { en: "Continuous data capture and dashboard reporting" },
      { en: "As-built digital twin handover" },
    ],
    faq: [
      { question: { en: "Is digital construction included by default or an add-on?" }, answer: { en: "Drone progress surveys are standard on projects above $20M; IoT and digital twin packages can be scoped for any project regardless of size." } },
    ],
    relatedServiceSlugs: ["bim", "engineering-consultancy", "project-management"],
  },
  {
    slug: "bim",
    icon: "Boxes",
    title: { en: "BIM" },
    shortDescription: {
      en: "Building Information Modelling that coordinates design, construction and facilities data in one model.",
    },
    heroImage: placeholderImage("service-bim-hero", 1920, 1080, "BIM coordinator reviewing a federated model"),
    gallery: [
      placeholderImage("service-bim-1", 1200, 900, "3D federated BIM model on large screen"),
      placeholderImage("service-bim-2", 1200, 900, "Clash detection review session"),
      placeholderImage("service-bim-3", 1200, 900, "4D construction sequencing model"),
    ],
    description: [
      { en: "Our BIM teams deliver Level of Development (LOD) 350–500 federated models, enabling clash-free design coordination and accurate 4D construction sequencing." },
      { en: "As-built BIM models are handed over as a live digital asset for facilities management." },
    ],
    benefits: [
      { en: "Federated multidisciplinary BIM coordination" },
      { en: "4D sequencing and 5D cost-linked models" },
      { en: "ISO 19650-aligned information management" },
      { en: "As-built digital asset handover for FM" },
    ],
    process: [
      { en: "BIM execution plan (BEP) and standards setup" },
      { en: "Federated model coordination and clash resolution" },
      { en: "4D/5D simulation and progress tracking" },
      { en: "As-built model handover and FM integration" },
    ],
    faq: [
      { question: { en: "What BIM maturity level do you work to?" }, answer: { en: "We deliver information management aligned to ISO 19650, typically at BIM Level 2 maturity or higher, depending on client and regulatory requirements." } },
    ],
    relatedServiceSlugs: ["digital-construction", "design-management", "engineering-consultancy"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getRelatedServices(service: Service): Service[] {
  return service.relatedServiceSlugs
    .map((slug) => getServiceBySlug(slug))
    .filter((s): s is Service => Boolean(s));
}
