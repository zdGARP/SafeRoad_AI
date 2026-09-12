import { mockLocations } from '../data/locationsData';
import apiClient from './api';

const mapLocation = (loc) => {
  if (!loc) return null;
  const score = loc.risk_score ?? loc.riskScore ?? 50;
  let level = (loc.risk_level || loc.riskLevel || 'MEDIUM').toLowerCase();
  if (level === 'critical') level = 'critical';
  else if (level === 'high') level = 'high';
  else if (level === 'medium') level = 'medium';
  else level = 'low';

  return {
    id: loc.id,
    name: loc.name,
    state: loc.state,
    district: loc.district,
    city: loc.city,
    latitude: loc.latitude,
    longitude: loc.longitude,
    coordinates: [loc.latitude, loc.longitude],
    roadType: loc.road_type || loc.roadType || 'National Highway',
    riskScore: score,
    riskLevel: level,
    accidentCount: loc.accidents ?? loc.accidentCount ?? 0,
    fatalities: loc.fatalities ?? 0,
    injuries: loc.injuries ?? 0,
  };
};

export const riskService = {
  getLocations: async (filters = {}) => {
    const res = await apiClient.get('/risk-map', filters);
    if (res.ok && Array.isArray(res.data) && res.data.length > 0) {
      let mapped = res.data.map(mapLocation);

      if (filters.searchQuery) {
        const q = filters.searchQuery.toLowerCase();
        mapped = mapped.filter((l) => l.name.toLowerCase().includes(q) || l.city.toLowerCase().includes(q));
      }
      if (filters.state && filters.state !== 'All') {
        mapped = mapped.filter((l) => l.state.toLowerCase().includes(filters.state.toLowerCase()));
      }
      if (filters.riskLevel && filters.riskLevel !== 'All') {
        mapped = mapped.filter((l) => l.riskLevel.toLowerCase() === filters.riskLevel.toLowerCase());
      }
      if (filters.roadType && filters.roadType !== 'All') {
        mapped = mapped.filter((l) => l.roadType.toLowerCase().includes(filters.roadType.toLowerCase()));
      }
      return mapped;
    }

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
    const res = await apiClient.get(`/locations/${id}`);
    if (res.ok && res.data) return mapLocation(res.data);
    const found = mockLocations.find((l) => l.id === id) || mockLocations[0];
    return Promise.resolve(found);
  },

  getHighRiskLocations: async () => {
    const res = await apiClient.get('/risk-map/hotspots');
    if (res.ok && Array.isArray(res.data) && res.data.length > 0) {
      return res.data.map(mapLocation);
    }
    return Promise.resolve(mockLocations.filter((l) => l.riskScore >= 70));
  },
};
