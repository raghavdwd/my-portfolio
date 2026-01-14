import React, { Suspense, lazy } from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "./components/ThemeContext";
import { Navigation } from "./components/Navigation";
import { TextRoller } from "./components/TextRoller";
import { RESUME_DATA } from "./constants";
import {
  Card,
  SectionTitle,
  SkillCard,
} from "./components/UIComponents";
import { AnimatedSection } from "./components/AnimatedSection";
import { Mail, MapPin, Github, Linkedin } from "lucide-react";

const GithubActivity = lazy(() =>
  import("./components/GithubActivity").then((m) => ({ default: m.GithubActivity }))
);

const App: React.FC = () => {
  const allSkills = [
    ...RESUME_DATA.skills.languages,
    ...RESUME_DATA.skills.frontend,
    ...RESUME_DATA.skills.backend,
    ...RESUME_DATA.skills.tools,
  ];

  const roles = [
    RESUME_DATA.role,
    "Backend Specialist",
    "Open Source Enthusiast",
  ];

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navigation />

        <main className="max-w-2xl mx-auto px-6 pt-28 pb-16 space-y-16">
          <motion.section
            id="about"
            className="flex flex-col-reverse md:flex-row items-center md:items-start gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {RESUME_DATA.name}
                </h1>
                <div className="text-lg text-zinc-500 dark:text-zinc-400 flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-1.5">
                  <span>I'm a</span>
                  <TextRoller
                    words={roles}
                    className="text-zinc-900 dark:text-white font-medium"
                  />
                </div>
              </div>

              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-base max-w-lg">
                {RESUME_DATA.summary}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-zinc-500 dark:text-zinc-400 pt-1">
                <a
                  href={`mailto:${RESUME_DATA.email}`}
                  className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <Mail size={14} /> Email
                </a>
                <a
                  href={RESUME_DATA.socials.find((s) => s.platform === "GitHub")?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <Github size={14} /> GitHub
                </a>
                <a
                  href={RESUME_DATA.socials.find((s) => s.platform === "LinkedIn")?.url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  <Linkedin size={14} /> LinkedIn
                </a>
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} /> {RESUME_DATA.location.split(",")[0]}
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <img
                src="https://github.com/raghavdwd.png"
                alt={RESUME_DATA.name}
                loading="lazy"
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
              />
            </div>
          </motion.section>

          <section>
            <SectionTitle>GitHub Activity</SectionTitle>
            <Suspense
              fallback={
                <div className="h-32 bg-zinc-100 dark:bg-zinc-900 rounded-lg animate-pulse" />
              }
            >
              <GithubActivity />
            </Suspense>
          </section>

          <AnimatedSection>
            <SectionTitle>Skills</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {allSkills.map((skill) => (
                <SkillCard key={skill} name={skill.replace(" (Strong)", "")} />
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection id="experience">
            <SectionTitle>Experience</SectionTitle>
            <div className="space-y-8">
              {RESUME_DATA.experience.map((job, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="text-base font-semibold text-zinc-900 dark:text-white">
                      {job.role}
                    </h3>
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {job.startDate} – {job.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {job.company} · {job.location}
                  </p>
                  <ul className="space-y-1.5 text-sm text-zinc-600 dark:text-zinc-400">
                    {job.points.map((point, idx) => (
                      <li key={idx} className="leading-relaxed">
                        • {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection id="projects">
            <SectionTitle>Projects</SectionTitle>
            <div className="grid gap-4">
              {RESUME_DATA.projects.map((project, index) => (
                <Card key={index} className="group">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-zinc-900 dark:text-white">
                      {project.title}
                    </h3>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
                      >
                        <Github size={16} />
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <SectionTitle>Achievements</SectionTitle>
            <div className="space-y-4">
              {RESUME_DATA.achievements.map((ach, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    {ach.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {ach.description}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection>
            <SectionTitle>Education</SectionTitle>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">
                  {RESUME_DATA.education.degree}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">
                  {RESUME_DATA.education.institution}
                </p>
              </div>
              <span className="text-sm text-zinc-500">
                {RESUME_DATA.education.year}
              </span>
            </div>
          </AnimatedSection>

          <section id="contact" className="text-center space-y-4 pt-8">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
              Get in Touch
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 max-w-sm mx-auto">
              Feel free to reach out for collaborations or just a friendly hello.
            </p>
            <div className="flex justify-center gap-3">
              <a
                href={`mailto:${RESUME_DATA.email}`}
                className="px-5 py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium hover:opacity-90 transition-opacity"
              >
                Email Me
              </a>
              <a
                href={RESUME_DATA.socials.find((s) => s.platform === "GitHub")?.url}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2 rounded-lg border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors"
              >
                GitHub
              </a>
            </div>
          </section>

          <footer className="flex justify-between items-center text-xs text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 pt-8">
            <p>© {new Date().getFullYear()} Raghvendra Dwivedi</p>
            <p>Built with React & Tailwind</p>
          </footer>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
