import React from 'react';
import { Play, TrendingDown, DollarSign, Layers, ShieldCheck } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const InterventionCard = ({ item, onSimulate }) => {
  return (
    <Card>
      <div className="flex-between" style={{ marginBottom: '0.75rem' }}>
        <Badge variant={item.priority === 'Very High' ? 'critical' : item.priority === 'High' ? 'high' : 'medium'}>
          {item.priority} Priority
        </Badge>
        <span style={{ fontSize: '0.775rem', fontWeight: 700, color: 'var(--risk-low)' }}>
          {item.confidence}% Confidence
        </span>
      </div>

      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
        {item.name}
      </h3>

      <div
        style={{
          background: 'var(--primary-subtle)',
          border: '1px solid var(--border-color)',
          padding: '0.65rem 0.85rem',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '1rem',
          fontSize: '0.825rem',
          color: 'var(--text-main)',
        }}
      >
        <strong>Reason: </strong>"{item.reason}"
      </div>

      <div className="grid-3" style={{ marginBottom: '1.1rem', gap: '0.5rem' }}>
        <div style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>Expected Reduction</span>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--risk-low)' }}>
            -{item.expectedReduction}%
          </div>
        </div>

        <div style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>Estimated Cost</span>
          <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.estimatedCost}</div>
        </div>

        <div style={{ background: 'var(--bg-surface)', padding: '0.5rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-subtle)' }}>Difficulty</span>
          <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.implementationDifficulty}</div>
        </div>
      </div>

      <Button
        variant="primary"
        icon={Play}
        style={{ width: '100%' }}
        onClick={() => onSimulate && onSimulate(item)}
      >
        Simulate Impact
      </Button>
    </Card>
  );
};
