import {
  ApiResponse,
  ShortUrl,
  CreateUrlPayload,
  CreateUrlResponse,
  AnalyticsSummary,
  LinkAnalytics,
} from "../types";

// using import.meta.env for Vite environment variables
// set VITE_API_BASE in .env.local for local development
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:3000";

/**
 * fetches user's IP address for login authentication
 * using a free public API service
 */
export const getUserIp = async (): Promise<string> => {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data.ip;
  } catch (error) {
    // fallback to localhost if IP detection fails
    console.warn("Could not detect IP, using fallback:", error);
    return "127.0.0.1";
  }
};

/**
 * authenticates user with code and IP
 * returns JWT token on success
 */
export const login = async (code: string, ip: string): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code, ip }),
  });

  return response.json();
};

/**
 * creates a new short URL
 * requires authentication token
 */
export const createShortUrl = async (
  token: string,
  payload: CreateUrlPayload
): Promise<ApiResponse<CreateUrlResponse>> => {
  const response = await fetch(`${API_BASE}/api/short-url/generate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  return response.json();
};

/**
 * fetches all short URLs belonging to the authenticated user
 */
export const listShortUrls = async (
  token: string
): Promise<ApiResponse<ShortUrl[]>> => {
  const response = await fetch(`${API_BASE}/api/short-url/list`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

/**
 * deletes a short URL by its slug
 * only works for URLs owned by the authenticated user
 */
export const deleteShortUrl = async (
  token: string,
  slug: string
): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE}/api/short-url/${slug}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.json();
};

/**
 * generates the full short URL from a slug
 */
export const getShortUrlLink = (slug: string): string => {
  return `${API_BASE}/${slug}`;
};

/**
 * fetches a specific short URL by slug for redirect purposes
 * public endpoint - no authentication required
 */
export const getShortUrlBySlug = async (
  slug: string
): Promise<ApiResponse<ShortUrl & { shortUrl: string }>> => {
  const response = await fetch(`${API_BASE}/api/short-url/${slug}`);
  return response.json();
};

/**
 * fetches analytics summary for all user's links
 * requires authentication token
 */
export const getAnalyticsSummary = async (
  token: string
): Promise<ApiResponse<AnalyticsSummary>> => {
  const response = await fetch(`${API_BASE}/api/analytics/summary`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};

/**
 * fetches analytics for a specific link
 * requires authentication token
 */
export const getLinkAnalytics = async (
  token: string,
  slug: string
): Promise<ApiResponse<LinkAnalytics>> => {
  const response = await fetch(`${API_BASE}/api/analytics/${slug}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.json();
};
