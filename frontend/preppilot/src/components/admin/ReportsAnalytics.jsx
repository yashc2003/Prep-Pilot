import React, { useMemo } from 'react';
import { ChartBarSquareIcon, DocumentChartBarIcon } from '@heroicons/react/24/outline';
import AdminPageHeader from './AdminPageHeader';
import bannerArt from '../../assets/admin-banner.svg';

const ReportCard = ({ title, lines }) => {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>
      <div className="admin-report-lines">
        {lines.map((l) => (
          <div key={l.label} className="admin-report-line">
            <span className="admin-muted">{l.label}</span>
            <span className="admin-td-strong">{l.value}</span>
          </div>
        ))}
      </div>
      <div className="admin-card-actions">
        <button className="btn btn-small" type="button" onClick={() => alert('Export will be wired to backend/API')}>
          Export CSV
        </button>
        <button className="btn btn-small btn-ghost" type="button" onClick={() => alert('Details page can be added')}>
          View details
        </button>
      </div>
    </div>
  );
};

const ReportsAnalytics = ({ totals, interviews, companies }) => {
  const totalJobs = useMemo(() => (companies || []).flatMap((c) => c.jobs || []).length, [companies]);
  const activeJobs = totals?.activeJobs ?? 0;

  return (
    <div className="dashboard-container">
      <AdminPageHeader
        title="Reports & Analytics"
        subtitle="Track applications, placements and interview performance."
        imageSrc={bannerArt}
        right={
          <div className="admin-chip-row">
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <DocumentChartBarIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Active jobs</span>
              <span className="admin-chip-value">{activeJobs}</span>
            </div>
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <ChartBarSquareIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Completed</span>
              <span className="admin-chip-value">{interviews?.completed ?? 0}</span>
            </div>
          </div>
        }
      />

      <div className="dashboard-grid">
        <ReportCard
          title="Job applications report"
          lines={[
            { label: 'Active jobs', value: activeJobs },
            { label: 'Total jobs', value: totalJobs },
            { label: 'Applications', value: 342 },
          ]}
        />

        <ReportCard
          title="Placement statistics"
          lines={[
            { label: 'Candidates', value: totals?.totalCandidates ?? 0 },
            { label: 'Placed', value: 58 },
            { label: 'Placement rate', value: '24.8%' },
          ]}
        />

        <ReportCard
          title="Interview performance analysis"
          lines={[
            { label: 'Scheduled', value: interviews?.scheduled ?? 0 },
            { label: 'Completed', value: interviews?.completed ?? 0 },
            { label: 'Selected', value: interviews?.selected ?? 0 },
          ]}
        />
      </div>

      <div className="recent-activity">
        <h3>Notes</h3>
        <ul>
          <li>These reports are UI-ready; hook them to real API data when available.</li>
          <li>Export and “View details” buttons are placeholders for now.</li>
        </ul>
      </div>
    </div>
  );
};

export default ReportsAnalytics;
