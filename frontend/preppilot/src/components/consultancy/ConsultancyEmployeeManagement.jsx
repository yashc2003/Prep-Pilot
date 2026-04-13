import React, { useMemo, useState } from 'react';

const roleOptions = ['Technical', 'Expert', 'HR'];

const RolePill = ({ role }) => {
  const normalized = (role || '').toLowerCase();
  const className =
    normalized === 'technical' ? 'pill pill-amber' : normalized === 'expert' ? 'pill pill-green' : 'pill';
  return <span className={className}>{role}</span>;
};

const ConsultancyEmployeeManagement = ({ employees, onAddEmployee, onAction, currentPage, onNavigate }) => {
  const [activeRole, setActiveRole] = useState('Technical');
  const [query, setQuery] = useState('');

  const [draft, setDraft] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Technical',
    skills: '',
  });

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (employees || []).filter((e) => {
      if (e.role !== activeRole) return false;
      if (!q) return true;
      return (
        e.name.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) ||
        (e.skills || []).some((s) => String(s).toLowerCase().includes(q))
      );
    });
  }, [employees, activeRole, query]);

  const totals = useMemo(() => {
    const map = { Technical: 0, Expert: 0, HR: 0 };
    (employees || []).forEach((e) => {
      if (map[e.role] !== undefined) map[e.role] += 1;
    });
    return map;
  }, [employees]);

  const canAdd = useMemo(() => {
    return draft.name.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(draft.email) && draft.phone.trim();
  }, [draft]);

  const submit = (e) => {
    e.preventDefault();
    if (!canAdd) return;

    const skills = draft.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onAddEmployee({
      name: draft.name.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
      role: draft.role,
      skills,
      status: 'Active',
    });

    setDraft({ name: '', email: '', phone: '', role: activeRole, skills: '' });
    setActiveRole(draft.role);
  };

  return (
    <div className="dashboard-container">
      <div className="page-section-head">
        <h2>Employee Management</h2>
        <p className="muted">Add employees and assign roles: Technical, Expert, HR.</p>
      </div>

      <div className="admin-toolbar">
        <select
          className="admin-select"
          value={currentPage || 'employees'}
          onChange={(e) => onNavigate?.(e.target.value)}
          aria-label="Employee management dropdown"
        >
          <option value="employees">Employee</option>
          <option value="jobs">Job</option>
        </select>
        {roleOptions.map((role) => (
          <button
            key={role}
            type="button"
            className={`btn btn-small ${activeRole === role ? '' : 'btn-ghost'}`}
            onClick={() => {
              setActiveRole(role);
              setDraft((p) => ({ ...p, role }));
            }}
          >
            {role} <span className="pill" style={{ marginLeft: 8 }}>{totals[role]}</span>
          </button>
        ))}
      </div>

      <div className="ui-card">
        <div className="ui-card-head">
          <h3>Add {activeRole} Employee</h3>
          <span className="muted">Required: name, email, phone</span>
        </div>

        <form className="admin-form" onSubmit={submit}>
          <input
            className="admin-input"
            placeholder="Full name *"
            value={draft.name}
            onChange={(e) => setDraft((p) => ({ ...p, name: e.target.value }))}
          />
          <input
            className="admin-input"
            placeholder="Email *"
            value={draft.email}
            onChange={(e) => setDraft((p) => ({ ...p, email: e.target.value }))}
          />
          <input
            className="admin-input"
            placeholder="Phone *"
            value={draft.phone}
            onChange={(e) => setDraft((p) => ({ ...p, phone: e.target.value }))}
          />
          <select className="admin-select" value={draft.role} onChange={(e) => setDraft((p) => ({ ...p, role: e.target.value }))}>
            {roleOptions.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
          <input
            className="admin-input"
            placeholder="Skills (comma separated)"
            value={draft.skills}
            onChange={(e) => setDraft((p) => ({ ...p, skills: e.target.value }))}
          />
          <button className="btn btn-primary btn-small" type="submit" disabled={!canAdd}>
            Add Employee
          </button>
        </form>
      </div>

      <div className="admin-toolbar">
        <input className="admin-input" placeholder="Search name / email / skills..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      <div className="ui-card">
        <div className="ui-card-head">
          <h3>
            {activeRole} Employees <span className="muted">({filtered.length})</span>
          </h3>
          <span className="muted">Click actions to manage</span>
        </div>

        <div className="ui-table-wrap">
          <table className="ui-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Skills</th>
                <th>Status</th>
                <th className="ui-th-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => (
                <tr key={emp.id}>
                  <td className="ui-td-strong">
                    {emp.name}
                    <div className="muted" style={{ marginTop: 4 }}>
                      {emp.email} • {emp.phone}
                    </div>
                  </td>
                  <td>
                    <RolePill role={emp.role} />
                  </td>
                  <td>
                    <div className="admin-skill-row">
                      {(emp.skills || []).length ? (
                        (emp.skills || []).map((s) => (
                          <span key={s} className="pill">
                            {s}
                          </span>
                        ))
                      ) : (
                        <span className="muted">—</span>
                      )}
                    </div>
                  </td>
                  <td>
                    <span className={`pill ${emp.status === 'Active' ? 'pill-success' : 'pill-warn'}`}>{emp.status}</span>
                  </td>
                  <td className="ui-td-actions">
                    <button className="btn btn-ghost btn-small" type="button" onClick={() => onAction(emp.id, 'toggleStatus')}>
                      Toggle status
                    </button>
                    <button className="btn btn-danger btn-small" type="button" onClick={() => onAction(emp.id, 'remove')}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="ui-empty">
                    No employees in this role yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConsultancyEmployeeManagement;
