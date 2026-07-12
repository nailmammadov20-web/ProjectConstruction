import { placeholderImage } from "@/lib/images";
import type { Project, Sector } from "@/lib/types";

export const sectors: Sector[] = [
  "commercial",
  "industrial",
  "residential",
  "infrastructure",
  "healthcare",
  "hospitality",
  "government",
  "education",
];

export const projects: Project[] = [
  {
    slug: "meridian-financial-tower",
    title: { en: "Meridian Financial Tower" },
    sector: "commercial",
    location: { en: "Baku, Azerbaijan" },
    client: { en: "Meridian Capital Partners" },
    area: "84,000 m²",
    completionDate: "2023-11",
    scope: { en: "Design-build, 42-storey Grade-A office tower" },
    summary: { en: "A 42-storey Grade-A office tower delivered on a fast-track design-build programme, anchoring Baku's new financial district." },
    heroImage: placeholderImage("proj-meridian-hero", 1920, 1080, "Meridian Financial Tower glass facade at sunset"),
    gallery: [
      placeholderImage("proj-meridian-1", 1200, 900, "Tower lobby with marble finishes"),
      placeholderImage("proj-meridian-2", 1200, 900, "Curtain wall installation"),
      placeholderImage("proj-meridian-3", 1200, 900, "Rooftop terrace with skyline view"),
      placeholderImage("proj-meridian-4", 1200, 900, "Structural core under construction"),
    ],
    beforeImage: placeholderImage("proj-meridian-before", 1200, 900, "Vacant site before construction"),
    afterImage: placeholderImage("proj-meridian-after", 1200, 900, "Completed tower exterior"),
    overview: [
      { en: "Meridian Financial Tower is a 42-storey Grade-A office development in Baku's emerging financial district, delivered under a design-build contract with an accelerated 34-month programme." },
      { en: "The tower features a high-performance double-skin curtain wall, a column-free floor plate optimised for flexible tenancy, and LEED Gold-targeted building systems." },
    ],
    challenges: [
      { en: "A congested urban site with limited laydown area required just-in-time material logistics." },
      { en: "High seismic zone requirements demanded an advanced structural damping system." },
    ],
    solutions: [
      { en: "We implemented a digital logistics scheduling platform to coordinate over 40 concurrent trade contractors within a constrained footprint." },
      { en: "A tuned mass damper and reinforced core wall system were engineered in collaboration with a specialist seismic consultant." },
    ],
    technologies: ["BIM Level 2", "Tuned Mass Damper", "Digital Twin", "Drone Progress Survey"],
    timeline: [
      { date: { en: "Q1 2021" }, label: { en: "Design development complete" } },
      { date: { en: "Q3 2021" }, label: { en: "Foundations and core commenced" } },
      { date: { en: "Q2 2023" }, label: { en: "Curtain wall completion" } },
      { date: { en: "Q4 2023" }, label: { en: "Practical completion & handover" } },
    ],
    featured: true,
    relatedProjectSlugs: ["port-caspian-logistics-hub", "azure-residences"],
  },
  {
    slug: "port-caspian-logistics-hub",
    title: { en: "Port Caspian Logistics Hub" },
    sector: "industrial",
    location: { en: "Alat, Azerbaijan" },
    client: { en: "Caspian Logistics Authority" },
    area: "210,000 m²",
    completionDate: "2022-06",
    scope: { en: "Design-build, automated logistics and warehousing complex" },
    summary: { en: "A 210,000 m² automated logistics and cross-docking hub supporting the Trans-Caspian trade corridor." },
    heroImage: placeholderImage("proj-port-hero", 1920, 1080, "Aerial view of logistics warehouses"),
    gallery: [
      placeholderImage("proj-port-1", 1200, 900, "Automated racking system"),
      placeholderImage("proj-port-2", 1200, 900, "Loading dock operations"),
      placeholderImage("proj-port-3", 1200, 900, "Steel frame warehouse erection"),
    ],
    overview: [
      { en: "This logistics hub was delivered to support growing freight volumes along the Trans-Caspian International Transport Route, combining automated warehousing with a multimodal rail interchange." },
    ],
    challenges: [
      { en: "Soft coastal soil conditions required extensive ground improvement across the full site footprint." },
    ],
    solutions: [
      { en: "Deep soil mixing and vibro-compaction techniques stabilised the site ahead of foundation works, verified through a continuous geotechnical monitoring programme." },
    ],
    technologies: ["Deep Soil Mixing", "Automated Racking Integration", "BIM 4D Sequencing"],
    timeline: [
      { date: { en: "Q2 2020" }, label: { en: "Ground improvement works" } },
      { date: { en: "Q4 2020" }, label: { en: "Steel structure commenced" } },
      { date: { en: "Q2 2022" }, label: { en: "Facility commissioning" } },
    ],
    featured: true,
    relatedProjectSlugs: ["meridian-financial-tower", "north-ring-highway"],
  },
  {
    slug: "azure-residences",
    title: { en: "Azure Residences" },
    sector: "residential",
    location: { en: "Baku, Azerbaijan" },
    client: { en: "Azure Development Group" },
    area: "56,000 m²",
    completionDate: "2024-03",
    scope: { en: "Construction management, 3-tower luxury residential complex" },
    summary: { en: "A 3-tower, 420-unit luxury residential complex with resort-grade amenities on the Caspian waterfront." },
    heroImage: placeholderImage("proj-azure-hero", 1920, 1080, "Luxury residential towers by the waterfront"),
    gallery: [
      placeholderImage("proj-azure-1", 1200, 900, "Residential lobby interior"),
      placeholderImage("proj-azure-2", 1200, 900, "Rooftop infinity pool"),
      placeholderImage("proj-azure-3", 1200, 900, "Apartment interior finishing"),
    ],
    overview: [
      { en: "Azure Residences comprises three interconnected towers delivering 420 luxury units, a private marina club, spa and rooftop amenity deck." },
    ],
    challenges: [
      { en: "Waterfront construction required careful coastal engineering to manage tidal and erosion risk." },
    ],
    solutions: [
      { en: "A reinforced piled sea wall and integrated drainage system were designed in partnership with a coastal engineering specialist." },
    ],
    technologies: ["Precast Facade Panels", "BIM Coordination", "Smart Home Integration"],
    timeline: [
      { date: { en: "Q3 2021" }, label: { en: "Piling and marine works" } },
      { date: { en: "Q1 2023" }, label: { en: "Topping out, Tower 3" } },
      { date: { en: "Q1 2024" }, label: { en: "First residents move in" } },
    ],
    featured: true,
    relatedProjectSlugs: ["meridian-financial-tower", "grand-caspian-resort"],
  },
  {
    slug: "north-ring-highway",
    title: { en: "North Ring Highway Expansion" },
    sector: "infrastructure",
    location: { en: "Ganja, Azerbaijan" },
    client: { en: "Ministry of Transport" },
    area: "38 km corridor",
    completionDate: "2023-09",
    scope: { en: "EPC, dual-carriageway highway with 4 interchanges" },
    summary: { en: "38 km of dual-carriageway highway with four grade-separated interchanges, cutting regional freight transit time by 40%." },
    heroImage: placeholderImage("proj-highway-hero", 1920, 1080, "Aerial view of a highway interchange"),
    gallery: [
      placeholderImage("proj-highway-1", 1200, 900, "Asphalt paving operation"),
      placeholderImage("proj-highway-2", 1200, 900, "Bridge girder installation"),
      placeholderImage("proj-highway-3", 1200, 900, "Highway lighting at night"),
    ],
    overview: [
      { en: "This EPC highway project delivered 38 km of new dual carriageway and four grade-separated interchanges, forming a critical link in the national freight corridor." },
    ],
    challenges: [
      { en: "The alignment crossed three active rail lines and two protected wetland areas." },
    ],
    solutions: [
      { en: "Purpose-built rail crossings were sequenced around freight windows, and a dedicated environmental monitoring team supervised wetland mitigation works throughout construction." },
    ],
    technologies: ["GPS Machine Control Grading", "Precast Bridge Segments", "Environmental Monitoring Sensors"],
    timeline: [
      { date: { en: "Q1 2021" }, label: { en: "Earthworks commenced" } },
      { date: { en: "Q3 2022" }, label: { en: "First interchange opened" } },
      { date: { en: "Q3 2023" }, label: { en: "Full corridor opened to traffic" } },
    ],
    featured: true,
    relatedProjectSlugs: ["port-caspian-logistics-hub", "unity-general-hospital"],
  },
  {
    slug: "unity-general-hospital",
    title: { en: "Unity General Hospital" },
    sector: "healthcare",
    location: { en: "Sumqayit, Azerbaijan" },
    client: { en: "Ministry of Health" },
    area: "62,000 m²",
    completionDate: "2022-12",
    scope: { en: "Design-build, 450-bed tertiary care hospital" },
    summary: { en: "A 450-bed tertiary care hospital delivered with specialist medical infrastructure and full MEP redundancy." },
    heroImage: placeholderImage("proj-hospital-hero", 1920, 1080, "Modern hospital exterior"),
    gallery: [
      placeholderImage("proj-hospital-1", 1200, 900, "Hospital operating theatre"),
      placeholderImage("proj-hospital-2", 1200, 900, "Patient ward interior"),
      placeholderImage("proj-hospital-3", 1200, 900, "Hospital atrium and reception"),
    ],
    overview: [
      { en: "Unity General Hospital is a 450-bed tertiary care facility featuring 12 operating theatres, a dedicated trauma centre and full N+1 MEP redundancy for critical systems." },
    ],
    challenges: [
      { en: "Medical infrastructure required uninterrupted power and precise environmental controls exceeding standard commercial specifications." },
    ],
    solutions: [
      { en: "A dual-redundant electrical and HVAC system was commissioned with continuous third-party validation against international healthcare facility standards." },
    ],
    technologies: ["N+1 MEP Redundancy", "Medical Gas Systems", "BIM Clinical Coordination"],
    timeline: [
      { date: { en: "Q2 2020" }, label: { en: "Structural works commenced" } },
      { date: { en: "Q4 2021" }, label: { en: "MEP fit-out commenced" } },
      { date: { en: "Q4 2022" }, label: { en: "Facility commissioning & handover" } },
    ],
    featured: false,
    relatedProjectSlugs: ["north-ring-highway", "riverside-academy"],
  },
  {
    slug: "grand-caspian-resort",
    title: { en: "Grand Caspian Resort & Spa" },
    sector: "hospitality",
    location: { en: "Gabala, Azerbaijan" },
    client: { en: "Grand Caspian Hospitality Group" },
    area: "48,000 m²",
    completionDate: "2023-05",
    scope: { en: "Construction management, 5-star resort and conference centre" },
    summary: { en: "A 5-star, 320-key resort and conference centre set within a mountain landscape, built to international hospitality standards." },
    heroImage: placeholderImage("proj-resort-hero", 1920, 1080, "Luxury resort nestled in mountains"),
    gallery: [
      placeholderImage("proj-resort-1", 1200, 900, "Resort pool deck"),
      placeholderImage("proj-resort-2", 1200, 900, "Hotel suite interior"),
      placeholderImage("proj-resort-3", 1200, 900, "Conference centre hall"),
    ],
    overview: [
      { en: "This 320-key resort combines guest accommodation, a destination spa and a 1,200-seat conference centre, built into a sensitive mountain landscape." },
    ],
    challenges: [
      { en: "Steep terrain and limited site access constrained conventional plant and material delivery." },
    ],
    solutions: [
      { en: "A dedicated aerial cableway and staged terracing plan enabled material delivery while minimising environmental disturbance to the surrounding slopes." },
    ],
    technologies: ["Terraced Foundation Engineering", "Modular MEP Skids", "Sustainable Timber Framing"],
    timeline: [
      { date: { en: "Q3 2021" }, label: { en: "Site terracing and access works" } },
      { date: { en: "Q2 2022" }, label: { en: "Guest room towers topped out" } },
      { date: { en: "Q2 2023" }, label: { en: "Grand opening" } },
    ],
    featured: false,
    relatedProjectSlugs: ["azure-residences", "meridian-financial-tower"],
  },
  {
    slug: "state-administrative-complex",
    title: { en: "State Administrative Complex" },
    sector: "government",
    location: { en: "Baku, Azerbaijan" },
    client: { en: "State Property Committee" },
    area: "72,000 m²",
    completionDate: "2021-10",
    scope: { en: "Design-build, government administrative headquarters" },
    summary: { en: "A landmark administrative headquarters consolidating six government agencies into a single, secure, energy-efficient campus." },
    heroImage: placeholderImage("proj-govt-hero", 1920, 1080, "Government administrative building facade"),
    gallery: [
      placeholderImage("proj-govt-1", 1200, 900, "Administrative building atrium"),
      placeholderImage("proj-govt-2", 1200, 900, "Secure entrance pavilion"),
      placeholderImage("proj-govt-3", 1200, 900, "Office floor interior"),
    ],
    overview: [
      { en: "This administrative campus consolidates six previously separate government agencies into a unified, secure headquarters with shared conferencing and public service facilities." },
    ],
    challenges: [
      { en: "Elevated security requirements demanded blast-resistant façade design without compromising the building's civic architectural character." },
    ],
    solutions: [
      { en: "A laminated glazing and reinforced perimeter structure met blast mitigation criteria while preserving the design intent of a transparent, publicly accessible façade." },
    ],
    technologies: ["Blast-Resistant Glazing", "Integrated Security Systems", "BREEAM-Aligned MEP"],
    timeline: [
      { date: { en: "Q1 2019" }, label: { en: "Foundations commenced" } },
      { date: { en: "Q3 2020" }, label: { en: "Façade installation" } },
      { date: { en: "Q4 2021" }, label: { en: "Handover to government agencies" } },
    ],
    featured: false,
    relatedProjectSlugs: ["north-ring-highway", "riverside-academy"],
  },
  {
    slug: "riverside-academy",
    title: { en: "Riverside International Academy" },
    sector: "education",
    location: { en: "Baku, Azerbaijan" },
    client: { en: "Riverside Education Foundation" },
    area: "34,000 m²",
    completionDate: "2022-08",
    scope: { en: "Design-build, K-12 international school campus" },
    summary: { en: "A K-12 international school campus for 1,800 students, featuring dedicated STEM, arts and athletics facilities." },
    heroImage: placeholderImage("proj-academy-hero", 1920, 1080, "Modern school campus exterior"),
    gallery: [
      placeholderImage("proj-academy-1", 1200, 900, "School science laboratory"),
      placeholderImage("proj-academy-2", 1200, 900, "Campus courtyard"),
      placeholderImage("proj-academy-3", 1200, 900, "Indoor sports hall"),
    ],
    overview: [
      { en: "Riverside International Academy is a purpose-built K-12 campus for 1,800 students, including STEM labs, performing arts facilities and a full-size indoor athletics centre." },
    ],
    challenges: [
      { en: "The campus needed to remain partially operational for an existing school population throughout a phased redevelopment." },
    ],
    solutions: [
      { en: "A four-phase construction sequence with dedicated hoarding and pedestrian routing kept existing teaching operations running safely throughout the works." },
    ],
    technologies: ["Phased Live-Campus Sequencing", "Acoustic Engineering", "Natural Ventilation Design"],
    timeline: [
      { date: { en: "Q3 2020" }, label: { en: "Phase 1: Primary wing" } },
      { date: { en: "Q2 2021" }, label: { en: "Phase 2: Secondary wing" } },
      { date: { en: "Q3 2022" }, label: { en: "Full campus handover" } },
    ],
    featured: false,
    relatedProjectSlugs: ["unity-general-hospital", "state-administrative-complex"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: Project): Project[] {
  return project.relatedProjectSlugs
    .map((slug) => getProjectBySlug(slug))
    .filter((p): p is Project => Boolean(p));
}

export function getProjectsBySector(sector: Sector | "all"): Project[] {
  if (sector === "all") return projects;
  return projects.filter((project) => project.sector === sector);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((project) => project.featured);
}
