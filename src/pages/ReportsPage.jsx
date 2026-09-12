import React from 'react';
import { FileText, Download, Calendar, Sparkles, FileCheck, FilePlus } from 'lucide-react';
import { PageHeader } from '../components/common/PageHeader';
import { Card } from '../components/common/Card';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';

const reportTemplates = [
  { title: 'National Highway Blackspot Audit', format: 'PDF & GeoJSON', size: '14.2 MB', frequency: 'Monthly', desc: 'Comprehensive GIS geospatial analysis of all 188 active blackspot corridors across NHAI routes.' },
  { title: 'State-Level Safety Performance Index', format: 'PDF & XLSX', size: '8.6 MB', frequency: 'Quarterly', desc: 'Comparative state safety rankings, fatality rate metrics, and compliance scorecards.' },
  { title: 'VRU Pedestrian & Two-Wheeler Safety Report', format: 'PDF', size: '5.4 MB', frequency: 'Monthly', desc: 'Targeted vulnerability analysis for urban arterial corridors and school zones.' },
  { title: 'MoRTH Executive Briefing Deck (2026)', format: 'PPTX & PDF', size: '24.1 MB', frequency: 'Annual', desc: 'High-level synthesis for Parliamentary Standing Committee on Transport.' },
];

export const ReportsPage = () => {
  return (
    <div>
      <PageHeader
        title="Safety Reports & Intelligence Library"
        subtitle="Generate, schedule, and export automated multi-agency road safety audit reports."
        badgeText="Report Automation"
        breadcrumbs={['Home', 'Reports']}
        actions={<Button variant="primary" icon={FilePlus}>Generate Custom Report</Button>}
      />

      <div className="grid-2" style={{ marginBottom: '1.75rem' }}>
        {reportTemplates.map((report, idx) => (
          <Card key={idx} title={report.title} subtitle={`Frequency: ${report.frequency} • Format: ${report.format}`}>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
              {report.desc}
            </p>
            <div className="flex-between">
              <span style={{ fontSize: '0.775rem', color: 'var(--text-subtle)' }}>File Size: {report.size}</span>
              <Button variant="outline" size="sm" icon={Download}>
                Export PDF
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card title="Recent Generated Safety Audits Log">
        <div className="table-responsive">
          <table className="custom-table">
            <thead>
              <tr>
                <th>Report Title</th>
                <th>Generated On</th>
                <th>Jurisdiction Scope</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 600 }}>August 2026 National Safety Audit</td>
                <td>Sep 01, 2026</td>
                <td>Pan-India</td>
                <td><Badge variant="low">Approved</Badge></td>
                <td><Button variant="ghost" size="sm" icon={Download}>Download</Button></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>NH-44 Corridor Risk Audit</td>
                <td>Aug 28, 2026</td>
                <td>Haryana Section</td>
                <td><Badge variant="low">Approved</Badge></td>
                <td><Button variant="ghost" size="sm" icon={Download}>Download</Button></td>
              </tr>
              <tr>
                <td style={{ fontWeight: 600 }}>Mumbai-Pune Exp Audit Briefing</td>
                <td>Aug 15, 2026</td>
                <td>Maharashtra</td>
                <td><Badge variant="low">Approved</Badge></td>
                <td><Button variant="ghost" size="sm" icon={Download}>Download</Button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
