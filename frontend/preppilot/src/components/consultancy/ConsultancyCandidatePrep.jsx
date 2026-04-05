import React, { useMemo, useState } from 'react';

const statusOptions = ['On Track', 'In Progress', 'Needs Attention', 'Completed'];

const ConsultancyCandidatePrep = ({ candidates, onUpdateCandidate }) => {
  const [selectedId, setSelectedId] = useState(candidates?.[0]?.id ?? '');

  const selected = useMemo(
    () => candidates.find((c) => c.id === selectedId) ?? null,
    [candidates, selectedId]
  );

  const [draft, setDraft] = useState(() => ({
    planText: (candidates?.[0]?.plan ?? []).join('\n'),
    status: candidates?.[0]?.status ?? 'In Progress',
    feedback: candidates?.[0]?.feedback ?? '',
    progress: candidates?.[0]?.progress ?? 0,
  }));

  const syncDraftFromCandidate = (candidate) => {
    if (!candidate) return;
    setDraft({
      planText: (candidate.plan ?? []).join('\n'),
      status: candidate.status ?? 'In Progress',
      feedback: candidate.feedback ?? '',
      progress: candidate.progress ?? 0,
    });
  };

  const handleSelect = (id) => {
    setSelectedId(id);
    const candidate = candidates.find((c) => c.id === id);
    syncDraftFromCandidate(candidate);
  };

  const handleSave = () => {
    if (!selected) return;
    const plan = draft.planText
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean);
    const progress = Number.isFinite(Number(draft.progress)) ? Math.max(0, Math.min(100, Number(draft.progress))) : 0;

    onUpdateCandidate(selected.id, { plan, status: draft.status, feedback: draft.feedback, progress });
    alert('Preparation plan saved.');
  };

  return (
    <div className="dashboard-container">
      <div className="page-section-head">
        <h2>Candidate Preparation Page</h2>
        <p className="muted">Select a candidate and update plan, progress, and feedback.</p>
      </div>

      <div className="split-layout">
        <div className="ui-card">
          <div className="ui-card-head">
            <h3>Candidate Name</h3>
            <span className="muted">{candidates.length} enrolled</span>
          </div>

          <div className="ui-list">
            {candidates.map((c) => (
              <button
                key={c.id}
                type="button"
                className={`ui-list-item ${c.id === selectedId ? 'active' : ''}`}
                onClick={() => handleSelect(c.id)}
              >
                <div className="ui-list-title">{c.name}</div>
                <div className="ui-list-meta">
                  <span className="pill pill-neutral">{c.status}</span>
                  <span className="ui-list-progress">{c.progress}%</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="ui-card">
          <div className="ui-card-head">
            <h3>Preparation Plan</h3>
            <span className="muted">{selected ? selected.name : 'No candidate selected'}</span>
          </div>

          <div className="ui-form">
            <label className="ui-label">Preparation Plan</label>
            <textarea
              className="ui-textarea"
              rows={7}
              value={draft.planText}
              onChange={(e) => setDraft((p) => ({ ...p, planText: e.target.value }))}
              placeholder="One item per line (e.g., DSA, System Design, Mock HR)"
            />

            <div className="ui-form-grid">
              <div>
                <label className="ui-label">Progress Status</label>
                <select
                  className="ui-select"
                  value={draft.status}
                  onChange={(e) => setDraft((p) => ({ ...p, status: e.target.value }))}
                >
                  {statusOptions.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="ui-label">Progress %</label>
                <input
                  className="ui-input"
                  type="number"
                  min={0}
                  max={100}
                  value={draft.progress}
                  onChange={(e) => setDraft((p) => ({ ...p, progress: e.target.value }))}
                />
              </div>
            </div>

            <label className="ui-label">Feedback</label>
            <textarea
              className="ui-textarea"
              rows={4}
              value={draft.feedback}
              onChange={(e) => setDraft((p) => ({ ...p, feedback: e.target.value }))}
              placeholder="Write actionable feedback for the candidate"
            />

            <div className="ui-actions">
              <button type="button" className="btn btn-primary" onClick={handleSave} disabled={!selected}>
                Save
              </button>
              <button
                type="button"
                className="btn btn-ghost btn-small"
                onClick={() => syncDraftFromCandidate(selected)}
                disabled={!selected}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultancyCandidatePrep;

