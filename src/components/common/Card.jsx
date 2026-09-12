import React from 'react';

export const Card = ({
  children,
  title,
  subtitle,
  headerAction,
  className = '',
  style = {},
  ...props
}) => {
  return (
    <div className={`gov-card ${className}`} style={style} {...props}>
      {(title || subtitle || headerAction) && (
        <div className="gov-card-header">
          <div>
            {title && <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{title}</h3>}
            {subtitle && (
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                {subtitle}
              </p>
            )}
          </div>
          {headerAction && <div>{headerAction}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );
};
