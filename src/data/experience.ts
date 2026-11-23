export interface ExperienceEntry {
  company: string;
  role: string;
  location: string;
  period: string;
  current?: boolean;
  subtitle?: string;
  points: string[];
  /** Optional link to a related case study on this site. */
  related?: { label: string; to: string };
}

export const experience: ExperienceEntry[] = [
  {
    company: "Crop2Cash",
    role: "Software Engineering Intern",
    location: "Ibadan, Nigeria",
    period: "August 2026 – Present",
    current: true,
    points: [
      "Built a recipe application with API integration, browsing, search, filtering, sorting, pagination and recipe details using React, TypeScript and Tailwind CSS.",
      "Built an analytics dashboard with dynamic line, pie and grouped bar charts using Recharts to visualise data and statistics.",
      "Implemented TanStack Query and TanStack Store for server-state caching, API requests and shared client-side state.",
    ],
  },
  {
    company: "ShedaHouse",
    role: "Frontend Developer Intern",
    location: "Ibadan, Nigeria",
    period: "January 2026 – March 2026",
    subtitle: "Website & Academy",
    points: [
      "Translated company requirements into the ShedaHouse company website and Academy platform using React and Tailwind CSS, showcasing company services, programmes, courses, team information, contact functionality and reviews.",
    ],
    related: { label: "Read the ShedaHouse case study", to: "/projects/shedahouse-website" },
  },
  {
    company: "Parach ICT Academy",
    role: "Frontend Developer Intern",
    location: "Ibadan, Nigeria",
    period: "March 2025 – May 2025",
    points: [
      "Built a responsive e-commerce website with React and Tailwind CSS, implementing product listings, product cards, categories and user interactions.",
    ],
  },
];
