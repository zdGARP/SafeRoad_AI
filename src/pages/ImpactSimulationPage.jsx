import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sliders, Play, RotateCcw, AlertTriangle, ShieldCheck, CheckSquare, Square, Award, Sparkles } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { interventionService } from '../services/interventionService';
import { mockInterventionsList } from '../data/interventionData';

export const ImpactSimulationPage = () => {
  const routerLocation = useLocation();
  const initialId = routerLocation.state?.initialInterventionId || 'INT-SPEED-01';

  const [selectedIds, setSelectedIds] = useState([initialId, 'INT-LIGHT-02']);
  const [baseAccidents, setBaseAccidents] = useState(142);
  const [simulationResult, setSimulationResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const toggleIntervention = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  const runSimulation = () => {
    setLoading(true);
    interventionService.simulateImpact(selectedIds, baseAccidents).then((result) => {
      setSimulationResult(result);
      setLoading(false);
    });
  };

  useEffect(() => {
    runSimulation();
  }, []);

  return (
    <div>
      <PageHeader
        title="Intervention Impact Simulation Sandbox"
        subtitle="Interactive policy sandbox allowing authorities to evaluate multi-intervention combinations prior to resource allocation."
        badgeText="Simulation Sandbox"
        badgeVariant="primary"
        breadcrumbs={['Home', 'Impact Simulation']}
      />

      {/* Prompt 14 Specification: Explicit Prototype Simulation Disclaimer */}
      <div
        style={{
          background: 'var(--risk-medium-bg)',
          border: '1px solid var(--risk-medium-border)',
          padding: '0.85rem 1rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
        }}
      >
        <Badge variant="medium">Prototype Simulation</Badge>
        <span style={{ fontSize: '0.825rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
          Disclaimer: This simulation tool provides multi-countermeasure compounding estimates for scenario comparison. Do not claim that the estimated intervention effect is scientifically validated.
        </span>
      </div>

      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        {/* Intervention Selection Checkboxes (Prompt 14 Specification) */}
        <Card title="Select Countermeasures for Combination Analysis">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.25rem' }}>
            {mockInterventionsList.map((item) => {
              const isChecked = selectedIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleIntervention(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)',
                    background: isChecked ? 'var(--primary-subtle)' : 'var(--bg-surface)',
                    border: isChecked ? '1px solid var(--primary)' : '1px solid var(--border-color-subtle)',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ marginTop: '2px', color: isChecked ? 'var(--primary)' : 'var(--text-subtle)' }}>
                    {isChecked ? <CheckSquare size={18} /> : <Square size={18} />}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div className="flex-between">
                      <strong style={{ fontSize: '0.9rem', color: 'var(--text-main)' }}>{item.name}</strong>
                      <span style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--risk-low)' }}>
                        -{item.expectedReduction}%
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                      {item.reason}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', gap: '0.75rem' }}>
            <Button
              variant="primary"
              icon={Play}
              loading={loading}
              onClick={runSimulation}
              style={{ flex: 1 }}
            >
              RUN SIMULATION
            </Button>
            <Button variant="secondary" icon={RotateCcw} onClick={() => setSelectedIds([])}>
              Clear
            </Button>
          </div>
        </Card>

        {/* Simulation Output & Ranked Priority (Prompt 14 Specification) */}
        <Card title="Simulation Results & Priority Ranking">
          {simulationResult ? (
            <div>
              <div className="grid-3" style={{ marginBottom: '1.25rem', gap: '0.5rem' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-subtle)' }}>Current Accidents</span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>{simulationResult.baseAccidentCount}</div>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-subtle)' }}>Predicted Accidents</span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {simulationResult.predictedAccidentCount}
                  </div>
                </div>

                <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-subtle)' }}>Estimated Reduction</span>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--risk-low)' }}>
                    {simulationResult.totalReductionPercent}%
                  </div>
                </div>
              </div>

              {/* Recommended Priority Rankings */}
              <h4 style={{ fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.75rem' }}>
                Recommended Priority Ranking
              </h4>

              {simulationResult.rankedInterventions.length === 0 ? (
                <p style={{ fontSize: '0.825rem', color: 'var(--text-subtle)' }}>Select at least one intervention on the left and click RUN SIMULATION.</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {simulationResult.rankedInterventions.map((item, idx) => (
                    <div
                      key={item.id}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'var(--bg-surface)',
                        border: '1px solid var(--border-color-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span
                          style={{
                            width: 22,
                            height: 22,
                            borderRadius: '50%',
                            background: 'var(--primary)',
                            color: '#fff',
                            fontWeight: 800,
                            fontSize: '0.75rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          {idx + 1}
                        </span>
                        <span style={{ fontSize: '0.85rem', fontWeight: 700 }}>{item.name}</span>
                      </div>
                      <Badge variant={item.priority === 'Very High' ? 'critical' : 'high'}>
                        {item.priority} Priority
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p style={{ fontSize: '0.85rem', color: 'var(--text-subtle)' }}>Click RUN SIMULATION to compute policy combination impact.</p>
          )}
        </Card>
      </div>
    </div>
  );
};
