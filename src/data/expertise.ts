import type { TechId } from "@/lib/tech";

export interface ExpertiseGroup {
  id: "frontend" | "backend" | "ai";
  title: string;
  /** Honest level label, shown with the group. */
  level: string;
  note: string;
  items: TechId[];
}

export const expertise: ExpertiseGroup[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    level: "Primary focus",
    note: "Where most of my project and internship work has been.",
    items: [
      "react", "javascript", "typescript", "html5", "css3", "tailwind", "vite",
      "reactRouter", "tanstackQuery", "tanstackStore", "recharts",
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    level: "Developing",
    note: "Growing through Django and REST API projects.",
    items: ["python", "django", "drf", "sqlite", "postgresql", "restApi", "postman"],
  },
  {
    id: "ai",
    title: "AI & Computer Vision",
    level: "Exploring",
    note: "Early-stage: academic and programme prototypes.",
    items: ["python", "tensorflow", "yolo", "colab"],
  },
];
