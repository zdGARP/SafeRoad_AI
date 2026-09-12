import { mockAccidentStats } from '../data/accidentData';
import apiClient from './api';

export const analyticsService = {
  getAccidentSummary: async (filters = {}) => {
    const res = await apiClient.get('/intelligence/summary', filters);
    if (res.ok && res.data) return res.data;
    return Promise.resolve(mockAccidentStats.summary);
  },

  getVulnerabilityCategories: async () => {
    const res = await apiClient.get('/vulnerability/road-users');
    if (res.ok && Array.isArray(res.data)) return res.data;
    return Promise.resolve(mockAccidentStats.vulnerabilityCategories);
  },

  getYearlyTrends: async () => {
    const res = await apiClient.get('/analytics/trends');
    if (res.ok && Array.isArray(res.data)) return res.data;
    return Promise.resolve(mockAccidentStats.yearlyTrends);
  },
};
