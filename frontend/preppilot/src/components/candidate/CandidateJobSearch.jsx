import React, { useMemo, useState } from 'react';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';
import AdminPageHeader from '../admin/AdminPageHeader';
import bannerArt from '../../assets/admin-banner.svg';

const CandidateJobSearch = ({ jobs }) => {
  const [skill, setSkill] = useState('');
  const [location, setLocation] = useState('');
  const [experience, setExperience] = useState('all');

  const filtered = useMemo(() => {
    const s = skill.trim().toLowerCase();
    const l = location.trim().toLowerCase();
    return (jobs || []).filter((j) => {
      const matchesSkill = !s || j.skills.some((x) => x.toLowerCase().includes(s));
      const matchesLocation = !l || j.location.toLowerCase().includes(l);
      const matchesExp = experience === 'all' ? true : j.experience === experience;
      return matchesSkill && matchesLocation && matchesExp;
    });
  }, [jobs, skill, location, experience]);

  return (
    <div className="dashboard-container">
      <AdminPageHeader title="Job Search" subtitle="Filter by skill, location and experience." imageSrc={bannerArt} />

      <div className="candidate-filters">
        <div className="candidate-filter">
          <MagnifyingGlassIcon className="candidate-filter-icon" />
          <input className="candidate-input" value={skill} onChange={(e) => setSkill(e.target.value)} placeholder="Skill (e.g., React)" />
        </div>
        <div className="candidate-filter">
          <MapPinIcon className="candidate-filter-icon" />
          <input className="candidate-input" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location (e.g., Remote)" />
        </div>
        <select className="candidate-select" value={experience} onChange={(e) => setExperience(e.target.value)}>
          <option value="all">Experience (All)</option>
          <option value="0-2">0-2</option>
          <option value="1-3">1-3</option>
          <option value="2-4">2-4</option>
          <option value="2-5">2-5</option>
        </select>
      </div>

      <div className="candidate-job-results">
        {filtered.map((j) => (
          <div key={j.id} className="candidate-job-row">
            <div className="candidate-job-row-main">
              <div className="candidate-job-title">{j.title}</div>
              <div className="admin-muted">
                {j.company} • {j.location} • {j.experience} yrs
              </div>
              <div className="candidate-job-skills">
                {j.skills.map((s) => (
                  <span key={s} className="candidate-skill">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <div className="candidate-job-actions">
              <button className="btn btn-small" type="button" onClick={() => alert('Apply will be wired')}>
                Apply
              </button>
              <button className="btn btn-small btn-ghost" type="button" onClick={() => alert('View details will be added')}>
                View
              </button>
            </div>
          </div>
        ))}

        {filtered.length === 0 ? <div className="admin-empty-box">No jobs match your filters.</div> : null}
      </div>
    </div>
  );
};

export default CandidateJobSearch;

