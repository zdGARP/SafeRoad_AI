import React, { useState } from 'react';
import { SearchAlert, Sparkles, AlertTriangle, Gauge, Compass, CloudRain, Eye, UserX, Wine } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { ChartContainer } from '../components/charts/ChartContainer';

const causeDistributionData = [
  { cause: 'Overspeeding', percentage: 34, color: '#dc2626', count: '157,000' },
  { cause: 'Poor Road Condition / Geometry', percentage: 22, color: '#ea580c', count: '101,500' },
  { cause: 'Poor Visibility & Fog', percentage: 15, color: '#d97706', count: '69,200' },
  { cause: 'Driver Distraction & Wrong Side', percentage: 14, color: '#1d4ed8', count: '64,500' },
  { cause: 'Drunk Driving', percentage: 8, color: '#0284c7', count: '36,900' },
  { cause: 'Monsoon Hydroplaning / Weather', percentage: 4, color: '#16a34a', count: '18,400' },
  { cause: 'Other Causes', percentage: 3, color: '#64748b', count: '13,800' },
];

const causeTrendMonthly = [
  { month: 'Jan', overspeeding: 35, fogVisibility: 28, roadCondition: 20 },
  { month: 'Feb', overspeeding: 36, fogVisibility: 22, roadCondition: 20 },
  { month: 'Mar', overspeeding: 38, fogVisibility: 12, roadCondition: 22 },
  { month: 'Apr', overspeeding: 40, fogVisibility: 8, roadCondition: 24 },
  { month: 'May', overspeeding: 42, fogVisibility: 6, roadCondition: 25 },
  { month: 'Jun', overspeeding: 39, fogVisibility: 10, roadCondition: 28 },
  { month: 'Jul', overspeeding: 34, fogVisibility: 14, roadCondition: 32 },
  { month: 'Aug', overspeeding: 34, fogVisibility: 15, roadCondition: 30 },
];

export const CausesPage = () => {
  const [selectedLocation, setSelectedLocation] = useState('Chennai NH Junction 04');
  const [selectedYear, setSelectedYear] = useState('2026');

  return (
    <div>
      <PageHeader
        title="Accident Cause Analysis & Attribution Engine"
        subtitle="Identifying contributing crash factors to understand why high-risk locations exhibit elevated hazard scores."
        badgeText="Root-Cause AI"
        badgeVariant="primary"
        breadcrumbs={['Home', 'Cause Analysis']}
      />

      {/* Filter Bar for Prompt 10 */}
      <div className="gov-card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center' }}>
          <select className="gov-select" value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} style={{ height: '36px', width: 'auto', fontSize: '0.825rem' }}>
            <option value="Chennai NH Junction 04">Location: Chennai NH Junction 04</option>
            <option value="NH-44 Ambala Section">Location: NH-44 Ambala Section</option>
            <option value="Mumbai-Pune Exp KM 38">Location: Mumbai-Pune Exp KM 38</option>
            <option value="All Locations">All Monitored Corridors</option>
          </select>

          <select className="gov-select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} style={{ height: '36px', width: 'auto', fontSize: '0.825rem' }}>
            <option value="2026">Year: 2026 YTD</option>
            <option value="2025">Year: 2025</option>
            <option value="2024">Year: 2024</option>
          </select>

          <select className="gov-select" style={{ height: '36px', width: 'auto', fontSize: '0.825rem' }}>
            <option value="All">All Road Types</option>
            <option value="NH">National Highways</option>
            <option value="SH">State Highways</option>
          </select>

          <select className="gov-select" style={{ height: '36px', width: 'auto', fontSize: '0.825rem' }}>
            <option value="All">All Vehicle Types</option>
            <option value="TwoWheeler">Two-Wheelers</option>
            <option value="Truck">Commercial Freight</option>
          </select>
        </div>
      </div>

      {/* Prompt 10 Specification: AI Insight Card */}
      <div className="gov-card" style={{ marginBottom: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Sparkles size={18} style={{ color: 'var(--primary)' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase' }}>
            AI-Generated Cause Attribution Synthesis
          </span>
        </div>
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '0.4rem' }}>
          "34% of recorded accidents at {selectedLocation} are associated with overspeeding."
        </h3>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: '0.875rem', marginTop: '0.5rem' }}>
          <div>
            <span style={{ color: 'var(--text-subtle)' }}>Primary Contributing Factor: </span>
            <strong style={{ color: 'var(--risk-critical)' }}>Overspeeding</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-subtle)' }}>Secondary Factor: </span>
            <strong style={{ color: 'var(--risk-medium)' }}>Poor Road Geometry (22%)</strong>
          </div>
          <div>
            <span style={{ color: 'var(--text-subtle)' }}>AI Confidence Score: </span>
            <strong style={{ color: 'var(--risk-low)' }}>94.2%</strong>
          </div>
        </div>
      </div>

      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        {/* Cause Breakdown Donut Chart */}
        <ChartContainer title="Accident Cause Distribution Share (%)" subtitle="Breakdown of primary recorded crash triggers" height={320}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={causeDistributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3} dataKey="percentage">
                {causeDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '6px' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Cause Volume Bar Chart */}
        <ChartContainer title="Accident Count by Cause Vector" subtitle="Incidents categorized by primary attribution factor" height={320}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={causeDistributionData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color-subtle)" />
              <XAxis type="number" stroke="var(--text-subtle)" fontSize={11} />
              <YAxis dataKey="cause" type="category" stroke="var(--text-subtle)" fontSize={11} width={130} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '6px' }} />
              <Bar dataKey="percentage" name="Share (%)" fill="#1d4ed8" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* Cause Monthly Trend Line Chart */}
      <div className="grid-1">
        <ChartContainer title="Monthly Shift in Primary Cause Factors" subtitle="Seasonal variations in overspeeding, winter fog, and monsoon road conditions" height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={causeTrendMonthly} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color-subtle)" />
              <XAxis dataKey="month" stroke="var(--text-subtle)" fontSize={11} />
              <YAxis stroke="var(--text-subtle)" fontSize={11} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '6px' }} />
              <Line type="monotone" dataKey="overspeeding" name="Overspeeding (%)" stroke="#dc2626" strokeWidth={2} />
              <Line type="monotone" dataKey="fogVisibility" name="Poor Visibility / Fog (%)" stroke="#d97706" strokeWidth={2} />
              <Line type="monotone" dataKey="roadCondition" name="Poor Road Condition (%)" stroke="#1d4ed8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </div>
  );
};
