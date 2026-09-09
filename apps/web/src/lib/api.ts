export const NEXT_PUBLIC_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
export const NEXT_PUBLIC_AI_URL = process.env.NEXT_PUBLIC_AI_URL || "http://localhost:8000";

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };
  
  const res = await fetch(`${NEXT_PUBLIC_API_URL}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed API request");
  }
  return res.json();
}

export async function fetchAiApi(endpoint: string, options: RequestInit = {}) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  
  const res = await fetch(`${NEXT_PUBLIC_AI_URL}${endpoint}`, { ...options, headers });
  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || "Failed AI Engine request");
  }
  return res.json();
}

export async function checkSystemHealth() {
  try {
    const [apiRes, aiRes] = await Promise.all([
      fetch(`${NEXT_PUBLIC_API_URL}/health`).catch(() => null),
      fetch(`${NEXT_PUBLIC_AI_URL}/health`).catch(() => null)
    ]);
    
    return {
      api: apiRes?.ok ? await apiRes.json() : null,
      ai: aiRes?.ok ? await aiRes.json() : null,
      status: (apiRes?.ok && aiRes?.ok) ? 'ok' : 'degraded'
    };
  } catch (err) {
    return { api: null, ai: null, status: 'error' };
  }
}
