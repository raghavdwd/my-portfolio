import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X } from "lucide-react";
import { useTheme } from "./ThemeContext";

export const Navigation: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
        isScrolled || isMobileMenuOpen
          ? "w-[90%] md:w-auto px-6 py-3 rounded-full bg-white/70 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 shadow-lg ring-1 ring-black/5"
          : "w-full md:w-auto px-6 py-6 md:py-3 bg-transparent"
      }`}
    >
      <div
        className={`flex items-center justify-between md:justify-center md:gap-8 ${
          !isScrolled && !isMobileMenuOpen ? "max-w-5xl mx-auto" : ""
        }`}
      >
        <a
          href="#"
          className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors md:hidden"
        >
          RD.
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium px-4 py-2 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100 dark:hover:bg-white/10 transition-all"
            >
              {link.name}
            </a>
          ))}
          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-700 mx-2"></div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 mt-4 mx-auto w-full max-w-sm bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 rounded-2xl p-2 shadow-2xl ring-1 ring-black/5">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium py-3 px-4 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-50 dark:hover:bg-white/5 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};
