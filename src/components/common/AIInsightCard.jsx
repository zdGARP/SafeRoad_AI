import React from 'react';
import { Sparkles } from 'lucide-react';

export const AIInsightCard = ({
  title = 'AI-Generated Insight',
  insight,
  disclaimer = 'Note: AI projections provide probabilistic risk estimates for prioritization purposes. Do not present predictions as guaranteed outcomes.',
}) => {
  return (
    <div
      style={{
        background: 'var(--primary-subtle)',
        border: '1px solid var(--border-color)',
        padding: '1rem',
        borderRadius: 'var(--radius-sm)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.4rem' }}>
        <Sparkles size={16} style={{ color: 'var(--primary)' }} />
        <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
          {title}
        </span>
      </div>
      <p style={{ fontSize: '0.875rem', color: 'var(--text-main)', lineHeight: '1.5', fontWeight: 500 }}>
        "{insight}"
      </p>
      {disclaimer && (
        <span style={{ fontSize: '0.725rem', color: 'var(--text-subtle)', marginTop: '0.5rem', display: 'block' }}>
          {disclaimer}
        </span>
      )}
    </div>
  );
};
