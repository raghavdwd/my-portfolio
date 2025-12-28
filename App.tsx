import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import Socials from "./components/Socials";

const App: React.FC = () => {
  return (
    <div className="relative min-h-screen selection:bg-emerald-500 selection:text-white">
      {/* Dynamic background effect */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/5 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/5 rounded-full blur-[150px]"></div>
      </div>

      <Navbar />

      <main>
        <Hero />

        <div id="about">
          <About />
        </div>

        <div id="projects">
          <Projects />
        </div>

        <div id="skills">
          <Skills />
        </div>

        <div id="experience">
          <Experience />
        </div>

        <section id="contact" className="py-24 sm:py-32 lg:py-40 px-4 sm:px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <h2 className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-6 animate-fade-up">
              Available for projects
            </h2>
            <h3 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-8 sm:mb-12 leading-[0.9] tracking-tighter animate-fade-up stagger-1">
              Let's automate <br /> and ship{" "}
              <span className="text-emerald-500">securely</span>.
            </h3>
            <a
              href="mailto:dwivediji425@gmail.com"
              className="inline-flex items-center px-8 sm:px-14 py-4 sm:py-6 bg-emerald-600 rounded-2xl text-white font-bold text-base sm:text-xl hover:shadow-[0_20px_50px_rgba(16,185,129,0.3)] transition-all transform hover:-translate-y-2 active:scale-95 animate-fade-up stagger-2"
            >
              Get in Touch
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6 ml-3 sm:ml-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </section>
      </main>

      <Socials />

      <Footer />

      <ChatBot />
    </div>
  );
};

export default App;
