import React, { useState } from 'react';
import './auth.css';
import logo from '../../assets/preppilot-wordmark-transparent.png';
import { API_BASE_URL } from '../../config/api';

const Login = ({ onSwitchToRegister, onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    setCredentials({
      ...credentials,
      [name]: value
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!credentials.role) {
      newErrors.role = 'Please select a role';
    }

    if (!credentials.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!credentials.password || credentials.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Login form submitted!'); // Debug log
    
    if (!validateForm()) {
      console.log('Validation failed:', errors);
      alert('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          role: credentials.role,
          email: credentials.email,
          password: credentials.password
        })
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data?.error || 'Login failed');

      if (data?.token) {
        localStorage.setItem('preppilot_token', data.token);
      }
      if (data?.user?.role) {
        localStorage.setItem('preppilot_role', data.user.role);
      }

      alert('Login successful!');
      onLoginSuccess(credentials.role);
      
    } catch (error) {
      console.error('Login error:', error);
      alert(error?.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    
  
    <div className="auth-shell">
      <header className="auth-header">
        <div className="auth-brand">
          <img className="auth-logo" src={logo} alt="PrepPilot" />
        </div>
        <div className="auth-header-actions">
          <button type="button" className="auth-header-link" onClick={onSwitchToRegister}>
            Register
          </button>
        </div>
      </header>

      <div className="auth-container">
        <div className="auth-card auth-card--login">
        <h2>Login to Preppilot</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label className="form-label">Role *</label>
            <select
              name="role"
              value={credentials.role}
              onChange={handleChange}
              required
              className={`form-select ${errors.role ? 'error' : ''}`}
            >
              <option value="">Select Role</option>
              <option value="candidate">Candidate</option>
              <option value="college">College</option>
              <option value="company">Company</option>
              <option value="consultancy">Consultancy</option>
              <option value="admin">Admin</option>
            </select>
            {errors.role && <span className="error-message">{errors.role}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="email"
              name="email"
              value={credentials.email}
              onChange={handleChange}
              required
              className={`form-input ${errors.email ? 'error' : ''}`}
              placeholder="Enter your email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Password *</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
              className={`form-input ${errors.password ? 'error' : ''}`}
              placeholder="Enter your password"
            />
            {errors.password && <span className="error-message">{errors.password}</span>}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
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
    </div>
  
  );
};

export default Login;
