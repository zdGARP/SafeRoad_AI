import React from 'react';
import { BarChart3, PieChart, TrendingUp, Clock, Truck, Shield } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { FilterBar } from '../components/filters/FilterBar';
import { ChartContainer } from '../components/charts/ChartContainer';

const timeOfDayData = [
  { time: '00:00 - 04:00', accidents: 620, severity: 'High (Night Freight)' },
  { time: '04:00 - 08:00', accidents: 850, severity: 'Critical (Early Fog)' },
  { time: '08:00 - 12:00', accidents: 1240, severity: 'Moderate (Morning Peak)' },
  { time: '12:00 - 16:00', accidents: 980, severity: 'Moderate' },
  { time: '16:00 - 20:00', accidents: 1560, severity: 'Critical (Evening Peak)' },
  { time: '20:00 - 24:00', accidents: 1120, severity: 'High' },
];

const vehicleCategoryData = [
  { name: 'Two-Wheelers', value: 44, color: '#ef4444' },
  { name: 'Commercial Freight/Trucks', value: 26, color: '#f59e0b' },
  { name: 'Cars / SUVs', value: 18, color: '#6366f1' },
  { name: 'Buses', value: 7, color: '#06b6d4' },
  { name: 'Pedestrians/Cyclists', value: 5, color: '#10b981' },
];

export const AnalyticsPage = () => {
  return (
    <div>
      <PageHeader
        title="Accident Analytics Engine"
        subtitle="Deep multi-dimensional analysis of crash severity, temporal patterns, and vehicle class dynamics."
        badgeText="Analytical Core"
        breadcrumbs={['Home', 'Accident Analytics']}
      />

      <FilterBar />

      <div className="grid-2" style={{ marginBottom: '1.75rem' }}>
        {/* Time of Day Distribution */}
        <ChartContainer title="Accident Frequency by Time Window" subtitle="Incidents peak during 16:00-20:00 evening rush hours" height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={timeOfDayData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="time" stroke="var(--text-subtle)" fontSize={11} />
              <YAxis stroke="var(--text-subtle)" fontSize={11} />
              <Tooltip contentStyle={{ background: '#0f172a', borderColor: 'var(--bg-card-border)', borderRadius: '8px' }} />
              <Bar dataKey="accidents" fill="var(--primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Vehicle Type Involvement Donut Chart */}
        <ChartContainer title="Vehicle Class Involvement Share (%)" subtitle="Two-wheelers and heavy freight comprise 70% of casualties" height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
              <Pie
                data={vehicleCategoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={95}
                paddingAngle={4}
                dataKey="value"
              >
                {vehicleCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: '#0f172a', borderColor: 'var(--bg-card-border)', borderRadius: '8px' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </RePieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <Card title="Incident Breakdown Matrix">
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Time Window</th>
                <th>Accident Count</th>
                <th>Fatality Ratio</th>
                <th>Primary Vehicle Type</th>
                <th>Severity Classification</th>
              </tr>
            </thead>
            <tbody>
              {timeOfDayData.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 600 }}>{row.time}</td>
                  <td>{row.accidents}</td>
                  <td style={{ color: '#ef4444', fontWeight: 600 }}>{(row.accidents * 0.28).toFixed(0)}</td>
                  <td>{idx % 2 === 0 ? 'Two-Wheelers & Freight' : 'Cars & Light Vehicles'}</td>
                  <td style={{ color: row.severity.includes('Critical') ? '#ef4444' : '#f59e0b', fontWeight: 500 }}>
                    {row.severity}
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
