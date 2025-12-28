import React from "react";
import { Github, Linkedin, X } from "lucide-react";

const Socials: React.FC = () => {
  return (
    <nav
      aria-label="Social links"
      className="fixed left-4 lg:left-6 top-1/2 -translate-y-1/2 z-50 hidden sm:flex"
    >
      <ul className="flex flex-col items-center gap-4">
        <li>
          <a
            href="https://github.com/ashu-dwd"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Raghav on GitHub"
            className="group w-11 h-11 flex items-center justify-center rounded-lg bg-slate-900/70 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300 hover:scale-110"
          >
            <Github
              className="text-slate-200 group-hover:text-white transition-colors duration-300"
              size={20}
              aria-hidden
            />
            <span className="sr-only">GitHub</span>
          </a>
        </li>

        <li>
          <a
            href="https://www.linkedin.com/in/raghavdwd/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Raghav on LinkedIn"
            className="group w-11 h-11 flex items-center justify-center rounded-lg bg-slate-900/70 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300 hover:scale-110"
          >
            <Linkedin
              className="text-slate-200 group-hover:text-white transition-colors duration-300"
              size={20}
              aria-hidden
            />
            <span className="sr-only">LinkedIn</span>
          </a>
        </li>

        <li>
          <a
            href="https://x.com/raghavdwd"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Raghav on X"
            className="group w-11 h-11 flex items-center justify-center rounded-lg bg-slate-900/70 hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-300 hover:scale-110"
          >
            <X
              className="text-slate-200 group-hover:text-white transition-colors duration-300"
              size={20}
              aria-hidden
            />
            <span className="sr-only">X</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Socials;
