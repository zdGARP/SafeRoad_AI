import React, { useState } from 'react';
import { Sliders, Play, RotateCcw, TrendingDown, Sparkles } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const ImpactSimulationPage = () => {
  const [speedLimitReduce, setSpeedLimitReduce] = useState(10); // km/h reduction
  const [cameraDensity, setCameraDensity] = useState(60); // % coverage
  const [rumbleStrips, setRumbleStrips] = useState(80); // % coverage
  const [lighting, setLighting] = useState(70); // % illumination

  // Simulated Calculation
  const simulatedFatalityReduction = Math.min(
    65,
    Math.round(speedLimitReduce * 2.2 + cameraDensity * 0.25 + rumbleStrips * 0.15 + lighting * 0.12)
  );

  const simulationData = [
    { metric: 'Baseline Incidents', current: 100, simulated: 100 - simulatedFatalityReduction * 0.8 },
    { metric: 'Fatalities Index', current: 100, simulated: 100 - simulatedFatalityReduction },
    { metric: 'High-Speed Crashes', current: 100, simulated: 100 - simulatedFatalityReduction * 1.15 },
  ];

  return (
    <div>
      <PageHeader
        title="What-If Impact Simulation Sandbox"
        subtitle="Simulate policy, speed enforcement, and infrastructure investments to estimate projected crash reduction."
        badgeText="AI Simulation Core"
        breadcrumbs={['Home', 'Impact Simulation']}
      />

      <div className="grid-2" style={{ marginBottom: '1.75rem' }}>
        {/* Controls Sandbox */}
        <Card title="Simulation Variables & Policy Controls">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div className="flex-between" style={{ marginBottom: '0.4rem' }}>
                <label className="form-label" style={{ margin: 0 }}>Speed Limit Reduction (km/h)</label>
                <span style={{ fontWeight: 700, color: 'var(--primary)' }}>-{speedLimitReduce} km/h</span>
              </div>
              <input
                type="range"
                min="0"
                max="30"
                step="5"
                value={speedLimitReduce}
                onChange={(e) => setSpeedLimitReduce(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--primary)' }}
              />
            </div>

            <div>
              <div className="flex-between" style={{ marginBottom: '0.4rem' }}>
                <label className="form-label" style={{ margin: 0 }}>Speed Camera Density (% Corridor)</label>
                <span style={{ fontWeight: 700, color: 'var(--secondary)' }}>{cameraDensity}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={cameraDensity}
                onChange={(e) => setCameraDensity(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--secondary)' }}
              />
            </div>

            <div>
              <div className="flex-between" style={{ marginBottom: '0.4rem' }}>
                <label className="form-label" style={{ margin: 0 }}>Rumble Strip & Friction Surfacing</label>
                <span style={{ fontWeight: 700, color: '#f59e0b' }}>{rumbleStrips}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={rumbleStrips}
                onChange={(e) => setRumbleStrips(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#f59e0b' }}
              />
            </div>

            <div>
              <div className="flex-between" style={{ marginBottom: '0.4rem' }}>
                <label className="form-label" style={{ margin: 0 }}>Night Illumination & Solar Delineators</label>
                <span style={{ fontWeight: 700, color: '#10b981' }}>{lighting}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="10"
                value={lighting}
                onChange={(e) => setLighting(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#10b981' }}
              />
            </div>

            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
              <Button variant="primary" icon={Play} style={{ flex: 1 }}>
                Execute Simulation
              </Button>
              <Button
                variant="secondary"
                icon={RotateCcw}
                onClick={() => {
                  setSpeedLimitReduce(10);
                  setCameraDensity(60);
                  setRumbleStrips(80);
                  setLighting(70);
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Real-time Output Impact Prediction */}
        <Card title="Projected Safety Impact Result" glow>
          <div className="flex-center flex-col" style={{ padding: '1.5rem 0', textAlign: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Projected Fatality Reduction Rate</span>
            <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#10b981', fontFamily: 'Outfit', lineHeight: 1.1, margin: '0.5rem 0' }}>
              -{simulatedFatalityReduction.toFixed(1)}%
            </div>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-main)', maxWidth: '380px' }}>
              Applying these policy and infrastructure parameters is estimated to save approximately{' '}
              <strong style={{ color: 'var(--primary)' }}>{(simulatedFatalityReduction * 18.5).toFixed(0)} lives per year</strong> across selected corridors.
            </p>
          </div>

          <div style={{ height: '220px', width: '100%', marginTop: '1rem' }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={simulationData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="metric" stroke="var(--text-subtle)" fontSize={11} />
                <YAxis stroke="var(--text-subtle)" fontSize={11} domain={[0, 110]} />
                <Tooltip contentStyle={{ background: '#0f172a', borderColor: 'var(--bg-card-border)', borderRadius: '8px' }} />
                <Bar dataKey="current" name="Baseline Risk Index (100)" fill="#ef4444" radius={[4, 4, 0, 0]} />
                <Bar dataKey="simulated" name="Simulated Post-Intervention Risk Index" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
