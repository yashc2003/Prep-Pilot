import React from 'react';
import { ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import PageHero from '../shared/PageHero';
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

const Chip = ({ icon, label, value }) => {
  return (
    <div className="page-chip">
      <span className="page-chip-icon">{icon}</span>
      <span className="page-chip-label">{label}</span>
      <span className="page-chip-value">{value}</span>
    </div>
  );
};

const ConsultancyDashboardHome = ({ stats }) => {
  return (
    <div className="dashboard-container">
      <PageHero
        title="Consultancy Dashboard"
        subtitle="Track enrolments, mock interviews, and placement outcomes."
        imageSrc={bannerArt}
        right={
          <div className="page-chip-row">
            <Chip icon={<UserGroupIcon className="page-icon" />} label="Candidates" value={stats.totalCandidates} />
            <Chip icon={<ChartBarIcon className="page-icon" />} label="Placement" value={`${stats.placementRate}%`} />
          </div>
        }
      />

      <div className="dashboard-grid">
        <StatCard title="Total candidates enrolled" value={stats.totalCandidates} subtitle="Active in preparation plans" />
        <StatCard title="Mock interview sessions conducted" value={stats.mockConducted} subtitle="Completed sessions" />
        <StatCard title="Placement success rate" value={`${stats.placementRate}%`} subtitle="Based on tracked outcomes" />
      </div>
    </div>
  );
};

export default ConsultancyDashboardHome;

