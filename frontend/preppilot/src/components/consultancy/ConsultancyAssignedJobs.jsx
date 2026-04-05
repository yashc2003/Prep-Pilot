import React, { useMemo, useState } from 'react';

const ConsultancyAssignedJobs = ({ jobs, candidates, onToggleRecommendation }) => {
  const [selectedJobId, setSelectedJobId] = useState(jobs?.[0]?.id ?? '');

  const selectedJob = useMemo(() => jobs.find((j) => j.id === selectedJobId) ?? null, [jobs, selectedJobId]);

  return (
    <div className="dashboard-container">
      <div className="page-section-head">
        <h2>Assigned Jobs</h2>
        <p className="muted">View jobs provided by companies and recommend candidates.</p>
      </div>

      <div className="split-layout">
        <div className="ui-card">
          <div className="ui-card-head">
            <h3>View jobs provided by companies</h3>
          </div>

          <div className="ui-table-wrap">
            <table className="ui-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Deadline</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((j) => (
                  <tr
                    key={j.id}
                    className={j.id === selectedJobId ? 'ui-row-active' : ''}
                    onClick={() => setSelectedJobId(j.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="ui-td-strong">{j.title}</td>
                    <td>{j.company}</td>
                    <td>{j.location}</td>
                    <td>{j.deadline}</td>
                  </tr>
                ))}
                {jobs.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="ui-empty">
                      No assigned jobs yet.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>

        <div className="ui-card">
          <div className="ui-card-head">
            <h3>Recommend candidates</h3>
            <span className="muted">{selectedJob ? selectedJob.title : 'Select a job'}</span>
          </div>

          {selectedJob ? (
            <>
              <div className="ui-pill-row">
                {selectedJob.skills.map((s) => (
                  <span key={s} className="pill pill-info">
                    {s}
                  </span>
                ))}
              </div>

              <div className="ui-table-wrap">
                <table className="ui-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Progress</th>
                      <th>Status</th>
                      <th className="ui-th-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((c) => {
                      const recommended = selectedJob.recommendedCandidateIds.includes(c.id);
                      return (
                        <tr key={c.id}>
                          <td className="ui-td-strong">{c.name}</td>
                          <td>
                            <div className="ui-progress">
                              <div className="ui-progress-bar" style={{ width: `${c.progress}%` }} />
                            </div>
                            <div className="muted">{c.progress}%</div>
                          </td>
                          <td>
                            <span className="pill pill-neutral">{c.status}</span>
                          </td>
                          <td className="ui-td-actions">
                            <button
                              type="button"
                              className={`btn btn-small ${recommended ? 'btn-ghost' : 'btn-primary'}`}
                              onClick={() => onToggleRecommendation(selectedJob.id, c.id)}
                            >
                              {recommended ? 'Recommended' : 'Recommend'}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="ui-empty">Select a job to recommend candidates.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConsultancyAssignedJobs;

