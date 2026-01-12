import React from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "./components/ThemeContext";
import { Navigation } from "./components/Navigation";
import { GithubActivity } from "./components/GithubActivity";
import { TextRoller } from "./components/TextRoller";
import { RESUME_DATA } from "./constants";
import {
  Badge,
  Card,
  SectionTitle,
  SkillCard,
} from "./components/UIComponents";
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
} from "./components/AnimatedSection";
import { AnimatedBadge, FloatingElement } from "./components/AnimatedCard";
import {
  Mail,
  MapPin,
  Github,
  Globe,
  Server,
  Zap,
  Smartphone,
  Terminal,
  Linkedin,
  Twitter,
  Cloud,
} from "lucide-react";

// Icon mapping for skills
const skillIcons: Record<string, string | React.ReactNode> = {
  // Languages
  "JavaScript (Strong)":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  TypeScript:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  Python:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg",
  "C++":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  PHP: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",

  // Frontend
  "React.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Next.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "HTML/CSS":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  "Tailwind CSS":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  "Responsive Design": <Smartphone size={20} />,

  // Backend
  "Node.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Express.js":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  "REST APIs": <Globe size={20} />,
  WebSockets: <Zap size={20} />,
  "Real-time Systems": <Server size={20} />,

  // Tools
  MongoDB:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  MySQL:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
  "Git/GitHub":
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  Linux:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg",
  AWS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg",
  Docker:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
  Prisma:
    "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg",
  Excloud: <Cloud size={20} />,
};

const getSkillIcon = (skillName: string) => {
  return skillIcons[skillName] || <Terminal size={20} />;
};

const App: React.FC = () => {
  // Combine all skills for a unified view
  const allSkills = [
    ...RESUME_DATA.skills.languages,
    ...RESUME_DATA.skills.frontend,
    ...RESUME_DATA.skills.backend,
    ...RESUME_DATA.skills.tools,
  ];

  const roles = [
    RESUME_DATA.role,
    "Backend Specialist",
    "Cybersecurity Student",
    "Open Source Enthusiast",
    "Technical Blogger",
  ];

  return (
    <ThemeProvider>
      <div className="min-h-screen">
        <Navigation />

        <main className="max-w-3xl mx-auto px-6 pt-24 pb-16 space-y-20">
          {/* Hero Section */}
          <motion.section
            id="about"
            className="flex flex-col-reverse md:flex-row items-center md:items-start gap-8 pt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            <div className="flex-1 space-y-5 text-center md:text-left">
              <div className="space-y-2">
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {RESUME_DATA.name}
                </h1>
                <div className="text-xl text-slate-600 dark:text-slate-400 font-medium flex flex-col md:flex-row items-center md:items-start justify-center md:justify-start gap-2">
                  <span>I'm a</span>
                  <TextRoller
                    words={roles}
                    className="text-primary-600 dark:text-primary-400 font-bold"
                  />
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-base md:text-lg max-w-xl mx-auto md:mx-0">
                {RESUME_DATA.summary}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm text-slate-600 dark:text-slate-400 pt-2">
                <a
                  href={`mailto:${RESUME_DATA.email}`}
                  className="flex items-center gap-1.5 hover:text-primary-500 transition-colors"
                >
                  <Mail size={15} /> {RESUME_DATA.email}
                </a>
                <span className="hidden md:inline text-zinc-300 dark:text-zinc-700">
                  •
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={15} /> {RESUME_DATA.location}
                </span>
                <span className="hidden md:inline text-zinc-300 dark:text-zinc-700">
                  •
                </span>
                <a
                  href={
                    RESUME_DATA.socials.find((s) => s.platform === "GitHub")
                      ?.url
                  }
                  className="flex items-center gap-1.5 hover:text-primary-500 transition-colors"
                >
                  <Github size={15} /> GitHub
                </a>
                <span className="hidden md:inline text-zinc-300 dark:text-zinc-700">
                  •
                </span>
                <a
                  href={
                    RESUME_DATA.socials.find((s) => s.platform === "LinkedIn")
                      ?.url
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary-500 transition-colors"
                >
                  <Linkedin size={15} /> LinkedIn
                </a>
                <span className="hidden md:inline text-zinc-300 dark:text-zinc-700">
                  •
                </span>
                <a
                  href={
                    RESUME_DATA.socials.find((s) => s.platform === "X")?.url
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1.5 hover:text-primary-500 transition-colors"
                >
                  <Twitter size={15} /> X
                </a>
              </div>

              <div className="pt-2">
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  Open to Work
                </div>
              </div>
            </div>

            <FloatingElement className="shrink-0 relative">
              <div className="absolute inset-0 bg-primary-500/5 dark:bg-primary-500/10 rounded-full blur-3xl animate-pulse-glow"></div>
              <img
                src="https://github.com/raghavdwd.png"
                alt={RESUME_DATA.name}
                className="relative w-32 h-32 md:w-40 md:h-40 rounded-full shadow-2xl object-cover ring-1 ring-zinc-100 dark:ring-zinc-800"
              />
            </FloatingElement>
          </motion.section>

          {/* GitHub Activity Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <SectionTitle>GitHub Activity</SectionTitle>
              <a
                href="https://github.com/raghavdwd"
                target="_blank"
                rel="noreferrer"
                className="hidden md:flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-primary-500 transition-colors uppercase tracking-wider"
              >
                <Github size={14} />
                Follow on GitHub
              </a>
            </div>
            <GithubActivity />
          </section>

          {/* Skills Section */}
          <AnimatedSection delay={0.1}>
            <SectionTitle>Skills & Tools</SectionTitle>
            <StaggerContainer
              className="flex flex-wrap gap-3"
              staggerDelay={0.05}
            >
              {allSkills.map((skill, index) => (
                <StaggerItem key={skill}>
                  <SkillCard
                    name={skill.replace(" (Strong)", "")}
                    icon={getSkillIcon(skill)}
                  />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatedSection>

          {/* Experience Section */}
          <AnimatedSection id="experience" delay={0.15} direction="left">
            <SectionTitle>Work Experience</SectionTitle>
            <div className="space-y-8">
              {RESUME_DATA.experience.map((job, index) => (
                <div
                  key={index}
                  className="group relative pl-8 border-l-2 border-slate-200 dark:border-slate-800 transition-colors hover:border-slate-300 dark:hover:border-slate-700"
                >
                  <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-4 border-white dark:border-zinc-950 bg-zinc-300 dark:bg-zinc-700 group-hover:bg-primary-500 transition-colors"></div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                      {job.role}
                    </h3>
                    <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2 py-1 rounded">
                      {job.startDate} – {job.endDate}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-4">
                    <span>{job.company}</span>
                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                    <span className="text-zinc-500">{job.location}</span>
                  </div>

                  <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {job.points.map((point, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-zinc-400 flex-shrink-0"></span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* Projects Section */}
          <AnimatedSection id="projects" delay={0.1} direction="up">
            <SectionTitle>Featured Projects</SectionTitle>
            <StaggerContainer
              className="grid md:grid-cols-2 gap-4"
              staggerDelay={0.1}
            >
              {RESUME_DATA.projects.map((project, index) => (
                <StaggerItem key={index}>
                  <Card className="flex flex-col h-full group border hover:border-primary-500/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-primary-500 transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex gap-2">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                          >
                            <Github size={18} />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2">
                      {project.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="text-[10px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatedSection>

          {/* Achievements Section */}
          <AnimatedSection delay={0.1} direction="right">
            <SectionTitle>Achievements</SectionTitle>
            <StaggerContainer className="space-y-4" staggerDelay={0.1}>
              {RESUME_DATA.achievements.map((ach, index) => (
                <StaggerItem key={index}>
                  <div className="flex gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800">
                    <div className="shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400">
                        <span className="text-xs font-bold">🏆</span>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                        {ach.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {ach.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </AnimatedSection>

          {/* Education Section */}
          <AnimatedSection delay={0.1} direction="scale">
            <SectionTitle>Education</SectionTitle>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-6 bg-zinc-50 dark:bg-zinc-900/30 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <div>
                <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                  {RESUME_DATA.education.degree}
                </h3>
                <p className="text-sm text-primary-600 dark:text-primary-400 font-medium mt-1">
                  {RESUME_DATA.education.institution}
                </p>
              </div>
              <span className="text-sm font-mono text-zinc-500 mt-2 sm:mt-0 bg-white dark:bg-zinc-950 px-2 py-1 rounded border border-zinc-200 dark:border-zinc-800">
                {RESUME_DATA.education.year}
              </span>
            </div>
          </AnimatedSection>

          {/* Contact Section */}
          <section id="contact" className="pb-10">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Get in Touch
              </h2>
              <p className="text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                Feel free to reach out for collaborations or just a friendly
                hello.
              </p>
              <div className="flex justify-center gap-4 pt-2">
                <a
                  href={`mailto:${RESUME_DATA.email}`}
                  className="px-6 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Email Me
                </a>
                <a
                  href={
                    RESUME_DATA.socials.find((s) => s.platform === "GitHub")
                      ?.url
                  }
                  target="_blank"
                  rel="noreferrer"
                  className="px-6 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 border-t border-slate-200 dark:border-slate-800 pt-8 pb-8 animate-slide-in-bottom delay-700">
            <p>© {new Date().getFullYear()} Raghavendra Dwivedi</p>
            <p>Built with React & Tailwind</p>
          </footer>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
