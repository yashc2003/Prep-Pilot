import React, { useState } from 'react';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';
import DashboardPage from './DashboardPage';

const ParentPage = () => {
  const [currentView, setCurrentView] = useState('login'); // 'login', 'register', 'dashboard'
  const [userRole, setUserRole] = useState(null);

  const handleLoginSuccess = (role) => {
    setUserRole(role);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentView('login');
  };

  return (
    <div className="parent-page">
      {currentView === 'login' && (
        <Login
          onSwitchToRegister={() => setCurrentView('register')}
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