import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, Sun, Moon, Shield, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../common/Badge';

export const UserProfileMenu = () => {
  const { user, logout, theme, toggleTheme } = useAuth();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate('/login');
  };

  return (
    <div style={{ position: 'relative' }} ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid var(--bg-card-border)',
          borderRadius: '9999px',
          padding: '0.35rem 0.85rem 0.35rem 0.4rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
      >
        <img
          src={user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256'}
          alt={user?.name || 'User'}
          style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }}
        />
        <div style={{ textAlign: 'left', display: 'none', minWidth: '100px', flex: 1 }}>
          {/* Hidden on very small screens, displayed on nav */}
        </div>
        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-main)' }}>
          {user?.name?.split(' ')[0] || 'User'}
        </span>
        <ChevronDown size={14} style={{ color: 'var(--text-subtle)' }} />
      </button>

      {open && (
        <div
          className="glass-panel"
          style={{
            position: 'absolute',
            top: 'calc(100% + 10px)',
            right: 0,
            width: '260px',
            zIndex: 1000,
            padding: '0.75rem 0',
            animation: 'fadeIn 0.2s ease-out',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.4)',
          }}
        >
          {/* User Info Header */}
          <div style={{ padding: '0.5rem 1.25rem 0.85rem 1.25rem', borderBottom: '1px solid var(--bg-card-border)' }}>
            <p style={{ fontWeight: 600, fontSize: '0.925rem', color: 'var(--text-main)' }}>{user?.name}</p>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{user?.email}</p>
            <Badge variant="primary" icon={Shield}>
              {user?.role || 'Safety Officer'}
            </Badge>
          </div>

          {/* Menu Items */}
          <div style={{ padding: '0.5rem 0' }}>
            <button
              onClick={toggleTheme}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.65rem 1.25rem',
                background: 'none',
                border: 'none',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                {theme === 'dark' ? <Sun size={16} style={{ color: '#f59e0b' }} /> : <Moon size={16} style={{ color: '#6366f1' }} />}
                <span>{theme === 'dark' ? 'Light Theme' : 'Dark Theme'}</span>
              </span>
              <span style={{ fontSize: '0.725rem', color: 'var(--text-subtle)' }}>
                {theme.toUpperCase()}
              </span>
            </button>

            <button
              onClick={() => {
                setOpen(false);
                navigate('/settings');
              }}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.65rem 1.25rem',
                background: 'none',
                border: 'none',
                color: 'var(--text-main)',
                fontSize: '0.85rem',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              <Settings size={16} style={{ color: 'var(--text-muted)' }} />
              <span>Account Settings</span>
            </button>
          </div>

          {/* Logout */}
          <div style={{ borderTop: '1px solid var(--bg-card-border)', paddingTop: '0.4rem' }}>
            <button
              onClick={handleLogout}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.65rem 1.25rem',
                background: 'none',
                border: 'none',
                color: '#ef4444',
                fontSize: '0.85rem',
                cursor: 'pointer',
                fontWeight: 500,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
            >
              <LogOut size={16} />
              <span>Log Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
