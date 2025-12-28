import React from "react";
import { BIO_INFO } from "../constants";

const About: React.FC = () => {
  return (
    <section id="about" className="py-32 px-6 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          {/* Image Column */}
          <div className="relative group animate-fade-up order-2 lg:order-1">
            <div className="relative z-10 rounded-[30px] sm:rounded-[40px] overflow-hidden border border-white/10 glass p-2 transform transition-transform duration-700 group-hover:scale-[1.02]">
              <img
                src="/my-image.png"
                alt="Raghav Dwivedi - Full-Stack Developer and Automation Hacker"
                className="w-full aspect-[4/5] object-cover rounded-[24px] sm:rounded-[32px] grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -bottom-4 sm:-bottom-6 -right-4 sm:-right-6 w-24 h-24 sm:w-32 sm:h-32 bg-emerald-600/20 rounded-full blur-2xl group-hover:bg-emerald-500/30 transition-colors"></div>
            <div className="absolute -top-4 sm:-top-6 -left-4 sm:-left-6 w-24 h-24 sm:w-32 sm:h-32 bg-cyan-600/20 rounded-full blur-2xl group-hover:bg-cyan-500/30 transition-colors"></div>

            {/* Experience badge */}
            <div className="absolute bottom-6 sm:bottom-10 -left-4 sm:-left-6 glass border border-emerald-500/20 px-4 sm:px-6 py-3 sm:py-4 rounded-2xl shadow-xl z-20 animate-bounce">
              <span className="block text-xl sm:text-2xl font-bold text-emerald-400">
                3+
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                Years Building
              </span>
            </div>
          </div>

          {/* Text Column */}
          <div className="animate-fade-up stagger-1 order-1 lg:order-2">
            <h2 className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
              Raghav • Builder
            </h2>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 sm:mb-8 tracking-tight">
              Behind the Code
            </h3>

            <div className="space-y-4 sm:space-y-6 text-slate-400 text-base sm:text-lg leading-relaxed">
              <p className="first-letter:text-4xl sm:first-letter:text-5xl first-letter:font-bold first-letter:text-emerald-500 first-letter:mr-2 sm:first-letter:mr-3 first-letter:float-left">
                {BIO_INFO.split("\n").filter((p) => p.trim() !== "")[0]}
              </p>
              {BIO_INFO.split("\n")
                .filter((p) => p.trim() !== "")
                .slice(1)
                .map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
            </div>

            <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/5 pt-12">
              <div>
                <span className="block text-emerald-400 font-bold text-xl mb-1">
                  Creative
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">
                  Design Focused
                </span>
              </div>
              <div>
                <span className="block text-cyan-400 font-bold text-xl mb-1">
                  Logical
                </span>
                <span className="text-xs text-slate-500 uppercase tracking-widest font-medium">
                  Problem Solver
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
