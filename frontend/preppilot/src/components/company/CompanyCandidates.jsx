import React, { useMemo } from 'react';

const CompanyCandidates = ({ candidates, jobs, onAction, onUpdateStatus, onScheduleInterview }) => {
  const jobTitleById = useMemo(() => new Map(jobs.map((j) => [j.id, j.title])), [jobs]);

  return (
    <div className="dashboard-container">
      <div className="page-section-head">
        <h2>Candidates Page</h2>
        <p className="muted">Review candidates, shortlist/reject, and schedule interviews.</p>
      </div>

      <div className="ui-card">
        <div className="ui-card-head">
          <h3>Candidate list</h3>
          <span className="muted">{candidates.length} applications</span>
        </div>

        <div className="ui-table-wrap">
          <table className="ui-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Skills</th>
                <th>Resume</th>
                <th>AI Interview Score</th>
                <th>Status</th>
                <th className="ui-th-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((c) => (
                <tr key={c.id}>
                  <td className="ui-td-strong">
                    {c.name}
                    <div className="muted">Applied: {jobTitleById.get(c.appliedJobId) ?? '—'}</div>
                  </td>
                  <td>
                    <div className="ui-pill-row">
                      {c.skills.map((s) => (
                        <span key={s} className="pill pill-info">
                          {s}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <button type="button" className="btn btn-ghost btn-small" onClick={() => alert(`Resume: ${c.resume}`)}>
                      View
                    </button>
                  </td>
                  <td>{c.aiInterviewScore}</td>
                  <td>
                    <select
                      className="ui-select"
                      value={c.applicationStatus}
                      onChange={(e) => onUpdateStatus?.(c.id, e.target.value)}
                      aria-label={`Update status for ${c.name}`}
                    >
                      <option value="Applied">Applied</option>
                      <option value="Shortlisted">Shortlisted</option>
                      <option value="Interview Scheduled">Interview Scheduled</option>
                      <option value="Selected">Selected</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </td>
                  <td className="ui-td-actions">
                    <button type="button" className="btn btn-primary btn-small" onClick={() => onAction(c.id, 'shortlist')} disabled={c.applicationStatus === 'Shortlisted'}>
                      Shortlist
                    </button>
                    <button type="button" className="btn btn-danger btn-small" onClick={() => onAction(c.id, 'reject')} disabled={c.applicationStatus === 'Rejected'}>
                      Reject
                    </button>
                    <button type="button" className="btn btn-ghost btn-small" onClick={() => onScheduleInterview(c.id)} disabled={c.applicationStatus === 'Rejected'}>
                      Interview
                    </button>
                  </td>
                </tr>
              ))}
              {candidates.length === 0 ? (
                <tr>
                  <td colSpan={6} className="ui-empty">
                    No applications received yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompanyCandidates;
