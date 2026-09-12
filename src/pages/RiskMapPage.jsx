import React, { useState, useEffect } from 'react';
import { MapPin, Search, Filter, Sparkles, TrendingUp, AlertTriangle, ShieldCheck, ChevronRight, Layers, Eye, RefreshCw } from 'lucide-react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { riskService } from '../services/riskService';

const MapResizer = () => {
  const map = useMap();
  useEffect(() => {
    const timer = setTimeout(() => {
      map.invalidateSize();
    }, 250);
    return () => clearTimeout(timer);
  }, [map]);
  return null;
};

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
    xPercent: 72,
    yPercent: 78,
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
    xPercent: 38,
    yPercent: 28,
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
    xPercent: 32,
    yPercent: 62,
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
    xPercent: 48,
    yPercent: 82,
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
    xPercent: 41,
    yPercent: 32,
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
  const [locations, setLocations] = useState(mockLocations);
  const [selectedLocation, setSelectedLocation] = useState(mockLocations[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [roadCategoryFilter, setRoadCategoryFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    riskService.getLocations().then((res) => {
      if (res && res.length > 0) {
        setLocations(res);
        setSelectedLocation(res[0]);
      }
    });
  }, []);

  const filteredLocations = locations.filter((loc) => {
    const name = loc.name || '';
    const city = loc.city || '';
    const rCat = loc.roadCategory || loc.roadType || '';
    const rLevel = loc.riskLevel || 'medium';

    const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase()) || city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = stateFilter === 'All' || loc.state === stateFilter;
    const matchesRisk = riskFilter === 'All' || rLevel.toLowerCase() === riskFilter.toLowerCase();
    const matchesRoad = roadCategoryFilter === 'All' || rCat.toLowerCase().includes(roadCategoryFilter.toLowerCase());
    return matchesSearch && matchesState && matchesRisk && matchesRoad;
  });

  const getMarkerColor = (riskLevel) => {
    const lvl = (riskLevel || '').toLowerCase();
    switch (lvl) {
      case 'critical': return 'var(--risk-critical)';
      case 'high': return 'var(--risk-high)';
      case 'medium': return 'var(--risk-medium)';
      case 'low': return 'var(--risk-low)';
      default: return 'var(--primary)';
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

      <div className="risk-map-grid">
        <Card padding={false} style={{ height: '640px', overflow: 'hidden', position: 'relative' }}>
          <MapContainer
            center={[20.5937, 78.9629]}
            zoom={5}
            style={{ width: '100%', height: '100%', borderRadius: 'var(--radius-sm)' }}
            scrollWheelZoom={true}
          >
            <MapResizer />
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
            />
            {filteredLocations.map((loc) => {
              const lat = loc.lat ?? loc.latitude ?? 20.5937;
              const lng = loc.lng ?? loc.longitude ?? 78.9629;
              const isSelected = selectedLocation?.id === loc.id;
              const color = getMarkerColor(loc.riskLevel);

              return (
                <CircleMarker
                  key={loc.id}
                  center={[lat, lng]}
                  radius={isSelected ? 14 : 10}
                  pathOptions={{
                    color: isSelected ? '#ffffff' : color,
                    fillColor: color,
                    fillOpacity: 0.85,
                    weight: isSelected ? 3 : 1.5,
                  }}
                  eventHandlers={{
                    click: () => setSelectedLocation(loc),
                  }}
                >
                  <Popup>
                    <div style={{ padding: '0.2rem', fontFamily: 'Inter, sans-serif' }}>
                      <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{loc.name}</strong>
                      <div style={{ fontSize: '0.775rem', color: '#64748b', marginTop: '2px' }}>
                        {loc.city}, {loc.state}
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: color, marginTop: '4px' }}>
                        Risk Score: {loc.riskScore}/100 ({(loc.riskLevel || 'MEDIUM').toUpperCase()})
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>

          <div
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 1000,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.4rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.775rem',
              fontWeight: 600,
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <Layers size={14} style={{ color: 'var(--primary)' }} />
            <span>Layer: MoRTH Hazard Hotspot Map</span>
          </div>

          <div
            style={{
              position: 'absolute',
              bottom: '12px',
              left: '12px',
              zIndex: 1000,
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '0.5rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              fontSize: '0.75rem',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            <span style={{ fontWeight: 700, color: 'var(--text-subtle)' }}>Legend:</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--risk-critical)' }}></span>
              <span>Critical (81-100)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--risk-high)' }}></span>
              <span>High (61-80)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--risk-medium)' }}></span>
              <span>Medium (31-60)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--risk-low)' }}></span>
              <span>Low (0-30)</span>
            </div>
          </div>
        </Card>

        <div>
          {selectedLocation ? (
            <Card style={{ height: '640px', overflowY: 'auto' }}>
              <div className="flex-between" style={{ marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.15rem', fontWeight: 800 }}>{selectedLocation.name}</h2>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
                    {selectedLocation.city}, {selectedLocation.state} • {selectedLocation.roadCategory || selectedLocation.roadType}
                  </span>
                </div>
                <Badge variant={selectedLocation.riskLevel || 'medium'} size="lg" />
              </div>

              <div className="grid-2" style={{ marginBottom: '1rem', background: 'var(--bg-surface)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Safety Risk Index</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: 900, color: getMarkerColor(selectedLocation.riskLevel) }}>
                      {selectedLocation.riskScore}
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-subtle)' }}>/ 100</span>
                  </div>
                </div>
                <div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Crash Trend</span>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-main)', marginTop: '0.35rem' }}>
                    {selectedLocation.trend || 'Stable →'}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '0.5rem' }}>
                <button
                  onClick={() => setActiveTab('overview')}
                  style={{
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: activeTab === 'overview' ? 700 : 500,
                    border: 'none',
                    background: activeTab === 'overview' ? 'var(--primary)' : 'transparent',
                    color: activeTab === 'overview' ? '#ffffff' : 'var(--text-muted)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                  }}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('telemetry')}
                  style={{
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: activeTab === 'telemetry' ? 700 : 500,
                    border: 'none',
                    background: activeTab === 'telemetry' ? 'var(--primary)' : 'transparent',
                    color: activeTab === 'telemetry' ? '#ffffff' : 'var(--text-muted)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                  }}
                >
                  Telemetry
                </button>
                <button
                  onClick={() => setActiveTab('action')}
                  style={{
                    padding: '0.35rem 0.75rem',
                    fontSize: '0.8rem',
                    fontWeight: activeTab === 'action' ? 700 : 500,
                    border: 'none',
                    background: activeTab === 'action' ? 'var(--primary)' : 'transparent',
                    color: activeTab === 'action' ? '#ffffff' : 'var(--text-muted)',
                    borderRadius: 'var(--radius-sm)',
                    cursor: 'pointer',
                  }}
                >
                  Action Plan
                </button>
              </div>

              {activeTab === 'overview' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ background: 'var(--primary-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--primary-border)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--primary)', fontWeight: 700, fontSize: '0.825rem', marginBottom: '0.35rem' }}>
                      <Sparkles size={16} />
                      <span>AI Safety Diagnostic</span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-main)', lineHeight: '1.45' }}>
                      {selectedLocation.aiInsight || 'Risk score is evaluated using crash frequency, severity, and road hazard factors.'}
                    </p>
                  </div>

                  <div className="grid-3" style={{ textAlign: 'center' }}>
                    <div style={{ background: 'var(--bg-surface)', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-subtle)' }}>Accidents</span>
                      <strong style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800 }}>{selectedLocation.accidents ?? selectedLocation.accidentCount ?? 0}</strong>
                    </div>
                    <div style={{ background: 'var(--bg-surface)', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-subtle)' }}>Fatalities</span>
                      <strong style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800, color: 'var(--risk-critical)' }}>{selectedLocation.fatalities ?? 0}</strong>
                    </div>
                    <div style={{ background: 'var(--bg-surface)', padding: '0.6rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
                      <span style={{ fontSize: '0.725rem', color: 'var(--text-subtle)' }}>Injuries</span>
                      <strong style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800, color: 'var(--risk-high)' }}>{selectedLocation.injuries ?? 0}</strong>
                    </div>
                  </div>

                  <div style={{ fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px dashed var(--border-color-subtle)' }}>
                      <span style={{ color: 'var(--text-subtle)' }}>Dominant Cause:</span>
                      <span style={{ fontWeight: 600 }}>{selectedLocation.primaryCause || 'Overspeeding'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0', borderBottom: '1px dashed var(--border-color-subtle)' }}>
                      <span style={{ color: 'var(--text-subtle)' }}>Vulnerable Users:</span>
                      <span style={{ fontWeight: 600 }}>{selectedLocation.vulnerableUsers || 'Two-Wheelers & Pedestrians'}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.4rem 0' }}>
                      <span style={{ color: 'var(--text-subtle)' }}>High-Risk Hours:</span>
                      <span style={{ fontWeight: 600 }}>{selectedLocation.timePeak || '18:00 - 21:00 Hours'}</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'telemetry' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.8rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>Road Geometry & Infra:</span>
                    <strong style={{ color: 'var(--text-main)' }}>{selectedLocation.roadCharacteristics || 'Dual Carriageway with Divider'}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>GPS Coordinates:</span>
                    <code style={{ background: 'var(--bg-surface)', padding: '0.2rem 0.4rem', borderRadius: 'var(--radius-sm)' }}>
                      {selectedLocation.lat ?? selectedLocation.latitude}, {selectedLocation.lng ?? selectedLocation.longitude}
                    </code>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-subtle)', display: 'block', marginBottom: '0.2rem' }}>District Jurisdiction:</span>
                    <strong>{selectedLocation.district || selectedLocation.city}, {selectedLocation.state}</strong>
                  </div>
                </div>
              )}

              {activeTab === 'action' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  <div style={{ background: 'var(--bg-surface)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.35rem' }}>Recommended Safety Countermeasure</span>
                    <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', lineHeight: '1.4' }}>
                      {selectedLocation.intervention || 'Deploy Automated Speed Radar Grid & Solar Illumination'}
                    </p>
                  </div>
                </div>
              )}
            </Card>
          ) : (
            <Card style={{ height: '640px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: 'var(--text-subtle)' }}>Select a hotspot pin on the GIS map</span>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};
