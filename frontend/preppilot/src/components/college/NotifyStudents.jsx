import React, { useState } from 'react';
import { BellAlertIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import AdminPageHeader from '../admin/AdminPageHeader';
import bannerArt from '../../assets/admin-banner.svg';

const NotifyStudents = ({ notifications, onSend }) => {
  const [audience, setAudience] = useState('All Students');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) return;

    const now = new Date();
    const date = now.toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' });
    onSend({ audience, message: trimmed, date });
    setMessage('');
  };

  return (
    <div className="dashboard-container">
      <AdminPageHeader
        title="Notify Students"
        subtitle="Send quick updates about drives, opportunities and interview schedules."
        imageSrc={bannerArt}
        right={
          <div className="admin-chip-row">
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <BellAlertIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Sent</span>
              <span className="admin-chip-value">{(notifications || []).length}</span>
            </div>
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <PaperAirplaneIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Channel</span>
              <span className="admin-chip-value">In-app</span>
            </div>
          </div>
        }
      />

      <div className="admin-panel">
        <div className="admin-section-head">
          <h3>Compose Message</h3>
          <span className="admin-muted">Keep it short and actionable</span>
        </div>

        <form className="admin-form" onSubmit={handleSubmit}>
          <select className="admin-select" value={audience} onChange={(e) => setAudience(e.target.value)}>
            <option value="All Students">All Students</option>
            <option value="B.Tech CSE">B.Tech CSE</option>
            <option value="B.Tech IT">B.Tech IT</option>
            <option value="BCA">BCA</option>
            <option value="MBA">MBA</option>
            <option value="Placed Students">Placed Students</option>
          </select>
          <textarea
            className="admin-textarea"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Write your notification message…"
            rows={3}
          />
          <button className="btn btn-small" type="submit">
            Send
          </button>
        </form>
      </div>

      <div className="admin-list">
        {(notifications || []).map((n) => (
          <div key={n.id} className="admin-list-item">
            <div className="admin-list-item-main">
              <div className="admin-list-title">
                <span className="admin-td-strong">{n.audience}</span>
                <span className="pill">{n.date}</span>
              </div>
              <div className="admin-muted" style={{ marginTop: 8 }}>
                {n.message}
              </div>
            </div>
          </div>
        ))}

        {(notifications || []).length === 0 ? (
          <div className="admin-empty-box">No notifications sent yet.</div>
        ) : null}
      </div>
    </div>
  );
};

export default NotifyStudents;
