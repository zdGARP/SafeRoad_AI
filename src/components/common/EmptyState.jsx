import React from 'react';
import { FileQuestion } from 'lucide-react';
import { Card } from './Card';

export const EmptyState = ({
  title = 'No Records Found',
  message = 'No data available matching your selected filters.',
  action,
}) => {
  return (
    <Card>
      <div className="flex-center flex-col" style={{ padding: '3rem 1rem', textAlign: 'center' }}>
        <FileQuestion size={40} style={{ color: 'var(--text-subtle)', marginBottom: '0.75rem' }} />
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem' }}>{title}</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', maxWidth: '360px', marginBottom: '1.25rem' }}>
          {message}
        </p>
        {action}
      </div>
    </Card>
  );
};
