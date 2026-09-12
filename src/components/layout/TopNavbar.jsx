import React from 'react';
import { Menu, Search, Bell, Globe, Clock, Sun, Sunset, Moon, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserProfileMenu } from '../user/UserProfileMenu';

export const TopNavbar = () => {
  const {
    setMobileSidebarOpen,
    unreadCount,
    setNotificationDrawerOpen,
    selectedRegion,
    setSelectedRegion,
    systemTimezone,
    currentTimeStr,
    timeMode,
    toggleManualTimeMode,
  } = useAuth();

  const getTimeModeDisplay = () => {
    switch (timeMode) {
      case 'morning':
        return { label: 'Morning Mode', icon: Sun, color: '#0f766e' };
      case 'afternoon':
        return { label: 'Afternoon Mode', icon: Sun, color: '#1d4ed8' };
      case 'evening':
        return { label: 'Evening Mode', icon: Sunset, color: '#1e3a8a' };
      case 'night':
        return { label: 'Night Mode', icon: Moon, color: '#38bdf8' };
      default:
        return { label: 'Afternoon Mode', icon: Sun, color: '#1d4ed8' };
    }
  };

  const currentModeInfo = getTimeModeDisplay();
  const ModeIcon = currentModeInfo.icon;

  return (
    <header
      style={{
        height: 'var(--topbar-height)',
        background: 'var(--bg-topbar)',
        borderBottom: '1px solid var(--border-color)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        position: 'sticky',
        top: 0,
        zIndex: 800,
        transition: 'var(--theme-transition)',
      }}
    >
      {/* Left: Mobile Toggle & Search */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', flex: 1, maxWidth: '480px' }}>
        <button
          className="gov-btn gov-btn-secondary gov-btn-sm"
          onClick={() => setMobileSidebarOpen(true)}
          style={{ display: 'none' }}
          aria-label="Open sidebar menu"
        >
          <Menu size={18} />
        </button>

        {/* Global Search Bar */}
        <div style={{ position: 'relative', width: '100%' }}>
          <Search
            size={16}
            style={{
              position: 'absolute',
              left: '12px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-subtle)',
            }}
          />
          <input
            type="text"
            className="gov-input"
            style={{
              paddingLeft: '38px',
              height: '36px',
              fontSize: '0.825rem',
            }}
            placeholder="Search location, NH junction, corridor ID, or district..."
            aria-label="Search location or highway corridor"
          />
        </div>
      </div>

      {/* Right: Timezone Indicator, Jurisdiction, Alerts, User Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
        {/* Time-Based UI Status Indicator (Prompt 3 Specification) */}
        <div
          onClick={toggleManualTimeMode}
          title="Click to cycle time mode manually"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-color)',
            padding: '0.3rem 0.65rem',
            borderRadius: 'var(--radius-sm)',
            fontSize: '0.775rem',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <Clock size={14} style={{ color: 'var(--text-muted)' }} />
          <span style={{ fontWeight: 700, color: 'var(--text-main)' }}>{currentTimeStr}</span>
          <span style={{ color: 'var(--border-color-subtle)' }}>•</span>
          <span style={{ color: 'var(--text-subtle)', maxWidth: '110px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {systemTimezone}
          </span>
          <span style={{ color: 'var(--border-color-subtle)' }}>•</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: currentModeInfo.color, fontWeight: 700 }}>
            <ModeIcon size={13} />
            <span>{currentModeInfo.label}</span>
          </div>
        </div>

        {/* Region Jurisdiction Filter */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'var(--bg-surface)',
            padding: '0.3rem 0.65rem',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-color)',
            fontSize: '0.775rem',
          }}
        >
          <Globe size={14} style={{ color: 'var(--primary)' }} />
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
              fontSize: '0.775rem',
            }}
            aria-label="Select Region Jurisdiction"
          >
            <option value="Pan-India">Pan-India (National)</option>
            <option value="North Zone">North Zone</option>
            <option value="South Zone">South Zone</option>
            <option value="West Zone">West Zone</option>
            <option value="East Zone">East Zone</option>
          </select>
        </div>

        {/* Notification Bell */}
        <button
          className="gov-btn gov-btn-secondary gov-btn-sm"
          onClick={() => setNotificationDrawerOpen(true)}
          style={{ position: 'relative', padding: '0.45rem' }}
          title="Safety Alerts & Notifications"
          aria-label={`Safety Notifications, ${unreadCount} unread`}
        >
          <Bell size={16} />
          {unreadCount > 0 && (
            <span
              style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                background: 'var(--risk-critical)',
                color: '#fff',
                fontSize: '0.625rem',
                fontWeight: 800,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {unreadCount}
            </span>
          )}
        </button>

        {/* User Profile Dropdown */}
        <UserProfileMenu />
      </div>
    </header>
  );
};
