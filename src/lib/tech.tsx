import type { CSSProperties } from "react";
import type { IconType } from "react-icons";
import {
  SiCss, SiDjango, SiGooglecolab, SiHtml5, SiJavascript, SiPostgresql, SiPostman,
  SiPython, SiReact, SiReactquery, SiReactrouter, SiReacthookform, SiSqlite,
  SiTailwindcss, SiTanstack, SiTensorflow, SiTypescript, SiUltralytics, SiVite,
  SiWhatsapp, SiZod,
} from "react-icons/si";
import { FaChartLine, FaDatabase, FaLayerGroup, FaPlug } from "react-icons/fa6";

/**
 * One registry for every technology shown anywhere on the site.
 * - `color` is the brand colour. `colorDark` is used on the dark theme where the
 *   official colour would be too dim against navy (Django, SQLite).
 * - Recharts, Zustand, IndexedDB, REST APIs and Django REST Framework have no
 *   logo in the icon set, so they use a neutral glyph rather than a made-up logo.
 */
export type TechId =
  | "react" | "typescript" | "javascript" | "html5" | "css3" | "tailwind" | "vite"
  | "reactRouter" | "tanstackQuery" | "tanstackStore" | "recharts" | "reactHookForm"
  | "zod" | "zustand" | "indexedDb" | "python" | "django" | "drf" | "sqlite"
  | "postgresql" | "restApi" | "postman" | "whatsapp" | "tensorflow" | "yolo" | "colab";

interface Tech { name: string; icon: IconType; color: string; colorDark?: string }

export const TECH: Record<TechId, Tech> = {
  react: { name: "React", icon: SiReact, color: "#149ECA", colorDark: "#61DAFB" },
  typescript: { name: "TypeScript", icon: SiTypescript, color: "#3178C6", colorDark: "#4B94E8" },
  javascript: { name: "JavaScript", icon: SiJavascript, color: "#D4B900", colorDark: "#F7DF1E" },
  html5: { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
  css3: { name: "CSS3", icon: SiCss, color: "#1572B6", colorDark: "#3B9AE8" },
  tailwind: { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  vite: { name: "Vite", icon: SiVite, color: "#646CFF" },
  reactRouter: { name: "React Router", icon: SiReactrouter, color: "#CA4245" },
  tanstackQuery: { name: "TanStack Query", icon: SiReactquery, color: "#FF4154" },
  tanstackStore: { name: "TanStack Store", icon: SiTanstack, color: "#5B6B85", colorDark: "#9FB0CC" },
  recharts: { name: "Recharts", icon: FaChartLine, color: "#22A6B3" },
  reactHookForm: { name: "React Hook Form", icon: SiReacthookform, color: "#EC5990" },
  zod: { name: "Zod", icon: SiZod, color: "#3E67B1", colorDark: "#6B94E0" },
  zustand: { name: "Zustand", icon: FaLayerGroup, color: "#8A6A4F", colorDark: "#C9A98A" },
  indexedDb: { name: "IndexedDB", icon: FaDatabase, color: "#5B6B85", colorDark: "#9FB0CC" },
  python: { name: "Python", icon: SiPython, color: "#3776AB", colorDark: "#5B9BD5" },
  django: { name: "Django", icon: SiDjango, color: "#0C4B33", colorDark: "#44B78B" },
  drf: { name: "Django REST Framework", icon: FaPlug, color: "#A32B2B", colorDark: "#E06C6C" },
  sqlite: { name: "SQLite", icon: SiSqlite, color: "#0F80CC" },
  postgresql: { name: "PostgreSQL", icon: SiPostgresql, color: "#336791", colorDark: "#5B9BD5" },
  restApi: { name: "REST APIs", icon: FaPlug, color: "#5B6B85", colorDark: "#9FB0CC" },
  postman: { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  whatsapp: { name: "WhatsApp API", icon: SiWhatsapp, color: "#1FA855", colorDark: "#25D366" },
  tensorflow: { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  yolo: { name: "YOLO / Ultralytics", icon: SiUltralytics, color: "#4F46E5", colorDark: "#8F8AFF" },
  colab: { name: "Google Colab", icon: SiGooglecolab, color: "#E8710A", colorDark: "#F9AB00" },
};

export function TechIcon({ id, size = 20 }: { id: TechId; size?: number }) {
  const t = TECH[id];
  const style = { "--tc": t.color, "--tc-dark": t.colorDark ?? t.color } as CSSProperties;
  const Icon = t.icon;
  return (
    <span className="tech-icon" style={style}>
      <Icon size={size} aria-hidden="true" focusable="false" />
    </span>
  );
}

/** Icon + visible name, used in project rows and case studies. */
export function TechLabel({ id }: { id: TechId }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm text-muted">
      <TechIcon id={id} size={16} />
      {TECH[id].name}
    </span>
  );
}
