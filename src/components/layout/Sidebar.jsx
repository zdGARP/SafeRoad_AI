import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  BarChart3,
  SearchAlert,
  BrainCircuit,
  ShieldAlert,
  Wrench,
  Sliders,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Shield,
  Activity,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export const navigationItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/risk-map', label: 'Risk Map', icon: MapPin },
  { path: '/analytics', label: 'Accident Analytics', icon: BarChart3 },
  { path: '/causes', label: 'Cause Analysis', icon: SearchAlert },
  { path: '/prediction', label: 'Risk Prediction', icon: BrainCircuit },
  { path: '/vulnerability', label: 'Vulnerability', icon: ShieldAlert },
  { path: '/interventions', label: 'Interventions', icon: Wrench },
  { path: '/impact-simulation', label: 'Impact Simulation', icon: Sliders },
  { path: '/reports', label: 'Reports', icon: FileText },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Sidebar = () => {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    mobileSidebarOpen,
    setMobileSidebarOpen,
  } = useAuth();
  const location = useLocation();

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 900,
          }}
        />
      )}

      <aside
        style={{
          width: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
          background: 'var(--bg-sidebar)',
          borderRight: '1px solid var(--bg-card-border)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 950,
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          overflow: 'hidden',
          boxShadow: '4px 0 24px rgba(0,0,0,0.2)',
        }}
        className={mobileSidebarOpen ? 'sidebar-mobile-open' : ''}
      >
        {/* Brand Logo & Header */}
        <div
          className="flex-between"
          style={{
            height: 'var(--topbar-height)',
            padding: sidebarCollapsed ? '0 0.85rem' : '0 1.25rem',
            borderBottom: '1px solid var(--bg-card-border)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                flexShrink: 0,
              }}
            >
              <Shield size={22} />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h2 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-main)', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  RoadSafe<span style={{ color: 'var(--primary)' }}>.AI</span>
                </h2>
                <span style={{ fontSize: '0.675rem', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>
                  India Safety Platform
                </span>
              </div>
            )}
          </div>

          <button
            className="btn-icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{ display: 'flex' }}
            title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Navigation List */}
        <div style={{ flex: 1, padding: '1rem 0.75rem', overflowY: 'auto' }}>
          {!sidebarCollapsed && (
            <p
              style={{
                fontSize: '0.7rem',
                fontWeight: 700,
                color: 'var(--text-subtle)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                marginBottom: '0.75rem',
                paddingLeft: '0.5rem',
              }}
            >
              Analytics Modules
            </p>
          )}

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    padding: sidebarCollapsed ? '0.75rem' : '0.7rem 0.85rem',
                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                    borderRadius: 'var(--radius-md)',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    background: isActive
                      ? 'linear-gradient(90deg, rgba(99, 102, 241, 0.25) 0%, rgba(99, 102, 241, 0.08) 100%)'
                      : 'transparent',
                    borderLeft: isActive ? '3px solid var(--primary)' : '3px solid transparent',
                    textDecoration: 'none',
                    fontWeight: isActive ? 600 : 400,
                    fontSize: '0.875rem',
                    transition: 'all 0.15s ease',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.background = 'transparent';
                  }}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon
                    size={20}
                    style={{
                      color: isActive ? 'var(--primary)' : 'var(--text-subtle)',
                      flexShrink: 0,
                    }}
                  />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Footer Status Panel */}
        <div
          style={{
            padding: sidebarCollapsed ? '0.85rem 0.5rem' : '0.85rem 1rem',
            borderTop: '1px solid var(--bg-card-border)',
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          {sidebarCollapsed ? (
            <div className="flex-center" title="AI Monitoring System Online">
              <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#10b981' }} className="animate-pulse" />
            </div>
          ) : (
            <div className="flex-between">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} className="animate-pulse" />
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>
                  AI Core Engine Active
                </span>
              </div>
              <Activity size={14} style={{ color: 'var(--primary)' }} />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
