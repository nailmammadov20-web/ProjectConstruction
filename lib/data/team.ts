import { placeholderImage } from "@/lib/images";
import type { Certificate, JobOpening, Office, Partner, TeamMember, Testimonial } from "@/lib/types";

export const leadershipTeam: TeamMember[] = [
  {
    slug: "farid-aliyev",
    name: "Farid Aliyev",
    role: { en: "Chief Executive Officer" },
    photo: placeholderImage("team-ceo", 600, 750, "Portrait of the Chief Executive Officer"),
    bio: { en: "Farid founded Constructivegroup.az in 2004 and has led its growth into an 18-country operation, drawing on more than 28 years of international construction leadership." },
  },
  {
    slug: "leyla-huseynova",
    name: "Leyla Huseynova",
    role: { en: "Chief Operating Officer" },
    photo: placeholderImage("team-coo", 600, 750, "Portrait of the Chief Operating Officer"),
    bio: { en: "Leyla oversees group-wide project delivery and operational excellence across all active markets." },
  },
  {
    slug: "tural-mammadov",
    name: "Tural Mammadov",
    role: { en: "Chief Engineering Officer" },
    photo: placeholderImage("team-ceng", 600, 750, "Portrait of the Chief Engineering Officer"),
    bio: { en: "Tural leads our multidisciplinary engineering practice, with a background in high-rise structural design." },
  },
  {
    slug: "nigar-aliyeva",
    name: "Nigar Aliyeva",
    role: { en: "Group HSE Director" },
    photo: placeholderImage("team-hse", 600, 750, "Portrait of the Group HSE Director"),
    bio: { en: "Nigar has built Constructivegroup.az's zero-harm safety culture over the past decade, earning ISO 45001 certification group-wide." },
  },
  {
    slug: "kamran-huseynov",
    name: "Kamran Huseynov",
    role: { en: "Head of Digital Construction" },
    photo: placeholderImage("team-digital", 600, 750, "Portrait of the Head of Digital Construction"),
    bio: { en: "Kamran leads adoption of BIM, digital twin and IoT technologies across the project portfolio." },
  },
  {
    slug: "rashad-mammadov",
    name: "Rashad Mammadov",
    role: { en: "Head of Business Development" },
    photo: placeholderImage("team-bd", 600, 750, "Portrait of the Head of Business Development"),
    bio: { en: "Rashad leads client relationships and new market entry across the Caucasus, Central Asia and the Middle East." },
  },
];

export const certificates: Certificate[] = [
  { code: "ISO9001", title: { en: "Quality Management" }, issuer: "ISO 9001:2015", year: "2024" },
  { code: "ISO14001", title: { en: "Environmental Management" }, issuer: "ISO 14001:2015", year: "2024" },
  { code: "ISO45001", title: { en: "Occupational Health & Safety" }, issuer: "ISO 45001:2018", year: "2024" },
  { code: "ISO19650", title: { en: "BIM Information Management" }, issuer: "ISO 19650-1/2", year: "2023" },
  { code: "OHSAS", title: { en: "Contractor Safety Prequalification" }, issuer: "RoSPA Gold Award", year: "2023" },
  { code: "FIDIC", title: { en: "FIDIC Member Organisation" }, issuer: "FIDIC", year: "2022" },
];

export const partners: Partner[] = [
  { name: "Meridian Capital Partners" },
  { name: "Caspian Logistics Authority" },
  { name: "Azure Development Group" },
  { name: "Ministry of Transport" },
  { name: "Ministry of Health" },
  { name: "Grand Caspian Hospitality Group" },
  { name: "State Property Committee" },
  { name: "Riverside Education Foundation" },
  { name: "SOCAR Engineering" },
  { name: "Baku Development Fund" },
];

export const testimonials: Testimonial[] = [
  {
    quote: { en: "Constructivegroup.az delivered Meridian Tower on an extraordinarily tight programme without ever compromising on quality. Their project controls gave us total visibility from day one." },
    author: "James Whitfield",
    role: { en: "Development Director" },
    company: "Meridian Capital Partners",
  },
  {
    quote: { en: "The team's engineering depth on the Port Caspian project was exceptional — they solved ground conditions that would have stopped most contractors." },
    author: "Elchin Rzayev",
    role: { en: "Infrastructure Programme Lead" },
    company: "Caspian Logistics Authority",
  },
  {
    quote: { en: "From the CEO to the site foremen, safety and quality are treated as non-negotiable. That culture shows in the finished product." },
    author: "Sarah Bennett",
    role: { en: "Asset Manager" },
    company: "Azure Development Group",
  },
];

export const jobOpenings: JobOpening[] = [
  {
    slug: "senior-site-engineer-baku",
    title: { en: "Senior Site Engineer" },
    department: "Construction",
    location: { en: "Baku, Azerbaijan" },
    type: { en: "Full-time" },
    summary: { en: "Lead site engineering delivery on a major commercial high-rise project, coordinating structural and MEP works." },
    responsibilities: [
      { en: "Supervise daily site engineering activities across structural and MEP trades." },
      { en: "Coordinate with design consultants to resolve site queries and drawing clashes." },
      { en: "Enforce quality control and method-statement compliance on site." },
    ],
    requirements: [
      { en: "Bachelor's degree in Civil Engineering or a related field." },
      { en: "5+ years of site engineering experience on commercial or high-rise projects." },
      { en: "Working knowledge of BIM coordination workflows." },
    ],
    experienceLevel: { en: "5+ years" },
  },
  {
    slug: "bim-coordinator",
    title: { en: "BIM Coordinator" },
    department: "Digital Construction",
    location: { en: "Baku, Azerbaijan" },
    type: { en: "Full-time" },
    summary: { en: "Manage federated BIM models and clash detection workflows across multiple concurrent projects." },
    responsibilities: [
      { en: "Maintain federated BIM models and run clash-detection cycles." },
      { en: "Set and enforce BIM execution plans across project teams." },
      { en: "Support drone survey and digital twin data capture on active sites." },
    ],
    requirements: [
      { en: "Proficiency in Revit, Navisworks and common clash-detection tools." },
      { en: "3+ years of experience in a BIM coordination role." },
      { en: "Understanding of ISO 19650 information management principles." },
    ],
    experienceLevel: { en: "3-5 years" },
  },
  {
    slug: "hse-advisor",
    title: { en: "HSE Advisor" },
    department: "Health, Safety & Environment" ,
    location: { en: "Ganja, Azerbaijan" },
    type: { en: "Full-time" },
    summary: { en: "Support site-based safety inspections, training and incident investigation on infrastructure projects." },
    responsibilities: [
      { en: "Conduct routine site safety inspections and audits." },
      { en: "Deliver toolbox talks and safety induction training." },
      { en: "Investigate incidents and near-misses, and track corrective actions." },
    ],
    requirements: [
      { en: "NEBOSH General Certificate or equivalent." },
      { en: "2+ years of HSE experience on construction or infrastructure sites." },
      { en: "Fluent in Azerbaijani; working English is an advantage." },
    ],
    experienceLevel: { en: "2+ years" },
  },
  {
    slug: "quantity-surveyor",
    title: { en: "Quantity Surveyor" },
    department: "Cost Management",
    location: { en: "Baku, Azerbaijan" },
    type: { en: "Full-time" },
    summary: { en: "Deliver cost planning, tendering and post-contract cost control across a portfolio of commercial projects." },
    responsibilities: [
      { en: "Prepare cost plans, bills of quantities and tender packages." },
      { en: "Manage subcontractor valuations and variations." },
      { en: "Report on project cost performance against budget." },
    ],
    requirements: [
      { en: "Bachelor's degree in Quantity Surveying or Construction Economics." },
      { en: "4+ years of post-contract cost management experience." },
      { en: "Strong command of measurement standards (SMM7/NRM)." },
    ],
    experienceLevel: { en: "4+ years" },
  },
  {
    slug: "project-planner",
    title: { en: "Project Planner" },
    department: "Planning",
    location: { en: "Remote / Regional" },
    type: { en: "Full-time" },
    summary: { en: "Develop and maintain resourced master programmes for infrastructure and industrial projects." },
    responsibilities: [
      { en: "Build and maintain resourced master programmes in Primavera P6." },
      { en: "Track progress and produce delay/impact analyses." },
      { en: "Coordinate programme inputs from site and design teams." },
    ],
    requirements: [
      { en: "Proficiency in Primavera P6 and MS Project." },
      { en: "3+ years of planning experience on infrastructure or industrial projects." },
      { en: "Ability to work across distributed regional project teams." },
    ],
    experienceLevel: { en: "3+ years" },
  },
  {
    slug: "graduate-civil-engineer",
    title: { en: "Graduate Civil Engineer" },
    department: "Engineering",
    location: { en: "Baku, Azerbaijan" },
    type: { en: "Graduate Programme" },
    summary: { en: "Join our two-year graduate rotation programme across structural, civil and site engineering teams." },
    responsibilities: [
      { en: "Rotate across structural, civil and site engineering teams over two years." },
      { en: "Support design coordination and site inspection tasks under senior guidance." },
      { en: "Complete structured training modules toward chartership." },
    ],
    requirements: [
      { en: "Recent Bachelor's or Master's degree in Civil Engineering." },
      { en: "Strong academic record and eagerness to learn on-site." },
      { en: "Willingness to relocate across regional project sites during rotations." },
    ],
    experienceLevel: { en: "Graduate / 0-1 years" },
  },
];

export const offices: Office[] = [
  {
    city: { en: "Baku" },
    country: { en: "Azerbaijan" },
    address: { en: "28 Nizami Street, Baku AZ1010" },
    phone: "+994 12 493 00 01",
    email: "baku@constructivegroup.az",
    isHeadquarters: true,
    mapEmbedUrl: "https://www.google.com/maps?q=Baku,Azerbaijan&output=embed",
  },
  {
    city: { en: "Tbilisi" },
    country: { en: "Georgia" },
    address: { en: "12 Rustaveli Avenue, Tbilisi 0108" },
    phone: "+995 32 250 11 22",
    email: "tbilisi@constructivegroup.az",
    isHeadquarters: false,
    mapEmbedUrl: "https://www.google.com/maps?q=Tbilisi,Georgia&output=embed",
  },
  {
    city: { en: "Astana" },
    country: { en: "Kazakhstan" },
    address: { en: "5 Kabanbay Batyr Ave, Astana 010000" },
    phone: "+7 7172 55 03 40",
    email: "astana@constructivegroup.az",
    isHeadquarters: false,
    mapEmbedUrl: "https://www.google.com/maps?q=Astana,Kazakhstan&output=embed",
  },
  {
    city: { en: "Dubai" },
    country: { en: "United Arab Emirates" },
    address: { en: "Business Bay, Dubai" },
    phone: "+971 4 552 60 18",
    email: "dubai@constructivegroup.az",
    isHeadquarters: false,
    mapEmbedUrl: "https://www.google.com/maps?q=Dubai,UAE&output=embed",
  },
];
