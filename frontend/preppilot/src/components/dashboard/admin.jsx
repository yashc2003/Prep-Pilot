import React, { useMemo, useState } from 'react';
import AdminDashboardHome from '../admin/AdminDashboardHome';
import UserManagement from '../admin/UserManagement';
import CompanyManagement from '../admin/CompanyManagement';
import ConsultancyManagement from '../admin/ConsultancyManagement';
import ReportsAnalytics from '../admin/ReportsAnalytics';

const AdminDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const [users, setUsers] = useState([
    { id: 'u1', name: 'Aarav Mehta', role: 'candidate', email: 'aarav@example.com', status: 'Active' },
    { id: 'u2', name: 'Neha Sharma', role: 'company', email: 'neha@techcorp.com', status: 'Pending' },
    { id: 'u3', name: 'Vikram Rao', role: 'consultancy', email: 'vikram@aceconsult.com', status: 'Active' },
    { id: 'u4', name: 'Isha Singh', role: 'candidate', email: 'isha@example.com', status: 'Blocked' },
  ]);

  const [companies, setCompanies] = useState([
    {
      id: 'c1',
      name: 'TechCorp',
      status: 'Approved',
      jobs: [
        { id: 'j1', title: 'Frontend Developer', status: 'Active' },
        { id: 'j2', title: 'Backend Engineer', status: 'Active' },
      ],
    },
    {
      id: 'c2',
      name: 'StartupXYZ',
      status: 'Pending',
      jobs: [{ id: 'j3', title: 'Full Stack Engineer', status: 'Draft' }],
    },
    {
      id: 'c3',
      name: 'WebSolutions',
      status: 'Suspended',
      jobs: [{ id: 'j4', title: 'React Developer', status: 'Paused' }],
    },
  ]);

  const [consultancies, setConsultancies] = useState([
    {
      id: 'k1',
      name: 'Ace Consult',
      contactEmail: 'support@aceconsult.com',
      status: 'Approved',
      prepStats: { candidatesPrepared: 128, mockInterviews: 420, avgInterviewScore: 7.6 },
    },
    {
      id: 'k2',
      name: 'CareerLift',
      contactEmail: 'hello@careerlift.com',
      status: 'Pending',
      prepStats: { candidatesPrepared: 41, mockInterviews: 96, avgInterviewScore: 6.9 },
    },
  ]);

  const interviews = useMemo(
    () => ({ scheduled: 24, completed: 17, selected: 6, rejected: 11 }),
    []
  );

  const totals = useMemo(() => {
    const totalCandidates = users.filter((u) => u.role === 'candidate').length;
    const totalCompanies = companies.length;
    const totalConsultancies = consultancies.length;
    const activeJobs = companies.flatMap((c) => c.jobs).filter((j) => j.status === 'Active').length;

    return { totalCandidates, totalCompanies, totalConsultancies, activeJobs };
  }, [users, companies, consultancies]);

  const handleUserAction = (userId, action) => {
    if (action === 'delete') {
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      return;
    }

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id !== userId) return u;
        if (action === 'approve') return { ...u, status: 'Active' };
        if (action === 'block') return { ...u, status: u.status === 'Blocked' ? 'Active' : 'Blocked' };
        return u;
      })
    );
  };

  const handleCompanyAction = (companyId, action) => {
    setCompanies((prev) =>
      prev.map((c) => {
        if (c.id !== companyId) return c;
        if (action === 'approve') return { ...c, status: 'Approved' };
        if (action === 'suspend') return { ...c, status: c.status === 'Suspended' ? 'Approved' : 'Suspended' };
        return c;
      })
    );
  };

  const handleConsultancyAction = (consultancyId, action) => {
    setConsultancies((prev) =>
      prev.map((k) => {
        if (k.id !== consultancyId) return k;
        if (action === 'approve') return { ...k, status: 'Approved' };
        if (action === 'suspend') return { ...k, status: k.status === 'Suspended' ? 'Approved' : 'Suspended' };
        return k;
      })
    );
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div className="admin-title">Admin Pages</div>
          <div className="admin-subtitle">Manage platform</div>
        </div>

        <nav className="admin-nav">
          <button
            className={`admin-nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActivePage('dashboard')}
            type="button"
          >
            Dashboard
          </button>
          <button
            className={`admin-nav-item ${activePage === 'users' ? 'active' : ''}`}
            onClick={() => setActivePage('users')}
            type="button"
          >
            User Management
          </button>
          <button
            className={`admin-nav-item ${activePage === 'companies' ? 'active' : ''}`}
            onClick={() => setActivePage('companies')}
            type="button"
          >
            Company Management
          </button>
          <button
            className={`admin-nav-item ${activePage === 'consultancies' ? 'active' : ''}`}
            onClick={() => setActivePage('consultancies')}
            type="button"
          >
            Consultancy Management
          </button>
          <button
            className={`admin-nav-item ${activePage === 'reports' ? 'active' : ''}`}
            onClick={() => setActivePage('reports')}
            type="button"
          >
            Reports & Analytics
          </button>
        </nav>
      </aside>

      <main className="admin-main">
        {activePage === 'dashboard' && (
          <AdminDashboardHome totals={totals} interviews={interviews} />
        )}

        {activePage === 'users' && (
          <UserManagement users={users} onAction={handleUserAction} />
        )}

        {activePage === 'companies' && (
          <CompanyManagement companies={companies} onAction={handleCompanyAction} />
        )}

        {activePage === 'consultancies' && (
          <ConsultancyManagement consultancies={consultancies} onAction={handleConsultancyAction} />
        )}

        {activePage === 'reports' && (
          <ReportsAnalytics totals={totals} interviews={interviews} companies={companies} />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
