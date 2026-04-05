import React, { useMemo, useState } from 'react';
import { SparklesIcon, TrophyIcon } from '@heroicons/react/24/outline';
import AdminPageHeader from '../admin/AdminPageHeader';
import bannerArt from '../../assets/admin-banner.svg';

const scoreBand = (score) => {
  if (score >= 8.5) return { label: 'Excellent', className: 'pill pill-green' };
  if (score >= 7.3) return { label: 'Good', className: 'pill' };
  if (score >= 6.5) return { label: 'Needs Work', className: 'pill pill-amber' };
  return { label: 'Critical', className: 'pill pill-red' };
};

const AiInterviewPerformance = ({ students }) => {
  const [minScore, setMinScore] = useState('all');

  const avgScore = useMemo(() => {
    const list = (students || []).map((s) => Number(s.aiScore || 0)).filter((n) => Number.isFinite(n) && n > 0);
    if (list.length === 0) return 0;
    const sum = list.reduce((a, b) => a + b, 0);
    return Math.round((sum / list.length) * 10) / 10;
  }, [students]);

  const topStudents = useMemo(() => {
    return [...(students || [])]
      .sort((a, b) => (b.aiScore ?? 0) - (a.aiScore ?? 0))
      .slice(0, 3);
  }, [students]);

  const filtered = useMemo(() => {
    const min = minScore === 'all' ? null : Number(minScore);
    return (students || []).filter((s) => (min == null ? true : (s.aiScore ?? 0) >= min));
  }, [students, minScore]);

  return (
    <div className="dashboard-container">
      <AdminPageHeader
        title="AI Interview Performance of Students"
        subtitle="Quick snapshot of AI mock interview scores and improvement bands."
        imageSrc={bannerArt}
        right={
          <div className="admin-chip-row">
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <SparklesIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Average</span>
              <span className="admin-chip-value">{avgScore}</span>
            </div>
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <TrophyIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Top</span>
              <span className="admin-chip-value">{topStudents[0]?.name ? topStudents[0].name.split(' ')[0] : '-'}</span>
            </div>
          </div>
        }
      />

      <div className="admin-panel">
        <div className="admin-section-head">
          <h3>Leaderboard</h3>
          <span className="admin-muted">Top 3 by latest AI score</span>
        </div>
        <div className="admin-chip-row" style={{ marginTop: 12 }}>
          {topStudents.map((s) => (
            <div key={s.id} className="admin-chip">
              <span className="admin-chip-icon">
                <TrophyIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">{s.name}</span>
              <span className="admin-chip-value">{s.aiScore}</span>
            </div>
          ))}
          {topStudents.length === 0 ? <div className="admin-empty-box">No scores yet.</div> : null}
        </div>
      </div>

      <div className="admin-toolbar">
        <select className="admin-select" value={minScore} onChange={(e) => setMinScore(e.target.value)}>
          <option value="all">All Scores</option>
          <option value="6.5">6.5+</option>
          <option value="7.3">7.3+</option>
          <option value="8.5">8.5+</option>
        </select>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Skills</th>
              <th>AI Score</th>
              <th>Band</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => {
              const band = scoreBand(Number(s.aiScore || 0));
              return (
                <tr key={s.id}>
                  <td className="admin-td-strong">{s.name}</td>
                  <td>{s.course}</td>
                  <td>
                    <div className="admin-skill-row">
                      {(s.skills || []).slice(0, 6).map((skill) => (
                        <span key={skill} className="pill">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td>{s.aiScore}</td>
                  <td>
                    <span className={band.className}>{band.label}</span>
                  </td>
                </tr>
              );
            })}

            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="admin-empty">
                  No students match the selected filter.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AiInterviewPerformance;

