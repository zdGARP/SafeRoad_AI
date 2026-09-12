import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from 'react-leaflet';
import { MapPin, Search, Filter, Sparkles, TrendingUp, AlertTriangle, ShieldCheck, ChevronRight, Layers, Eye } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

// Mock High-Risk Location Dataset across India with realistic coordinates
const mockLocations = [
  {
    id: 'LOC-CHENNAI-04',
    name: 'Chennai NH Junction 04',
    state: 'Tamil Nadu',
    district: 'Chennai Urban',
    city: 'Chennai',
    roadCategory: 'National Highway',
    lat: 13.0827,
    lng: 80.2707,
    riskScore: 87,
    riskLevel: 'critical',
    accidents: 142,
    fatalities: 38,
    injuries: 176,
    trend: 'Increasing ↑',
    aiInsight: 'Risk is elevated primarily due to overspeeding, poor nighttime visibility and high two-wheeler exposure.',
    primaryCause: 'Overspeeding (38%)',
    vulnerableUsers: 'Two-wheelers (48%), Pedestrians (24%)',
    roadCharacteristics: 'Dual Carriageway, Unbanked Curve, Missing Delineators',
    timePeak: '18:00 - 21:00 Hours',
    intervention: 'Install Speed Enforcement Radar, High-Friction Surfacing & Solar Street Lights',
  },
  {
    id: 'LOC-AMBALA-44',
    name: 'NH-44 KM 142 (Ambala Section)',
    state: 'Haryana',
    district: 'Ambala',
    city: 'Ambala',
    roadCategory: 'National Highway',
    lat: 30.3782,
    lng: 76.7767,
    riskScore: 84,
    riskLevel: 'critical',
    accidents: 118,
    fatalities: 31,
    injuries: 145,
    trend: 'Stable →',
    aiInsight: 'High risk driven by dense winter fog, heavy freight vehicle merging, and lack of reflector gantries.',
    primaryCause: 'Poor Visibility & Fog (42%)',
    vulnerableUsers: 'Commercial Freight & Light Vehicles',
    roadCharacteristics: '6-Lane Highway, Uncontrolled Freight Merge',
    timePeak: '04:00 - 08:00 Hours',
    intervention: 'Fog Warning VMS Displays & Raised Pavement Markers',
  },
  {
    id: 'LOC-MUMBAI-PUNE-38',
    name: 'Mumbai-Pune Expressway KM 38',
    state: 'Maharashtra',
    district: 'Pune',
    city: 'Lonavala',
    roadCategory: 'Expressway',
    lat: 18.7557,
    lng: 73.4091,
    riskScore: 78,
    riskLevel: 'high',
    accidents: 96,
    fatalities: 24,
    injuries: 112,
    trend: 'Decreasing ↓',
    aiInsight: 'Risk concentrated on downhill descent curve due to heavy truck brake fading and tailgating.',
    primaryCause: 'Brake Fade & Downhill Speeding (34%)',
    vulnerableUsers: 'Cars / SUVs (52%), Trucks (35%)',
    roadCharacteristics: 'Access-Controlled Expressway, Steep Grade Descent',
    timePeak: '22:00 - 02:00 Hours',
    intervention: 'Arrester Bed Construction & Speed Camera Grid',
  },
  {
    id: 'LOC-BLR-ORR-MAR',
    name: 'Outer Ring Road (Marathahalli)',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    city: 'Bengaluru',
    roadCategory: 'Urban Arterial',
    lat: 12.9569,
    lng: 77.7011,
    riskScore: 68,
    riskLevel: 'high',
    accidents: 74,
    fatalities: 12,
    injuries: 88,
    trend: 'Increasing ↑',
    aiInsight: 'Risk stems from mid-block pedestrian crossing across high-speed arterial lanes during evening rush hours.',
    primaryCause: 'Uncontrolled Pedestrian Crossing (40%)',
    vulnerableUsers: 'Pedestrians (54%), Two-Wheelers (36%)',
    roadCharacteristics: '6-Lane Urban Arterial, Divided Median',
    timePeak: '17:30 - 20:30 Hours',
    intervention: 'Construct Pedestrian Skywalk with Escalators & Bus Bay Segregation',
  },
  {
    id: 'LOC-DELHI-GT-02',
    name: 'GT Karnal Road (Mukarba Chowk)',
    state: 'Delhi',
    district: 'North Delhi',
    city: 'New Delhi',
    roadCategory: 'National Highway',
    lat: 28.7351,
    lng: 77.1611,
    riskScore: 54,
    riskLevel: 'medium',
    accidents: 52,
    fatalities: 9,
    injuries: 64,
    trend: 'Decreasing ↓',
    aiInsight: 'Moderate risk associated with informal auto-rickshaw stops and lane congestion near flyover ramp.',
    primaryCause: 'Driver Distraction & Sudden Lane Changes (28%)',
    vulnerableUsers: 'Three-Wheelers & Cyclists',
    roadCharacteristics: 'Grade-Separated Flyover Junction',
    timePeak: '08:00 - 11:00 Hours',
    intervention: 'Dedicated Paratransit Lay-by & Lane Markings',
  },
];

export const RiskMapPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(mockLocations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [roadCategoryFilter, setRoadCategoryFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('overview');

  // Filter Locations
  const filteredLocations = mockLocations.filter((loc) => {
    const matchesSearch = loc.name.toLowerCase().includes(searchQuery.toLowerCase()) || loc.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = stateFilter === 'All' || loc.state === stateFilter;
    const matchesRisk = riskFilter === 'All' || loc.riskLevel === riskFilter;
    const matchesRoad = roadCategoryFilter === 'All' || loc.roadCategory === roadCategoryFilter;
    return matchesSearch && matchesState && matchesRisk && matchesRoad;
  });

  const getMarkerColor = (riskLevel) => {
    switch (riskLevel) {
      case 'critical': return '#dc2626';
      case 'high': return '#ea580c';
      case 'medium': return '#d97706';
      case 'low': return '#16a34a';
      default: return '#1d4ed8';
    }
  };

  return (
    <div>
      <PageHeader
        title="Interactive Safety Risk Map & Hotspot Inspector"
        subtitle="GIS spatial mapping of road safety risk scores, accident clusters and localized intelligence."
        badgeText="GIS Engine v3"
        badgeVariant="primary"
        breadcrumbs={['Home', 'Risk Map']}
      />

      {/* Filter Bar for Prompt 7 */}
      <div className="gov-card" style={{ marginBottom: '1.25rem', padding: '1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.85rem' }}>
          <div style={{ flex: '1 1 200px', position: 'relative' }}>
            <Search size={15} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
            <input
              type="text"
              className="gov-input"
              style={{ paddingLeft: '34px', height: '36px', fontSize: '0.825rem' }}
              placeholder="Search location, NH junction, city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <select className="gov-select" style={{ width: 'auto', height: '36px', fontSize: '0.825rem' }} value={stateFilter} onChange={(e) => setStateFilter(e.target.value)}>
            <option value="All">All States / UTs</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Haryana">Haryana</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Delhi">Delhi</option>
          </select>

          <select className="gov-select" style={{ width: 'auto', height: '36px', fontSize: '0.825rem' }} value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)}>
            <option value="All">All Risk Levels</option>
            <option value="critical">CRITICAL (81-100)</option>
            <option value="high">HIGH (61-80)</option>
            <option value="medium">MEDIUM (31-60)</option>
            <option value="low">LOW (0-30)</option>
          </select>

          <select className="gov-select" style={{ width: 'auto', height: '36px', fontSize: '0.825rem' }} value={roadCategoryFilter} onChange={(e) => setRoadCategoryFilter(e.target.value)}>
            <option value="All">All Road Categories</option>
            <option value="National Highway">National Highways</option>
            <option value="Expressway">Expressways</option>
            <option value="Urban Arterial">Urban Arterials</option>
          </select>

          <Button variant="secondary" size="sm" onClick={() => { setSearchQuery(''); setStateFilter('All'); setRiskFilter('All'); setRoadCategoryFilter('All'); }}>
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Main Grid: Leaflet Map (Left) + Location Intelligence Side Panel (Right) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '1.25rem' }}>
        {/* Leaflet Map Canvas */}
        <Card padding={false} style={{ height: '640px', overflow: 'hidden', position: 'relative' }}>
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-md)' }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredLocations.map((loc) => (
              <CircleMarker
                key={loc.id}
                center={[loc.lat, loc.lng]}
                radius={loc.riskScore > 80 ? 14 : loc.riskScore > 60 ? 11 : 8}
                pathOptions={{
                  fillColor: getMarkerColor(loc.riskLevel),
                  color: '#ffffff',
                  weight: 2,
                  fillOpacity: 0.85,
                }}
                eventHandlers={{
                  click: () => setSelectedLocation(loc),
                }}
              >
                <Popup>
                  <div style={{ padding: '0.2rem' }}>
                    <h4 style={{ margin: 0, fontSize: '0.9rem' }}>{loc.name}</h4>
                    <p style={{ margin: '0.2rem 0', fontSize: '0.8rem', color: '#475569' }}>
                      Risk Score: <strong>{loc.riskScore} / 100</strong>
                    </p>
                    <Badge variant={loc.riskLevel} />
                  </div>
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>

          {/* Map Legend Overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              zIndex: 400,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              padding: '0.6rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.75rem',
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: '0.3rem' }}>Risk Score Classification</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span style={{ color: '#dc2626', fontWeight: 700 }}>● 81–100: CRITICAL</span>
              <span style={{ color: '#ea580c', fontWeight: 700 }}>● 61–80: HIGH</span>
              <span style={{ color: '#d97706', fontWeight: 700 }}>● 31–60: MEDIUM</span>
              <span style={{ color: '#16a34a', fontWeight: 700 }}>● 0–30: LOW</span>
            </div>
          </div>
        </Card>

        {/* Location Intelligence Side Panel (Prompt 8 Specification) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Card title="Location Intelligence Panel">
            {selectedLocation ? (
              <div>
                {/* Header Info */}
                <div style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '0.85rem' }}>
                  <div className="flex-between" style={{ marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--text-subtle)' }}>{selectedLocation.id}</span>
                    <Badge variant={selectedLocation.riskLevel} />
                  </div>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{selectedLocation.name}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {selectedLocation.city}, {selectedLocation.state} • {selectedLocation.roadCategory}
                  </span>
                </div>

                {/* Key Metrics Grid */}
                <div className="grid-2" style={{ marginBottom: '1rem', gap: '0.5rem' }}>
                  <div style={{ background: 'var(--bg-surface)', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
                    <span style={{ fontSize: '0.725rem', color: 'var(--text-subtle)' }}>Risk Score</span>
                    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: getMarkerColor(selectedLocation.riskLevel) }}>
                      {selectedLocation.riskScore} / 100
                    </div>
                  </div>
                  <div style={{ background: 'var(--bg-surface)', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
                    <span style={{ fontSize: '0.725rem', color: 'var(--text-subtle)' }}>Crash Trend</span>
                    <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{selectedLocation.trend}</div>
                  </div>
                  <div style={{ background: 'var(--bg-surface)', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
                    <span style={{ fontSize: '0.725rem', color: 'var(--text-subtle)' }}>Accidents Recorded</span>
                    <div style={{ fontSize: '1.1rem', fontWeight: 700 }}>{selectedLocation.accidents}</div>
                  </div>
                  <div style={{ background: 'var(--bg-surface)', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
                    <span style={{ fontSize: '0.725rem', color: 'var(--text-subtle)' }}>Fatalities</span>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--risk-critical)' }}>{selectedLocation.fatalities}</div>
                  </div>
                </div>

                {/* Prompt 8 Specification: Explicit AI-Generated Insight */}
                <div
                  style={{
                    background: 'var(--primary-subtle)',
                    border: '1px solid var(--border-color)',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: '1rem',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
                    <Sparkles size={15} style={{ color: 'var(--primary)' }} />
                    <span style={{ fontSize: '0.775rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                      AI-Generated Insight
                    </span>
                  </div>
                  <p style={{ fontSize: '0.825rem', color: 'var(--text-main)', lineHeight: '1.45' }}>
                    "{selectedLocation.aiInsight}"
                  </p>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)', marginTop: '0.4rem', display: 'block' }}>
                    Note: AI projections provide probabilistic risk estimates for prioritization purposes.
                  </span>
                </div>

                {/* Intelligence Breakdown Tabs */}
                <div style={{ borderTop: '1px solid var(--border-color-subtle)', paddingTop: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '0.75rem', overflowX: 'auto' }}>
                    <button className={`gov-btn gov-btn-sm ${activeTab === 'overview' ? 'gov-btn-primary' : 'gov-btn-secondary'}`} onClick={() => setActiveTab('overview')}>
                      Causes
                    </button>
                    <button className={`gov-btn gov-btn-sm ${activeTab === 'vru' ? 'gov-btn-primary' : 'gov-btn-secondary'}`} onClick={() => setActiveTab('vru')}>
                      Vulnerable Users
                    </button>
                    <button className={`gov-btn gov-btn-sm ${activeTab === 'action' ? 'gov-btn-primary' : 'gov-btn-secondary'}`} onClick={() => setActiveTab('action')}>
                      Intervention
                    </button>
                  </div>

                  {activeTab === 'overview' && (
                    <div style={{ fontSize: '0.825rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <div><strong>Primary Cause:</strong> {selectedLocation.primaryCause}</div>
                      <div><strong>Time Peak:</strong> {selectedLocation.timePeak}</div>
                      <div><strong>Road Profile:</strong> {selectedLocation.roadCharacteristics}</div>
                    </div>
                  )}

                  {activeTab === 'vru' && (
                    <div style={{ fontSize: '0.825rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <div><strong>Exposed User Class:</strong> {selectedLocation.vulnerableUsers}</div>
                      <div><strong>Pedestrian Footfalls:</strong> High during peak hours</div>
                    </div>
                  )}

                  {activeTab === 'action' && (
                    <div style={{ fontSize: '0.825rem', display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                      <div><strong>Recommended Engineering:</strong> {selectedLocation.intervention}</div>
                      <Button variant="primary" size="sm" icon={Eye} style={{ marginTop: '0.5rem', width: '100%' }}>
                        View Detailed Analysis
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <p style={{ fontSize: '0.85rem', color: 'var(--text-subtle)' }}>Select a marker on the map to inspect spatial intelligence.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
