import React from 'react';

export const LoadingSpinner = ({ label = 'Loading RoadSafe AI Engine...' }) => {
  return (
    <div className="flex-center flex-col" style={{ minHeight: '300px', width: '100%', padding: '2rem' }}>
      <div
        className="animate-spin"
        style={{
          width: 42,
          height: 42,
          border: '3px solid rgba(99, 102, 241, 0.2)',
          borderTopColor: 'var(--primary)',
          borderRadius: '50%',
          marginBottom: '1rem',
        }}
      />
      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 500 }}>{label}</p>
    </div>
  );
};
