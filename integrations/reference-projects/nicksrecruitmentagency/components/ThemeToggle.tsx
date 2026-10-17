"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const STORAGE_KEY = "nra-theme";

function applyTheme(theme: "light" | "dark") {
  const root = document.documentElement;
  if (theme === "dark") root.classList.add("dark");
  else root.classList.remove("dark");
}

export default function ThemeToggle() {
  // Start undefined so we don't render a flipped icon before we've read
  // the real preference on mount (matches the inline anti-flash script
  // in app/layout.tsx, which already set the class on <html>).
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  useEffect(() => {
    const current = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setTheme(current);
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }

  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-navy-900/10 bg-white text-navy-700 transition hover:border-gold-400 hover:text-navy-900 dark:border-white/10 dark:bg-navy-900 dark:text-sand-200 dark:hover:text-white"
    >
      {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
    </button>
  );
}
