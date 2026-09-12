import { mockPredictionData } from '../data/predictionData';
import apiClient from './api';

export const predictionService = {
  getPrediction: async (locationId = 'LOC-CHENNAI-04', period = '7d') => {
    await apiClient.get(`/prediction/${locationId}`, { period });
    const periodData = mockPredictionData.periods[period] || mockPredictionData.periods['7d'];
    return Promise.resolve({
      locationId,
      period,
      ...periodData,
    });
  },
};
