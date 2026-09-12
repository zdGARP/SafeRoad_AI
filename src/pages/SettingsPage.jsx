import React, { useState } from 'react';
import { Settings, Shield, Bell, Database, Sun, Moon, Save, RefreshCw } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const SettingsPage = () => {
  const { user, theme, toggleTheme } = useAuth();
  const [criticalThreshold, setCriticalThreshold] = useState(85);
  const [highThreshold, setHighThreshold] = useState(70);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <PageHeader
        title="Platform & Intelligence Configurations"
        subtitle="Manage safety threshold parameters, alert rules, AI engine sensitivity, and user preferences."
        badgeText="System Configuration"
        breadcrumbs={['Home', 'Settings']}
        actions={
          <Button variant="primary" icon={Save} onClick={handleSave}>
            {saved ? 'Settings Saved!' : 'Save Configuration'}
          </Button>
        }
      />

      <div className="grid-2" style={{ marginBottom: '1.75rem' }}>
        {/* Risk Threshold Settings */}
        <Card title="Blackspot Risk Thresholds Configuration">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div className="flex-between" style={{ marginBottom: '0.4rem' }}>
                <label className="form-label">Critical Blackspot Score Cutoff</label>
                <span style={{ color: '#ef4444', fontWeight: 700 }}>&gt;= {criticalThreshold}</span>
              </div>
              <input
                type="range"
                min="70"
                max="95"
                value={criticalThreshold}
                onChange={(e) => setCriticalThreshold(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#ef4444' }}
              />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>
                Corridors scoring above this threshold trigger emergency enforcement alerts.
              </span>
            </div>

            <div>
              <div className="flex-between" style={{ marginBottom: '0.4rem' }}>
                <label className="form-label">High Severity Score Cutoff</label>
                <span style={{ color: '#f59e0b', fontWeight: 700 }}>&gt;= {highThreshold}</span>
              </div>
              <input
                type="range"
                min="50"
                max="80"
                value={highThreshold}
                onChange={(e) => setHighThreshold(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#f59e0b' }}
              />
            </div>
          </div>
        </Card>

        {/* Notifications Settings */}
        <Card title="Real-Time Alert Channels">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="flex-between" style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--bg-card-border)' }}>
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Emergency In-App Popups</span>
                <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Display immediate drawer notifications for critical blackspots.</p>
              </div>
              <input
                type="checkbox"
                checked={true}
                readOnly
                style={{ width: 18, height: 18, accentColor: 'var(--primary)' }}
              />
            </div>

            <div className="flex-between" style={{ padding: '0.75rem 0', borderBottom: '1px solid var(--bg-card-border)' }}>
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>MoRTH Executive Email Summaries</span>
                <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Daily morning briefing email sent to official address.</p>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--primary)' }}
              />
            </div>

            <div className="flex-between" style={{ padding: '0.75rem 0' }}>
              <div>
                <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Highway Patrol SMS Broadcast</span>
                <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Automated SMS dispatch to nearest Highway Patrol station.</p>
              </div>
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--primary)' }}
              />
            </div>
          </div>
        </Card>
      </div>

      {/* Theme & Display Options */}
      <Card title="Display Appearance & Theme">
        <div className="flex-between" style={{ padding: '0.5rem 0' }}>
          <div>
            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Application Color Theme</span>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)' }}>Toggle between high-contrast Dark Operations mode and Light mode.</p>
          </div>
          <Button variant="secondary" onClick={toggleTheme} icon={theme === 'dark' ? Sun : Moon}>
            Switch to {theme === 'dark' ? 'Light Theme' : 'Dark Theme'}
          </Button>
        </div>
      </Card>
    </div>
  );
};
