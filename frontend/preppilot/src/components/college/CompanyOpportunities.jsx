import React, { useState } from 'react';
import { BriefcaseIcon, CloudArrowUpIcon } from '@heroicons/react/24/outline';
import AdminPageHeader from '../admin/AdminPageHeader';
import bannerArt from '../../assets/admin-banner.svg';

const CompanyOpportunities = ({ opportunities, onAddOpportunity }) => {
  const [form, setForm] = useState({
    company: '',
    role: '',
    ctc: '',
    deadline: '',
    skills: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.company.trim() || !form.role.trim()) return;

    const skills = form.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .slice(0, 8);

    onAddOpportunity({
      company: form.company.trim(),
      role: form.role.trim(),
      ctc: form.ctc.trim() || 'TBD',
      deadline: form.deadline.trim() || 'TBD',
      skills,
    });

    setForm({ company: '', role: '', ctc: '', deadline: '', skills: '' });
  };

  return (
    <div className="dashboard-container">
      <AdminPageHeader
        title="Upload Company Opportunities"
        subtitle="Add new company postings and share them with students."
        imageSrc={bannerArt}
        right={
          <div className="admin-chip-row">
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <BriefcaseIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Open</span>
              <span className="admin-chip-value">{(opportunities || []).length}</span>
            </div>
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <CloudArrowUpIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Upload</span>
              <span className="admin-chip-value">Manual</span>
            </div>
          </div>
        }
      />

      <div className="admin-panel">
        <div className="admin-section-head">
          <h3>Add Opportunity</h3>
          <span className="admin-muted">Skills separated by commas</span>
        </div>

        <form className="admin-form" onSubmit={handleSubmit}>
          <input className="admin-input" name="company" value={form.company} onChange={handleChange} placeholder="Company name" />
          <input className="admin-input" name="role" value={form.role} onChange={handleChange} placeholder="Role" />
          <input className="admin-input" name="ctc" value={form.ctc} onChange={handleChange} placeholder="CTC (e.g., 7.2 LPA)" />
          <input className="admin-input" name="deadline" value={form.deadline} onChange={handleChange} placeholder="Deadline (e.g., Apr 03, 2026)" />
          <input className="admin-input" name="skills" value={form.skills} onChange={handleChange} placeholder="Skills (React, SQL, Communication)" />
          <button className="btn btn-small" type="submit">
            Add Posting
          </button>
        </form>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>CTC</th>
              <th>Deadline</th>
              <th>Skills</th>
            </tr>
          </thead>
          <tbody>
            {(opportunities || []).map((o) => (
              <tr key={o.id}>
                <td className="admin-td-strong">{o.company}</td>
                <td>{o.role}</td>
                <td>{o.ctc}</td>
                <td>{o.deadline}</td>
                <td>
                  <div className="admin-skill-row">
                    {(o.skills || []).map((skill) => (
                      <span key={skill} className="pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
            {(opportunities || []).length === 0 ? (
              <tr>
                <td colSpan={5} className="admin-empty">
                  No opportunities uploaded yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompanyOpportunities;

