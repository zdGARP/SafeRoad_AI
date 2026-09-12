import React from 'react';
import { LoadingSpinner } from './LoadingSpinner';

export const LoadingState = ({ message = 'Loading RoadSafe AI Telemetry Data...' }) => {
  return <LoadingSpinner label={message} />;
};
