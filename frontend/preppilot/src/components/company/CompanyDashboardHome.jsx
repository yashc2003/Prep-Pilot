import React, { useMemo } from 'react';
import { BriefcaseIcon, CalendarDaysIcon, ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/outline';
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

const CompanyDashboardHome = ({ stats, jobs, candidates, interviews }) => {
  const recentApplications = useMemo(() => {
    const list = candidates
      .filter((c) => c.applicationStatus !== 'Rejected')
      .slice()
      .sort((a, b) => (b.aiInterviewScore ?? 0) - (a.aiInterviewScore ?? 0))
      .slice(0, 5);
    return list;
  }, [candidates]);

  const nextInterview = useMemo(() => {
    const upcoming = interviews
      .filter((i) => i.status === 'Scheduled')
      .slice()
      .sort((a, b) => new Date(a.time) - new Date(b.time))[0];
    return upcoming ?? null;
  }, [interviews]);

  return (
    <div className="dashboard-container">
      <PageHero
        title="Company Dashboard"
        subtitle="Track job posts, applications, shortlists, and interviews."
        imageSrc={bannerArt}
        right={
          <div className="page-chip-row">
            <Chip icon={<BriefcaseIcon className="page-icon" />} label="Jobs" value={stats.totalJobPosts} />
            <Chip icon={<UserGroupIcon className="page-icon" />} label="Applicants" value={stats.applicationsReceived} />
            <Chip icon={<CalendarDaysIcon className="page-icon" />} label="Interviews" value={stats.scheduledInterviews} />
          </div>
        }
      />

      <div className="dashboard-grid">
        <StatCard title="Total Job Posts" value={stats.totalJobPosts} subtitle="Active listings" />
        <StatCard title="Applications Received" value={stats.applicationsReceived} subtitle="Across all jobs" />
        <StatCard title="Shortlisted Candidates" value={stats.shortlistedCandidates} subtitle="Ready for next steps" />
        <StatCard title="Scheduled Interviews" value={stats.scheduledInterviews} subtitle="Upcoming interviews" />
      </div>

      <div className="split-layout">
        <div className="ui-card">
          <div className="ui-card-head">
            <h3>Top candidates</h3>
            <span className="muted">AI interview score</span>
          </div>

          <div className="ui-table-wrap">
            <table className="ui-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>AI Interview Score</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentApplications.map((c) => (
                  <tr key={c.id}>
                    <td className="ui-td-strong">{c.name}</td>
                    <td>{c.aiInterviewScore}</td>
                    <td>
                      <span className={`pill ${c.applicationStatus === 'Shortlisted' ? 'pill-success' : 'pill-neutral'}`}>{c.applicationStatus}</span>
                    </td>
                  </tr>
                ))}
                {recentApplications.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="ui-empty">
                      No candidates yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="ui-card">
          <div className="ui-card-head">
            <h3>Next interview</h3>
            <span className="muted">{nextInterview ? nextInterview.candidateName : 'No scheduled interviews'}</span>
          </div>

          {nextInterview ? (
            <div className="ui-kpi">
              <div className="ui-kpi-row">
                <ChartBarIcon className="ui-kpi-icon" />
                <div>
                  <div className="ui-kpi-title">{nextInterview.candidateName}</div>
                  <div className="muted">{new Date(nextInterview.time).toLocaleString()}</div>
                </div>
              </div>
              <div className="ui-pill-row">
                <span className="pill pill-info">Status: {nextInterview.status}</span>
                <span className="pill pill-neutral">Jobs open: {jobs.filter((j) => j.status === 'Open').length}</span>
              </div>
            </div>
          ) : (
            <div className="ui-empty">Schedule interviews from the Candidates page.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboardHome;

