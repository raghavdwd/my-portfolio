import { Project, Skill, Experience } from "./types";

export const PROJECTS: Project[] = [
  {
    id: "1",
    title: "Private Chat",
    description:
      "A secure, real-time private chat application built with modern web technologies. Create anonymous chat rooms with end-to-end privacy and instant messaging capabilities.",
    details: "",
    image: "/private-chat.png",
    tags: [
      "Next.js",
      "Elysia (API)",
      "Prisma",
      "PostgreSQL",
      "Tailwind",
      "Redis",
    ],
    link: "https://private-chat-v0.vercel.app/",
  },
  {
    id: "2",
    title: "SpeakEz",
    description:
      "The revolutionary language learning platform where you can literally have conversations with AI characters. Because apparently, we've reached peak civilization where talking to imaginary AI friends is not only acceptable, it's educational.",
    details: "",
    image: "/speak-ez.png",
    tags: [
      "React",
      "Node.js",
      "Express",
      "Generative AI",
      "Prisma",
      "PostgreSQL",
      "Tailwind",
    ],
    link: "https://speak-ez-team-web.vercel.app/",
  },
  {
    id: "3",
    title: "Repo of the Day",
    description:
      "Repo of the Day is your friendly bot/service that finds & shares awesome public GitHub repositories. It fetches, analyzes, and serves up a daily dose of the best repos—using AI and good old human curation. Great for devs who want to expand their horizons or just need a spark of inspiration.",
    details: "",
    image: "https://picsum.photos/1200/800?random=13",
    tags: ["Express", "Cronjobs", "JWT", "Nodemailer", "Generative AI"],
    link: "#",
  },
];

export const SKILLS: Skill[] = [
  { name: "React", level: 94, category: "Frontend" },
  { name: "Next.js (App Router)", level: 91, category: "Frontend" },
  { name: "Tailwind CSS", level: 95, category: "Frontend" },
  { name: "shadcn/ui", level: 86, category: "Frontend" },
  { name: "Node.js", level: 92, category: "Backend" },
  { name: "Express (middleware/auth)", level: 90, category: "Backend" },
  { name: "REST API design", level: 89, category: "Backend" },
  { name: "Cron jobs & workers", level: 88, category: "Backend" },
  { name: "MongoDB + Mongoose", level: 90, category: "Tools" },
  { name: "PostgreSQL/MySQL", level: 88, category: "Tools" },
  { name: "Prisma ORM", level: 91, category: "Tools" },
  { name: "Sequelize", level: 82, category: "Tools" },
  { name: "Docker on Debian", level: 80, category: "Tools" },
  { name: "Git + CI", level: 94, category: "Tools" },
  { name: "Clean UI systems", level: 84, category: "Design" },
];

export const EXPERIENCE: Experience[] = [
  {
    company: "CANGRA TALENTS",
    role: "AI Engineer & MERN Developer",
    period: "Apr 2025 - Present",
    description: [
      "Building automation systems and internal tools to streamline HR workflows.",
      "Developing bots and dashboards that reduce manual tasks and provide insights from hiring data.",
    ],
  },
  {
    company: "CANGRA TALENTS",
    role: "Technical Blogger",
    period: "Aug 2024 - Apr 2025",
    description: [
      "Writing engineering and security-focused blog posts for the company.",
      "Contributing technical content to build brand authority and share knowledge.",
    ],
  },
  {
    company: "Independent Builder",
    role: "Full-Stack Developer",
    period: "2023 - Present",
    description: [
      "Ship MVPs fast with React, Next.js (App Router), and Tailwind + shadcn/ui.",
      "Design secure REST APIs with Express middleware, JWT auth guards, and structured error handling.",
      "Automate cron-driven workflows: backups, alerting, and data syncs across MongoDB/MySQL.",
    ],
  },
];

export const BIO_INFO = `
I am Raghav, a computer science student obsessed with building and shipping. Debian is home base, terminals stay open, and I learn by wiring ideas into running code.
I mix React, Next.js (App Router), Tailwind, and shadcn/ui on the front, with Node.js + Express APIs guarded by middleware, JWT, and clean error handling.
Databases are split-brain by design: MongoDB + Mongoose for speed, PostgreSQL/MySQL with Prisma or Sequelize for structure. Cron jobs keep backups, alerts, and syncs healthy.
Security-curious, automation-heavy, full-stack by necessity, always iterating on small, real projects like Packet Patrol, CronCraft, and Secure Forms Kit.
`;
