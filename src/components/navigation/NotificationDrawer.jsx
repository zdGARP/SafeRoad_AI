import React from 'react';
import { X, Bell, CheckCircle2, AlertTriangle, Info, AlertOctagon, Check } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

export const NotificationDrawer = () => {
  const {
    notifications,
    notificationDrawerOpen,
    setNotificationDrawerOpen,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useAuth();

  if (!notificationDrawerOpen) return null;

  const getIcon = (type) => {
    switch (type) {
      case 'critical':
        return <AlertOctagon size={18} style={{ color: '#ef4444' }} />;
      case 'warning':
        return <AlertTriangle size={18} style={{ color: '#f59e0b' }} />;
      case 'success':
        return <CheckCircle2 size={18} style={{ color: '#10b981' }} />;
      default:
        return <Info size={18} style={{ color: '#06b6d4' }} />;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setNotificationDrawerOpen(false)}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 1000,
        }}
      />

      {/* Slide-out Panel */}
      <div
        className="glass-panel"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '100%',
          maxWidth: '420px',
          height: '100vh',
          zIndex: 1001,
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
          animation: 'slideInRight 0.3s ease-out',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
        }}
      >
        {/* Header */}
        <div
          className="flex-between"
          style={{
            padding: '1.25rem 1.5rem',
            borderBottom: '1px solid var(--bg-card-border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Bell size={20} style={{ color: 'var(--primary)' }} />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>Real-Time Safety Alerts</h3>
          </div>
          <button className="btn-icon" onClick={() => setNotificationDrawerOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {/* Action bar */}
        <div
          className="flex-between"
          style={{
            padding: '0.75rem 1.5rem',
            background: 'rgba(255, 255, 255, 0.02)',
            borderBottom: '1px solid var(--bg-card-border)',
          }}
        >
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {notifications.filter((n) => n.unread).length} Unread Alerts
          </span>
          <button
            onClick={markAllNotificationsAsRead}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              fontSize: '0.8rem',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
            }}
          >
            <Check size={14} /> Mark all as read
          </button>
        </div>

        {/* List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }}>
          {notifications.length === 0 ? (
            <div className="flex-center flex-col" style={{ padding: '3rem 1rem', color: 'var(--text-subtle)' }}>
              <Bell size={36} style={{ opacity: 0.3, marginBottom: '0.5rem' }} />
              <p>No notifications right now</p>
            </div>
          ) : (
            notifications.map((item) => (
              <div
                key={item.id}
                onClick={() => markNotificationAsRead(item.id)}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: item.unread ? 'rgba(99, 102, 241, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                  border: item.unread ? '1px solid rgba(99, 102, 241, 0.2)' : '1px solid var(--bg-card-border)',
                  marginBottom: '0.75rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative',
                }}
              >
                {item.unread && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                    }}
                  />
                )}

                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                  <div style={{ marginTop: '2px' }}>{getIcon(item.type)}</div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-main)' }}>
                      {item.title}
                    </h4>
                    <p style={{ fontSize: '0.825rem', color: 'var(--text-muted)', marginTop: '0.25rem', lineHeight: '1.4' }}>
                      {item.message}
                    </p>
                    <span style={{ fontSize: '0.725rem', color: 'var(--text-subtle)', marginTop: '0.5rem', display: 'block' }}>
                      {item.time}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};
