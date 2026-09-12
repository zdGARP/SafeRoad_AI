import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Badge } from './Badge';

export const PageHeader = ({
  title,
  subtitle,
  badgeText,
  badgeVariant = 'primary',
  breadcrumbs = [],
  actions,
}) => {
  return (
    <div style={{ marginBottom: '1.75rem' }}>
      {breadcrumbs.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.8rem',
            color: 'var(--text-subtle)',
            marginBottom: '0.5rem',
          }}
        >
          {breadcrumbs.map((crumb, idx) => (
            <React.Fragment key={idx}>
              {idx > 0 && <ChevronRight size={14} />}
              <span
                style={{
                  color: idx === breadcrumbs.length - 1 ? 'var(--text-muted)' : 'var(--text-subtle)',
                  fontWeight: idx === breadcrumbs.length - 1 ? 500 : 400,
                }}
              >
                {crumb}
              </span>
            </React.Fragment>
          ))}
        </div>
      )}

      <div className="flex-between" style={{ flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h1 style={{ fontSize: '1.75rem', fontWeight: 700, letterSpacing: '-0.025em' }}>
                {title}
              </h1>
              {badgeText && <Badge variant={badgeVariant}>{badgeText}</Badge>}
            </div>
            {subtitle && (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                {subtitle}
              </p>
            )}
          </div>
        </div>

        {actions && <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>{actions}</div>}
      </div>
    </div>
  );
};
