import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldCheck,
  MapPin,
  Flame,
  ArrowUpRight,
  Download,
  Users,
  Activity,
  Sparkles,
  Info,
  Clock,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  BarChart,
  Bar,
} from 'recharts';
import { PageHeader } from '../components/common/PageHeader';
import { StatCard } from '../components/common/StatCard';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { FilterBar } from '../components/filters/FilterBar';
import { ChartContainer } from '../components/charts/ChartContainer';

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

const highRiskCorridors = [
  {
    id: 'LOC-01',
    location: 'Chennai NH Junction 04',
    state: 'Tamil Nadu',
    riskScore: 87,
    riskLevel: 'critical',
    accidents: 142,
    fatalities: 38,
    primaryCause: 'Overspeeding & Heavy Merge',
    action: 'Speed Governor Audit & Signal Redesign',
  },
  {
    id: 'LOC-02',
    location: 'NH-44 KM 142 (Ambala Section)',
    state: 'Haryana',
    riskScore: 84,
    riskLevel: 'critical',
    accidents: 118,
    fatalities: 31,
    primaryCause: 'Winter Fog & Freight Speeding',
    action: 'Solar Delineator Installation',
  },
  {
    id: 'LOC-03',
    location: 'Mumbai-Pune Expressway KM 38',
    state: 'Maharashtra',
    riskScore: 78,
    riskLevel: 'high',
    accidents: 96,
    fatalities: 24,
    primaryCause: 'Sharp Curve & Brake Fade',
    action: 'High-Friction Surfacing',
  },
  {
    id: 'LOC-04',
    location: 'Outer Ring Road (Marathahalli)',
    state: 'Karnataka',
    riskScore: 68,
    riskLevel: 'high',
    accidents: 74,
    fatalities: 12,
    primaryCause: 'Pedestrian Uncontrolled Merge',
    action: 'Grade-Separated Overpass',
  },
];

export const DashboardPage = () => {
  const [filters, setFilters] = useState({ stateUt: 'All', timeRange: '30d' });

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

      {/* Global Filter Toolbar */}
      <FilterBar onFilterChange={(newFilters) => setFilters(newFilters)} />

      {/* Prompt 6 Specification: 4 Main KPI Cards */}
      <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
        <StatCard
          title="Total Accidents"
          value="24,581"
          changePercent="↓ 4.2%"
          trendDirection="down"
          comparisonPeriod="Compared with previous period"
          icon={AlertTriangle}
        />
        <StatCard
          title="Fatalities"
          value="6,412"
          changePercent="↓ 5.8%"
          trendDirection="down"
          comparisonPeriod="Compared with previous period"
          icon={Activity}
        />
        <StatCard
          title="Injuries"
          value="18,169"
          changePercent="↓ 3.1%"
          trendDirection="down"
          comparisonPeriod="Compared with previous period"
          icon={Users}
        />
        <StatCard
          title="High-Risk Locations"
          value="142"
          changePercent="↓ 8.5%"
          trendDirection="down"
          comparisonPeriod="Compared with previous period"
          icon={MapPin}
        />
      </div>

      {/* Immediate Diagnostic Coverage (WHERE, WHY, WHO, WHEN, WHAT, IMPACT) */}
      <div className="grid-3" style={{ marginBottom: '1.5rem' }}>
        {/* Main Incident & Fatality Trend Line Chart (2 Cols) */}
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

        {/* AI Insight Card (Prompt 6 & Prompt 8 Requirement) */}
        <div>
          <Card title="AI Diagnostic Synthesis">
            <div
              style={{
                background: 'var(--primary-subtle)',
                border: '1px solid var(--border-color)',
                padding: '0.75rem 1rem',
                borderRadius: 'var(--radius-sm)',
                marginBottom: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}
            >
              <Sparkles size={16} style={{ color: 'var(--primary)' }} />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--primary)' }}>
                AI-Generated Insight
              </span>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5', marginBottom: '1rem' }}>
              <strong>Primary Risk Driver:</strong> Overspeeding on non-segregated urban merges accounts for <strong>44.8%</strong> of critical incidents recorded this period.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem' }}>
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
                <span style={{ fontWeight: 600 }}>Two-Wheelers (44%)</span>
              </div>
              <div className="flex-between">
                <span style={{ color: 'var(--text-subtle)' }}>IMPACT:</span>
                <span style={{ fontWeight: 700, color: 'var(--risk-low)' }}>-4.2% Reduction YTD</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Top High-Risk Locations Table */}
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
                <th>Recommended Action</th>
              </tr>
            </thead>
            <tbody>
              {highRiskCorridors.map((row) => (
                <tr key={row.id}>
                  <td style={{ fontWeight: 700 }}>{row.location}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{row.state}</td>
                  <td style={{ fontWeight: 800 }}>{row.riskScore} / 100</td>
                  <td>
                    <Badge variant={row.riskLevel} />
                  </td>
                  <td>
                    <strong>{row.accidents}</strong> accidents • <span style={{ color: 'var(--risk-critical)', fontWeight: 700 }}>{row.fatalities} fatalities</span>
                  </td>
                  <td style={{ color: 'var(--text-muted)' }}>{row.primaryCause}</td>
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
