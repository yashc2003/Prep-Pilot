import React, { useMemo, useState } from 'react';
import { DocumentArrowUpIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import AdminPageHeader from '../admin/AdminPageHeader';
import bannerArt from '../../assets/admin-banner.svg';

const CandidateProfile = ({ profile, onChange }) => {
  const [skillInput, setSkillInput] = useState('');

  const skillsLabel = useMemo(() => (profile.skills || []).join(', '), [profile.skills]);

  const addSkill = () => {
    const next = skillInput.trim();
    if (!next) return;
    const exists = (profile.skills || []).some((s) => s.toLowerCase() === next.toLowerCase());
    if (exists) {
      setSkillInput('');
      return;
    }
    onChange({ ...profile, skills: [...(profile.skills || []), next] });
    setSkillInput('');
  };

  const removeSkill = (skill) => {
    onChange({ ...profile, skills: (profile.skills || []).filter((s) => s !== skill) });
  };

  const onResumePick = (file) => {
    onChange({ ...profile, resumeName: file?.name || '' });
  };

  return (
    <div className="dashboard-container">
      <AdminPageHeader title="Profile Page" subtitle="Keep your details updated for better job matching." imageSrc={bannerArt} />

      <div className="candidate-form-grid">
        <div className="candidate-panel">
          <div className="candidate-panel-head">
            <UserCircleIcon className="candidate-panel-icon" />
            <div>
              <div className="candidate-panel-title">Profile</div>
              <div className="admin-muted">Name, education and skills</div>
            </div>
          </div>

          <div className="candidate-form">
            <label className="candidate-label">Name</label>
            <input
              className="candidate-input"
              value={profile.name}
              onChange={(e) => onChange({ ...profile, name: e.target.value })}
              placeholder="Enter your name"
            />

            <label className="candidate-label">Education</label>
            <input
              className="candidate-input"
              value={profile.education}
              onChange={(e) => onChange({ ...profile, education: e.target.value })}
              placeholder="e.g., B.Tech, MCA, B.Sc"
            />

            <label className="candidate-label">Skills</label>
            <div className="candidate-skill-row">
              <input
                className="candidate-input"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                placeholder="Add a skill (e.g., React)"
              />
              <button className="btn btn-small" type="button" onClick={addSkill}>
                Add
              </button>
            </div>

            <div className="candidate-skill-chips" aria-label={`Skills: ${skillsLabel}`}>
              {(profile.skills || []).map((s) => (
                <button key={s} type="button" className="candidate-skill-chip" onClick={() => removeSkill(s)} title="Remove skill">
                  {s} <span className="candidate-skill-x">×</span>
                </button>
              ))}
              {(profile.skills || []).length === 0 ? <div className="admin-muted">No skills added yet.</div> : null}
            </div>
          </div>
        </div>

        <div className="candidate-panel">
          <div className="candidate-panel-head">
            <DocumentArrowUpIcon className="candidate-panel-icon" />
            <div>
              <div className="candidate-panel-title">Resume upload</div>
              <div className="admin-muted">PDF/DOC supported (UI only)</div>
            </div>
          </div>

          <div className="candidate-upload">
            <div className="candidate-upload-box">
              <input
                type="file"
                className="candidate-file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => onResumePick(e.target.files?.[0])}
              />
              <div className="candidate-upload-hint">
                {profile.resumeName ? (
                  <span className="candidate-upload-name">{profile.resumeName}</span>
                ) : (
                  <span className="admin-muted">Choose your resume file</span>
                )}
              </div>
            </div>
            <button className="btn btn-small" type="button" onClick={() => alert('Upload will be wired to backend/API')}>
              Upload
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidateProfile;

