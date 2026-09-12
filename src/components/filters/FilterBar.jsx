import React, { useState } from 'react';
import { Filter, Search, RotateCcw, Calendar, MapPin, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';

export const FilterBar = ({ onFilterChange, showAdvanced = true }) => {
  const [stateUt, setStateUt] = useState('All');
  const [timeRange, setTimeRange] = useState('30d');
  const [severity, setSeverity] = useState('All');
  const [roadType, setRoadType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const handleReset = () => {
    setStateUt('All');
    setTimeRange('30d');
    setSeverity('All');
    setRoadType('All');
    setSearchQuery('');
    if (onFilterChange) {
      onFilterChange({ stateUt: 'All', timeRange: '30d', severity: 'All', roadType: 'All', query: '' });
    }
  };

  const handleStateChange = (e) => {
    const val = e.target.value;
    setStateUt(val);
    if (onFilterChange) onFilterChange({ stateUt: val, timeRange, severity, roadType, query: searchQuery });
  };

  const handleTimeChange = (e) => {
    const val = e.target.value;
    setTimeRange(val);
    if (onFilterChange) onFilterChange({ stateUt, timeRange: val, severity, roadType, query: searchQuery });
  };

  return (
    <div className="glass-panel filter-bar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem' }}>
        <Filter size={18} />
        <span>Filters</span>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
        {/* Search */}
        <div style={{ position: 'relative', minWidth: '220px', flex: '1 1 200px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
          <input
            type="text"
            className="filter-input"
            style={{ paddingLeft: '36px', width: '100%' }}
            placeholder="Search highway, corridor, district..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              if (onFilterChange) onFilterChange({ stateUt, timeRange, severity, roadType, query: e.target.value });
            }}
          />
        </div>

        {/* State / Region Select */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <MapPin size={14} style={{ color: 'var(--text-subtle)' }} />
          <select className="filter-select" value={stateUt} onChange={handleStateChange}>
            <option value="All">All States / UTs</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Haryana">Haryana</option>
            <option value="Kerala">Kerala</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Delhi NCR">Delhi NCR</option>
          </select>
        </div>

        {/* Time Range */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Calendar size={14} style={{ color: 'var(--text-subtle)' }} />
          <select className="filter-select" value={timeRange} onChange={handleTimeChange}>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 3 Months</option>
            <option value="ytd">Year-to-Date (2026)</option>
          </select>
        </div>

        {showAdvanced && (
          <>
            {/* Severity */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <AlertCircle size={14} style={{ color: 'var(--text-subtle)' }} />
              <select className="filter-select" value={severity} onChange={(e) => setSeverity(e.target.value)}>
                <option value="All">All Severities</option>
                <option value="fatal">Fatal Only</option>
                <option value="grievous">Grievous Injury</option>
                <option value="minor">Minor Injury</option>
              </select>
            </div>

            {/* Road Type */}
            <select className="filter-select" value={roadType} onChange={(e) => setRoadType(e.target.value)}>
              <option value="All">All Road Types</option>
              <option value="NH">National Highways (NH)</option>
              <option value="SH">State Highways (SH)</option>
              <option value="EXP">Expressways</option>
              <option value="URB">Urban Arterials</option>
              <option value="RUR">Rural Roads</option>
            </select>
          </>
        )}

        <Button variant="ghost" size="sm" icon={RotateCcw} onClick={handleReset} style={{ color: 'var(--text-muted)' }}>
          Reset
        </Button>
      </div>
    </div>
  );
};
