// Centralized Predictive AI Risk Dataset (Prompt 12 Specification)

export const mockPredictionData = {
  periods: {
    '7d': {
      label: '7 Days Forward Forecast',
      currentRisk: 87,
      predictedRisk: 91,
      confidence: 87,
      trend: 'Increasing ↑',
      trendLevel: 'critical',
      historicalVsPredicted: [
        { period: 'Day -3', historical: 82, predicted: null },
        { period: 'Day -2', historical: 84, predicted: null },
        { period: 'Day -1', historical: 85, predicted: null },
        { period: 'Today', historical: 87, predicted: 87 },
        { period: 'Day +2', historical: null, predicted: 89 },
        { period: 'Day +4', historical: null, predicted: 90 },
        { period: 'Day +7', historical: null, predicted: 91 },
      ],
    },
    '30d': {
      label: '30 Days Forward Forecast',
      currentRisk: 87,
      predictedRisk: 84,
      confidence: 83,
      trend: 'Decreasing ↓',
      trendLevel: 'high',
      historicalVsPredicted: [
        { period: 'Week -3', historical: 88, predicted: null },
        { period: 'Week -2', historical: 86, predicted: null },
        { period: 'Week -1', historical: 87, predicted: null },
        { period: 'Current', historical: 87, predicted: 87 },
        { period: 'Week +1', historical: null, predicted: 86 },
        { period: 'Week +2', historical: null, predicted: 85 },
        { period: 'Week +4', historical: null, predicted: 84 },
      ],
    },
    '90d': {
      label: '90 Days Seasonal Projections',
      currentRisk: 87,
      predictedRisk: 78,
      confidence: 79,
      trend: 'Decreasing ↓',
      trendLevel: 'medium',
      historicalVsPredicted: [
        { period: 'Month -2', historical: 89, predicted: null },
        { period: 'Month -1', historical: 87, predicted: null },
        { period: 'Current', historical: 87, predicted: 87 },
        { period: 'Month +1', historical: null, predicted: 83 },
        { period: 'Month +2', historical: null, predicted: 80 },
        { period: 'Month +3', historical: null, predicted: 78 },
      ],
    },
  },
};
