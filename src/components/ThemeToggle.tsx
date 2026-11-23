import { FaMoon, FaSun } from "react-icons/fa6";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const next = theme === "dark" ? "light" : "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className="inline-flex size-11 items-center justify-center rounded-lg text-muted transition-colors hover:text-accent"
    >
      {theme === "dark" ? <FaSun size={18} aria-hidden="true" /> : <FaMoon size={17} aria-hidden="true" />}
    </button>
  );
}
