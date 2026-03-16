import React from 'react';
import AdminDashboard from '../components/dashboard/admin';
import CandidateDashboard from '../components/dashboard/candidate';
import './Dashboard.css';
import logo from '../assets/preppilot-logo.svg';

const DashboardPage = ({ role, onLogout }) => {
  const renderDashboard = () => {
    if (role === 'admin') {
      return <AdminDashboard />;
    }

    return <CandidateDashboard />;
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <img className="dashboard-logo" src={logo} alt="PrepPilot" />
          <div className="dashboard-brand-text">
            <div className="dashboard-brand-name">PrepPilot</div>
            <div className="dashboard-brand-subtitle">Admin & User Dashboard</div>
          </div>
        </div>
        <div className="user-info">
          <span className="role-badge">{role}</span>
          <button onClick={onLogout} className="btn btn-logout">
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {renderDashboard()}
      </div>

      <footer className="dashboard-footer">
        <div className="dashboard-footer-inner">
          <span className="dashboard-footer-muted">© {new Date().getFullYear()} PrepPilot</span>
          <div className="dashboard-footer-links">
            <button type="button" className="footer-link" onClick={() => alert('Privacy policy page can be added')}>
              Privacy
            </button>
            <button type="button" className="footer-link" onClick={() => alert('Terms page can be added')}>
              Terms
            </button>
            <button type="button" className="footer-link" onClick={() => alert('Support page can be added')}>
              Support
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default DashboardPage;
