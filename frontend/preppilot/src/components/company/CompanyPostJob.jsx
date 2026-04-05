import React, { useState } from 'react';

const CompanyPostJob = ({ onSubmit }) => {
  const [form, setForm] = useState({
    title: '',
    skillsRequired: '',
    experience: '',
    salary: '',
    description: '',
    location: '',
    deadline: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.skillsRequired || !form.location || !form.deadline) {
      alert('Please fill Job Title, Skills Required, Location, and Deadline.');
      return;
    }
    onSubmit({
      title: form.title,
      skillsRequired: form.skillsRequired
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      experience: form.experience || 'Not specified',
      salary: form.salary || 'Not specified',
      description: form.description || '',
      location: form.location,
      deadline: form.deadline,
    });
    setForm({ title: '', skillsRequired: '', experience: '', salary: '', description: '', location: '', deadline: '' });
  };

  return (
    <div className="dashboard-container">
      <div className="page-section-head">
        <h2>Post Job Page</h2>
        <p className="muted">Create a new job post for candidates to apply.</p>
      </div>

      <div className="ui-card">
        <div className="ui-card-head">
          <h3>Job details</h3>
        </div>

        <form className="ui-form" onSubmit={handleSubmit}>
          <div className="ui-form-grid">
            <div>
              <label className="ui-label">Job Title</label>
              <input className="ui-input" name="title" value={form.title} onChange={handleChange} placeholder="e.g., Frontend Developer" />
            </div>
            <div>
              <label className="ui-label">Skills Required</label>
              <input
                className="ui-input"
                name="skillsRequired"
                value={form.skillsRequired}
                onChange={handleChange}
                placeholder="React, JavaScript, CSS"
              />
            </div>
            <div>
              <label className="ui-label">Experience</label>
              <input className="ui-input" name="experience" value={form.experience} onChange={handleChange} placeholder="0-2 years" />
            </div>
            <div>
              <label className="ui-label">Salary</label>
              <input className="ui-input" name="salary" value={form.salary} onChange={handleChange} placeholder="₹8-12 LPA" />
            </div>
            <div>
              <label className="ui-label">Location</label>
              <input className="ui-input" name="location" value={form.location} onChange={handleChange} placeholder="City / Remote" />
            </div>
            <div>
              <label className="ui-label">Deadline</label>
              <input className="ui-input" name="deadline" type="date" value={form.deadline} onChange={handleChange} />
            </div>
          </div>

          <div>
            <label className="ui-label">Job Description</label>
            <textarea
              className="ui-textarea"
              rows={5}
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Responsibilities, requirements, and hiring process"
            />
          </div>

          <div className="ui-actions">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyPostJob;

