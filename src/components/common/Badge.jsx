import React from 'react';
import { AlertOctagon, AlertTriangle, Info, CheckCircle2, Shield } from 'lucide-react';

export const Badge = ({
  children,
  variant = 'neutral', // low | medium | high | critical | primary | neutral
  icon: CustomIcon,
  showDefaultIcon = true,
  className = '',
  style = {},
}) => {
  const getBadgeConfig = () => {
    switch (variant) {
      case 'critical':
        return {
          class: 'gov-badge-critical',
          icon: AlertOctagon,
          prefix: '🔴 CRITICAL',
        };
      case 'high':
        return {
          class: 'gov-badge-high',
          icon: AlertTriangle,
          prefix: '🟠 HIGH',
        };
      case 'medium':
      case 'moderate':
        return {
          class: 'gov-badge-medium',
          icon: AlertTriangle,
          prefix: '🟡 MEDIUM',
        };
      case 'low':
        return {
          class: 'gov-badge-low',
          icon: CheckCircle2,
          prefix: '🟢 LOW',
        };
      case 'primary':
        return {
          class: 'gov-badge-neutral',
          icon: Shield,
          prefix: '',
        };
      default:
        return {
          class: 'gov-badge-neutral',
          icon: Info,
          prefix: '',
        };
    }
  };

  const config = getBadgeConfig();
  const IconComponent = CustomIcon || (showDefaultIcon ? config.icon : null);

  return (
    <span className={`gov-badge ${config.class} ${className}`} style={style}>
      {IconComponent && <IconComponent size={12} aria-hidden="true" />}
      <span>{children || config.prefix}</span>
    </span>
  );
};
