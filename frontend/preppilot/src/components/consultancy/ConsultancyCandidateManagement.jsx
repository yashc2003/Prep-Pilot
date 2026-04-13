import React, { useMemo, useState } from 'react';

const ConsultancyCandidateManagement = ({ candidates, onNavigate }) => {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (candidates || []).filter((c) => (!q ? true : c.name.toLowerCase().includes(q)));
  }, [candidates, query]);

  return (
    <div className="dashboard-container">
      <div className="page-section-head">
        <h2>Candidate Management</h2>
        <p className="muted">View enrolled candidates and their preparation progress.</p>
      </div>

      <div className="admin-toolbar">
        <button className="btn btn-small btn-ghost" type="button" onClick={() => onNavigate?.('prep')}>
          View Candidate-Preparation
        </button>
        <input
          className="admin-input"
          placeholder="Search candidate by name..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="pill">Showing: {filtered.length}</span>
      </div>

      <div className="ui-card">
        <div className="ui-card-head">
          <h3>View Candidate</h3>
          <span className="muted">Technical + soft skill tracks</span>
        </div>

        <div className="ui-table-wrap">
          <table className="ui-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Technical</th>
                <th>Soft skill</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id}>
                  <td className="ui-td-strong">{c.name}</td>
                  <td>
                    <div className="ui-progress">
                      <div className="ui-progress-bar" style={{ width: `${c.progress ?? 0}%` }} />
                    </div>
                    <div className="muted">{c.progress ?? 0}% · {c.status ?? 'In Progress'}</div>
                  </td>
                  <td>
                    <div className="ui-progress">
                      <div className="ui-progress-bar" style={{ width: `${c.softSkillProgress ?? 0}%` }} />
                    </div>
                    <div className="muted">{c.softSkillProgress ?? 0}% · {c.softSkillStatus ?? 'In Progress'}</div>
                  </td>
                  <td>
                    <div className="ui-pill-row">
                      <span className="pill pill-neutral">{c.status ?? 'In Progress'}</span>
                      <span className="pill pill-neutral">{c.softSkillStatus ?? 'In Progress'}</span>
                    </div>
                  </td>
                </tr>
              ))}

              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="ui-empty">
                    No candidates found.
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

export default ConsultancyCandidateManagement;
