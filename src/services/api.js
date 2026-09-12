// Centralized REST API Service Architecture (Prompt 18 Specification)
// Prepared for future FastAPI / Flask / PostgreSQL REST backend integration.

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api/v1';

export const apiClient = {
  get: async (endpoint, params = {}) => {
    // In production, this issues fetch/axios calls to API_BASE_URL + endpoint
    // For now, services return wrapped promises with structured mock data
    return Promise.resolve({ ok: true, endpoint, params });
  },

  post: async (endpoint, data = {}) => {
    return Promise.resolve({ ok: true, endpoint, data });
  },
};

export default apiClient;
