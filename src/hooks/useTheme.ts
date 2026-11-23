import { useCallback, useEffect, useState } from "react";

type Theme = "light" | "dark";
const KEY = "theme";

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.style.colorScheme = theme;
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", theme === "dark" ? "#0A0E24" : "#FAF8F4");
}

/**
 * The first theme is chosen by the inline script in index.html (saved choice,
 * else the OS preference). This hook just reads the result, lets the user flip
 * it, remembers an explicit choice, and keeps following the OS until they do.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light",
  );

  const toggle = useCallback(() => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    apply(next);
    setTheme(next);
    try { localStorage.setItem(KEY, next); } catch { /* storage unavailable: still works for this visit */ }
  }, [theme]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (e: MediaQueryListEvent) => {
      try { if (localStorage.getItem(KEY)) return; } catch { /* ignore */ }
      const next: Theme = e.matches ? "dark" : "light";
      apply(next);
      setTheme(next);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return { theme, toggle };
}
