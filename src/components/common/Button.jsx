import React from 'react';

export const Button = ({
  children,
  variant = 'primary', // primary | secondary | outline | danger
  size = 'md', // sm | md | lg
  icon: Icon,
  iconPosition = 'left',
  className = '',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ariaLabel,
  ...props
}) => {
  const variantClass = `gov-btn-${variant}`;
  const sizeClass = size !== 'md' ? `gov-btn-${size}` : '';

  return (
    <button
      type={type}
      className={`gov-btn ${variantClass} ${sizeClass} ${className}`}
      onClick={onClick}
      disabled={disabled || loading}
      aria-label={ariaLabel}
      {...props}
    >
      {loading ? (
        <span className="animate-spin" style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%' }} />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} aria-hidden="true" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 14 : size === 'lg' ? 18 : 16} aria-hidden="true" />}
        </>
      )}
    </button>
  );
};
