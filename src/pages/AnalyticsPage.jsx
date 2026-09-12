import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, MapPin, Filter, Truck, PieChart } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart as RePieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ChartContainer } from '../components/charts/ChartContainer';

const yearlyTrendData = [
  { year: '2021', accidents: 412000, fatalities: 153972, injuries: 384448 },
  { year: '2022', accidents: 461312, fatalities: 168491, injuries: 443366 },
  { year: '2023', accidents: 480652, fatalities: 173046, injuries: 463400 },
  { year: '2024', accidents: 468200, fatalities: 169200, injuries: 451000 },
  { year: '2025', accidents: 452100, fatalities: 162400, injuries: 436000 },
  { year: '2026 YTD', accidents: 310500, fatalities: 111200, injuries: 298000 },
];

const roadCategoryData = [
  { category: 'National Highways', accidents: 154200, share: '34%' },
  { category: 'State Highways', accidents: 108400, share: '24%' },
  { category: 'Expressways', accidents: 27100, share: '6%' },
  { category: 'Urban Arterials', accidents: 90300, share: '20%' },
  { category: 'Rural Roads', accidents: 72100, share: '16%' },
];

const vehicleTypeData = [
  { type: 'Two-Wheelers', value: 44, color: '#dc2626' },
  { type: 'Freight Trucks / Trailers', value: 26, color: '#ea580c' },
  { type: 'Cars / SUVs', value: 18, color: '#1d4ed8' },
  { type: 'Buses', value: 7, color: '#0284c7' },
  { type: 'Pedestrians & Non-Motorized', value: 5, color: '#16a34a' },
];

const stateComparisonData = [
  { state: 'Tamil Nadu', accidents: 64100, fatalities: 17800 },
  { state: 'Madhya Pradesh', accidents: 54400, fatalities: 13400 },
  { state: 'Uttar Pradesh', accidents: 44300, fatalities: 22600 },
  { state: 'Kerala', accidents: 43900, fatalities: 4300 },
  { state: 'Karnataka', accidents: 39800, fatalities: 11200 },
  { state: 'Maharashtra', accidents: 35400, fatalities: 15200 },
];

export const AnalyticsPage = () => {
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedRoadType, setSelectedRoadType] = useState('All');

  return (
    <div>
      <PageHeader
        title="Accident Analytics Engine"
        subtitle="Multi-dimensional historical trend analysis across years, road categories, vehicle types, and state jurisdictions."
        badgeText="Statistical Core"
        badgeVariant="primary"
        breadcrumbs={['Home', 'Analytics']}
      />

      {/* Multi-Filter Bar for Prompt 9 */}
      <div className="gov-card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.85rem', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Calendar size={15} style={{ color: 'var(--text-subtle)' }} />
            <select className="gov-select" value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)} style={{ height: '36px', fontSize: '0.825rem' }}>
              <option value="All">All Years (2021-2026)</option>
              <option value="2026">2026 YTD</option>
              <option value="2025">2025</option>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <MapPin size={15} style={{ color: 'var(--text-subtle)' }} />
            <select className="gov-select" value={selectedState} onChange={(e) => setSelectedState(e.target.value)} style={{ height: '36px', fontSize: '0.825rem' }}>
              <option value="All">All States / UTs</option>
              <option value="Tamil Nadu">Tamil Nadu</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
            </select>
          </div>

          <select className="gov-select" value={selectedRoadType} onChange={(e) => setSelectedRoadType(e.target.value)} style={{ height: '36px', width: 'auto', fontSize: '0.825rem' }}>
            <option value="All">All Road Types</option>
            <option value="NH">National Highways</option>
            <option value="SH">State Highways</option>
            <option value="EXP">Expressways</option>
          </select>

          <Button variant="secondary" size="sm" onClick={() => { setSelectedYear('All'); setSelectedState('All'); setSelectedRoadType('All'); }}>
            Reset Filters
          </Button>
        </div>
      </div>

      {/* Yearly Trend Chart: Accidents, Fatalities, Injuries */}
      <div className="grid-1" style={{ marginBottom: '1.5rem' }}>
        <ChartContainer title="Yearly Accidents, Fatalities & Injuries Comparison (2021 - 2026)" subtitle="National road crash statistics reported under MoRTH data framework" height={320}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={yearlyTrendData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color-subtle)" />
              <XAxis dataKey="year" stroke="var(--text-subtle)" fontSize={11} />
              <YAxis stroke="var(--text-subtle)" fontSize={11} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '6px' }} />
              <Bar dataKey="accidents" name="Total Accidents" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="injuries" name="Injuries" fill="#d97706" radius={[4, 4, 0, 0]} />
              <Bar dataKey="fatalities" name="Fatalities" fill="#dc2626" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        {/* Accidents by Road Category */}
        <ChartContainer title="Accidents by Road Category" subtitle="National & State Highways contribute over 58% of crashes" height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={roadCategoryData} layout="vertical" margin={{ top: 10, right: 30, left: 30, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color-subtle)" />
              <XAxis type="number" stroke="var(--text-subtle)" fontSize={11} />
              <YAxis dataKey="category" type="category" stroke="var(--text-subtle)" fontSize={11} width={110} />
              <Tooltip contentStyle={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '6px' }} />
              <Bar dataKey="accidents" name="Accidents" fill="#0284c7" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>

        {/* Vehicle Class Involvement */}
        <ChartContainer title="Accidents by Vehicle Type (%)" subtitle="Two-Wheelers and Freight Trucks represent majority share" height={300}>
          <ResponsiveContainer width="100%" height="100%">
            <RePieChart>
              <Pie data={vehicleTypeData} cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={3} dataKey="value">
                {vehicleTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ background: 'var(--bg-card)', borderColor: 'var(--border-color)', borderRadius: '6px' }} />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </RePieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>

      {/* State-Wise Comparison Table & Chart */}
      <Card title="State-Wise Safety Performance Comparison">
        <div className="table-responsive">
          <table className="gov-table">
            <thead>
              <tr>
                <th>State / UT</th>
                <th>Total Annual Accidents</th>
                <th>Total Fatalities</th>
                <th>Fatality Severity Rate (%)</th>
                <th>Primary High-Risk Highway</th>
              </tr>
            </thead>
            <tbody>
              {stateComparisonData.map((row, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700 }}>{row.state}</td>
                  <td>{row.accidents.toLocaleString()}</td>
                  <td style={{ color: 'var(--risk-critical)', fontWeight: 700 }}>{row.fatalities.toLocaleString()}</td>
                  <td style={{ fontWeight: 700 }}>{((row.fatalities / row.accidents) * 100).toFixed(1)}%</td>
                  <td style={{ color: 'var(--text-muted)' }}>NH-{idx * 4 + 16} Corridor</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
