import { ResumeData } from "./types";
import {
  Github,
  Globe,
  Mail,
  MapPin,
  Phone,
  Linkedin,
  Twitter,
} from "lucide-react";

export const RESUME_DATA: ResumeData = {
  name: "Raghvendra Dwivedi",
  role: "Full-Stack Developer",
  summary:
    "I'm a Full-Stack Developer with a deep love for backend systems and cybersecurity. Currently building Linkbase and contributing to open source, I enjoy solving complex problems whether it's optimizing real-time sockets, securing APIs, or just making code run faster. I believe in building software that's not just functional, but resilient and secure.",
  location: "Lucknow, India 226017",
  email: "raghavdwd@gmail.com",
  phone: "+91 8887947867",
  socials: [
    {
      platform: "GitHub",
      url: "https://github.com/raghavdwd",
      text: "github.com/raghavdwd",
      icon: "Github",
    },
    {
      platform: "LinkedIn",
      url: "https://linkedin.com/in/raghavdwd",
      text: "linkedin.com/in/raghavdwd",
      icon: "Linkedin",
    },
    {
      platform: "X",
      url: "https://x.com/raghavdwd",
      text: "x.com/raghavdwd",
      icon: "Twitter",
    },
    {
      platform: "Portfolio",
      url: "https://raghavv.me",
      text: "raghavv.me",
      icon: "Globe",
    },
    {
      platform: "Email",
      url: "mailto:raghavdwd@gmail.com",
      text: "raghavdwd@gmail.com",
      icon: "Mail",
    },
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "PHP", "Python", "C++"],
    frontend: [
      "React.js",
      "Next.js",
      "HTML/CSS",
      "Tailwind CSS",
      "Responsive Design",
    ],
    backend: ["Node.js", "Express.js", "REST APIs", "WebSockets"],
    tools: ["MongoDB", "MySQL", "Git/GitHub", "Linux", "Excloud", "Prisma"],
  },
  experience: [
    {
      company: "Cangra Talents",
      role: "Software Developer Intern",
      location: "Lucknow",
      startDate: "Apr 2025",
      endDate: "Present",
      points: [
        "Optimized API performance achieving 30% faster response times through efficient query design and caching strategies.",
        "Improved real-time socket connections by 20% by implementing connection pooling and optimized event handling.",
        "Designed and developed custom ERP system components serving multiple client departments with inventory management modules using MERN stack.",
        "Built responsive web applications integrating third-party APIs with secure authentication and authorization.",
      ],
    },
    {
      company: "Cangra Talents",
      role: "Technical Blogger",
      location: "Lucknow",
      startDate: "Sep 2024",
      endDate: "Apr 2025",
      points: [
        "Published 300+ technical articles reaching 10,000+ monthly readers covering backend development, OOP principles, and system architecture.",
        "Developed content strategy that increased developer engagement and established thought leadership in tech community.",
        "Researched and documented latest industry trends, contributing to team knowledge base and client insights.",
      ],
    },
  ],
  education: {
    degree: "Bachelor in Computer Application",
    institution: "Indira Gandhi National Open University, New Delhi",
    year: "Expected June 2027",
    coursework:
      "Data Structures & Algorithms, Database Management Systems, Web Development, Software Engineering, OOP",
  },
  projects: [
    {
      title: "SpeakEz",
      description:
        "AI-Powered Language Learning Platform with Conversational AI Characters",
      techStack: ["Next.js", "Node.js", "JavaScript", "AI/ML", "WebRTC"],
      githubUrl: "https://github.com/raghavdwd/speakEz-team",
      points: [
        "Built revolutionary language learning platform enabling conversations with AI characters for immersive learning.",
        "Implemented real-time audio streaming and WebRTC integration for voice communication features.",
      ],
    },
    {
      title: "GitHub Wrapped",
      description:
        "Interactive GitHub Journey Visualization with AI-Powered Insights",
      techStack: ["TypeScript", "Next.js", "GitHub API", "AI Integration"],
      githubUrl: "https://github.com/raghavdwd/github-wrapped",
      points: [
        "Created modern, interactive experience visualizing annual GitHub journey with stunning animations.",
        "Integrated AI-powered insights to analyze coding patterns, contributions, and developer growth.",
      ],
    },
    {
      title: "Private Chat",
      description: "Real-time Anonymous Messaging Application",
      techStack: ["Next.js", "TypeScript", "WebSockets", "Node.js"],
      githubUrl: "https://github.com/raghavdwd/private-chat",
      points: [
        "Built privacy-first real-time chat application with low-latency messaging using WebSocket connections.",
        "Implemented secure anonymous authentication and end-to-end message handling with TypeScript for type safety.",
      ],
    },
    {
      title: "Deal Hunt",
      description: "Price Tracking & Alert System",
      techStack: ["React.js", "Node.js", "MongoDB", "Cron Jobs"],
      githubUrl: "https://github.com/raghavdwd/deal-hunt",
      points: [
        "Built full-stack price monitoring application with automated email alerts for price drops.",
        "Implemented backend automation with cron jobs for periodic price checking and user notifications.",
      ],
    },
    {
      title: "Repo of the Day",
      description: "Automated GitHub Repository Discovery Service",
      techStack: ["Node.js", "GitHub API", "Cron Jobs", "Email Automation"],
      githubUrl: "https://github.com/raghavdwd/repo-of-the-day",
      points: [
        "Developed automated backend service to discover and share trending GitHub repositories daily.",
        "Implemented scheduled cron jobs for fetching, analyzing, and summarizing repository data.",
      ],
    },
  ],
  achievements: [
    {
      title: "SpeakEz Backend Developer – Tech Titans Hack Fest",
      description:
        "Delivered complete voice communication platform MVP in 36 hours, implementing real-time audio streaming and WebRTC integration with Node.js backend.",
    },
    {
      title: "Performance Optimization Expert",
      description:
        "Achieved measurable system improvements including 20% socket connection optimization and 30% API response time acceleration through strategic code refactoring and caching.",
    },
    {
      title: "Technical Content Creator",
      description:
        "Authored 300+ company blogs for interview-as-a-service platform with focus on recruitment, career guidance, and software development best practices.",
    },
  ],
};
