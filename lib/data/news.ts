import { placeholderImage } from "@/lib/images";
import type { NewsArticle } from "@/lib/types";

export const newsArticles: NewsArticle[] = [
  {
    slug: "meridian-tower-topping-out",
    category: "projects",
    title: { en: "Meridian Financial Tower Reaches Topping-Out Milestone" },
    excerpt: { en: "Baku's tallest new office tower has reached its full structural height, marking a key milestone ahead of a Q4 handover." },
    coverImage: placeholderImage("news-meridian", 1600, 1000, "Topping out ceremony atop a high-rise tower"),
    publishedAt: "2023-06-14",
    readingMinutes: 4,
    author: "Elvin Guliyev",
    authorRole: { en: "Group Communications Director" },
    featured: true,
    body: [
      { en: "Meridian Financial Tower has officially topped out at 42 storeys, marking the completion of the structural frame ahead of the building's targeted Q4 2023 handover." },
      { en: "The milestone was marked with a ceremony attended by the project team, client representatives and city officials, recognising over two years of structural works delivered without a lost-time injury." },
      { en: "Curtain wall installation is now underway, with MEP fit-out and interior works progressing in parallel across the lower 20 floors." },
    ],
  },
  {
    slug: "iso-45001-recertification",
    category: "company",
    title: { en: "Constructivegroup.az Successfully Recertified to ISO 45001" },
    excerpt: { en: "An independent audit has renewed our occupational health and safety certification for a further three-year cycle." },
    coverImage: placeholderImage("news-iso45001", 1600, 1000, "Safety audit team reviewing documentation on site"),
    publishedAt: "2024-02-02",
    readingMinutes: 3,
    author: "Nigar Aliyeva",
    authorRole: { en: "Group HSE Director" },
    featured: true,
    body: [
      { en: "Following a comprehensive independent audit, Constructivegroup.az has been recertified to ISO 45001:2018 for occupational health and safety management." },
      { en: "The audit reviewed safety performance across all active project sites, confirming continued conformance with our zero-harm safety culture and stop-work authority policy." },
    ],
  },
  {
    slug: "trans-caspian-corridor-investment",
    category: "industry",
    title: { en: "Regional Investment in the Trans-Caspian Corridor Set to Double by 2027" },
    excerpt: { en: "New infrastructure spending across the Trans-Caspian trade route is reshaping demand for logistics and industrial construction." },
    coverImage: placeholderImage("news-corridor", 1600, 1000, "Cargo terminal at a Caspian sea port"),
    publishedAt: "2024-05-20",
    readingMinutes: 6,
    author: "Rashad Mammadov",
    authorRole: { en: "Head of Business Development" },
    featured: false,
    body: [
      { en: "Regional governments have announced a coordinated infrastructure investment programme along the Trans-Caspian International Transport Route, with logistics and industrial construction spending forecast to double by 2027." },
      { en: "Constructivegroup.az's Port Caspian Logistics Hub project positions the company at the centre of this growing corridor, with several follow-on opportunities currently in early planning." },
    ],
  },
  {
    slug: "digital-twin-rollout",
    category: "company",
    title: { en: "Digital Twin Technology Now Standard on All Major Projects" },
    excerpt: { en: "Our digital construction division has completed the rollout of digital twin modelling across every active project above $20M." },
    coverImage: placeholderImage("news-digitaltwin", 1600, 1000, "Engineer viewing a digital twin model on a large screen"),
    publishedAt: "2024-03-11",
    readingMinutes: 5,
    author: "Kamran Huseynov",
    authorRole: { en: "Head of Digital Construction" },
    featured: false,
    body: [
      { en: "Following a successful pilot on the Port Caspian Logistics Hub, digital twin modelling is now standard practice across all Constructivegroup.az projects above $20M in contract value." },
      { en: "The technology combines weekly drone surveys, IoT sensor data and BIM models into a single live visualisation, giving clients real-time insight into progress and quality." },
    ],
  },
  {
    slug: "azure-residences-award",
    category: "awards",
    title: { en: "Azure Residences Wins Regional Excellence in Residential Design" },
    excerpt: { en: "The Caspian waterfront development has been recognised at the 2024 Caucasus Construction Excellence Awards." },
    coverImage: placeholderImage("news-award", 1600, 1000, "Awards ceremony stage with trophy"),
    publishedAt: "2024-06-01",
    readingMinutes: 3,
    author: "Elvin Guliyev",
    authorRole: { en: "Group Communications Director" },
    featured: false,
    body: [
      { en: "Azure Residences has been named winner of \"Excellence in Residential Design\" at the 2024 Caucasus Construction Excellence Awards, recognising the project's waterfront engineering and sustainable design features." },
      { en: "The award adds to a growing list of recognitions for the project team, following its LEED Gold pre-certification earlier this year." },
    ],
  },
  {
    slug: "sustainability-report-2023",
    category: "sustainability",
    title: { en: "2023 Sustainability Report: Carbon Intensity Down 18% Group-Wide" },
    excerpt: { en: "Our latest sustainability report shows continued progress toward our 2030 net-zero construction targets." },
    coverImage: placeholderImage("news-sustainability", 1600, 1000, "Solar panels on a construction site office"),
    publishedAt: "2024-04-08",
    readingMinutes: 7,
    author: "Nigar Aliyeva",
    authorRole: { en: "Group HSE Director" },
    featured: false,
    body: [
      { en: "Our 2023 Sustainability Report shows an 18% reduction in group-wide carbon intensity per square metre delivered, driven by low-carbon concrete adoption, site electrification and improved logistics planning." },
      { en: "The report outlines our roadmap toward net-zero construction operations by 2030, including targets for renewable site power and sustainable material sourcing." },
    ],
  },
];

export function getArticleBySlug(slug: string): NewsArticle | undefined {
  return newsArticles.find((article) => article.slug === slug);
}

export function getFeaturedArticle(): NewsArticle | undefined {
  return newsArticles.find((article) => article.featured);
}

export function getRelatedArticles(article: NewsArticle, limit = 3): NewsArticle[] {
  return newsArticles
    .filter((a) => a.slug !== article.slug && a.category === article.category)
    .slice(0, limit);
}
