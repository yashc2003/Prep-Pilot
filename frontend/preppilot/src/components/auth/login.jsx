
import React, { useState } from 'react';
import './auth.css';

const Login = ({ onSwitchToRegister, onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({
    username: '',
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

    if (!credentials.username || credentials.username.trim().length < 3) {
      newErrors.username = 'Username must be at least 3 characters';
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
      console.log('Login Credentials:', credentials);
      
    
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      
      alert('Login successful!');
      onLoginSuccess(credentials.role);
      
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
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
            <label className="form-label">Username *</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
              className={`form-input ${errors.username ? 'error' : ''}`}
              placeholder="Enter your username"
            />
            {errors.username && <span className="error-message">{errors.username}</span>}
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
  );
};

export default Login;
