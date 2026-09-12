import React from 'react';

export const Badge = ({
  children,
  variant = 'primary', // low | moderate | high | critical | primary | neutral
  icon: Icon,
  className = '',
  style = {},
}) => {
  const badgeClass = `badge badge-${variant}`;

  return (
    <span className={`${badgeClass} ${className}`} style={style}>
      {Icon && <Icon size={12} />}
      {children}
    </span>
  );
};
