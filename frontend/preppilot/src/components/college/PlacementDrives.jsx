import React, { useMemo, useState } from 'react';
import { CalendarDaysIcon, PlusCircleIcon } from '@heroicons/react/24/outline';
import AdminPageHeader from '../admin/AdminPageHeader';
import bannerArt from '../../assets/admin-banner.svg';

const PlacementDrives = ({ drives, onAddDrive }) => {
  const [form, setForm] = useState({
    company: '',
    role: '',
    date: '',
    status: 'Scheduled',
    registered: '',
    selected: '',
  });

  const summary = useMemo(() => {
    const total = drives?.length ?? 0;
    const ongoing = (drives || []).filter((d) => d.status === 'Ongoing').length;
    const upcoming = (drives || []).filter((d) => d.status === 'Scheduled').length;
    return { total, ongoing, upcoming };
  }, [drives]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.company.trim() || !form.role.trim() || !form.date.trim()) return;

    onAddDrive({
      company: form.company.trim(),
      role: form.role.trim(),
      date: form.date.trim(),
      status: form.status,
      registered: Number(form.registered || 0),
      selected: Number(form.selected || 0),
    });

    setForm({ company: '', role: '', date: '', status: 'Scheduled', registered: '', selected: '' });
  };

  return (
    <div className="dashboard-container">
      <AdminPageHeader
        title="Placement Drives"
        subtitle="Create drives, track registrations and shortlist outcomes."
        imageSrc={bannerArt}
        right={
          <div className="admin-chip-row">
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <CalendarDaysIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Total</span>
              <span className="admin-chip-value">{summary.total}</span>
            </div>
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <PlusCircleIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Upcoming</span>
              <span className="admin-chip-value">{summary.upcoming}</span>
            </div>
          </div>
        }
      />

      <div className="admin-panel">
        <div className="admin-section-head">
          <h3>Create Drive</h3>
          <span className="admin-muted">Quickly add a new campus drive</span>
        </div>

        <form className="admin-form" onSubmit={handleSubmit}>
          <input
            className="admin-input"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Company name"
          />
          <input
            className="admin-input"
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Role (e.g., SDE Intern)"
          />
          <input className="admin-input" name="date" value={form.date} onChange={handleChange} placeholder="Date (e.g., Mar 28, 2026)" />
          <select className="admin-select" name="status" value={form.status} onChange={handleChange}>
            <option value="Scheduled">Scheduled</option>
            <option value="Ongoing">Ongoing</option>
            <option value="Completed">Completed</option>
          </select>
          <input className="admin-input" name="registered" value={form.registered} onChange={handleChange} placeholder="Registered" />
          <input className="admin-input" name="selected" value={form.selected} onChange={handleChange} placeholder="Selected" />
          <button className="btn btn-small" type="submit">
            Add Drive
          </button>
        </form>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Company</th>
              <th>Role</th>
              <th>Date</th>
              <th>Status</th>
              <th>Registered</th>
              <th>Selected</th>
            </tr>
          </thead>
          <tbody>
            {(drives || []).map((d) => (
              <tr key={d.id}>
                <td className="admin-td-strong">{d.company}</td>
                <td>{d.role}</td>
                <td>{d.date}</td>
                <td>
                  <span className="pill">{d.status}</span>
                </td>
                <td>{d.registered}</td>
                <td>{d.selected}</td>
              </tr>
            ))}

            {(drives || []).length === 0 ? (
              <tr>
                <td colSpan={6} className="admin-empty">
                  No drives added yet.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PlacementDrives;

