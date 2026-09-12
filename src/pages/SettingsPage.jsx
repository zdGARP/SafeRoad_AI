import React, { useState } from 'react';
import { Settings, Clock, Globe, Bell, RefreshCw, Type, Eye, Save, Monitor } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const SettingsPage = () => {
  const {
    systemTimezone,
    currentTimeStr,
    timeMode,
    setManualTimeModeOverride,
    fontSizeScale,
    setFontSizeScale,
    reducedMotion,
    setReducedMotion,
  } = useAuth();

  const [themeModeSetting, setThemeModeSetting] = useState('Automatic'); // Automatic | Manual
  const [notificationsOn, setNotificationsOn] = useState(true);
  const [dataRefreshMode, setDataRefreshMode] = useState('Automatic'); // Automatic | Manual
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <PageHeader
        title="Platform & System Settings"
        subtitle="Manage theme options, timezone detection, notifications, data refresh preferences, and accessibility controls."
        badgeText="System Configuration"
        badgeVariant="primary"
        breadcrumbs={['Home', 'Settings']}
        actions={
          <Button variant="primary" icon={Save} onClick={handleSave}>
            {saved ? 'Settings Saved!' : 'Save Settings'}
          </Button>
        }
      />

      {/* Prompt 16 Specification: Current System Information Display */}
      <Card title="Current Live System Information" style={{ marginBottom: '1.5rem' }}>
        <div className="grid-3" style={{ gap: '0.75rem' }}>
          <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Current Local System Time</span>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, marginTop: '0.2rem' }}>{currentTimeStr}</div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Detected System Timezone</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 700, marginTop: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              {systemTimezone}
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)' }}>Current Active Time Mode</span>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.2rem', textTransform: 'capitalize' }}>
              {timeMode} Mode
            </div>
          </div>
        </div>
      </Card>

      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        {/* Theme & Time Mode Settings */}
        <Card title="Theme & Time-Mode Preferences">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label className="gov-label">Theme Mode Setting</label>
              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <Button
                  variant={themeModeSetting === 'Default' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => { setThemeModeSetting('Default'); setManualTimeModeOverride(null); }}
                >
                  Default Theme Palette
                </Button>
                <Button
                  variant={themeModeSetting === 'Automatic' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => { setThemeModeSetting('Automatic'); setManualTimeModeOverride(null); }}
                >
                  Automatic (System Time-Based)
                </Button>
                <Button
                  variant={themeModeSetting === 'Manual' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setThemeModeSetting('Manual')}
                >
                  Manual Control
                </Button>
              </div>

              {/* Specification Palette Preview Display */}
              <div style={{ background: 'var(--bg-surface)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color-subtle)' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-main)', display: 'block', marginBottom: '0.5rem' }}>
                  Default Theme Color Palette Specification
                </span>
                
                {/* Primary Colors */}
                <div style={{ marginBottom: '0.75rem' }}>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>
                    Primary colors
                  </span>
                  <div style={{ display: 'flex', borderRadius: 'var(--radius-sm)', overflow: 'hidden', height: '34px', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ width: '45%', background: '#F5A623', color: '#ffffff', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', paddingLeft: '0.75rem', fontFamily: 'monospace' }}>
                      F5A623
                    </div>
                    <div style={{ width: '55%', background: '#248AFD', color: '#ffffff', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', paddingLeft: '0.75rem', fontFamily: 'monospace' }}>
                      248AFD
                    </div>
                  </div>
                </div>

                {/* Supporting Colors */}
                <div>
                  <span style={{ fontSize: '0.725rem', color: 'var(--text-subtle)', display: 'block', marginBottom: '0.25rem', fontWeight: 600 }}>
                    Supporting colors
                  </span>
                  <div style={{ display: 'flex', borderRadius: 'var(--radius-sm)', overflow: 'hidden', height: '34px', boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ flex: 1, background: '#FF4747', color: '#ffffff', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem', fontFamily: 'monospace' }}>
                      FF4747
                    </div>
                    <div style={{ flex: 1.2, background: '#71C02B', color: '#ffffff', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem', fontFamily: 'monospace' }}>
                      71C02B
                    </div>
                    <div style={{ flex: 1, background: '#FFC100', color: '#ffffff', fontWeight: 700, fontSize: '0.75rem', display: 'flex', alignItems: 'center', paddingLeft: '0.5rem', fontFamily: 'monospace' }}>
                      FFC100
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <label className="gov-label">Active Time Mode Override</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                <Button
                  variant={timeMode === 'morning' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => { setManualTimeModeOverride('morning'); setThemeModeSetting('Manual'); }}
                >
                  Morning (05:00-11:59)
                </Button>
                <Button
                  variant={timeMode === 'afternoon' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => { setManualTimeModeOverride('afternoon'); setThemeModeSetting('Manual'); }}
                >
                  Afternoon (12:00-16:59)
                </Button>
                <Button
                  variant={timeMode === 'evening' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => { setManualTimeModeOverride('evening'); setThemeModeSetting('Manual'); }}
                >
                  Evening (17:00-20:59)
                </Button>
                <Button
                  variant={timeMode === 'night' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => { setManualTimeModeOverride('night'); setThemeModeSetting('Manual'); }}
                >
                  Night (21:00-04:59)
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Notifications & Data Refresh Settings */}
        <Card title="Notifications & Refresh Controls">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div className="flex-between" style={{ paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color-subtle)' }}>
              <div>
                <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>System Notifications</span>
                <p style={{ fontSize: '0.775rem', color: 'var(--text-subtle)' }}>Enable or disable real-time safety alert broadcasts.</p>
              </div>
              <input
                type="checkbox"
                checked={notificationsOn}
                onChange={(e) => setNotificationsOn(e.target.checked)}
                style={{ width: 18, height: 18, accentColor: 'var(--primary)' }}
              />
            </div>

            <div>
              <label className="gov-label">Data Refresh Mode</label>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button
                  variant={dataRefreshMode === 'Automatic' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setDataRefreshMode('Automatic')}
                >
                  Automatic (Live Feed)
                </Button>
                <Button
                  variant={dataRefreshMode === 'Manual' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setDataRefreshMode('Manual')}
                >
                  Manual Trigger
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Accessibility Settings */}
      <Card title="Accessibility Controls">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
          <div>
            <label className="gov-label">Font Size Scale</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button
                variant={fontSizeScale === 'normal' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFontSizeScale('normal')}
              >
                Normal (100%)
              </Button>
              <Button
                variant={fontSizeScale === 'large' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFontSizeScale('large')}
              >
                Large (112%)
              </Button>
              <Button
                variant={fontSizeScale === 'xlarge' ? 'primary' : 'secondary'}
                size="sm"
                onClick={() => setFontSizeScale('xlarge')}
              >
                Extra Large (125%)
              </Button>
            </div>
          </div>

          <div className="flex-between" style={{ borderTop: '1px solid var(--border-color-subtle)', paddingTop: '0.85rem' }}>
            <div>
              <span style={{ fontSize: '0.875rem', fontWeight: 600 }}>Reduced Motion Mode</span>
              <p style={{ fontSize: '0.775rem', color: 'var(--text-subtle)' }}>Disable all non-essential interface transition animations.</p>
            </div>
            <input
              type="checkbox"
              checked={reducedMotion}
              onChange={(e) => setReducedMotion(e.target.checked)}
              style={{ width: 18, height: 18, accentColor: 'var(--primary)' }}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
