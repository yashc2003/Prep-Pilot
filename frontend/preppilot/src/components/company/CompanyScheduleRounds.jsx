import React, { useMemo, useState } from 'react';
import CompanyInterviewSchedule from './CompanyInterviewSchedule';

const CompanyScheduleRounds = ({ jobs, roundsByJob, onUpdateRound, interviews, onUpdateInterview }) => {
  const [selectedJobId, setSelectedJobId] = useState(jobs?.[0]?.id ?? '');

  const rounds = useMemo(() => roundsByJob?.[selectedJobId] ?? [], [roundsByJob, selectedJobId]);
  const selectedJob = useMemo(() => jobs.find((j) => j.id === selectedJobId) ?? null, [jobs, selectedJobId]);

  const update = (roundId, key, value) => {
    onUpdateRound?.(selectedJobId, roundId, { [key]: value });
  };

  return (
    <div className="dashboard-container">
      <div className="page-section-head">
        <h2>Schedule Rounds</h2>
      </div>

      <div className="ui-card">
        <div className="ui-card-head">
          <h3>Rounds list</h3>
          <span className="muted">{selectedJob ? selectedJob.title : 'Select a job'}</span>
        </div>

        <div className="admin-toolbar">
          <select className="admin-select" value={selectedJobId} onChange={(e) => setSelectedJobId(e.target.value)}>
            {jobs.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title}
              </option>
            ))}
          </select>
        </div>

        <div className="ui-table-wrap">
          <table className="ui-table">
            <thead>
              <tr>
                <th>Round</th>
                <th>Type</th>
                <th>Date</th>
                <th>Time</th>
                <th>Conducted By</th>
              </tr>
            </thead>
            <tbody>
              {rounds.map((r) => (
                <tr key={r.id}>
                  <td className="ui-td-strong">{r.name}</td>
                  <td>
                    <span className="pill pill-neutral">{r.type}</span>
                  </td>
                  <td>
                    <input
                      className="ui-input"
                      type="date"
                      value={r.date || ''}
                      onChange={(e) => update(r.id, 'date', e.target.value)}
                      aria-label={`Date for ${r.name}`}
                    />
                  </td>
                  <td>
                    <input
                      className="ui-input"
                      type="time"
                      value={r.time || ''}
                      onChange={(e) => update(r.id, 'time', e.target.value)}
                      aria-label={`Time for ${r.name}`}
                    />
                  </td>
                  <td>
                    <input
                      className="ui-input"
                      type="text"
                      placeholder="Employee name"
                      value={r.conductedBy || ''}
                      onChange={(e) => update(r.id, 'conductedBy', e.target.value)}
                      aria-label={`Conducted by for ${r.name}`}
                    />
                  </td>
                </tr>
              ))}
              {rounds.length === 0 ? (
                <tr>
                  <td colSpan={5} className="ui-empty">
                    No rounds created yet. Go to Rounds → Add Rounds first.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>

      <CompanyInterviewSchedule
        interviews={interviews}
        onUpdateInterview={onUpdateInterview}
        title="Scheduled interviews"
        subtitle="Calendar view for candidate interviews (optional)."
      />
    </div>
  );
};

export default CompanyScheduleRounds;

