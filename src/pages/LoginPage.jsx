import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, ArrowRight, CheckCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('rajesh.sharma@morth.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState('National Safety Chief');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      login({
        name: 'Dr. Rajesh Sharma',
        email,
        role,
        department: 'Ministry of Road Transport & Highways',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
        region: 'Pan-India',
      });
      setLoading(false);
      navigate('/dashboard');
    }, 600);
  };

  const handleDemoFill = (selectedRole, demoEmail) => {
    setRole(selectedRole);
    setEmail(demoEmail);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        background: 'radial-gradient(ellipse at top, #1e1b4b 0%, #090d16 60%, #05070c 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem 1rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Glowing Orbs */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '15%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.15)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '20%',
          right: '15%',
          width: '350px',
          height: '350px',
          borderRadius: '50%',
          background: 'rgba(6, 182, 212, 0.15)',
          filter: 'blur(100px)',
          pointerEvents: 'none',
        }}
      />

      <div
        className="glass-panel"
        style={{
          maxWidth: '460px',
          width: '100%',
          padding: '2.5rem',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
        }}
      >
        {/* Logo & Header */}
        <div className="flex-center flex-col" style={{ marginBottom: '2rem' }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              boxShadow: '0 8px 24px rgba(99, 102, 241, 0.4)',
              marginBottom: '1rem',
            }}
          >
            <Shield size={32} />
          </div>
          <h1 style={{ fontSize: '1.85rem', fontWeight: 800, textAlign: 'center' }}>
            RoadSafe<span style={{ color: 'var(--primary)' }}>.AI</span>
          </h1>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.25rem' }}>
            National Road Safety & Predictive Intelligence Portal
          </p>
        </div>

        {/* Demo Roles Toggle */}
        <div style={{ marginBottom: '1.5rem' }}>
          <label className="form-label" style={{ fontSize: '0.775rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Select Portal Access Role:
          </label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.4rem' }}>
            <button
              type="button"
              onClick={() => handleDemoFill('National Safety Chief', 'rajesh.sharma@morth.gov.in')}
              className={`btn ${role === 'National Safety Chief' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.775rem', padding: '0.45rem' }}
            >
              National Analyst
            </button>
            <button
              type="button"
              onClick={() => handleDemoFill('Highway Patrol Officer', 'patrol.chief@nhai.gov.in')}
              className={`btn ${role === 'Highway Patrol Officer' ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '0.775rem', padding: '0.45rem' }}
            >
              Patrol Officer
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label className="form-label">Official Email ID</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
              <input
                type="email"
                required
                className="form-input"
                style={{ paddingLeft: '40px' }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="form-label">Security Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-subtle)' }} />
              <input
                type="password"
                required
                className="form-input"
                style={{ paddingLeft: '40px' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <Button type="submit" variant="primary" size="lg" loading={loading} icon={ArrowRight} iconPosition="right" style={{ marginTop: '0.5rem', width: '100%' }}>
            Access Executive Portal
          </Button>
        </form>

        <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--bg-card-border)', textAlign: 'center' }}>
          <div className="flex-center" style={{ gap: '0.4rem', color: 'var(--text-subtle)', fontSize: '0.775rem' }}>
            <Sparkles size={14} style={{ color: 'var(--secondary)' }} />
            <span>Ministry of Road Transport & Highways • MoRTH Govt of India</span>
          </div>
        </div>
      </div>
    </div>
  );
};
