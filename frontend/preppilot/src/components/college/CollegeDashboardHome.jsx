import React, { useMemo } from 'react';
import { BuildingOffice2Icon, ChartBarSquareIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import AdminPageHeader from '../admin/AdminPageHeader';
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

const StatRow = ({ label, value, total }) => {
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

const Chip = ({ icon, label, value }) => {
  return (
    <div className="admin-chip">
      <span className="admin-chip-icon">{icon}</span>
      <span className="admin-chip-label">{label}</span>
      <span className="admin-chip-value">{value}</span>
    </div>
  );
};

const CollegeDashboardHome = ({ students, drives, opportunities, placementStats, companiesVisiting }) => {
  const totalDrives = drives?.length ?? 0;
  const openOpportunities = opportunities?.length ?? 0;

  const driveRegistrationTotal = useMemo(
    () => (drives || []).reduce((sum, d) => sum + (d.registered ?? 0), 0),
    [drives]
  );

  return (
    <div className="dashboard-container">
      <AdminPageHeader
        title="College Dashboard"
        subtitle="Track students, visiting companies, drives and interview readiness."
        imageSrc={bannerArt}
        right={
          <div className="admin-chip-row">
            <Chip icon={<UserGroupIcon className="admin-icon" />} label="Students" value={placementStats.total} />
            <Chip icon={<BuildingOffice2Icon className="admin-icon" />} label="Companies" value={companiesVisiting} />
            <Chip icon={<ChartBarSquareIcon className="admin-icon" />} label="Placed %" value={`${placementStats.placedPct}%`} />
          </div>
        }
      />

      <div className="dashboard-grid">
        <StatCard title="Total Registered Students" value={placementStats.total} subtitle="All courses" />
        <StatCard title="Companies Visiting Campus" value={companiesVisiting} subtitle="Unique recruiters" />
        <StatCard title="Placement Drives" value={totalDrives} subtitle={`Registrations: ${driveRegistrationTotal}`} />
        <StatCard title="Company Opportunities" value={openOpportunities} subtitle="Open postings" />
        <StatCard title="Placement Statistics" value={`${placementStats.placedPct}%`} subtitle={`${placementStats.placed} placed`} />
      </div>

      <div className="recent-activity">
        <div className="admin-section-head">
          <h3>Student Placement Status</h3>
          <span className="admin-muted">Total students: {placementStats.total}</span>
        </div>

        <div className="admin-stats-grid">
          <StatRow label="Placed" value={placementStats.placed} total={placementStats.total} />
          <StatRow label="In Process" value={placementStats.inProcess} total={placementStats.total} />
          <StatRow label="Not Placed" value={placementStats.notPlaced} total={placementStats.total} />
        </div>
      </div>
    </div>
  );
};

export default CollegeDashboardHome;

