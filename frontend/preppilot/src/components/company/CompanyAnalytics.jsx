import React, { useMemo } from 'react';

const clampPercent = (value) => Math.max(0, Math.min(100, value));

const Bar = ({ label, value }) => {
  const width = clampPercent(value);
  return (
    <div className="mini-bar-row">
      <div className="mini-bar-head">
        <span className="mini-bar-label">{label}</span>
        <span className="mini-bar-value">{width}%</span>
      </div>
      <div className="mini-bar-track">
        <div className="mini-bar-fill" style={{ width: `${width}%` }} />
      </div>
    </div>
  );
};

const CompanyAnalytics = ({ jobs, candidates, interviews }) => {
  const trends = useMemo(() => {
    const openJobs = jobs.filter((j) => j.status === 'Open').length;
    const rejected = candidates.filter((c) => c.applicationStatus === 'Rejected').length;
    const shortlisted = candidates.filter((c) => c.applicationStatus === 'Shortlisted').length;
    const total = candidates.length || 1;
    return {
      openJobs,
      applicationTrend: clampPercent(Math.round((candidates.length / Math.max(1, jobs.length)) * 25)),
      hiringSuccess: clampPercent(Math.round((shortlisted / total) * 100)),
      interviewPerformance: clampPercent(
        Math.round(
          (interviews.filter((i) => i.status === 'Completed').length / Math.max(1, interviews.length)) * 100
        )
      ),
      rejectRate: clampPercent(Math.round((rejected / total) * 100)),
    };
  }, [jobs, candidates, interviews]);

  return (
    <div className="dashboard-container">
      <div className="page-section-head">
        <h2>Analytics Page</h2>
        <p className="muted">Application trends, hiring success rate, and interview performance.</p>
      </div>

      <div className="split-layout">
        <div className="ui-card">
          <div className="ui-card-head">
            <h3>Application trends</h3>
            <span className="muted">Open jobs: {trends.openJobs}</span>
          </div>
          <div className="mini-chart">
            <Bar label="Applications / Job health" value={trends.applicationTrend} />
            <Bar label="Reject rate" value={trends.rejectRate} />
          </div>
        </div>

        <div className="ui-card">
          <div className="ui-card-head">
            <h3>Hiring success rate</h3>
            <span className="muted">Shortlisted / Total</span>
          </div>
          <div className="mini-chart">
            <Bar label="Hiring success" value={trends.hiringSuccess} />
          </div>
        </div>
      </div>

      <div className="ui-card">
        <div className="ui-card-head">
          <h3>Interview performance</h3>
          <span className="muted">Completed / Scheduled</span>
        </div>
        <div className="mini-chart">
          <Bar label="Interview completion" value={trends.interviewPerformance} />
        </div>
      </div>
    </div>
  );
};

export default CompanyAnalytics;

