import React from 'react';
import { Wrench, CheckCircle2, Clock, ShieldCheck, AlertTriangle, Plus } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

const mockInterventions = [
  { id: 'INT-01', title: 'High-Friction Friction Surfacing & Solar Delineators', corridor: 'NH-44 KM 142-148', type: 'Engineering', status: 'In Execution', progress: 65, cost: '₹1.2 Cr', targetLives: 28 },
  { id: 'INT-02', title: 'Speed Enforcement ANPR Camera Grid', corridor: 'Mumbai-Pune Exp KM 38', type: 'Enforcement', status: 'Completed', progress: 100, cost: '₹85 Lakhs', targetLives: 42 },
  { id: 'INT-03', title: 'Pedestrian Grade-Separated Foot Overbridge', corridor: 'ORR Bengaluru Marathahalli', type: 'Engineering', status: 'Proposed', progress: 15, cost: '₹3.4 Cr', targetLives: 19 },
  { id: 'INT-04', title: 'Rumble Strips & Warning Gantry Refurbishment', corridor: 'Yamuna Expressway KM 74', type: 'Engineering', status: 'In Audit', progress: 40, cost: '₹45 Lakhs', targetLives: 14 },
];

export const InterventionsPage = () => {
  return (
    <div>
      <PageHeader
        title="Safety Interventions Manager"
        subtitle="Tracking multi-agency engineering, enforcement, and education safety countermeasures."
        badgeText="Intervention Operations"
        breadcrumbs={['Home', 'Interventions']}
        actions={<Button variant="primary" icon={Plus}>Propose New Intervention</Button>}
      />

      <div className="grid-4" style={{ marginBottom: '1.75rem' }}>
        <Card glow>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Countermeasures</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem', color: 'var(--primary)' }}>64</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Across 18 States</span>
        </Card>
        <Card glow>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Completed Interventions</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem', color: '#10b981' }}>128</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Avg 38% Fatality Drop</span>
        </Card>
        <Card glow>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Allocated Budget</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem', color: 'var(--secondary)' }}>₹48.5 Cr</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Central Road & Infrastructure Fund</span>
        </Card>
        <Card glow>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Estimated Lives Saved / Yr</span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, marginTop: '0.2rem', color: '#f59e0b' }}>340+ Lives</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>AI Predicted Impact</span>
        </Card>
      </div>

      <Card title="Active & Proposed Countermeasure Register">
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Intervention Measure</th>
                <th>Target Corridor</th>
                <th>Category</th>
                <th>Status</th>
                <th>Est. Cost</th>
                <th>Est. Lives Saved</th>
              </tr>
            </thead>
            <tbody>
              {mockInterventions.map((item) => (
                <tr key={item.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-subtle)' }}>{item.id}</td>
                  <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{item.title}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{item.corridor}</td>
                  <td><Badge variant="neutral">{item.type}</Badge></td>
                  <td>
                    <Badge variant={item.status === 'Completed' ? 'low' : item.status === 'In Execution' ? 'primary' : 'moderate'}>
                      {item.status} ({item.progress}%)
                    </Badge>
                  </td>
                  <td style={{ fontWeight: 600 }}>{item.cost}</td>
                  <td style={{ color: '#10b981', fontWeight: 700 }}>+{item.targetLives} Lives/yr</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
