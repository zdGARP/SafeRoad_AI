import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, UserCheck, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [authorityId, setAuthorityId] = useState('OFFICER-7892');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login({
        name: 'Dr. Rajesh Sharma',
        email: 'rajesh.sharma@roadsafe.gov.in',
        role: 'Senior Safety Analyst',
        department: 'Road Safety Intelligence Unit',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
        region: 'Pan-India',
      });
      setLoading(false);
      navigate('/dashboard');
    }, 400);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'var(--bg-page)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        transition: 'var(--theme-transition)',
      }}
    >
      <div
        className="gov-card"
        style={{
          maxWidth: '440px',
          width: '100%',
          padding: '2.25rem',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        }}
      >
        {/* Header Branding */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 'var(--radius-sm)',
              background: 'var(--primary)',
              color: '#ffffff',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '0.75rem',
            }}
          >
            <Shield size={26} aria-hidden="true" />
          </div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            ROADSAFE INDIA
          </h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            AI-Powered Road Safety Intelligence Platform
          </p>
        </div>

        {/* Security Indicator */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.4rem',
            background: 'var(--primary-subtle)',
            border: '1px solid var(--border-color)',
            padding: '0.45rem 0.75rem',
            borderRadius: 'var(--radius-sm)',
            marginBottom: '1.5rem',
            fontSize: '0.8rem',
            fontWeight: 700,
            color: 'var(--primary)',
          }}
        >
          <Lock size={14} aria-hidden="true" />
          <span>🔒 Secure Access</span>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label className="gov-label" htmlFor="authority-id">Authority / User ID</label>
            <input
              id="authority-id"
              type="text"
              required
              className="gov-input"
              value={authorityId}
              onChange={(e) => setAuthorityId(e.target.value)}
              placeholder="Enter User or Officer ID"
            />
          </div>

          <div>
            <label className="gov-label" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              className="gov-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
            />
          </div>

          {/* Remember Me */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              id="remember-me"
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ accentColor: 'var(--primary)', width: 16, height: 16 }}
            />
            <label htmlFor="remember-me" style={{ fontSize: '0.825rem', color: 'var(--text-muted)', cursor: 'pointer' }}>
              Remember Me
            </label>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={loading}
            icon={UserCheck}
            style={{ width: '100%', marginTop: '0.5rem' }}
          >
            Secure Login
          </Button>
        </form>

        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color-subtle)', textAlign: 'center' }}>
          <p style={{ fontSize: '0.775rem', color: 'var(--text-subtle)' }}>
            Authorized access for road safety intelligence
          </p>
        </div>
      </div>
    </div>
  );
};
