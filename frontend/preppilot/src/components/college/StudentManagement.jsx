import React, { useMemo, useState } from 'react';
import { AcademicCapIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import AdminPageHeader from '../admin/AdminPageHeader';
import bannerArt from '../../assets/admin-banner.svg';

const StatusPill = ({ status }) => {
  const normalized = (status || '').toLowerCase();
  const className =
    normalized === 'placed'
      ? 'pill pill-green'
      : normalized === 'not placed'
        ? 'pill pill-red'
        : normalized === 'in process'
          ? 'pill pill-amber'
          : 'pill';

  return <span className={className}>{status}</span>;
};

const StudentManagement = ({ students, onAction }) => {
  const [query, setQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const courseOptions = useMemo(() => {
    const all = (students || []).map((s) => s.course).filter(Boolean);
    return Array.from(new Set(all)).sort();
  }, [students]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (students || []).filter((s) => {
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.course.toLowerCase().includes(q) ||
        (s.skills || []).some((skill) => skill.toLowerCase().includes(q));
      const matchesCourse = courseFilter === 'all' ? true : s.course === courseFilter;
      const matchesStatus = statusFilter === 'all' ? true : s.status === statusFilter;
      return matchesQuery && matchesCourse && matchesStatus;
    });
  }, [students, query, courseFilter, statusFilter]);

  return (
    <div className="dashboard-container">
      <AdminPageHeader
        title="Student Management"
        subtitle="Track course, skills and placement status for registered students."
        imageSrc={bannerArt}
        right={
          <div className="admin-chip-row">
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <AcademicCapIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Showing</span>
              <span className="admin-chip-value">{filtered.length}</span>
            </div>
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <MagnifyingGlassIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Query</span>
              <span className="admin-chip-value">{query ? 'On' : 'Off'}</span>
            </div>
          </div>
        }
      />

      <div className="admin-toolbar">
        <input
          className="admin-input"
          placeholder="Search by name / course / skills…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="admin-select" value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
          <option value="all">All Courses</option>
          {courseOptions.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select className="admin-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All Status</option>
          <option value="Placed">Placed</option>
          <option value="In Process">In Process</option>
          <option value="Not Placed">Not Placed</option>
        </select>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Course</th>
              <th>Skills</th>
              <th>Placement Status</th>
              <th className="admin-th-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s) => (
              <tr key={s.id}>
                <td className="admin-td-strong">{s.name}</td>
                <td>{s.course}</td>
                <td>
                  <div className="admin-skill-row">
                    {(s.skills || []).map((skill) => (
                      <span key={skill} className="pill">
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="admin-stack">
                    <StatusPill status={s.status} />
                    {s.status === 'Placed' && s.company ? (
                      <span className="admin-muted">Company: {s.company}</span>
                    ) : null}
                  </div>
                </td>
                <td className="admin-td-actions">
                  <button className="btn btn-small" type="button" onClick={() => onAction(s.id, 'togglePlaced')}>
                    {s.status === 'Placed' ? 'Unmark Placed' : 'Mark Placed'}
                  </button>
                  <button className="btn btn-small btn-warn" type="button" onClick={() => onAction(s.id, 'markNotPlaced')}>
                    Mark Not Placed
                  </button>
                  <button className="btn btn-small btn-danger" type="button" onClick={() => onAction(s.id, 'remove')}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="admin-empty">
                  No students found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentManagement;
