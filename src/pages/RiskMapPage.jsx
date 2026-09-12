import React, { useState } from 'react';
import { MapPin, Layers, Flame, Navigation, AlertOctagon, Info, Eye } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { FilterBar } from '../components/filters/FilterBar';

const mockBlackspots = [
  { id: 1, location: 'NH-44 KM 142 - Ambala', state: 'Haryana', riskScore: 94, category: 'Fog & Speeding', incidentsYear: 42, fatalities: 14, status: 'Critical' },
  { id: 2, location: 'Mumbai-Pune Exp KM 38', state: 'Maharashtra', riskScore: 89, category: 'Sharp Curve & Descent', incidentsYear: 36, fatalities: 11, status: 'Critical' },
  { id: 3, location: 'NH-16 KM 88 - Visakhapatnam', state: 'Andhra Pradesh', riskScore: 82, category: 'Uncontrolled Merge', incidentsYear: 28, fatalities: 8, status: 'High' },
  { id: 4, location: 'Bengaluru ORR - Marathahalli', state: 'Karnataka', riskScore: 78, category: 'Pedestrian Crossing', incidentsYear: 22, fatalities: 5, status: 'High' },
  { id: 5, location: 'Yamuna Expressway KM 74', state: 'Uttar Pradesh', riskScore: 75, category: 'Tire Burst & Over-speed', incidentsYear: 19, fatalities: 6, status: 'Moderate' },
];

export const RiskMapPage = () => {
  const [selectedSpot, setSelectedSpot] = useState(mockBlackspots[0]);
  const [activeLayers, setActiveLayers] = useState({
    heatmap: true,
    blackspots: true,
    patrols: true,
    weather: false,
  });

  const toggleLayer = (key) => {
    setActiveLayers((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div>
      <PageHeader
        title="Interactive Spatial Risk Map & Heatmap"
        subtitle="GIS spatial intelligence model mapping high-risk accident clusters across national highway networks."
        badgeText="Spatial GIS"
        breadcrumbs={['Home', 'Risk Map']}
      />

      <FilterBar />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '1.25rem' }}>
        {/* Main Interactive Map Canvas Simulator */}
        <Card padding={false} style={{ overflow: 'hidden', position: 'relative', minHeight: '620px' }}>
          {/* Map Controls Header Overlay */}
          <div
            style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              zIndex: 10,
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(12px)',
              padding: '0.6rem 1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--bg-card-border)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <Layers size={16} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.825rem', fontWeight: 600 }}>Map Layers:</span>
            <button
              onClick={() => toggleLayer('heatmap')}
              className={`btn btn-sm ${activeLayers.heatmap ? 'btn-primary' : 'btn-secondary'}`}
            >
              Heatmap
            </button>
            <button
              onClick={() => toggleLayer('blackspots')}
              className={`btn btn-sm ${activeLayers.blackspots ? 'btn-primary' : 'btn-secondary'}`}
            >
              Blackspots
            </button>
            <button
              onClick={() => toggleLayer('patrols')}
              className={`btn btn-sm ${activeLayers.patrols ? 'btn-primary' : 'btn-secondary'}`}
            >
              Patrol Units
            </button>
          </div>

          {/* Interactive Map Visual Representation */}
          <div
            style={{
              width: '100%',
              height: '620px',
              background: '#090d16 url("https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=1600") center/cover no-repeat',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Dark overlay grid */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(9, 13, 22, 0.78)',
                backdropFilter: 'brightness(0.7) contrast(1.2)',
              }}
            />

            {/* Simulated Heatmap Glowing Circles */}
            {activeLayers.heatmap && (
              <>
                <div
                  style={{
                    position: 'absolute',
                    top: '32%',
                    left: '42%',
                    width: '180px',
                    height: '180px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(239, 68, 68, 0.6) 0%, rgba(239, 68, 68, 0) 70%)',
                    pointerEvents: 'none',
                    animation: 'pulseGlow 2.5s infinite ease-in-out',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '55%',
                    left: '28%',
                    width: '140px',
                    height: '140px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(249, 115, 22, 0.5) 0%, rgba(249, 115, 22, 0) 70%)',
                    pointerEvents: 'none',
                  }}
                />
              </>
            )}

            {/* Simulated Blackspot Pins */}
            {activeLayers.blackspots &&
              mockBlackspots.map((spot, index) => {
                const positions = [
                  { top: '35%', left: '44%' },
                  { top: '56%', left: '30%' },
                  { top: '65%', left: '60%' },
                  { top: '70%', left: '40%' },
                  { top: '25%', left: '50%' },
                ];
                const pos = positions[index] || { top: '50%', left: '50%' };
                const isSelected = selectedSpot?.id === spot.id;

                return (
                  <div
                    key={spot.id}
                    onClick={() => setSelectedSpot(spot)}
                    style={{
                      position: 'absolute',
                      top: pos.top,
                      left: pos.left,
                      cursor: 'pointer',
                      zIndex: 20,
                      transform: isSelected ? 'scale(1.25)' : 'scale(1)',
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <div
                      style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: '9999px',
                        background: spot.status === 'Critical' ? '#ef4444' : '#f59e0b',
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        boxShadow: '0 4px 14px rgba(0,0,0,0.5)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                      }}
                    >
                      <MapPin size={14} />
                      <span>{spot.riskScore} Risk</span>
                    </div>
                  </div>
                );
              })}

            {/* Map Information Legend Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '16px',
                left: '16px',
                zIndex: 10,
                background: 'rgba(15, 23, 42, 0.85)',
                backdropFilter: 'blur(12px)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--bg-card-border)',
                fontSize: '0.775rem',
              }}
            >
              <div style={{ fontWeight: 600, color: 'var(--text-main)', marginBottom: '0.4rem' }}>
                Spatial Legend
              </div>
              <div style={{ display: 'flex', gap: '1rem' }}>
                <span style={{ color: '#ef4444' }}>● Critical (&gt;85 Risk)</span>
                <span style={{ color: '#f59e0b' }}>● High (70-85 Risk)</span>
                <span style={{ color: '#10b981' }}>● Low (&lt;50 Risk)</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Sidebar Inspector Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <Card title="Corridor Inspector">
            {selectedSpot ? (
              <div>
                <div style={{ marginBottom: '1rem' }}>
                  <Badge variant={selectedSpot.status.toLowerCase()}>{selectedSpot.status} Hazard</Badge>
                  <h3 style={{ fontSize: '1.1rem', marginTop: '0.4rem' }}>{selectedSpot.location}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{selectedSpot.state} Jurisdiction</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
                  <div className="flex-between" style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Risk Index:</span>
                    <span style={{ fontWeight: 700, color: '#ef4444' }}>{selectedSpot.riskScore} / 100</span>
                  </div>
                  <div className="flex-between" style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Primary Risk Factor:</span>
                    <span style={{ fontWeight: 500, color: 'var(--text-main)', fontSize: '0.8rem' }}>{selectedSpot.category}</span>
                  </div>
                  <div className="flex-between" style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Incidents (YTD):</span>
                    <span style={{ fontWeight: 600, color: 'var(--text-main)' }}>{selectedSpot.incidentsYear}</span>
                  </div>
                  <div className="flex-between" style={{ padding: '0.5rem', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-sm)' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Fatalities:</span>
                    <span style={{ fontWeight: 700, color: '#ef4444' }}>{selectedSpot.fatalities}</span>
                  </div>
                </div>

                <Button variant="primary" style={{ width: '100%' }} icon={Eye}>
                  Simulate Corridor Intervention
                </Button>
              </div>
            ) : (
              <p style={{ color: 'var(--text-subtle)', fontSize: '0.85rem' }}>Select a blackspot pin on the map to inspect spatial telemetry.</p>
            )}
          </Card>

          <Card title="Detected Cluster List">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxHeight: '240px', overflowY: 'auto' }}>
              {mockBlackspots.map((spot) => (
                <div
                  key={spot.id}
                  onClick={() => setSelectedSpot(spot)}
                  style={{
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    background: selectedSpot?.id === spot.id ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255,255,255,0.02)',
                    border: selectedSpot?.id === spot.id ? '1px solid var(--primary)' : '1px solid var(--bg-card-border)',
                    cursor: 'pointer',
                  }}
                >
                  <div className="flex-between">
                    <span style={{ fontSize: '0.825rem', fontWeight: 600 }}>{spot.location}</span>
                    <Badge variant={spot.status.toLowerCase()}>{spot.riskScore}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
