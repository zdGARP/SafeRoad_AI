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
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 900,
          }}
        />
      )}

      <aside
        style={{
          width: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
          background: 'var(--bg-sidebar)',
          borderRight: '1px solid var(--border-color)',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          position: 'sticky',
          top: 0,
          zIndex: 950,
          transition: 'var(--theme-transition)',
          overflow: 'hidden',
        }}
      >
        {/* Brand Header */}
        <div
          className="flex-between"
          style={{
            height: 'var(--topbar-height)',
            padding: sidebarCollapsed ? '0 0.75rem' : '0 1rem',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: 'var(--radius-sm)',
                background: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                flexShrink: 0,
              }}
            >
              <Shield size={20} aria-hidden="true" />
            </div>
            {!sidebarCollapsed && (
              <div>
                <h2 style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                  ROADSAFE INDIA
                </h2>
                <span style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                  Safety Intelligence
                </span>
              </div>
            )}
          </div>

          <button
            className="gov-btn gov-btn-secondary gov-btn-sm"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            style={{ padding: '0.25rem', background: 'transparent', borderColor: 'transparent', color: '#cbd5e1' }}
            title={sidebarCollapsed ? 'Expand Navigation' : 'Collapse Navigation'}
            aria-label="Toggle Navigation Sidebar"
          >
            {sidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>

        {/* Nav List */}
        <div style={{ flex: 1, padding: '0.85rem 0.5rem', overflowY: 'auto' }}>
          {!sidebarCollapsed && (
            <p
              style={{
                fontSize: '0.675rem',
                fontWeight: 700,
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '0.5rem',
                paddingLeft: '0.5rem',
              }}
            >
              Portal Modules
            </p>
          )}

          <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
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
                    gap: '0.75rem',
                    padding: sidebarCollapsed ? '0.65rem' : '0.6rem 0.75rem',
                    justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
                    borderRadius: 'var(--radius-sm)',
                    color: isActive ? '#ffffff' : '#cbd5e1',
                    background: isActive ? 'var(--primary)' : 'transparent',
                    textDecoration: 'none',
                    fontWeight: isActive ? 700 : 500,
                    fontSize: '0.85rem',
                    transition: 'all 0.15s ease',
                  }}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon size={18} aria-hidden="true" style={{ flexShrink: 0 }} />
                  {!sidebarCollapsed && <span>{item.label}</span>}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Status Bar */}
        <div
          style={{
            padding: sidebarCollapsed ? '0.75rem 0.5rem' : '0.75rem 1rem',
            borderTop: '1px solid var(--border-color)',
            background: 'rgba(0, 0, 0, 0.2)',
          }}
        >
          {!sidebarCollapsed && (
            <div className="flex-between">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontSize: '0.725rem', color: '#cbd5e1', fontWeight: 600 }}>
                  System Active
                </span>
              </div>
              <Activity size={13} style={{ color: '#38bdf8' }} />
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
