import React, { useState, useEffect, useRef } from "react";
import { SKILLS } from "../constants";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

const Skills: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const radarData = SKILLS.slice(0, 6).map((s) => ({
    subject: s.name,
    A: s.level,
    fullMark: 100,
  }));
  const categories: ("Frontend" | "Backend" | "Design" | "Tools")[] = [
    "Frontend",
    "Backend",
    "Design",
    "Tools",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-32 px-6 bg-slate-900/20 border-y border-white/5"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20 items-start">
          <div className="animate-fade-up">
            <h2 className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
              Capabilities
            </h2>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-8 sm:mb-10 tracking-tight">
              Technical Stack
            </h3>
            <p className="text-slate-400 text-lg sm:text-xl mb-8 sm:mb-12 leading-relaxed">
              Curating the best tools to deliver{" "}
              <span className="text-emerald-400">seamless</span> and{" "}
              <span className="text-cyan-400">performant</span> digital products
              across the entire stack.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-8 sm:gap-y-10">
              {categories.map((cat) => (
                <div key={cat} className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-[1px] w-6 bg-emerald-500/50"></div>
                    <h4 className="text-xs font-black text-slate-200 uppercase tracking-[0.2em]">
                      {cat}
                    </h4>
                  </div>
                  <div className="space-y-5">
                    {SKILLS.filter((s) => s.category === cat).map((skill) => (
                      <div key={skill.name} className="space-y-2 group">
                        <div className="flex justify-between items-end">
                          <span className="text-sm font-semibold text-slate-300 group-hover:text-emerald-400 transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-bold">
                            {skill.level}%
                          </span>
                        </div>
                        <div className="w-full h-[3px] bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-600 to-cyan-500 transition-all duration-1000 ease-out"
                            style={{
                              width: isVisible ? `${skill.level}%` : "0%",
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sticky top-32 h-[500px] glass rounded-[60px] p-12 flex items-center justify-center relative overflow-hidden animate-fade-up stagger-2">
            <div className="absolute inset-0 bg-emerald-600/5 blur-[100px]"></div>
            <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500/40">
                Core Competency Matrix
              </span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.05)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: "#64748b", fontSize: 11, fontWeight: 700 }}
                />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
