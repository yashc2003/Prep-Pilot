import React, { useState } from 'react';
import Login from '../components/auth/login';
import Register from '../components/auth/register';
import DashboardPage from './dashboardpage';
import VisitingPage from './visitingpage';

const ParentPage = () => {
  const [currentView, setCurrentView] = useState('visiting'); // 'visiting', 'login', 'register', 'dashboard'
  const [userRole, setUserRole] = useState(null);

  const handleLoginSuccess = (role) => {
    setUserRole(role);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentView('visiting');
  };

  return (
    <div className="parent-page">
      {currentView === 'visiting' && (
        <VisitingPage
          onStartRegister={() => setCurrentView('register')}
          onGoToLogin={() => setCurrentView('login')}
        />
      )}

      {currentView === 'login' && (
        <Login
          onSwitchToRegister={() => setCurrentView('visiting')}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {currentView === 'register' && (
        <Register onSwitchToLogin={() => setCurrentView('login')} />
      )}

      {currentView === 'dashboard' && (
        <DashboardPage role={userRole} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default ParentPage;
