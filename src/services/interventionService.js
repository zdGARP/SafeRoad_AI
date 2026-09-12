import { mockInterventionsList } from '../data/interventionData';
import apiClient from './api';

export const interventionService = {
  getInterventions: async (locationId = 'LOC-CHENNAI-04') => {
    await apiClient.get(`/interventions/${locationId}`);
    return Promise.resolve(mockInterventionsList);
  },

  simulateImpact: async (selectedInterventionIds = [], baseAccidentCount = 142) => {
    await apiClient.post('/simulation/run', { selectedInterventionIds, baseAccidentCount });

    const selectedItems = mockInterventionsList.filter((item) => selectedInterventionIds.includes(item.id));

    // Calculate total non-linear compounding accident reduction %
    let remainingFraction = 1.0;
    selectedItems.forEach((item) => {
      remainingFraction *= (1 - item.expectedReduction / 100);
    });

    const totalReductionPercent = selectedInterventionIds.length === 0 ? 0 : Math.min(68, Math.round((1 - remainingFraction) * 100 * 10) / 10);
    const predictedAccidentCount = Math.round(baseAccidentCount * (1 - totalReductionPercent / 100));
    const estimatedReductionCount = baseAccidentCount - predictedAccidentCount;

    // Rank selected interventions by priority score
    const rankedInterventions = [...selectedItems].sort((a, b) => b.priorityScore - a.priorityScore);

    return Promise.resolve({
      baseAccidentCount,
      predictedAccidentCount,
      totalReductionPercent,
      estimatedReductionCount,
      rankedInterventions,
      selectedCount: selectedInterventionIds.length,
    });
  },
};
