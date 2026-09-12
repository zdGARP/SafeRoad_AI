import React from 'react';
import { Menu, Search, Bell, Globe, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserProfileMenu } from '../user/UserProfileMenu';

export const TopNavbar = () => {
  const {
    setMobileSidebarOpen,
    unreadCount,
    setNotificationDrawerOpen,
    selectedRegion,
    setSelectedRegion,
  } = useAuth();

  return (
    <header
      style={{
        height: 'var(--topbar-height)',
        background: 'var(--bg-topbar)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--bg-card-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        position: 'sticky',
        top: 0,
        zIndex: 800,
      }}
    >
      {/* Left: Mobile Toggle & Quick Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, maxWidth: '500px' }}>
        <button
          className="btn-icon"
          onClick={() => setMobileSidebarOpen(true)}
          style={{ display: 'none' }}
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>

        {/* Global Search Bar */}
        <div style={{ position: 'relative', width: '100%' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-subtle)',
            }}
          />
          <input
            type="text"
            className="filter-input"
            style={{
              paddingLeft: '40px',
              width: '100%',
              height: '40px',
              background: 'rgba(255, 255, 255, 0.03)',
              borderRadius: '9999px',
            }}
            placeholder="Search accident corridors, NH-44, Pune Expressway, blackspots..."
          />
        </div>
      </div>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Region / Jurisdiction Selector */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            background: 'rgba(255, 255, 255, 0.04)',
            padding: '0.35rem 0.75rem',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--bg-card-border)',
            fontSize: '0.825rem',
          }}
        >
          <Globe size={15} style={{ color: 'var(--secondary)' }} />
          <span style={{ color: 'var(--text-muted)' }}>Jurisdiction:</span>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-main)',
              fontWeight: 600,
              cursor: 'pointer',
              outline: 'none',
              fontSize: '0.825rem',
            }}
          >
            <option value="Pan-India" style={{ background: '#0f172a' }}>
              Pan-India (National)
            </option>
            <option value="North Zone" style={{ background: '#0f172a' }}>
              North Zone (NHAI)
            </option>
            <option value="South Zone" style={{ background: '#0f172a' }}>
              South Zone
            </option>
            <option value="West Zone" style={{ background: '#0f172a' }}>
              West Zone
            </option>
            <option value="East Zone" style={{ background: '#0f172a' }}>
              East Zone
            </option>
          </select>
        </div>

        {/* AI Insight Quick Pill */}
        <div
          className="badge badge-primary"
          style={{ padding: '0.4rem 0.75rem', cursor: 'pointer', display: 'flex', gap: '0.4rem' }}
        >
          <Sparkles size={14} />
          <span>AI Active</span>
        </div>

        {/* Notification Bell */}
        <button
          className="btn-icon"
          onClick={() => setNotificationDrawerOpen(true)}
          style={{ position: 'relative' }}
          title="Alerts & Notifications"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: '#ef4444',
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 8px rgba(239, 68, 68, 0.6)',
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Profile */}
        <UserProfileMenu />
      </div>
    </header>
  );
};
