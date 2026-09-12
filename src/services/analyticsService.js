import { mockAccidentStats } from '../data/accidentData';
import apiClient from './api';

export const analyticsService = {
  getAccidentSummary: async (filters = {}) => {
    await apiClient.get('/analytics/summary', filters);
    return Promise.resolve(mockAccidentStats.summary);
  },

  getVulnerabilityCategories: async () => {
    await apiClient.get('/analytics/vulnerability');
    return Promise.resolve(mockAccidentStats.vulnerabilityCategories);
  },

  getYearlyTrends: async () => {
    await apiClient.get('/analytics/yearly');
    return Promise.resolve(mockAccidentStats.yearlyTrends);
  },
};
