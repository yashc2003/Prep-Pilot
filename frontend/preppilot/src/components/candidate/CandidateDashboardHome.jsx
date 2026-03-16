import React from 'react';
import { ChartBarIcon, BriefcaseIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import AdminPageHeader from '../admin/AdminPageHeader';
import bannerArt from '../../assets/admin-banner.svg';

const StatCard = ({ title, value, subtitle, icon }) => {
  return (
    <div className="dashboard-card">
      <div className="candidate-card-head">
        <h3>{title}</h3>
        <span className="candidate-card-icon">{icon}</span>
      </div>
      <p className="stat-number">{value}</p>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
};

const CandidateDashboardHome = ({ recommendedJobs, performanceScore, preparationProgress }) => {
  return (
    <div className="dashboard-container">
      <AdminPageHeader
        title="Candidate Dashboard"
        subtitle="Recommended jobs, interview performance and preparation progress."
        imageSrc={bannerArt}
      />

      <div className="dashboard-grid">
        <StatCard
          title="Recommended jobs"
          value={(recommendedJobs || []).length}
          subtitle="Best matches for your skills"
          icon={<BriefcaseIcon className="candidate-icon" />}
        />
        <StatCard
          title="Interview performance score"
          value={performanceScore}
          subtitle="Average of latest results"
          icon={<ChartBarIcon className="candidate-icon" />}
        />
        <div className="dashboard-card">
          <div className="candidate-card-head">
            <h3>Preparation progress</h3>
            <span className="candidate-card-icon">
              <ArrowTrendingUpIcon className="candidate-icon" />
            </span>
          </div>
          <p className="stat-number">{preparationProgress}%</p>
          <div className="progress-bar">
            <div className="progress" style={{ width: `${preparationProgress}%` }} />
          </div>
          <p>Keep going — add skills and upload your resume.</p>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recommended jobs</h3>
        <div className="candidate-job-list">
          {(recommendedJobs || []).map((j) => (
            <div key={j.id} className="candidate-job-card">
              <div className="candidate-job-title">{j.title}</div>
              <div className="candidate-job-meta">
                <span className="candidate-job-pill">{j.company}</span>
                <span className="candidate-job-pill">{j.location}</span>
                <span className="candidate-job-pill">{j.experience} yrs</span>
              </div>
              <div className="candidate-job-skills">
                {j.skills.map((s) => (
                  <span key={s} className="candidate-skill">
                    {s}
                  </span>
                ))}
              </div>
              <div className="candidate-job-actions">
                <button className="btn btn-small" type="button" onClick={() => alert('Apply action will be wired')}>
                  Apply
                </button>
                <button className="btn btn-small btn-ghost" type="button" onClick={() => alert('Save action will be wired')}>
                  Save
                </button>
              </div>
            </div>
          ))}
          {(recommendedJobs || []).length === 0 ? <div className="admin-empty-box">No recommendations yet.</div> : null}
        </div>
      </div>
    </div>
  );
};

export default CandidateDashboardHome;

