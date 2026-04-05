import React, { useMemo, useState } from 'react';

const CompanyManageJobs = ({ jobs, onEdit, onDelete, onUpdateStatus }) => {
  const [titleQuery, setTitleQuery] = useState('');
  const [dateField, setDateField] = useState('postedDate');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const filteredJobs = useMemo(() => {
    const q = titleQuery.trim().toLowerCase();
    return jobs.filter((j) => {
      if (q && !(j.title || '').toLowerCase().includes(q)) return false;
      const dateValue = (j?.[dateField] || '').slice(0, 10);
      if (fromDate && (!dateValue || dateValue < fromDate)) return false;
      if (toDate && (!dateValue || dateValue > toDate)) return false;
      return true;
    });
  }, [jobs, titleQuery, dateField, fromDate, toDate]);

  return (
    <div className="dashboard-container">
      <div className="page-section-head">
        <h2>Manage Jobs</h2>
        <p className="muted">Edit or delete posted jobs.</p>
      </div>

      <div className="ui-card">
        <div className="ui-card-head">
          <h3>Job posts</h3>
          <span className="muted">
            {filteredJobs.length} shown / {jobs.length} total
          </span>
        </div>

        <div className="company-job-filters">
          <div className="ui-field">
            <label className="ui-label" htmlFor="company-job-title-filter">
              Title
            </label>
            <input
              id="company-job-title-filter"
              className="ui-input"
              value={titleQuery}
              onChange={(e) => setTitleQuery(e.target.value)}
              placeholder="Filter by job title"
            />
          </div>

          <div className="ui-field">
            <label className="ui-label" htmlFor="company-job-date-field">
              Date Field
            </label>
            <select id="company-job-date-field" className="ui-select" value={dateField} onChange={(e) => setDateField(e.target.value)}>
              <option value="postedDate">Posted Date</option>
              <option value="deadline">Deadline</option>
            </select>
          </div>

          <div className="ui-field">
            <label className="ui-label" htmlFor="company-job-from-date">
              From
            </label>
            <input id="company-job-from-date" className="ui-input" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
          </div>

          <div className="ui-field">
            <label className="ui-label" htmlFor="company-job-to-date">
              To
            </label>
            <input id="company-job-to-date" className="ui-input" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
          </div>

          <div className="company-job-filters-actions">
            <button
              type="button"
              className="btn btn-ghost btn-small"
              onClick={() => {
                setTitleQuery('');
                setFromDate('');
                setToDate('');
              }}
              disabled={!titleQuery && !fromDate && !toDate}
            >
              Clear
            </button>
          </div>
        </div>

        <div className="ui-table-wrap">
          <table className="ui-table">
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Posted Date</th>
                <th>Deadline</th>
                <th>Applications</th>
                <th>Status</th>
                <th className="ui-th-right">Edit / Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobs.map((j) => (
                <tr key={j.id}>
                  <td className="ui-td-strong">{j.title}</td>
                  <td>{j.postedDate}</td>
                  <td>{j.deadline}</td>
                  <td>{j.applications ?? 0}</td>
                  <td>
                    <select className="ui-select" value={j.status} onChange={(e) => onUpdateStatus?.(j.id, e.target.value)} aria-label={`Update status for ${j.title}`}>
                      <option value="Open">Open</option>
                      <option value="Paused">Paused</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </td>
                  <td className="ui-td-actions">
                    <button type="button" className="btn btn-ghost btn-small" onClick={() => onEdit(j.id)}>
                      Edit
                    </button>
                    <button type="button" className="btn btn-danger btn-small" onClick={() => onDelete(j.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {filteredJobs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="ui-empty">
                    {jobs.length === 0 ? 'No jobs yet. Post your first job from Post Job.' : 'No jobs match your filters.'}
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

export default CompanyManageJobs;
