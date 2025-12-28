import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="py-20 border-t border-white/5 bg-slate-950">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-4">
              <img
                src="/logo.svg"
                alt="Raghav Dwivedi Logo"
                className="w-8 h-8"
              />
              <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tighter">
                Raghav.dev
              </h2>
            </div>
            <p className="text-slate-500 max-w-xs leading-relaxed">
              Full-stack builds, automation, and security-curious
              experiments—shipped from Debian.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            <a
              href="#"
              aria-label="Raghav on GitHub"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-all text-sm font-bold uppercase tracking-widest"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M12 .5a12 12 0 00-3.8 23.4c.6.1.8-.2.8-.5v-2c-3.3.7-4-1.6-4-1.6-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1 .1 1.6-.8 1.9-1.3-.8-.1-1.6-.4-1.6-1.7 0-.4.1-.8.4-1.1-1.3-.1-2.6-.6-2.6-2.8 0-.6.2-1 .5-1.4-.1-.2-.6-1.3.1-2.7 0 0 .4-.1 1.4.5.4-.1.9-.2 1.4-.2.5 0 1 .1 1.4.2 1-.6 1.4-.5 1.4-.5.7 1.4.2 2.5.1 2.7.4.4.5.9.5 1.4 0 2.2-1.3 2.7-2.6 2.8.4.3.7.8.7 1.6v2.4c0 .3.2.6.8.5A12 12 0 0012 .5z" />
              </svg>
              GitHub
            </a>

            <a
              href="#"
              aria-label="Raghav on X"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-all text-sm font-bold uppercase tracking-widest"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.26 4.26 0 001.88-2.35 8.36 8.36 0 01-2.7 1.03 4.18 4.18 0 00-7.16 3.81A11.85 11.85 0 013 5.16a4.18 4.18 0 001.3 5.58c-.66 0-1.28-.2-1.82-.5v.05c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.14-1.13.14-.27 0-.54-.02-.8-.07.54 1.7 2.11 2.95 3.97 2.98A8.4 8.4 0 012 19.54a11.85 11.85 0 006.29 1.84c7.55 0 11.68-6.26 11.68-11.68v-.53A8.28 8.28 0 0024 5.17a8.12 8.12 0 01-2.34.64 4.14 4.14 0 001.82-2.27z" />
              </svg>
              X
            </a>

            <a
              href="#"
              aria-label="Raghav on LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-all text-sm font-bold uppercase tracking-widest"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden
              >
                <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.22 8h4.56V24H.22zM8.98 8h4.37v2.16h.06c.61-1.15 2.1-2.36 4.32-2.36 4.62 0 5.47 3.04 5.47 6.99V24h-4.56v-7.56c0-1.8-.03-4.12-2.51-4.12-2.51 0-2.89 1.96-2.89 3.99V24H8.98z" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-600 text-[10px] font-bold uppercase tracking-[0.2em]">
          <div>&copy; {new Date().getFullYear()} Raghav • Built on Debian</div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-emerald-500 transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-emerald-500 transition-colors">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
