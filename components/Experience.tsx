import React from "react";
import { EXPERIENCE } from "../constants";

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-32 px-6">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-16 sm:mb-24 animate-fade-up">
          <h2 className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
            Trajectory
          </h2>
          <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
            Professional Journey
          </h3>
        </div>

        <div className="relative space-y-12 sm:space-y-16 lg:space-y-20 before:absolute before:inset-0 before:left-6 sm:before:left-8 md:before:left-1/2 before:-translate-x-px before:h-full before:w-[1px] before:bg-gradient-to-b before:from-transparent before:via-emerald-500/20 before:to-transparent">
          {EXPERIENCE.map((exp, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col md:flex-row items-start md:items-center justify-between md:odd:flex-row-reverse group animate-fade-up`}
              style={{ animationDelay: `${idx * 0.2}s` }}
            >
              {/* Dot */}
              <div className="absolute left-8 md:left-1/2 flex items-center justify-center w-4 h-4 rounded-full border-2 border-emerald-500 bg-slate-950 -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>

              {/* Content */}
              <div className="ml-16 md:ml-0 w-full md:w-[42%] glass p-8 md:p-10 rounded-[40px] group-hover:border-emerald-500/30 transition-all duration-500 transform group-hover:-translate-y-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-2">
                  <span className="font-bold text-2xl tracking-tight">
                    {exp.company}
                  </span>
                  <span className="text-emerald-500 text-[10px] font-black uppercase tracking-[0.2em]">
                    {exp.period}
                  </span>
                </div>
                <div className="text-emerald-400 font-bold text-sm mb-6 bg-emerald-400/10 inline-block px-3 py-1 rounded-lg">
                  {exp.role}
                </div>
                <ul className="space-y-4 text-slate-400 leading-relaxed">
                  {exp.description.map((item, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="mr-3 text-emerald-500/50 mt-1">
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="12" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
