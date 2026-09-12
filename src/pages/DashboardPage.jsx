import React, { useState } from 'react';
import {
  AlertTriangle,
  TrendingDown,
  ShieldCheck,
  MapPin,
  Flame,
  ArrowUpRight,
  Download,
  Filter,
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
  { month: 'Jan', accidents: 4120, fatalities: 1240, predictions: 4300 },
  { month: 'Feb', accidents: 3850, fatalities: 1110, predictions: 4000 },
  { month: 'Mar', accidents: 3620, fatalities: 980, predictions: 3750 },
  { month: 'Apr', accidents: 3410, fatalities: 920, predictions: 3500 },
  { month: 'May', accidents: 3890, fatalities: 1050, predictions: 3900 },
  { month: 'Jun', accidents: 4210, fatalities: 1180, predictions: 4150 },
  { month: 'Jul', accidents: 3950, fatalities: 1020, predictions: 3880 },
  { month: 'Aug', accidents: 3580, fatalities: 890, predictions: 3600 },
];

const stateRiskDistribution = [
  { state: 'Uttar Pradesh', blackspots: 48, riskScore: 88 },
  { state: 'Maharashtra', blackspots: 42, riskScore: 84 },
  { state: 'Tamil Nadu', blackspots: 39, riskScore: 81 },
  { state: 'Karnataka', blackspots: 31, riskScore: 74 },
  { state: 'Haryana', blackspots: 28, riskScore: 71 },
];

const topRiskCorridors = [
  {
    id: 'NH-44-AMB',
    corridor: 'NH-44 (Ambala - Kurukshetra)',
    state: 'Haryana',
    riskLevel: 'critical',
    predictedAccidents: '38 / mo',
    primaryFactor: 'Dense Fog & Freight Speeding',
    action: 'Audit Speed Governors',
  },
  {
    id: 'MUM-PUN-EXP',
    corridor: 'Mumbai-Pune Expressway KM 35-42',
    state: 'Maharashtra',
    riskLevel: 'high',
    predictedAccidents: '29 / mo',
    primaryFactor: 'Sharp Curve & Brake Fade',
    action: 'Install Rumble Strips',
  },
  {
    id: 'NH-16-VZG',
    corridor: 'NH-16 (Visakhapatnam Bypass)',
    state: 'Andhra Pradesh',
    riskLevel: 'high',
    predictedAccidents: '24 / mo',
    primaryFactor: 'Illegal Pedestrian Crossings',
    action: 'Construct Overpass',
  },
  {
    id: 'ORR-BLR',
    corridor: 'Outer Ring Road (Marathahalli)',
    state: 'Karnataka',
    riskLevel: 'moderate',
    predictedAccidents: '18 / mo',
    primaryFactor: 'Two-Wheeler Weaving',
    action: 'Dedicated Bike Lane',
  },
];

export const DashboardPage = () => {
  const [filterState, setFilterState] = useState({ stateUt: 'All', timeRange: '30d' });

  return (
    <div>
      <PageHeader
        title="Executive Safety Command Center"
        subtitle="Real-time AI surveillance, predictive risk scoring & blackspot analytics across Indian highway networks."
        badgeText="AI Live Feed"
        badgeVariant="primary"
        breadcrumbs={['Home', 'Dashboard']}
        actions={
          <Button variant="primary" icon={Download}>
            Export Executive Briefing
          </Button>
        }
      />

      {/* Global Filter Bar */}
      <FilterBar onFilterChange={(filters) => setFilterState(filters)} />

      {/* KPI Metrics Grid */}
      <div className="grid-4" style={{ marginBottom: '1.75rem' }}>
        <StatCard
          title="Total Recorded Incidents (YTD)"
          value="31,630"
          trend="8.4%"
          trendDirection="down"
          trendLabel="vs 2025 baseline"
          icon={AlertTriangle}
          accentColor="#ef4444"
        />
        <StatCard
          title="Lives Saved via AI Interventions"
          value="1,420"
          trend="18.2%"
          trendDirection="up"
          trendLabel="safety improvement"
          icon={ShieldCheck}
          accentColor="#10b981"
        />
        <StatCard
          title="Identified High-Risk Blackspots"
          value="188"
          subtitle="42 Critical • 86 High Severity"
          icon={Flame}
          accentColor="#f59e0b"
        />
        <StatCard
          title="Active Interventions Deployed"
          value="64"
          subtitle="32 Engineering • 18 Enforcement"
          icon={MapPin}
          accentColor="#6366f1"
        />
      </div>

      {/* Main Visualizations Grid */}
      <div className="grid-3" style={{ marginBottom: '1.75rem' }}>
        {/* Main Trend Line Chart (2 Cols Wide) */}
        <div style={{ gridColumn: 'span 2' }}>
          <ChartContainer
            title="Monthly Incident & Fatality Trend vs AI Prediction"
            subtitle="Comparing historical accident records against AI risk projection models."
            height={320}
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyAccidentData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorIncidents" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorFatalities" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis dataKey="month" stroke="var(--text-subtle)" fontSize={12} />
                <YAxis stroke="var(--text-subtle)" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    background: '#0f172a',
                    borderColor: 'var(--bg-card-border)',
                    borderRadius: '8px',
                    color: '#fff',
                  }}
                />
                <Area type="monotone" dataKey="accidents" name="Incidents" stroke="#ef4444" fillOpacity={1} fill="url(#colorIncidents)" strokeWidth={2} />
                <Area type="monotone" dataKey="fatalities" name="Fatalities" stroke="#6366f1" fillOpacity={1} fill="url(#colorFatalities)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>

        {/* State Blackspot Ranking Bar Chart (1 Col) */}
        <div>
          <ChartContainer
            title="Top State Risk Distribution"
            subtitle="Blackspots per State"
            height={320}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stateRiskDistribution} layout="vertical" margin={{ top: 10, right: 20, left: 30, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                <XAxis type="number" stroke="var(--text-subtle)" fontSize={11} />
                <YAxis dataKey="state" type="category" stroke="var(--text-subtle)" fontSize={11} width={80} />
                <Tooltip
                  contentStyle={{
                    background: '#0f172a',
                    borderColor: 'var(--bg-card-border)',
                    borderRadius: '8px',
                  }}
                />
                <Bar dataKey="blackspots" name="Blackspots" fill="#06b6d4" radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>

      {/* Critical High-Risk Corridors Table */}
      <Card title="Critical High-Risk Corridors Requiring Immediate Intervention">
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Corridor Identifier</th>
                <th>State Jurisdiction</th>
                <th>Risk Level</th>
                <th>Predicted Incidents</th>
                <th>Primary Risk Factor</th>
                <th>Recommended Action</th>
              </tr>
            </thead>
            <tbody>
              {topRiskCorridors.map((row) => (
                <tr key={row.id}>
                  <td style={{ fontWeight: 600, color: 'var(--text-main)' }}>{row.corridor}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{row.state}</td>
                  <td>
                    <Badge variant={row.riskLevel}>{row.riskLevel}</Badge>
                  </td>
                  <td style={{ fontWeight: 600, color: '#f97316' }}>{row.predictedAccidents}</td>
                  <td style={{ color: 'var(--text-muted)' }}>{row.primaryFactor}</td>
                  <td>
                    <Button variant="outline" size="sm" icon={ArrowUpRight}>
                      {row.action}
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
