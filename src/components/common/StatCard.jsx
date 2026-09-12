import React from 'react';
import { ArrowDownRight, ArrowUpRight, Minus } from 'lucide-react';

export const StatCard = ({
  title,
  value,
  changePercent,
  trendDirection = 'down', // 'down' (e.g. ↓ 4.2% - reduced accidents), 'up', 'neutral'
  comparisonPeriod = 'Compared with previous period',
  icon: Icon,
  subtitle,
  className = '',
}) => {
  const isPositiveImprovement = trendDirection === 'down'; // In road safety, reduced accidents/fatalities is good

  return (
    <div className={`gov-card ${className}`}>
      <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
        <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)' }}>
          {title}
        </span>
        {Icon && (
          <div
            style={{
              padding: '0.4rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              color: 'var(--primary)',
            }}
          >
            <Icon size={18} aria-hidden="true" />
          </div>
        )}
      </div>

      <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)', lineHeight: 1.1, marginBottom: '0.5rem' }}>
        {value}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.775rem' }}>
        {changePercent && (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.15rem',
              fontWeight: 700,
              color: isPositiveImprovement ? 'var(--risk-low)' : 'var(--risk-critical)',
            }}
          >
            {trendDirection === 'down' ? (
              <ArrowDownRight size={14} aria-hidden="true" />
            ) : trendDirection === 'up' ? (
              <ArrowUpRight size={14} aria-hidden="true" />
            ) : (
              <Minus size={14} aria-hidden="true" />
            )}
            {changePercent}
          </span>
        )}
        <span style={{ color: 'var(--text-subtle)' }}>{comparisonPeriod}</span>
      </div>

      {subtitle && !changePercent && (
        <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>{subtitle}</span>
      )}
    </div>
  );
};
