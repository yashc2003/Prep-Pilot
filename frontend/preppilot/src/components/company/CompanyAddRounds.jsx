import React, { useMemo, useState } from 'react';

const roundTypeOptions = ['Technical', 'HR', 'Aptitude', 'Group Discussion', 'Managerial', 'Other'];

const CompanyAddRounds = ({ jobs, onAddRound }) => {
  const [selectedJobId, setSelectedJobId] = useState(jobs?.[0]?.id ?? '');
  const [draft, setDraft] = useState({ name: '', type: 'Technical', date: '', time: '', conductedBy: '' });

  const selectedJob = useMemo(() => jobs.find((j) => j.id === selectedJobId) ?? null, [jobs, selectedJobId]);

  const submit = (e) => {
    e.preventDefault();
    const name = draft.name.trim();
    if (!name) return;
    onAddRound?.(selectedJobId, {
      name,
      type: draft.type,
      date: draft.date || '',
      time: draft.time || '',
      conductedBy: draft.conductedBy.trim() || '',
    });
    setDraft((p) => ({ ...p, name: '' }));
  };

  return (
    <div className="dashboard-container">
      <div className="page-section-head">
        <h2>Rounds</h2>
      </div>

      <div className="ui-card company-round-card">
        <div className="ui-card-head">
          <h3>Add rounds</h3>
          <span className="muted">{selectedJob ? selectedJob.title : 'Select a job'}</span>
        </div>

        <form className="company-round-form" onSubmit={submit}>
          <div className="company-round-grid">
            <select
              className="admin-select company-round-job"
              value={selectedJobId}
              onChange={(e) => setSelectedJobId(e.target.value)}
              aria-label="Select job"
            >
              {jobs.map((j) => (
                <option key={j.id} value={j.id}>
                  {j.title}
                </option>
              ))}
            </select>

            <input
              className="admin-input"
              placeholder="Round name *"
              value={draft.name}
              onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
            />

            <select
              className="admin-select"
              value={draft.type}
              onChange={(e) => setDraft((p) => ({ ...p, type: e.target.value }))}
              aria-label="Round type"
            >
              {roundTypeOptions.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>

            <input
              className="admin-input"
              type="date"
              value={draft.date}
              onChange={(e) => setDraft((p) => ({ ...p, date: e.target.value }))}
              aria-label="Round date"
            />

            <input
              className="admin-input"
              type="time"
              value={draft.time}
              onChange={(e) => setDraft((p) => ({ ...p, time: e.target.value }))}
              aria-label="Round time"
            />

            <input
              className="admin-input company-round-conductedby"
              placeholder="Conducted by (employee name)"
              value={draft.conductedBy}
              onChange={(e) => setDraft((p) => ({ ...p, conductedBy: e.target.value }))}
            />
          </div>

          <div className="company-round-actions">
            <button className="btn btn-primary" type="submit" disabled={!selectedJobId || !draft.name.trim()}>
              Add Round
            </button>
          </div>
        </form>

        <div className="muted" style={{ marginTop: 12 }}>
          After creating rounds, open <b>Rounds → Schedule Rounds</b> to see the list and assign schedule details.
        </div>
      </div>
    </div>
  );
};

export default CompanyAddRounds;
