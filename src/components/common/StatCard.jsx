import React from 'react';

export const StatCard = ({
  title,
  value,
  trend,
  trendDirection = 'down', // 'up' (worse for accidents) or 'down' (better) or 'neutral'
  trendLabel = 'vs last month',
  icon: Icon,
  accentColor = 'var(--primary)',
  subtitle,
}) => {
  return (
    <div
      className="glass-panel stat-card"
      style={{ '--card-accent': accentColor }}
    >
      <div className="flex-between">
        <span className="stat-label">{title}</span>
        {Icon && (
          <div className="stat-icon-wrapper" style={{ color: accentColor }}>
            <Icon size={22} />
          </div>
        )}
      </div>

      <div className="stat-value">{value}</div>

      <div className="flex-between" style={{ marginTop: '0.25rem' }}>
        {trend && (
          <span
            className={`stat-trend ${
              trendDirection === 'up' ? 'trend-up' : trendDirection === 'down' ? 'trend-down' : ''
            }`}
          >
            {trendDirection === 'up' ? '▲' : trendDirection === 'down' ? '▼' : '•'} {trend}{' '}
            <span style={{ color: 'var(--text-subtle)', fontWeight: 400 }}>{trendLabel}</span>
          </span>
        )}
        {subtitle && !trend && (
          <span style={{ fontSize: '0.775rem', color: 'var(--text-subtle)' }}>{subtitle}</span>
        )}
      </div>
    </div>
  );
};
