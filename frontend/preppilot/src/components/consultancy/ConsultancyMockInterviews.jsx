import React, { useMemo, useState } from 'react';

const formatDateTime = (value) => {
  if (!value) return '';
  try {
    const date = new Date(value);
    return date.toLocaleString(undefined, { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' });
  } catch {
    return value;
  }
};

const ConsultancyMockInterviews = ({ candidates, sessions, onAddSession, onUpdateSession }) => {
  const [form, setForm] = useState(() => ({
    candidateId: candidates?.[0]?.id ?? '',
    when: '',
    mode: 'Online',
    interviewer: 'Mentor 1',
    notes: '',
  }));

  const candidateById = useMemo(() => new Map(candidates.map((c) => [c.id, c])), [candidates]);

  const handleSchedule = (e) => {
    e.preventDefault();
    if (!form.candidateId || !form.when) {
      alert('Select candidate and time.');
      return;
    }
    const candidate = candidateById.get(form.candidateId);
    onAddSession({
      candidateId: form.candidateId,
      candidateName: candidate?.name ?? 'Candidate',
      when: form.when,
      status: 'Scheduled',
      score: null,
      evaluation: '',
      mode: form.mode,
      interviewer: form.interviewer,
      notes: form.notes,
    });
    setForm((p) => ({ ...p, when: '', notes: '' }));
    alert('Mock interview scheduled.');
  };

  const handleEvaluate = (id) => {
    const scoreStr = prompt('Enter interview score (0-10):');
    if (scoreStr == null) return;
    const score = Math.max(0, Math.min(10, Number(scoreStr)));
    if (!Number.isFinite(score)) {
      alert('Invalid score.');
      return;
    }
    const evaluation = prompt('Write short evaluation:') ?? '';
    onUpdateSession(id, { status: 'Completed', score, evaluation });
  };

  return (
    <div className="dashboard-container">
      <div className="page-section-head">
        <h2>Mock Interview Sessions</h2>
        <p className="muted">Schedule practice interviews and provide evaluations.</p>
      </div>

      <div className="ui-card">
        <div className="ui-card-head">
          <h3>Schedule practice interviews</h3>
        </div>

        <form className="ui-form" onSubmit={handleSchedule}>
          <div className="ui-form-grid">
            <div>
              <label className="ui-label">Candidate</label>
              <select
                className="ui-select"
                value={form.candidateId}
                onChange={(e) => setForm((p) => ({ ...p, candidateId: e.target.value }))}
              >
                {candidates.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="ui-label">Date & time</label>
              <input
                className="ui-input"
                type="datetime-local"
                value={form.when}
                onChange={(e) => setForm((p) => ({ ...p, when: e.target.value }))}
              />
            </div>
            <div>
              <label className="ui-label">Mode</label>
              <select className="ui-select" value={form.mode} onChange={(e) => setForm((p) => ({ ...p, mode: e.target.value }))}>
                <option value="Online">Online</option>
                <option value="In-person">In-person</option>
              </select>
            </div>
            <div>
              <label className="ui-label">Interviewer</label>
              <input
                className="ui-input"
                value={form.interviewer}
                onChange={(e) => setForm((p) => ({ ...p, interviewer: e.target.value }))}
                placeholder="Mentor name"
              />
            </div>
          </div>

          <label className="ui-label">Notes</label>
          <textarea
            className="ui-textarea"
            rows={3}
            value={form.notes}
            onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))}
            placeholder="Focus areas, topics, or job role context"
          />

          <div className="ui-actions">
            <button type="submit" className="btn btn-primary">
              Schedule
            </button>
          </div>
        </form>
      </div>

      <div className="ui-card">
        <div className="ui-card-head">
          <h3>Provide evaluation</h3>
          <span className="muted">{sessions.length} sessions</span>
        </div>

        <div className="ui-table-wrap">
          <table className="ui-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Interview time</th>
                <th>Status</th>
                <th>Score</th>
                <th className="ui-th-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td className="ui-td-strong">{s.candidateName}</td>
                  <td>{formatDateTime(s.when)}</td>
                  <td>
                    <span className={`pill ${s.status === 'Completed' ? 'pill-success' : 'pill-neutral'}`}>{s.status}</span>
                  </td>
                  <td>{s.score == null ? '-' : s.score}</td>
                  <td className="ui-td-actions">
                    {s.status === 'Completed' ? (
                      <button
                        type="button"
                        className="btn btn-ghost btn-small"
                        onClick={() => alert(s.evaluation || 'No evaluation added.')}
                      >
                        View
                      </button>
                    ) : (
                      <>
                        <button type="button" className="btn btn-ghost btn-small" onClick={() => handleEvaluate(s.id)}>
                          Evaluate
                        </button>
                        <button
                          type="button"
                          className="btn btn-warn btn-small"
                          onClick={() => onUpdateSession(s.id, { status: 'Cancelled' })}
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {sessions.length === 0 ? (
                <tr>
                  <td colSpan={5} className="ui-empty">
                    No sessions yet.
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

export default ConsultancyMockInterviews;

