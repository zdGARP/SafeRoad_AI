import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wrench, ShieldCheck, MapPin, Sparkles, Plus } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { InterventionCard } from '../components/cards/InterventionCard';
import { interventionService } from '../services/interventionService';
import { riskService } from '../services/riskService';

export const InterventionsPage = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocId, setSelectedLocId] = useState('LOC-CHENNAI-04');
  const [interventions, setInterventions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    riskService.getLocations().then((locs) => setLocations(locs));
  }, []);

  useEffect(() => {
    setLoading(true);
    interventionService.getInterventions(selectedLocId).then((data) => {
      setInterventions(data);
      setLoading(false);
    });
  }, [selectedLocId]);

  const handleSimulate = (item) => {
    navigate('/impact-simulation', { state: { initialInterventionId: item.id } });
  };

  return (
    <div>
      <PageHeader
        title="AI Intervention Recommendations"
        subtitle="Prioritized safety countermeasures and engineering solutions to mitigate crash frequency at high-risk corridors."
        badgeText="Intervention Engine"
        badgeVariant="primary"
        breadcrumbs={['Home', 'Interventions']}
        actions={
          <Button variant="primary" icon={Plus} onClick={() => navigate('/impact-simulation')}>
            Open Simulation Sandbox
          </Button>
        }
      />

      {/* Location Filter */}
      <div className="gov-card" style={{ marginBottom: '1.5rem', padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <MapPin size={16} style={{ color: 'var(--primary)' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Select High-Risk Location:</span>
          <select
            className="gov-select"
            value={selectedLocId}
            onChange={(e) => setSelectedLocId(e.target.value)}
            style={{ height: '36px', width: 'auto', fontSize: '0.85rem' }}
          >
            {locations.map((loc) => (
              <option key={loc.id} value={loc.id}>
                {loc.name} ({loc.city}) — Risk Score: {loc.riskScore}/100
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Countermeasure Cards Grid */}
      <div className="grid-3">
        {interventions.map((item) => (
          <InterventionCard key={item.id} item={item} onSimulate={handleSimulate} />
        ))}
      </div>
    </div>
  );
};
