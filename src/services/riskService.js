import { mockLocations } from '../data/locationsData';
import apiClient from './api';

export const riskService = {
  getLocations: async (filters = {}) => {
    const res = await apiClient.get('/risk-map', filters);
    if (res.ok && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }

    let result = [...mockLocations];
    if (filters.searchQuery) {
      const q = filters.searchQuery.toLowerCase();
      result = result.filter((l) => l.name.toLowerCase().includes(q) || l.city.toLowerCase().includes(q));
    }
    if (filters.state && filters.state !== 'All') {
      result = result.filter((l) => l.state === filters.state);
    }
    if (filters.riskLevel && filters.riskLevel !== 'All') {
      result = result.filter((l) => l.riskLevel === filters.riskLevel);
    }
    if (filters.roadType && filters.roadType !== 'All') {
      result = result.filter((l) => l.roadType === filters.roadType);
    }
    return Promise.resolve(result);
  },

  getLocationById: async (id) => {
    const res = await apiClient.get(`/locations/${id}`);
    if (res.ok && res.data) return res.data;
    const found = mockLocations.find((l) => l.id === id) || mockLocations[0];
    return Promise.resolve(found);
  },

  getHighRiskLocations: async () => {
    const res = await apiClient.get('/risk-map/hotspots');
    if (res.ok && Array.isArray(res.data)) return res.data;
    return Promise.resolve(mockLocations.filter((l) => l.riskScore >= 70));
  },
};
