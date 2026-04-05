import React, { useMemo, useState } from 'react';

const CandidateSchedule = ({ jobs, processes, onSelectSlot, onConfirmSlot, onAddSchedule }) => {
  const [form, setForm] = useState({
    jobId: '',
    company: '',
    role: '',
    roundName: '',
    date: '',
    slotOptionsText: '10:00, 11:30, 15:00',
  });

  const derivedCompanyRole = useMemo(() => {
    const job = jobs.find((j) => j.id === form.jobId);
    if (!job) return null;
    return { company: job.company, role: job.title };
  }, [jobs, form.jobId]);

  const flattenedRounds = useMemo(() => {
    const rows = [];
    for (const p of processes) {
      for (const r of p.rounds) {
        rows.push({
          processId: p.id,
          company: p.company,
          role: p.role,
          roundId: r.id,
          roundName: r.name,
          date: r.date,
          slotOptions: r.slotOptions || [],
          selectedSlot: r.selectedSlot || '',
          status: r.status || 'Pending Slot',
        });
      }
    }
    rows.sort((a, b) => {
      const ad = `${a.date || ''}T${a.selectedSlot || '00:00'}`;
      const bd = `${b.date || ''}T${b.selectedSlot || '00:00'}`;
      return ad > bd ? 1 : -1;
    });
    return rows;
  }, [processes]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const company = (derivedCompanyRole?.company || form.company).trim();
    const role = (derivedCompanyRole?.role || form.role).trim();
    const roundName = form.roundName.trim();
    const date = form.date;
    const slotOptions = form.slotOptionsText
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (!company || !role || !roundName || !date || slotOptions.length === 0) {
      alert('Please fill company, role, round, date and at least 1 slot.');
      return;
    }

    onAddSchedule?.({ jobId: form.jobId, company, role, roundName, date, slotOptions });
    setForm((prev) => ({ ...prev, jobId: '', company: '', role: '', roundName: '', date: '' }));
  };

  return (
    <div className="dashboard-container">
      <div className="page-section-head">
        <h2>Schedule</h2>
        <p className="muted">Pick your available time slots for each interview round.</p>
      </div>

      <div className="ui-card">
        <div className="ui-card-head">
          <h3>Add schedule</h3>
        </div>

        <form className="ui-form" onSubmit={handleSubmit}>
          <div className="ui-form-grid">
            <div className="ui-field">
              <label className="ui-label" htmlFor="candidate-schedule-job">
                Job (optional)
              </label>
              <select id="candidate-schedule-job" className="ui-select" name="jobId" value={form.jobId} onChange={handleFormChange}>
                <option value="">Select job</option>
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>
                    {j.title} • {j.company}
                  </option>
                ))}
              </select>
            </div>

            <div className="ui-field">
              <label className="ui-label" htmlFor="candidate-schedule-date">
                Date
              </label>
              <input id="candidate-schedule-date" className="ui-input" type="date" name="date" value={form.date} onChange={handleFormChange} />
            </div>

            <div className="ui-field">
              <label className="ui-label" htmlFor="candidate-schedule-company">
                Company
              </label>
              <input
                id="candidate-schedule-company"
                className="ui-input"
                name="company"
                value={derivedCompanyRole?.company || form.company}
                onChange={handleFormChange}
                placeholder="Company name"
                disabled={Boolean(derivedCompanyRole)}
              />
            </div>

            <div className="ui-field">
              <label className="ui-label" htmlFor="candidate-schedule-role">
                Role
              </label>
              <input
                id="candidate-schedule-role"
                className="ui-input"
                name="role"
                value={derivedCompanyRole?.role || form.role}
                onChange={handleFormChange}
                placeholder="Role title"
                disabled={Boolean(derivedCompanyRole)}
              />
            </div>

            <div className="ui-field">
              <label className="ui-label" htmlFor="candidate-schedule-round">
                Round
              </label>
              <input id="candidate-schedule-round" className="ui-input" name="roundName" value={form.roundName} onChange={handleFormChange} placeholder="Round 1 (Technical)" />
            </div>

            <div className="ui-field">
              <label className="ui-label" htmlFor="candidate-schedule-slots">
                Slots (comma separated)
              </label>
              <input
                id="candidate-schedule-slots"
                className="ui-input"
                name="slotOptionsText"
                value={form.slotOptionsText}
                onChange={handleFormChange}
                placeholder="10:00, 11:30, 15:00"
              />
            </div>
          </div>

          <div className="ui-actions">
            <button type="submit" className="btn btn-primary">
              Add schedule
            </button>
          </div>
        </form>
      </div>

      <div className="ui-card">
        <div className="ui-card-head">
          <h3>Round slotting</h3>
          <span className="muted">{flattenedRounds.length} rounds</span>
        </div>

        <div className="ui-table-wrap">
          <table className="ui-table">
            <thead>
              <tr>
                <th>Company / Role</th>
                <th>Round</th>
                <th>Date</th>
                <th>Slot</th>
                <th>Status</th>
                <th className="ui-th-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {flattenedRounds.map((r) => (
                <tr key={`${r.processId}:${r.roundId}`}>
                  <td className="ui-td-strong">
                    {r.company}
                    <div className="muted">{r.role}</div>
                  </td>
                  <td>{r.roundName}</td>
                  <td>{r.date || '—'}</td>
                  <td>
                    <select
                      className="ui-select"
                      value={r.selectedSlot}
                      onChange={(e) => onSelectSlot?.(r.processId, r.roundId, e.target.value)}
                      aria-label={`Select slot for ${r.company} ${r.role} ${r.roundName}`}
                    >
                      <option value="">Select slot</option>
                      {r.slotOptions.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <span className={`pill ${r.status === 'Scheduled' ? 'pill-success' : 'pill-neutral'}`}>{r.status}</span>
                  </td>
                  <td className="ui-td-actions">
                    <button type="button" className="btn btn-primary btn-small" onClick={() => onConfirmSlot?.(r.processId, r.roundId)}>
                      Confirm
                    </button>
                  </td>
                </tr>
              ))}
              {flattenedRounds.length === 0 ? (
                <tr>
                  <td colSpan={6} className="ui-empty">
                    No rounds yet. Add a schedule above.
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

export default CandidateSchedule;

