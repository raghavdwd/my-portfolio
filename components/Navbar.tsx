import React, { useState, useEffect } from "react";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    "Home",
    "About",
    "Projects",
    "Skills",
    "Experience",
    "Contact",
  ];

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    const targetId = id.toLowerCase();
    const element = document.getElementById(targetId);

    if (element) {
      // Offset for fixed navbar
      const navbarHeight = scrolled ? 70 : 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      // Update URL hash without jumping
      window.history.pushState(null, "", `#${targetId}`);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 sm:py-4 glass border-b border-emerald-500/10"
          : "py-4 sm:py-6 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        <a
          href="#home"
          onClick={(e) => scrollToSection(e, "home")}
          className="flex items-center space-x-3 group"
        >
          <img
            src="/logo.svg"
            alt="Raghav Dwivedi Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 transition-transform group-hover:scale-110"
          />
          <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tighter">
            Raghav.dev
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={(e) => scrollToSection(e, item)}
              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-emerald-400 transition-all rounded-lg hover:bg-emerald-500/5"
            >
              {item}
            </a>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-emerald-500/10 transition-colors"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6 text-slate-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Desktop Contact Button */}
        <a
          href="#contact"
          onClick={(e) => scrollToSection(e, "contact")}
          className="hidden md:inline-flex px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-bold transition-all shadow-lg shadow-emerald-900/20 active:scale-95"
        >
          Contact
        </a>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass border-b border-emerald-500/10 animate-fade-up">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => {
                    scrollToSection(e, item);
                    setIsMenuOpen(false);
                  }}
                  className="px-4 py-3 text-base font-medium text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/5 rounded-lg transition-all"
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => {
                  scrollToSection(e, "contact");
                  setIsMenuOpen(false);
                }}
                className="px-4 py-3 mt-2 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-all text-center"
              >
                Contact
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
