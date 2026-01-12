export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
  text: string;
}

export interface Experience {
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  points: string[];
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  points: string[];
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
  coursework: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface ResumeData {
  name: string;
  role: string;
  summary: string;
  location: string;
  email: string;
  phone: string;
  socials: SocialLink[];
  skills: {
    languages: string[];
    frontend: string[];
    backend: string[];
    tools: string[];
  };
  experience: Experience[];
  education: Education;
  projects: Project[];
  achievements: Achievement[];
}