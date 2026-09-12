import React from 'react';
import { Card } from './Card';
import { Badge } from './Badge';

export const RiskScoreCard = ({ score, riskLevel, label = 'Risk Index Score', subtitle }) => {
  let level = riskLevel;
  if (!level && score !== undefined) {
    if (score >= 81) level = 'critical';
    else if (score >= 61) level = 'high';
    else if (score >= 31) level = 'medium';
    else level = 'low';
  }

  const getScoreColor = () => {
    switch (level) {
      case 'critical': return 'var(--risk-critical)';
      case 'high': return 'var(--risk-high)';
      case 'medium': return 'var(--risk-medium)';
      default: return 'var(--risk-low)';
    }
  };

  return (
    <Card>
      <div className="flex-between" style={{ marginBottom: '0.4rem' }}>
        <span style={{ fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-muted)' }}>{label}</span>
        <Badge variant={level} />
      </div>
      <div style={{ fontSize: '2.25rem', fontWeight: 800, color: getScoreColor(), lineHeight: 1.1 }}>
        {score} <span style={{ fontSize: '1rem', color: 'var(--text-subtle)', fontWeight: 500 }}>/ 100</span>
      </div>
      {subtitle && (
        <span style={{ fontSize: '0.775rem', color: 'var(--text-subtle)', marginTop: '0.35rem', display: 'block' }}>
          {subtitle}
        </span>
      )}
    </Card>
  );
};
