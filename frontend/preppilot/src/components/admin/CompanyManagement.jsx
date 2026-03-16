import React from 'react';
import { BuildingOffice2Icon, CheckBadgeIcon } from '@heroicons/react/24/outline';
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

const CompanyManagement = ({ companies, onAction }) => {
  return (
    <div className="dashboard-container">
      <AdminPageHeader
        title="Company Management"
        subtitle="Review companies, view job postings, approve or suspend."
        imageSrc={bannerArt}
        right={
          <div className="admin-chip-row">
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <BuildingOffice2Icon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Companies</span>
              <span className="admin-chip-value">{(companies || []).length}</span>
            </div>
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <CheckBadgeIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Approved</span>
              <span className="admin-chip-value">{(companies || []).filter((c) => c.status === 'Approved').length}</span>
            </div>
          </div>
        }
      />

      <div className="admin-list">
        {(companies || []).map((c) => (
          <div className="admin-list-item" key={c.id}>
            <div className="admin-list-item-main">
              <div className="admin-list-title">
                <span className="admin-td-strong">{c.name}</span>
                <StatusPill status={c.status} />
              </div>

              <details className="admin-details">
                <summary className="admin-summary">View job postings ({(c.jobs || []).length})</summary>
                <div className="admin-jobs">
                  {(c.jobs || []).length === 0 ? (
                    <div className="admin-empty-box">No job postings.</div>
                  ) : (
                    <ul className="admin-job-list">
                      {c.jobs.map((j) => (
                        <li key={j.id} className="admin-job">
                          <span>{j.title}</span>
                          <span className="admin-muted">{j.status}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </details>
            </div>

            <div className="admin-list-item-actions">
              <button className="btn btn-small" type="button" onClick={() => onAction(c.id, 'approve')}>
                Approve
              </button>
              <button className="btn btn-small btn-warn" type="button" onClick={() => onAction(c.id, 'suspend')}>
                {c.status === 'Suspended' ? 'Unsuspend' : 'Suspend'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompanyManagement;
