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
  category: "Frontend" | "Backend" | "Design" | "Tools";
}

export interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

// Short URL Feature Types
export interface ShortUrl {
  contentType: string;
  content: string;
  slug: string;
  createdAt: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  token?: string;
}

export interface CreateUrlPayload {
  contentType: "url";
  content: string;
  slug?: string;
}

export interface CreateUrlResponse {
  slug: string;
  shortUrl: string;
}

// Analytics Types
export interface AnalyticsByType {
  contentType: string;
  count: number;
  visits: number;
}

export interface TopLink {
  slug: string;
  contentType: string;
  content: string;
  visits: number;
  createdAt: string;
  lastAccessedAt: string | null;
}

export interface AnalyticsSummary {
  totalLinks: number;
  totalVisits: number;
  byType: AnalyticsByType[];
  topLinks: TopLink[];
}

export interface LinkAnalytics {
  slug: string;
  contentType: string;
  content: string;
  visits: number;
  createdAt: string;
  updatedAt: string;
  lastAccessedAt: string | null;
  lastAccessedIp: string | null;
}
