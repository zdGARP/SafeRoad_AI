import React from 'react';
import { BrainCircuit, Sparkles, AlertOctagon, TrendingUp, Cpu } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { ChartContainer } from '../components/charts/ChartContainer';

const predictionForecastData = [
  { day: 'Day 1 (Mon)', actual: 120, predicted: 124, riskLevel: 'Moderate' },
  { day: 'Day 2 (Tue)', actual: 115, predicted: 118, riskLevel: 'Moderate' },
  { day: 'Day 3 (Wed)', actual: 108, predicted: 110, riskLevel: 'Low' },
  { day: 'Day 4 (Thu)', actual: 130, predicted: 135, riskLevel: 'High' },
  { day: 'Day 5 (Fri)', actual: 165, predicted: 170, riskLevel: 'Critical (Weekend Peak)' },
  { day: 'Day 6 (Sat)', actual: 180, predicted: 185, riskLevel: 'Critical' },
  { day: 'Day 7 (Sun)', actual: 172, predicted: 178, riskLevel: 'Critical' },
];

export const PredictionPage = () => {
  return (
    <div>
      <PageHeader
        title="AI Risk Prediction Engine"
        subtitle="Machine learning forecasting models predicting accident probability up to 30 days in advance."
        badgeText="Neural Predictive Model v4.2"
        badgeVariant="primary"
        breadcrumbs={['Home', 'Risk Prediction']}
      />

      <div className="grid-3" style={{ marginBottom: '1.75rem' }}>
        <Card glow>
          <div className="flex-between">
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>AI Forecast Accuracy</span>
            <Sparkles size={20} style={{ color: 'var(--secondary)' }} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.4rem 0', color: '#10b981' }}>
            94.8%
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
            Validated against 120,000 historical MoRTH accident records.
          </p>
        </Card>

        <Card glow>
          <div className="flex-between">
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>High-Probability Warning Corridors</span>
            <AlertOctagon size={20} style={{ color: '#ef4444' }} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.4rem 0', color: '#ef4444' }}>
            14 Corridors
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
            Predicted &gt;80% accident probability in next 72 hours.
          </p>
        </Card>

        <Card glow>
          <div className="flex-between">
            <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Neural Features</span>
            <Cpu size={20} style={{ color: 'var(--primary)' }} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 800, margin: '0.4rem 0', color: 'var(--primary)' }}>
            48 Variables
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>
            Weather API, satellite imagery, traffic flow telemetry & pavement condition.
          </p>
        </Card>
      </div>

      <ChartContainer
        title="7-Day Forward Accident Prediction vs Baseline"
        subtitle="AI predicted daily incident volume for coming week"
        height={340}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={predictionForecastData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="day" stroke="var(--text-subtle)" fontSize={11} />
            <YAxis stroke="var(--text-subtle)" fontSize={11} />
            <Tooltip contentStyle={{ background: '#0f172a', borderColor: 'var(--bg-card-border)', borderRadius: '8px' }} />
            <Line type="monotone" dataKey="actual" name="Historical Baseline" stroke="#64748b" strokeWidth={2} strokeDasharray="5 5" />
            <Line type="monotone" dataKey="predicted" name="AI Predicted Count" stroke="#ef4444" strokeWidth={3} dot={{ r: 5, fill: '#ef4444' }} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    </div>
  );
};
