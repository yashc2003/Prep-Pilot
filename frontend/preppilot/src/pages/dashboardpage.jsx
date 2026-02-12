import React from 'react';
import AdminDashboard from '../components/Dashboard/AdminDashboard';
import CandidateDashboard from '../components/Dashboard/CandidateDashboard';
import CollegeDashboard from '../components/Dashboard/CollegeDashboard';
import CompanyDashboard from '../components/Dashboard/CompanyDashboard';
import ConsultancyDashboard from '../components/Dashboard/ConsultancyDashboard';
import './Dashboard.css';

const DashboardPage = ({ role, onLogout }) => {
  const renderDashboard = () => {
    switch (role) {
      case 'admin':
        return <AdminDashboard />;
      case 'candidate':
        return <CandidateDashboard />;
      case 'college':
        return <CollegeDashboard />;
      case 'company':
        return <CompanyDashboard />;
      case 'consultancy':
        return <ConsultancyDashboard />;
      default:
        return <CandidateDashboard />;
    }
  };

  return (
    <div className="dashboard-layout">
      <header className="dashboard-header">
        <h1>Preppilot Dashboard</h1>
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
    </div>
  );
};

export default DashboardPage;