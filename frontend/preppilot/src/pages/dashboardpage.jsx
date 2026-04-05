import React from 'react';
import AdminDashboard from '../components/dashboard/admin';
import CandidateDashboard from '../components/dashboard/candidate';
import CollegeDashboard from '../components/dashboard/college';
import CompanyDashboard from '../components/dashboard/company';
import ConsultancyDashboard from '../components/dashboard/consultancy';
import './Dashboard.css';
import logo from '../assets/preppilot-wordmark-white.png';

const DashboardPage = ({ role, onLogout }) => {
  const renderDashboard = () => {
    if (role === 'admin') {
      return <AdminDashboard />;
    }

    if (role === 'college') {
      return <CollegeDashboard />;
    }

    if (role === 'company') {
      return <CompanyDashboard />;
    }

    if (role === 'consultancy') {
      return <ConsultancyDashboard />;
    }

    return <CandidateDashboard />;
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <div className="dashboard-brand">
          <img className="dashboard-logo" src={logo} alt="PrepPilot" />
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
