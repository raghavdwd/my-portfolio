import React from "react";

const Hero: React.FC = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 px-6 relative overflow-hidden"
    >
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[120px]"></div>

      <div className="container mx-auto text-center relative z-10">
        <div className="inline-block px-4 py-1.5 mb-8 rounded-full glass border border-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase tracking-[0.2em] animate-fade-up">
          Raghav • Builder on Debian
        </div>
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-bold mb-6 sm:mb-8 tracking-tighter animate-fade-up stagger-1 leading-[0.9]">
          Full-Stack
          <br className="hidden sm:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-emerald-300 via-emerald-500 to-cyan-500">
            Automation Hacker
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-slate-400 mb-8 sm:mb-12 leading-relaxed animate-fade-up stagger-2 px-4 sm:px-0">
          I learn by shipping. React + Next.js fronts, Express APIs with guards,
          cron-driven ops, and security-curious experiments, all running on a
          Debian stack.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 animate-fade-up stagger-3">
          <a
            href="#projects"
            className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all transform hover:-translate-y-1 shadow-2xl shadow-emerald-600/20"
          >
            Explore Work
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-10 py-4 rounded-2xl glass border border-white/10 hover:border-emerald-500/30 text-white font-bold transition-all"
          >
            Start Conversation
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
          <div className="w-5 h-8 rounded-full border border-slate-700 flex justify-center p-1.5">
            <div className="w-1 h-1 rounded-full bg-emerald-400"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
