
export interface Project {
  id: string;
  title: string;
  description: string;
  details?: string;
  image: string;
  tags: string[];
  link: string;
  github?: string;
}

export interface Skill {
  name: string;
  level: number;
  category: 'Frontend' | 'Backend' | 'Design' | 'Tools';
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}
