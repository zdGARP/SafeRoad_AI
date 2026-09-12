import React from 'react';

export const Card = ({
  children,
  title,
  subtitle,
  headerAction,
  className = '',
  glow = false,
  padding = true,
  style = {},
  ...props
}) => {
  return (
    <div
      className={`glass-panel ${glow ? 'glass-panel-glow' : ''} ${className}`}
      style={{
        padding: padding ? '1.5rem' : '0',
        ...style,
      }}
      {...props}
    >
      {(title || subtitle || headerAction) && (
        <div
          className="flex-between"
          style={{
            marginBottom: padding ? '1.25rem' : '0',
            padding: padding ? '0' : '1.25rem 1.5rem 1rem 1.5rem',
            borderBottom: !padding ? '1px solid var(--bg-card-border)' : 'none',
          }}
        >
          <div>
            {title && (
              <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: 'var(--text-main)' }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div style={{ padding: !padding && (title || subtitle || headerAction) ? '1.5rem' : '0' }}>
        {children}
      </div>
    </div>
  );
};
