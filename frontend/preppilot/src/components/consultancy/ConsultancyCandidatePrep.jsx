import React, { useMemo, useState } from 'react';

const planOptions = [
  { key: 'technical', label: 'Tech' },
  { key: 'softskill', label: 'Self' },
];

const prepTypeOptions = {
  technical: ['DSA Basic', 'Project', 'System Design', 'Mock Interview'],
  softskill: ['Communication', 'Resume', 'Confidence', 'HR Mock'],
};

const ConsultancyCandidatePrep = ({ candidates, employees, jobs, onUpdateCandidate }) => {
  const safeCandidates = useMemo(() => (Array.isArray(candidates) ? candidates : []), [candidates]);
  const safeEmployees = useMemo(() => (Array.isArray(employees) ? employees : []), [employees]);
  const safeJobs = useMemo(() => (Array.isArray(jobs) ? jobs : []), [jobs]);

  const [plan, setPlan] = useState('technical');
  const [prepType, setPrepType] = useState(prepTypeOptions.technical[0]);
  const [selectedCandidateId, setSelectedCandidateId] = useState(safeCandidates?.[0]?.id ?? '');
  const [selectedJobId, setSelectedJobId] = useState(safeJobs?.[0]?.id ?? '');
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(safeEmployees?.[0]?.id ?? '');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [notice, setNotice] = useState('');

  const selectedCandidate = useMemo(
    () => safeCandidates.find((c) => c.id === selectedCandidateId) ?? null,
    [safeCandidates, selectedCandidateId]
  );
  const selectedJob = useMemo(() => safeJobs.find((j) => j.id === selectedJobId) ?? null, [safeJobs, selectedJobId]);
  const selectedEmployee = useMemo(
    () => safeEmployees.find((e) => e.id === selectedEmployeeId) ?? null,
    [safeEmployees, selectedEmployeeId]
  );

  const assign = () => {
    if (!selectedCandidate) return;

    const schedule = {
      jobId: selectedJobId || '',
      jobTitle: selectedJob ? `${selectedJob.title} (${selectedJob.company})` : '',
      plan,
      preparationType: prepType,
      fromDate: fromDate || '',
      toDate: toDate || '',
      employeeId: selectedEmployeeId || '',
      employeeName: selectedEmployee ? selectedEmployee.name : '',
      assignedAt: new Date().toISOString(),
    };

    onUpdateCandidate?.(selectedCandidate.id, { lastPrepSchedule: schedule });
    setNotice('Assigned.');
  };

  return (
    <div className="dashboard-container">
      <div className="page-section-head">
        <h2>Job Preparation and Schedule</h2>
        <p className="muted">Follow the form and assign preparation schedule to candidates.</p>
      </div>

      <div className="ui-card">
        <div className="prep-schedule-grid">
          <div className="prep-schedule-form">
            <div className="ui-field">
              <label className="ui-label">Job</label>
              <select className="ui-select" value={selectedJobId} onChange={(e) => setSelectedJobId(e.target.value)}>
                {safeJobs.length ? (
                  safeJobs.map((j) => (
                    <option key={j.id} value={j.id}>
                      {j.title} ({j.company})
                    </option>
                  ))
                ) : (
                  <option value="">No jobs</option>
                )}
              </select>
            </div>

            <div className="ui-field">
              <label className="ui-label">Plan</label>
              <select
                className="ui-select"
                value={plan}
                onChange={(e) => {
                  const nextPlan = e.target.value;
                  setPlan(nextPlan);
                  setPrepType(prepTypeOptions[nextPlan]?.[0] || '');
                }}
              >
                {planOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="ui-field">
              <label className="ui-label">Preparation Type</label>
              <select className="ui-select" value={prepType} onChange={(e) => setPrepType(e.target.value)}>
                {(prepTypeOptions[plan] || []).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>

            <div className="ui-field">
              <label className="ui-label">Candidate</label>
              <select
                className="ui-select"
                value={selectedCandidateId}
                onChange={(e) => {
                  setSelectedCandidateId(e.target.value);
                  setNotice('');
                }}
              >
                {safeCandidates.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="ui-field">
              <label className="ui-label">From Date</label>
              <input className="ui-input" type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
            </div>
            <div className="ui-field">
              <label className="ui-label">To Date</label>
              <input className="ui-input" type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
            </div>

            <div className="ui-field">
              <label className="ui-label">Employee</label>
              <select className="ui-select" value={selectedEmployeeId} onChange={(e) => setSelectedEmployeeId(e.target.value)}>
                {safeEmployees.length ? (
                  safeEmployees.map((emp) => (
                    <option key={emp.id} value={emp.id}>
                      {emp.name} ({emp.role})
                    </option>
                  ))
                ) : (
                  <option value="">No employees</option>
                )}
              </select>
            </div>

            <div className="prep-schedule-actions">
              <button className="btn btn-primary btn-small" type="button" onClick={assign} disabled={!selectedCandidate}>
                Assign
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultancyCandidatePrep;
