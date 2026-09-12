import { mockAccidentStats } from '../data/accidentData';
import apiClient from './api';

export const analyticsService = {
  getAccidentSummary: async (filters = {}) => {
    const res = await apiClient.get('/intelligence/summary', filters);
    if (res.ok && res.data) {
      return {
        totalAccidents: res.data.total_accidents ?? mockAccidentStats.summary.totalAccidents,
        accidentsChange: -8.4,
        fatalities: res.data.total_fatalities ?? mockAccidentStats.summary.fatalities,
        fatalitiesChange: -12.1,
        injuries: res.data.total_injuries ?? mockAccidentStats.summary.injuries,
        injuriesChange: -5.3,
        highRiskLocations: res.data.high_risk_zones ?? mockAccidentStats.summary.highRiskLocations,
        locationsChange: -2.0,
        comparisonPeriod: 'vs. previous 30 days',
      };
    }
    return Promise.resolve(mockAccidentStats.summary);
  },

  getVulnerabilityCategories: async () => {
    const res = await apiClient.get('/vulnerability/road-users');
    if (res.ok && Array.isArray(res.data) && res.data.length > 0) {
      return res.data.map((item, idx) => {
        const fallback = mockAccidentStats.vulnerabilityCategories[idx] || {};
        let rLevel = 'medium';
        const rStr = (item.risk_level || '').toLowerCase();
        if (rStr.includes('highest') || rStr.includes('critical')) rLevel = 'critical';
        else if (rStr.includes('high')) rLevel = 'high';
        else if (rStr.includes('low')) rLevel = 'low';

        return {
          id: `vuln-${idx}`,
          category: item.category,
          percentage: item.accident_percentage ?? item.percentage ?? fallback.percentage ?? 20,
          count: item.accident_count ?? item.count ?? fallback.count ?? 100,
          fatalityRate: item.fatality_rate ?? item.fatalityRate ?? fallback.fatalityRate ?? '25%',
          riskLevel: rLevel,
          description: fallback.description || `Vulnerability analysis for ${item.category}`,
        };
      });
    }
    return Promise.resolve(mockAccidentStats.vulnerabilityCategories);
  },

  getYearlyTrends: async () => {
    const res = await apiClient.get('/analytics/trends');
    if (res.ok && Array.isArray(res.data) && res.data.length > 0) {
      return res.data.map((item) => ({
        year: item.month || item.year,
        accidents: item.accidents,
        fatalities: item.fatalities,
        injuries: item.injuries,
      }));
    }
    return Promise.resolve(mockAccidentStats.yearlyTrends);
  },
};
