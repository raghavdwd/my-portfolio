import React, { useState, useEffect } from "react";
import { PROJECTS } from "../constants";
import { Project } from "../types";

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedProject]);

  const openModal = (project: Project) => {
    setSelectedProject(project);
  };

  const closeModal = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-32 px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 sm:mb-20 gap-6">
          <div className="animate-fade-up">
            <h2 className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
              Portfolio
            </h2>
            <h3 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              Recent Work
            </h3>
          </div>
          <p className="text-slate-400 max-w-sm text-base sm:text-lg leading-relaxed animate-fade-up stagger-1">
            Focusing on scalable architectures and fluid user interactions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {PROJECTS.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => openModal(project)}
              className={`group glass rounded-[32px] overflow-hidden hover:border-emerald-500/40 transition-all duration-700 animate-fade-up cursor-pointer`}
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              {/* Image Area */}
              <div className="relative h-72 overflow-hidden block">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center p-8 backdrop-blur-sm">
                  <div className="text-center transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-emerald-400 font-bold mb-4 text-sm tracking-widest uppercase">
                      Source Code
                    </p>
                    <div className="inline-block px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-500 transition-colors">
                      View Details
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-10">
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full text-[9px] font-bold uppercase tracking-wider text-emerald-400/80"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h4 className="text-2xl font-bold mb-4 group-hover:text-emerald-400 transition-colors">
                  {project.title}
                </h4>

                <p className="text-slate-400 text-base leading-relaxed mb-0 line-clamp-2">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[110] flex items-center justify-center p-6 md:p-12 animate-fade-up transition-all"
          style={{ animationDuration: "0.4s" }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl"
            onClick={closeModal}
          ></div>

          {/* Modal Content */}
          <div className="relative glass w-full max-w-6xl max-h-[90vh] overflow-y-auto rounded-[40px] md:rounded-[60px] border border-white/10 shadow-2xl flex flex-col md:flex-row">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 md:top-10 md:right-10 z-20 w-12 h-12 flex items-center justify-center rounded-full bg-slate-900 border border-white/10 text-white hover:bg-emerald-600 hover:border-emerald-500/50 transition-all active:scale-95 group"
            >
              <svg
                className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Left Column: Image */}
            <div className="w-full md:w-1/2 min-h-[300px] relative">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent md:hidden"></div>
            </div>

            {/* Right Column: Text */}
            <div className="w-full md:w-1/2 p-10 md:p-20 flex flex-col justify-center">
              <div className="mb-10">
                <h2 className="text-emerald-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-6">
                  Project Case Study
                </h2>
                <h3 className="text-4xl md:text-6xl font-bold mb-8 leading-tight tracking-tight">
                  {selectedProject.title}
                </h3>
                <div className="flex flex-wrap gap-3 mb-10">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-emerald-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8">
                  {selectedProject.description}
                </p>
                <div className="h-[1px] w-full bg-white/5 mb-8"></div>
                <p className="text-slate-400 text-base leading-relaxed mb-12">
                  {selectedProject.details ||
                    "More detailed documentation coming soon for this project. Stay tuned for updates on architectural decisions and technical challenges overcome."}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-5">
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-10 py-5 bg-emerald-600 rounded-2xl text-white font-bold text-lg hover:bg-emerald-500 hover:shadow-xl hover:shadow-emerald-900/40 transition-all transform hover:-translate-y-1 active:scale-95"
                >
                  Live Preview
                  <svg
                    className="w-5 h-5 ml-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
                <button className="inline-flex items-center justify-center px-10 py-5 glass border border-white/10 rounded-2xl text-white font-bold text-lg hover:border-emerald-500/30 transition-all">
                  Documentation
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
