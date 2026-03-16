import React, { useMemo, useState } from 'react';
import { ShieldCheckIcon, UsersIcon } from '@heroicons/react/24/outline';
import AdminPageHeader from './AdminPageHeader';
import bannerArt from '../../assets/admin-banner.svg';

const StatusPill = ({ status }) => {
  const normalized = (status || '').toLowerCase();
  const className =
    normalized === 'active'
      ? 'pill pill-green'
      : normalized === 'blocked' || normalized === 'suspended'
        ? 'pill pill-red'
        : normalized === 'pending'
          ? 'pill pill-amber'
          : 'pill';

  return <span className={className}>{status}</span>;
};

const UserManagement = ({ users, onAction }) => {
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (users || []).filter((u) => {
      const matchesQuery =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q);
      const matchesRole = roleFilter === 'all' ? true : u.role === roleFilter;
      return matchesQuery && matchesRole;
    });
  }, [users, query, roleFilter]);

  return (
    <div className="dashboard-container">
      <AdminPageHeader
        title="User Management"
        subtitle="Approve, block or delete users across roles."
        imageSrc={bannerArt}
        right={
          <div className="admin-chip-row">
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <UsersIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Showing</span>
              <span className="admin-chip-value">{filtered.length}</span>
            </div>
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <ShieldCheckIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Pending</span>
              <span className="admin-chip-value">{(users || []).filter((u) => u.status === 'Pending').length}</span>
            </div>
          </div>
        }
      />

      <div className="admin-toolbar">
        <input
          className="admin-input"
          placeholder="Search by name / email / role…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="admin-select" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
          <option value="all">All Roles</option>
          <option value="candidate">Candidate</option>
          <option value="company">Company</option>
          <option value="consultancy">Consultancy</option>
          <option value="college">College</option>
          <option value="admin">Admin</option>
        </select>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Role</th>
              <th>Email</th>
              <th>Status</th>
              <th className="admin-th-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                <td className="admin-td-strong">{u.name}</td>
                <td className="admin-capitalize">{u.role}</td>
                <td>{u.email}</td>
                <td>
                  <StatusPill status={u.status} />
                </td>
                <td className="admin-td-actions">
                  <button className="btn btn-small" type="button" onClick={() => onAction(u.id, 'approve')}>
                    Approve
                  </button>
                  <button className="btn btn-small btn-warn" type="button" onClick={() => onAction(u.id, 'block')}>
                    Block
                  </button>
                  <button className="btn btn-small btn-danger" type="button" onClick={() => onAction(u.id, 'delete')}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="admin-empty">
                  No users found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
