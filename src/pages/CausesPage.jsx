import React from 'react';
import { SearchAlert, AlertTriangle, CloudRain, Gauge, Compass, UserX } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { StatCard } from '../components/common/StatCard';
import { FilterBar } from '../components/filters/FilterBar';

const primaryCauses = [
  {
    title: 'Excessive Speeding & Racing',
    share: '44.8%',
    description: 'Speeds exceeding 100 km/h on un-segregated corridors or near urban merges.',
    risk: 'critical',
    icon: Gauge,
    color: '#ef4444',
  },
  {
    title: 'Sub-standard Road Geometry',
    share: '22.1%',
    description: 'Sharp unbanked curves, blind corners, and missing deceleration ramps.',
    risk: 'high',
    icon: Compass,
    color: '#f59e0b',
  },
  {
    title: 'Adverse Weather & Low Visibility',
    share: '14.5%',
    description: 'Dense winter fog, monsoon hydroplaning, and inadequate street illumination.',
    risk: 'moderate',
    icon: CloudRain,
    color: '#06b6d4',
  },
  {
    title: 'Wrong-Side Driving & Distraction',
    share: '18.6%',
    description: 'Unauthorized U-turns, mobile phone use, and lane cutting.',
    risk: 'high',
    icon: UserX,
    color: '#6366f1',
  },
];

export const CausesPage = () => {
  return (
    <div>
      <PageHeader
        title="Accident Cause Analysis & Attribution"
        subtitle="AI root-cause engine attributing crash triggers across human, vehicle, infrastructure and weather vectors."
        badgeText="Root-Cause AI"
        breadcrumbs={['Home', 'Cause Analysis']}
      />

      <FilterBar />

      <div className="grid-2" style={{ marginBottom: '1.75rem' }}>
        {primaryCauses.map((cause, idx) => (
          <Card key={idx} glow>
            <div className="flex-between" style={{ marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '12px',
                    background: 'rgba(255,255,255,0.05)',
                    color: cause.color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <cause.icon size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem' }}>{cause.title}</h3>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-subtle)' }}>Attribution Category</span>
                </div>
              </div>
              <span style={{ fontSize: '1.75rem', fontWeight: 800, color: cause.color, fontFamily: 'Outfit' }}>
                {cause.share}
              </span>
            </div>

            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              {cause.description}
            </p>

            {/* Progress / Weight bar */}
            <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ width: cause.share, height: '100%', background: cause.color }} />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
