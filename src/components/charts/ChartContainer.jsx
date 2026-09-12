import React, { useState } from 'react';
import { Download, Maximize2, RefreshCw, MoreVertical } from 'lucide-react';
import { Card } from '../common/Card';
import { Button } from '../common/Button';

export const ChartContainer = ({
  title,
  subtitle,
  children,
  height = 320,
  actionText,
  onActionClick,
  onRefresh,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    if (onRefresh) onRefresh();
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const headerActions = (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
      {onRefresh && (
        <button
          className="btn-icon"
          onClick={handleRefresh}
          title="Refresh Data"
          style={{ opacity: isRefreshing ? 0.5 : 1 }}
        >
          <RefreshCw size={15} className={isRefreshing ? 'animate-spin' : ''} />
        </button>
      )}
      <button className="btn-icon" title="Export Chart Data">
        <Download size={15} />
      </button>
      <button
        className="btn-icon"
        onClick={() => setIsFullscreen(!isFullscreen)}
        title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
      >
        <Maximize2 size={15} />
      </button>
    </div>
  );

  return (
    <Card
      title={title}
      subtitle={subtitle}
      headerAction={headerActions}
      style={{
        position: isFullscreen ? 'fixed' : 'relative',
        top: isFullscreen ? 0 : 'auto',
        left: isFullscreen ? 0 : 'auto',
        width: isFullscreen ? '100vw' : '100%',
        height: isFullscreen ? '100vh' : 'auto',
        zIndex: isFullscreen ? 9999 : 1,
        borderRadius: isFullscreen ? 0 : undefined,
        background: isFullscreen ? 'var(--bg-dark)' : undefined,
      }}
    >
      <div
        style={{
          height: isFullscreen ? 'calc(100vh - 120px)' : `${height}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        {children}
      </div>
    </Card>
  );
};
