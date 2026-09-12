// Centralized Accident Statistics & Vulnerability Dataset (Prompt 11 & Prompt 17 Specification)

export const mockAccidentStats = {
  summary: {
    totalAccidents: 24581,
    accidentsChange: '↓ 4.2%',
    fatalities: 6412,
    fatalitiesChange: '↓ 5.8%',
    injuries: 18169,
    injuriesChange: '↓ 3.1%',
    highRiskLocations: 142,
    locationsChange: '↓ 8.5%',
    comparisonPeriod: 'Compared with previous period',
  },

  // Vulnerability Breakdown (Prompt 11 Specification)
  vulnerabilityCategories: [
    {
      category: 'Two-Wheelers',
      percentage: 48,
      count: 11798,
      fatalityRate: '28.4%',
      riskLevel: 'critical',
      description: 'Highest vulnerability due to lack of rider enclosure and helmet non-compliance on arterial merges.',
      icon: 'Bike',
    },
    {
      category: 'Pedestrians',
      percentage: 24,
      count: 5899,
      fatalityRate: '32.1%',
      riskLevel: 'critical',
      description: 'Extreme fatality rate at mid-block crossings lacking signalized foot overbridges.',
      icon: 'Footprints',
    },
    {
      category: 'Heavy Freight Vehicles',
      percentage: 14,
      count: 3441,
      fatalityRate: '24.6%',
      riskLevel: 'high',
      description: 'High severity impact during night hours due to speed differential and rear under-run.',
      icon: 'Truck',
    },
    {
      category: 'Cars / SUVs',
      percentage: 8,
      count: 1966,
      fatalityRate: '12.8%',
      riskLevel: 'medium',
      description: 'Mainly overspeeding and distraction crashes on access-controlled expressways.',
      icon: 'Car',
    },
    {
      category: 'Cyclists & Non-Motorized',
      percentage: 4,
      count: 983,
      fatalityRate: '19.2%',
      riskLevel: 'medium',
      description: 'Inadequate dedicated cycle tracks on urban arterial roads.',
      icon: 'Bicycle',
    },
    {
      category: 'Public Transport (Buses)',
      percentage: 2,
      count: 494,
      fatalityRate: '15.4%',
      riskLevel: 'low',
      description: 'Unregulated passenger boarding at informal highway stops.',
      icon: 'Bus',
    },
  ],

  // Annual Trends
  yearlyTrends: [
    { year: '2021', accidents: 412000, fatalities: 153972, injuries: 384448 },
    { year: '2022', accidents: 461312, fatalities: 168491, injuries: 443366 },
    { year: '2023', accidents: 480652, fatalities: 173046, injuries: 463400 },
    { year: '2024', accidents: 468200, fatalities: 169200, injuries: 451000 },
    { year: '2025', accidents: 452100, fatalities: 162400, injuries: 436000 },
    { year: '2026 YTD', accidents: 310500, fatalities: 111200, injuries: 298000 },
  ],
};
