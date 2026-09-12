import { mockPredictionData } from '../data/predictionData';
import apiClient from './api';

export const predictionService = {
  getPrediction: async (locationId = 1, period = '7d') => {
    const res = await apiClient.post('/prediction/predict-risk', {
      location_id: typeof locationId === 'number' ? locationId : 1,
      prediction_period: period,
    });
    if (res.ok && res.data) {
      return {
        currentRisk: res.data.current_risk,
        predictedRisk: res.data.predicted_risk,
        confidence: res.data.confidence,
        trend: res.data.trend,
        disclaimer: res.data.disclaimer,
        historicalVsPredicted: res.data.historical_vs_predicted,
      };
    }

    const periodData = mockPredictionData.periods[period] || mockPredictionData.periods['7d'];
    return Promise.resolve({
      locationId,
      period,
      ...periodData,
    });
  },
};
