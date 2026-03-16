import React from 'react';
import { ChatBubbleLeftRightIcon, CpuChipIcon, LightBulbIcon } from '@heroicons/react/24/outline';
import AdminPageHeader from '../admin/AdminPageHeader';
import bannerArt from '../../assets/admin-banner.svg';

const ScoreCard = ({ title, value, icon, subtitle }) => {
  return (
    <div className="dashboard-card">
      <div className="candidate-card-head">
        <h3>{title}</h3>
        <span className="candidate-card-icon">{icon}</span>
      </div>
      <p className="stat-number">{value}</p>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
};

const CandidateInterviewResults = ({ previousInterviews, selectedInterviewId, onSelectInterview, result }) => {
  return (
    <div className="dashboard-container">
      <AdminPageHeader title="Interview Results" subtitle="Communication, technical and confidence insights." imageSrc={bannerArt} />

      <div className="candidate-results-top">
        <label className="candidate-label">Select interview</label>
        <select className="candidate-select" value={selectedInterviewId} onChange={(e) => onSelectInterview(e.target.value)}>
          {(previousInterviews || []).map((i) => (
            <option key={i.id} value={i.id}>
              {i.date} — {i.role}
            </option>
          ))}
        </select>
      </div>

      {!result ? (
        <div className="admin-empty-box">No results available.</div>
      ) : (
        <>
          <div className="dashboard-grid">
            <ScoreCard
              title="Communication score"
              value={result.communication}
              subtitle="Clarity, structure and delivery"
              icon={<ChatBubbleLeftRightIcon className="candidate-icon" />}
            />
            <ScoreCard
              title="Technical score"
              value={result.technical}
              subtitle="Accuracy and depth"
              icon={<CpuChipIcon className="candidate-icon" />}
            />
            <ScoreCard
              title="Confidence analysis"
              value={result.confidence}
              subtitle="Based on pacing and consistency"
              icon={<LightBulbIcon className="candidate-icon" />}
            />
          </div>

          <div className="recent-activity">
            <h3>Improvement suggestions</h3>
            <ul className="candidate-suggestions">
              {result.suggestions.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
};

export default CandidateInterviewResults;

