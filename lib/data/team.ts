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
  },
  {
    slug: "bim-coordinator",
    title: { en: "BIM Coordinator" },
    department: "Digital Construction",
    location: { en: "Baku, Azerbaijan" },
    type: { en: "Full-time" },
    summary: { en: "Manage federated BIM models and clash detection workflows across multiple concurrent projects." },
  },
  {
    slug: "hse-advisor",
    title: { en: "HSE Advisor" },
    department: "Health, Safety & Environment" ,
    location: { en: "Ganja, Azerbaijan" },
    type: { en: "Full-time" },
    summary: { en: "Support site-based safety inspections, training and incident investigation on infrastructure projects." },
  },
  {
    slug: "quantity-surveyor",
    title: { en: "Quantity Surveyor" },
    department: "Cost Management",
    location: { en: "Baku, Azerbaijan" },
    type: { en: "Full-time" },
    summary: { en: "Deliver cost planning, tendering and post-contract cost control across a portfolio of commercial projects." },
  },
  {
    slug: "project-planner",
    title: { en: "Project Planner" },
    department: "Planning",
    location: { en: "Remote / Regional" },
    type: { en: "Full-time" },
    summary: { en: "Develop and maintain resourced master programmes for infrastructure and industrial projects." },
  },
  {
    slug: "graduate-civil-engineer",
    title: { en: "Graduate Civil Engineer" },
    department: "Engineering",
    location: { en: "Baku, Azerbaijan" },
    type: { en: "Graduate Programme" },
    summary: { en: "Join our two-year graduate rotation programme across structural, civil and site engineering teams." },
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
