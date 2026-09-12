import React, { useState, useEffect } from 'react';
import {
  AlertTriangle,
  Activity,
  Users,
  MapPin,
  ArrowUpRight,
  Download,
  Sparkles,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { FilterBar } from '../components/filters/FilterBar';
import { ChartContainer } from '../components/charts/ChartContainer';
import { AIInsightCard } from '../components/common/AIInsightCard';
import { riskService } from '../services/riskService';
import { analyticsService } from '../services/analyticsService';

const monthlyAccidentData = [
  { month: 'Jan', accidents: 3410, fatalities: 890, injuries: 2520 },
  { month: 'Feb', accidents: 3150, fatalities: 810, injuries: 2340 },
  { month: 'Mar', accidents: 2980, fatalities: 760, injuries: 2220 },
  { month: 'Apr', accidents: 2850, fatalities: 720, injuries: 2130 },
  { month: 'May', accidents: 3120, fatalities: 790, injuries: 2330 },
  { month: 'Jun', accidents: 3350, fatalities: 850, injuries: 2500 },
  { month: 'Jul', accidents: 3100, fatalities: 780, injuries: 2320 },
  { month: 'Aug', accidents: 2821, fatalities: 712, injuries: 2109 },
];

export const DashboardPage = () => {
  const [locations, setLocations] = useState([]);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      riskService.getLocations(),
      analyticsService.getAccidentSummary(),
    ]).then(([locs, sum]) => {
      setLocations(locs);
      setSummary(sum);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <PageHeader
        title="Road Safety Intelligence Dashboard"
        subtitle="Monitor, predict and prioritize road safety interventions."
        badgeText="National Portal"
        badgeVariant="primary"
        breadcrumbs={['Home', 'Dashboard']}
        actions={
          <Button variant="primary" icon={Download}>
            Export Executive Report
          </Button>
        }
      />

      <FilterBar />

      {/* Prompt 6 Specification: 4 Main KPI Cards */}
      {summary && (
        <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
          <StatCard
            title="Total Accidents"
            value={summary.totalAccidents.toLocaleString()}
            changePercent={summary.accidentsChange}
            trendDirection="down"
            comparisonPeriod={summary.comparisonPeriod}
            icon={AlertTriangle}
          />
          <StatCard
            title="Fatalities"
            value={summary.fatalities.toLocaleString()}
            changePercent={summary.fatalitiesChange}
            trendDirection="down"
            comparisonPeriod={summary.comparisonPeriod}
            icon={Activity}
          />
          <StatCard
            title="Injuries"
            value={summary.injuries.toLocaleString()}
            changePercent={summary.injuriesChange}
            trendDirection="down"
            comparisonPeriod={summary.comparisonPeriod}
            icon={Users}
          />
          <StatCard
            title="High-Risk Locations"
            value={summary.highRiskLocations}
            changePercent={summary.locationsChange}
            trendDirection="down"
            comparisonPeriod={summary.comparisonPeriod}
            icon={MapPin}
          />
        </div>
      )}

      {/* Diagnostic Coverage (WHERE, WHY, WHO, WHEN, WHAT, IMPACT) */}
      <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
        <div style={{ gridColumn: 'span 2' }}>
          <ChartContainer
            title="Accident & Fatality Trend Overview"
            subtitle="Monthly crash records and fatality counts across monitored corridors"
            height={300}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyAccidentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAccidents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1d4ed8" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1d4ed8" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color-subtle)" />
                <XAxis dataKey="month" stroke="var(--text-subtle)" fontSize={11} />
                <YAxis stroke="var(--text-subtle)" fontSize={11} />
                <Tooltip contentStyle={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '6px' }} />
                <Area type="monotone" dataKey="accidents" name="Total Accidents" stroke="#1d4ed8" fillOpacity={1} fill="url(#colorAccidents)" strokeWidth={2} />
                <Area type="monotone" dataKey="fatalities" name="Fatalities" stroke="#dc2626" fillOpacity={1} fill="transparent" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        <div>
          <Card title="AI Diagnostic Synthesis">
            <AIInsightCard
              insight="Overspeeding on non-segregated urban merges accounts for 38% of critical incidents recorded this period."
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem', marginTop: '1rem' }}>
              <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-subtle)' }}>WHERE:</span>
                <span style={{ fontWeight: 600 }}>National Highways (48.2%)</span>
              </div>
              <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-subtle)' }}>WHEN:</span>
                <span style={{ fontWeight: 600 }}>16:00 – 20:00 Peak</span>
              </div>
              <div className="flex-between" style={{ borderBottom: '1px solid var(--border-color-subtle)', paddingBottom: '0.4rem' }}>
                <span style={{ color: 'var(--text-subtle)' }}>WHO:</span>
                <span style={{ fontWeight: 600 }}>Two-Wheelers (48%)</span>
              </div>
              <div className="flex-between">
                <span style={{ color: 'var(--text-subtle)' }}>IMPACT:</span>
                <span style={{ fontWeight: 700, color: 'var(--risk-low)' }}>-4.2% Reduction YTD</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* High Risk Corridors Table */}
      <Card title="Top Priority High-Risk Locations">
        <div className="table-responsive">
          <table className="gov-table">
            <thead>
              <tr>
                <th>Location Identifier</th>
                <th>State Jurisdiction</th>
                <th>Risk Score</th>
                <th>Risk Classification</th>
                <th>Accidents / Fatalities</th>
                <th>Primary Contributing Factor</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {locations.map((row) => (
                <tr key={row.id}>
                  <td style={{ fontWeight: 700 }}>{row.name}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{row.state}</td>
                  <td style={{ fontWeight: 800 }}>{row.riskScore} / 100</td>
                  <td>
                    <Badge variant={row.riskLevel} />
                  </td>
                  <td>
                    <strong>{row.accidents}</strong> accidents • <span style={{ color: 'var(--risk-critical)', fontWeight: 700 }}>{row.fatalities} fatalities</span>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{row.causes[0]?.cause}</td>
                  <td>
                    <Button variant="outline" size="sm" icon={ArrowUpRight}>
                      Inspect Location
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
