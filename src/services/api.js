// Centralized REST API Service Architecture (BOB Prompts 1-20 Specification)
// Connects React Frontend directly to FastAPI / PostgreSQL backend on http://localhost:8000/api

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const apiClient = {
  get: async (endpoint, params = {}) => {
    try {
      const url = new URL(`${API_BASE_URL}${endpoint}`);
      Object.keys(params).forEach((key) => {
        if (params[key] !== undefined && params[key] !== null) {
          url.searchParams.append(key, params[key]);
        }
      });

      const token = localStorage.getItem('roadsafe_auth_token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(url.toString(), { method: 'GET', headers });
      if (res.ok) {
        const data = await res.json();
        return { ok: true, data };
      }
    } catch (err) {
      console.warn(`[API Client] Live GET ${endpoint} fallback triggered:`, err.message);
    }
    return { ok: false, fallback: true };
  },

  post: async (endpoint, payload = {}) => {
    try {
      const token = localStorage.getItem('roadsafe_auth_token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        return { ok: true, data };
      }
    } catch (err) {
      console.warn(`[API Client] Live POST ${endpoint} fallback triggered:`, err.message);
    }
    return { ok: false, fallback: true };
  },
};

export default apiClient;
