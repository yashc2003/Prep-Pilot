import React, { useMemo } from 'react';

const formatDate = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit' });
  } catch {
    return iso;
  }
};

const formatTime = (iso) => {
  try {
    const d = new Date(iso);
    return d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  } catch {
    return iso;
  }
};

const CompanyInterviewSchedule = ({ interviews, onUpdateInterview }) => {
  const byDate = useMemo(() => {
    const map = new Map();
    for (const i of interviews) {
      const dateKey = (i.time || '').slice(0, 10) || 'Unknown';
      const list = map.get(dateKey) ?? [];
      list.push(i);
      map.set(dateKey, list);
    }
    for (const list of map.values()) {
      list.sort((a, b) => new Date(a.time) - new Date(b.time));
    }
    return Array.from(map.entries()).sort((a, b) => (a[0] > b[0] ? 1 : -1));
  }, [interviews]);

  return (
    <div className="dashboard-container">
      <div className="page-section-head">
        <h2>Interview Schedule</h2>
        <p className="muted">Calendar view with candidate name, interview time, and status.</p>
      </div>

      <div className="ui-card">
        <div className="ui-card-head">
          <h3>Calendar</h3>
          <span className="muted">{interviews.length} interviews</span>
        </div>

        <div className="calendar-grid">
          {byDate.map(([dateKey, list]) => (
            <div key={dateKey} className="calendar-day">
              <div className="calendar-day-head">{formatDate(dateKey)}</div>
              <div className="calendar-items">
                {list.map((i) => (
                  <div key={i.id} className="calendar-item">
                    <div className="calendar-item-main">
                      <div className="calendar-item-title">{i.candidateName}</div>
                      <div className="muted">{formatTime(i.time)}</div>
                    </div>
                    <select
                      className="ui-select calendar-select"
                      value={i.status}
                      onChange={(e) => onUpdateInterview(i.id, { status: e.target.value })}
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                      <option value="No Show">No Show</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {byDate.length === 0 ? <div className="ui-empty">No interviews scheduled yet.</div> : null}
        </div>
      </div>
    </div>
  );
};

export default CompanyInterviewSchedule;

