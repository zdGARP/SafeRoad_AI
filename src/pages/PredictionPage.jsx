import React, { useState, useEffect } from 'react';
import { BrainCircuit, Sparkles, TrendingUp, Calendar, MapPin, Cpu, ShieldCheck } from 'lucide-react';
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
import { Button } from '../components/common/Button';
import { RiskScoreCard } from '../components/common/RiskScoreCard';
import { AIInsightCard } from '../components/common/AIInsightCard';
import { predictionService } from '../services/predictionService';
import { riskService } from '../services/riskService';

export const PredictionPage = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocId, setSelectedLocId] = useState('LOC-CHENNAI-04');
  const [period, setPeriod] = useState('7d');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    riskService.getLocations().then((locs) => setLocations(locs));
  }, []);

  useEffect(() => {
    setLoading(true);
    predictionService.getPrediction(selectedLocId, period).then((data) => {
      setPrediction(data);
      setLoading(false);
    });
  }, [selectedLocId, period]);

  return (
    <div>
      <PageHeader
        title="AI Future Accident Risk Prediction"
        subtitle="Machine learning forecasting models predicting accident probability up to 90 days in advance."
        badgeText="Model Prediction"
        badgeVariant="primary"
        breadcrumbs={['Home', 'Risk Prediction']}
      />

      {/* Filter Bar for Prompt 12 */}
      <div className="gov-card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MapPin size={16} style={{ color: 'var(--primary)' }} />
            <select
              className="gov-select"
              value={selectedLocId}
              onChange={(e) => setSelectedLocId(e.target.value)}
              style={{ height: '36px', width: 'auto', fontSize: '0.85rem' }}
            >
              {locations.map((loc) => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.city})
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={16} style={{ color: 'var(--primary)' }} />
            <span style={{ fontSize: '0.825rem', fontWeight: 600 }}>Prediction Period:</span>
            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <Button
                variant={period === '7d' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setPeriod('7d')}
              >
                7 Days
              </Button>
              <Button
                variant={period === '30d' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setPeriod('30d')}
              >
                30 Days
              </Button>
              <Button
                variant={period === '90d' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setPeriod('90d')}
              >
                90 Days
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Prompt 12 Specs: 4 Metric Displays (Current Risk, Predicted Risk, Prediction Confidence, Trend) */}
      {prediction && (
        <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
          <RiskScoreCard
            label="Current Risk Score"
            score={prediction.currentRisk}
            subtitle="Baseline Historical Index"
          />
          <RiskScoreCard
            label="Predicted Risk Score"
            score={prediction.predictedRisk}
            subtitle="Model Forecast Projection"
          />
          <Card>
            <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Prediction Confidence
            </span>
            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.1, marginTop: '0.2rem' }}>
              {prediction.confidence}%
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.35rem', display: 'block' }}>
              Model Prediction Certainty
            </span>
          </Card>
          <Card>
            <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)' }}>
              Risk Trend Vector
            </span>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, marginTop: '0.2rem' }}>
              {prediction.trend}
            </div>
            <Badge variant={prediction.trendLevel} />
          </Card>
        </div>
      )}

      {/* AI Model Disclaimer & Insight */}
      <div style={{ marginBottom: '1.5rem' }}>
        <AIInsightCard
          title="Neural Model Risk Disclaimer"
          insight="AI predictive risk scores are computed using machine learning models combining historical accident frequency, weather forecasts, time-of-day traffic volume, and road geometry variables. Model predictions represent probability indicators for resource prioritization and are not guaranteed factual outcomes."
        />
      </div>

      {/* Historical vs Predicted Line Chart (Prompt 12 Specification) */}
      {prediction && (
        <Card title="Historical Risk vs Model Prediction Forecast">
          <div style={{ height: '340px', width: '100%' }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={prediction.historicalVsPredicted} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color-subtle)" />
                <XAxis dataKey="period" stroke="var(--text-subtle)" fontSize={11} />
                <YAxis stroke="var(--text-subtle)" fontSize={11} domain={[50, 100]} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '6px' }} />
                <Line type="monotone" dataKey="historical" name="Historical Observed Risk" stroke="var(--text-muted)" strokeWidth={2} strokeDasharray="4 4" />
                <Line type="monotone" dataKey="predicted" name="Model Prediction" stroke="var(--risk-critical)" strokeWidth={3} dot={{ r: 5, fill: 'var(--risk-critical)' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      )}
    </div>
  );
};
