import React from "react";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeContext";

export const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-sm border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
        <a
          href="#"
          className="font-semibold text-zinc-900 dark:text-white"
        >
          RD
        </a>
        <div className="flex items-center gap-6">
          <a
            href="#experience"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors hidden sm:block"
          >
            Experience
          </a>
          <a
            href="#projects"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors hidden sm:block"
          >
            Projects
          </a>
          <a
            href="#contact"
            className="text-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors hidden sm:block"
          >
            Contact
          </a>
          <a
            href="https://drive.google.com/file/d/1lcDZVNte8_ETJU4VxP2XS_5ON5O-zM-E/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium text-zinc-900 dark:text-white px-3 py-1.5 rounded-md border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            Résumé
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </div>
      </div>
    </nav>
  );
};
