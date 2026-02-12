import React, { useState } from 'react';
import './Auth.css';

const Login = ({ onSwitchToRegister, onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    role: ''
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login Credentials:', credentials);
    
    // Simulate login success
    onLoginSuccess(credentials.role || 'candidate');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login to Preppilot</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Role *</label>
            <select
              name="role"
              value={credentials.role}
              onChange={handleChange}
              required
              className="form-select"
            >
              <option value="">Select Role</option>
              <option value="candidate">Candidate</option>
              <option value="college">College</option>
              <option value="company">Company</option>
              <option value="consultancy">Consultancy</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Username *</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password *</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{' '}
          <span onClick={onSwitchToRegister} className="link">
            Register here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;