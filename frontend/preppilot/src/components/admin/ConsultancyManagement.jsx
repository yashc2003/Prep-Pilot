import React from 'react';
import { AcademicCapIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import AdminPageHeader from './AdminPageHeader';
import bannerArt from '../../assets/admin-banner.svg';

const StatusPill = ({ status }) => {
  const normalized = (status || '').toLowerCase();
  const className =
    normalized === 'approved'
      ? 'pill pill-green'
      : normalized === 'suspended'
        ? 'pill pill-red'
        : normalized === 'pending'
          ? 'pill pill-amber'
          : 'pill';

  return <span className={className}>{status}</span>;
};

const ConsultancyManagement = ({ consultancies, onAction }) => {
  return (
    <div className="dashboard-container">
      <AdminPageHeader
        title="Consultancy Management"
        subtitle="Manage consultancies and track candidate preparation performance."
        imageSrc={bannerArt}
        right={
          <div className="admin-chip-row">
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <AcademicCapIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Consultancies</span>
              <span className="admin-chip-value">{(consultancies || []).length}</span>
            </div>
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <ChartBarIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Avg score</span>
              <span className="admin-chip-value">
                {(consultancies || []).length
                  ? (
                      (consultancies || []).reduce((sum, c) => sum + (c.prepStats?.avgInterviewScore || 0), 0) /
                      (consultancies || []).length
                    ).toFixed(1)
                  : '0.0'}
              </span>
            </div>
          </div>
        }
      />

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Consultancy details</th>
              <th>Candidate preparation statistics</th>
              <th>Status</th>
              <th className="admin-th-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {(consultancies || []).map((k) => (
              <tr key={k.id}>
                <td>
                  <div className="admin-td-strong">{k.name}</div>
                  <div className="admin-muted">{k.contactEmail}</div>
                </td>
                <td>
                  <div className="admin-statline">
                    <span className="admin-muted">Candidates:</span> {k.prepStats.candidatesPrepared}
                  </div>
                  <div className="admin-statline">
                    <span className="admin-muted">Mock interviews:</span> {k.prepStats.mockInterviews}
                  </div>
                  <div className="admin-statline">
                    <span className="admin-muted">Avg score:</span> {k.prepStats.avgInterviewScore}/10
                  </div>
                </td>
                <td>
                  <StatusPill status={k.status} />
                </td>
                <td className="admin-td-actions">
                  <button className="btn btn-small" type="button" onClick={() => onAction(k.id, 'approve')}>
                    Approve
                  </button>
                  <button className="btn btn-small btn-warn" type="button" onClick={() => onAction(k.id, 'suspend')}>
                    {k.status === 'Suspended' ? 'Unsuspend' : 'Suspend'}
                  </button>
                </td>
              </tr>
            ))}

            {(consultancies || []).length === 0 ? (
              <tr>
                <td colSpan={4} className="admin-empty">
                  No consultancies found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ConsultancyManagement;
