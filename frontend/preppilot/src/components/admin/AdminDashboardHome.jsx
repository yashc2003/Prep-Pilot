import React, { useMemo } from 'react';
import { BriefcaseIcon, BuildingOffice2Icon, UserGroupIcon } from '@heroicons/react/24/outline';
import AdminPageHeader from './AdminPageHeader';
import bannerArt from '../../assets/admin-banner.svg';

const StatCard = ({ title, value, subtitle }) => {
  return (
    <div className="dashboard-card">
      <h3>{title}</h3>
      <p className="stat-number">{value}</p>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
};

const QuickChip = ({ icon, label, value }) => {
  return (
    <div className="admin-chip">
      <span className="admin-chip-icon">{icon}</span>
      <span className="admin-chip-label">{label}</span>
      <span className="admin-chip-value">{value}</span>
    </div>
  );
};

const InterviewStatRow = ({ label, value, total }) => {
  const width = total <= 0 ? 0 : Math.round((value / total) * 100);

  return (
    <div className="admin-stat-row">
      <div className="admin-stat-row-head">
        <span className="admin-muted">{label}</span>
        <span className="admin-stat-value">{value}</span>
      </div>
      <div className="progress-bar">
        <div className="progress" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
};

const AdminDashboardHome = ({ totals, interviews }) => {
  const interviewTotal = useMemo(
    () => (interviews?.scheduled ?? 0) + (interviews?.completed ?? 0),
    [interviews]
  );

  return (
    <div className="dashboard-container">
      <AdminPageHeader
        title="Admin Dashboard"
        subtitle="Overview of candidates, partners, jobs and interviews."
        imageSrc={bannerArt}
        right={
          <div className="admin-chip-row">
            <QuickChip icon={<UserGroupIcon className="admin-icon" />} label="Candidates" value={totals.totalCandidates} />
            <QuickChip icon={<BuildingOffice2Icon className="admin-icon" />} label="Companies" value={totals.totalCompanies} />
            <QuickChip icon={<BriefcaseIcon className="admin-icon" />} label="Active Jobs" value={totals.activeJobs} />
          </div>
        }
      />

      <div className="dashboard-grid">
        <StatCard title="Total Candidates" value={totals.totalCandidates} subtitle="Registered candidates" />
        <StatCard title="Total Companies" value={totals.totalCompanies} subtitle="Company profiles" />
        <StatCard title="Total Consultancies" value={totals.totalConsultancies} subtitle="Consultancy partners" />
        <StatCard title="Active Jobs" value={totals.activeJobs} subtitle="Published and active" />
        <StatCard title="Interview Statistics" value={interviews.completed} subtitle="Completed interviews" />
      </div>

      <div className="recent-activity">
        <div className="admin-section-head">
          <h3>Interview Statistics</h3>
          <span className="admin-muted">Scheduled + Completed: {interviewTotal}</span>
        </div>

        <div className="admin-stats-grid">
          <InterviewStatRow label="Scheduled" value={interviews.scheduled} total={interviewTotal} />
          <InterviewStatRow label="Completed" value={interviews.completed} total={interviewTotal} />
          <InterviewStatRow label="Selected" value={interviews.selected} total={interviewTotal} />
          <InterviewStatRow label="Rejected" value={interviews.rejected} total={interviewTotal} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardHome;
