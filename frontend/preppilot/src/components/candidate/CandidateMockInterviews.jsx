import React from 'react';
import { PlayCircleIcon } from '@heroicons/react/24/outline';
import AdminPageHeader from '../admin/AdminPageHeader';
import bannerArt from '../../assets/admin-banner.svg';

const CandidateMockInterviews = ({ onStartAiInterview, previousInterviews, selectedInterviewId, onSelectInterview }) => {
  return (
    <div className="dashboard-container">
      <AdminPageHeader title="Mock Interviews" subtitle="Start AI interview and review your previous attempts." imageSrc={bannerArt} />

      <div className="candidate-panel">
        <div className="candidate-panel-head">
          <PlayCircleIcon className="candidate-panel-icon" />
          <div>
            <div className="candidate-panel-title">Start AI Interview</div>
            <div className="admin-muted">Simulate a real interview and get feedback.</div>
          </div>
        </div>

        <button className="btn btn-small" type="button" onClick={onStartAiInterview}>
          Start AI Interview
        </button>
      </div>

      <div className="candidate-panel">
        <div className="candidate-panel-title">View previous interviews</div>
        <div className="admin-muted">Select one to see results.</div>

        <div className="candidate-interview-list">
          {(previousInterviews || []).map((i) => (
            <button
              key={i.id}
              type="button"
              className={`candidate-interview-item ${selectedInterviewId === i.id ? 'active' : ''}`}
              onClick={() => onSelectInterview(i.id)}
            >
              <span className="candidate-interview-role">{i.role}</span>
              <span className="candidate-interview-meta">
                {i.date} • Score {i.score}
              </span>
            </button>
          ))}

          {(previousInterviews || []).length === 0 ? <div className="admin-empty-box">No interviews yet.</div> : null}
        </div>
      </div>
    </div>
  );
};

export default CandidateMockInterviews;

