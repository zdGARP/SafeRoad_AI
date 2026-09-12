import { mockLocations } from '../data/locationsData';
import apiClient from './api';

export const riskService = {
  getLocations: async (filters = {}) => {
    await apiClient.get('/locations', filters);
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
    await apiClient.get(`/locations/${id}`);
    const found = mockLocations.find((l) => l.id === id) || mockLocations[0];
    return Promise.resolve(found);
  },

  getHighRiskLocations: async () => {
    await apiClient.get('/locations/high-risk');
    return Promise.resolve(mockLocations.filter((l) => l.riskScore >= 70));
  },
};
