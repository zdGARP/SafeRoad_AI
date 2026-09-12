import React from 'react';
import { Badge } from './Badge';

export const RiskBadge = ({ score, riskLevel }) => {
  let level = riskLevel;
  if (!level && score !== undefined) {
    if (score >= 81) level = 'critical';
    else if (score >= 61) level = 'high';
    else if (score >= 31) level = 'medium';
    else level = 'low';
  }

  return <Badge variant={level} />;
};
