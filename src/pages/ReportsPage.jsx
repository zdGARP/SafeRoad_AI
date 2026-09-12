import React, { useState } from 'react';
import { FileText, Download, Printer, CheckCircle2, MapPin, Sparkles, AlertTriangle } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { mockLocations } from '../data/locationsData';

export const ReportsPage = () => {
  const [selectedLocId, setSelectedLocId] = useState('LOC-CHENNAI-04');
  const [generated, setGenerated] = useState(false);

  const loc = mockLocations.find((l) => l.id === selectedLocId) || mockLocations[0];

  const handleGenerate = () => {
    setGenerated(true);
    setTimeout(() => setGenerated(false), 2500);
  };

  return (
    <div>
      <PageHeader
        title="Authority Safety Decision-Maker Report"
        subtitle="Comprehensive synthesized briefing document formatted for highway authorities and municipal councils."
        badgeText="Decision Briefing"
        badgeVariant="primary"
        breadcrumbs={['Home', 'Reports']}
        actions={
          <>
            <Button variant="secondary" icon={Printer} onClick={() => window.print()}>
              Print Briefing
            </Button>
            <Button variant="primary" icon={Download} onClick={handleGenerate}>
              {generated ? 'Report Generated!' : 'Export PDF'}
            </Button>
            <Button variant="outline" icon={Download} onClick={handleGenerate}>
              Export CSV
            </Button>
          </>
        }
      />

      {/* Location Selector */}
      <div className="gov-card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <MapPin size={16} style={{ color: 'var(--primary)' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Select Corridor for Briefing Report:</span>
          <select
            className="gov-select"
            value={selectedLocId}
            onChange={(e) => setSelectedLocId(e.target.value)}
            style={{ height: '36px', width: 'auto', fontSize: '0.85rem' }}
          >
            {mockLocations.map((l) => (
              <option key={l.id} value={l.id}>
                {l.name} ({l.city})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Professional Formal Decision-Maker Report Layout (Prompt 15 Specifications) */}
      <Card title={`OFFICIAL SAFETY AUDIT BRIEFING — ${loc.name.toUpperCase()}`}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '0.5rem 0' }}>
          
          {/* Section 1: Location & Risk Overview */}
          <div style={{ borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-subtle)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              1. Location & Jurisdiction Profile
            </h4>
            <div className="grid-4" style={{ gap: '0.75rem' }}>
              <div><strong>Location:</strong> {loc.name}</div>
              <div><strong>Jurisdiction:</strong> {loc.city}, {loc.state}</div>
              <div><strong>Road Type:</strong> {loc.roadType}</div>
              <div>
                <strong>Risk Score:</strong> <span style={{ fontWeight: 800 }}>{loc.riskScore} / 100</span> <Badge variant={loc.riskLevel} />
              </div>
            </div>
          </div>

          {/* Section 2: Accident Statistics */}
          <div style={{ borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-subtle)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              2. Recorded Accident Statistics
            </h4>
            <div className="grid-3" style={{ gap: '0.75rem' }}>
              <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Total Crashes:</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{loc.accidents} Incidents</div>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Fatalities:</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--risk-critical)' }}>{loc.fatalities} Lives</div>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Injuries:</span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--risk-medium)' }}>{loc.injuries} Casualties</div>
              </div>
            </div>
          </div>

          {/* Section 3: Cause & Vulnerability Breakdown */}
          <div style={{ borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '1rem' }}>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-subtle)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              3. Cause Analysis & Vulnerable Road Users
            </h4>
            <div className="grid-2" style={{ gap: '1rem' }}>
              <div>
                <strong>Primary Cause Vectors:</strong>
                <ul style={{ paddingLeft: '1.25rem', marginTop: '0.35rem', fontSize: '0.85rem' }}>
                  {loc.causes.map((c, idx) => (
                    <li key={idx}>{c.cause}: <strong>{c.percentage}%</strong></li>
                  ))}
                </ul>
              </div>
              <div>
                <strong>Vulnerable User Exposure:</strong>
                <p style={{ fontSize: '0.85rem', marginTop: '0.35rem' }}>
                  {loc.vulnerableUsers}
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Future Risk Prediction & Countermeasures */}
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--text-subtle)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              4. Future Predictive Forecast & Countermeasures
            </h4>
            <div className="grid-2" style={{ gap: '1rem' }}>
              <div style={{ background: 'var(--primary-subtle)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.2rem' }}>AI Model Forecast:</div>
                <p style={{ fontSize: '0.825rem', lineHeight: '1.4' }}>
                  Predicted 30-Day Risk Score: <strong>{loc.predictedRisk}/100</strong> ({loc.predictionConfidence}% Confidence).
                </p>
              </div>
              <div style={{ background: 'var(--bg-surface)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.2rem' }}>Recommended Intervention:</div>
                <p style={{ fontSize: '0.825rem', lineHeight: '1.4' }}>
                  {loc.intervention}
                </p>
              </div>
            </div>
          </div>

        </div>
      </Card>
    </div>
  );
};
