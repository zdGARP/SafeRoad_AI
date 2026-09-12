import { mockInterventionsList } from '../data/interventionData';
import apiClient from './api';

export const interventionService = {
  getInterventions: async (locationId = 1) => {
    const res = await apiClient.get('/interventions/recommended', { location_id: locationId });
    if (res.ok && res.data && Array.isArray(res.data.interventions)) {
      return res.data.interventions;
    }
    return Promise.resolve(mockInterventionsList);
  },

  simulateImpact: async (selectedInterventionNames = [], baseAccidentCount = 142) => {
    const res = await apiClient.post('/interventions/simulate-impact', {
      selected_interventions: selectedInterventionNames,
      location_id: 1,
    });

    if (res.ok && res.data) {
      return {
        baseAccidentCount: res.data.current_accidents,
        predictedAccidentCount: res.data.predicted_accidents,
        totalReductionPercent: res.data.estimated_reduction,
        estimatedReductionCount: res.data.estimated_reduction_count,
        rankedInterventions: res.data.ranked_interventions || [],
        selectedCount: selectedInterventionNames.length,
        safetyBenefit: res.data.safety_benefit,
        disclaimer: res.data.disclaimer,
      };
    }

    const selectedItems = mockInterventionsList.filter(
      (item) => selectedInterventionNames.includes(item.id) || selectedInterventionNames.includes(item.title)
    );

    let remainingFraction = 1.0;
    selectedItems.forEach((item) => {
      remainingFraction *= 1 - item.expectedReduction / 100;
    });

    const totalReductionPercent =
      selectedInterventionNames.length === 0 ? 0 : Math.min(68, Math.round((1 - remainingFraction) * 100 * 10) / 10);
    const predictedAccidentCount = Math.round(baseAccidentCount * (1 - totalReductionPercent / 100));
    const estimatedReductionCount = baseAccidentCount - predictedAccidentCount;

    const rankedInterventions = [...selectedItems].sort((a, b) => (b.priorityScore || 0) - (a.priorityScore || 0));

    return Promise.resolve({
      baseAccidentCount,
      predictedAccidentCount,
      totalReductionPercent,
      estimatedReductionCount,
      rankedInterventions,
      selectedCount: selectedInterventionNames.length,
    });
  },
};
