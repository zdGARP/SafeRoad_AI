import React, { useState } from 'react';
import { Settings, Shield, Bell, Eye, Clock, Type, Sun, Moon, Save, RefreshCw, Sliders } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const SettingsPage = () => {
  const {
    user,
    systemTimezone,
    timeMode,
    setManualTimeModeOverride,
    fontSizeScale,
    setFontSizeScale,
    reducedMotion,
    setReducedMotion,
  } = useAuth();

  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <PageHeader
        title="Platform & Accessibility Settings"
        subtitle="Configure system accessibility parameters, time-based UI preferences, and alert notifications."
        badgeText="System Configuration"
        badgeVariant="primary"
        breadcrumbs={['Home', 'Settings']}
        actions={
          <Button variant="primary" icon={Save} onClick={handleSave}>
            {saved ? 'Settings Saved!' : 'Save Configurations'}
          </Button>
        }
      />

      <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
        {/* Time-Based UI Settings (Prompt 3) */}
        <Card title="Time-Based Adaptive UI Configuration">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label className="gov-label">Detected System Timezone</label>
              <input type="text" className="gov-input" value={systemTimezone} readOnly disabled />
              <span style={{ fontSize: '0.75rem', color: 'var(--text-subtle)', marginTop: '0.2rem', display: 'block' }}>
                Resolved automatically using <code style={{ background: 'var(--bg-surface)', padding: '0.1rem 0.3rem', borderRadius: '3px' }}>Intl.DateTimeFormat().resolvedOptions().timeZone</code>.
              </span>
            </div>

            <div>
              <label className="gov-label">Active Time Mode Override</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem' }}>
                <Button
                  variant={timeMode === 'morning' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setManualTimeModeOverride('morning')}
                >
                  Morning (05:00-11:59)
                </Button>
                <Button
                  variant={timeMode === 'afternoon' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setManualTimeModeOverride('afternoon')}
                >
                  Afternoon (12:00-16:59)
                </Button>
                <Button
                  variant={timeMode === 'evening' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setManualTimeModeOverride('evening')}
                >
                  Evening (17:00-20:59)
                </Button>
                <Button
                  variant={timeMode === 'night' ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setManualTimeModeOverride('night')}
                >
                  Night (21:00-04:59)
                </Button>
              </div>
              <Button variant="outline" size="sm" style={{ marginTop: '0.5rem', width: '100%' }} onClick={() => setManualTimeModeOverride(null)}>
                Reset to Automatic Timezone Calculation
              </Button>
            </div>
          </div>
        </Card>

        {/* Accessibility Settings (Prompt 4) */}
        <Card title="Accessibility Controls">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label className="gov-label">Adjustable Text Scale</label>
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
                <p style={{ fontSize: '0.775rem', color: 'var(--text-subtle)' }}>Disable all non-essential transition animations for accessibility.</p>
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
    </div>
  );
};
