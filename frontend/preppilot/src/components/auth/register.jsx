
import React, { useState, useEffect } from 'react';
import { commonFields, roleSpecificFields } from '../../utils/formConfig';
import './auth.css';
import logo from '../../assets/preppilot-wordmark-transparent.png';

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    role: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false
  });
  const [selectedRole, setSelectedRole] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with default values
  useEffect(() => {
    const initialData = { role: '' };
    [...commonFields, ...(selectedRole ? roleSpecificFields[selectedRole] : [])]
      .forEach(field => {
        if (field.type === 'checkbox') initialData[field.name] = false;
        else if (field.type === 'multiselect') initialData[field.name] = [];
        else initialData[field.name] = '';
      });
    
    setFormData(prev => ({ ...prev, ...initialData }));
  }, [selectedRole]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else if (type === 'multiselect') {
      handleMultiSelect(name, value);
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      if (name === 'role') {
        setSelectedRole(value);
        // Reset form data when role changes
        setFormData(prev => ({
          ...prev,
          ...Object.keys(prev).reduce((acc, key) => {
            if (!['role', 'email', 'password', 'confirmPassword', 'agreeTerms'].includes(key)) {
              acc[key] = '';
            }
            return acc;
          }, {})
        }));
      }
      
      // Real-time email validation
      if (name === 'email' && value) {
        validateEmail(value);
      }
    }
  };

  const handleMultiSelect = (name, value) => {
    const currentValues = formData[name] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    setFormData(prev => ({ ...prev, [name]: newValues }));
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      return false;
    }
    
    // Check for disposable emails
    const disposableDomains = ['mailinator.com', 'tempmail.com', 'guerrillamail.com'];
    const domain = email.split('@')[1]?.toLowerCase();
    if (domain && disposableDomains.includes(domain)) {
      setErrors(prev => ({ 
        ...prev, 
        email: 'Disposable email addresses are not allowed' 
      }));
      return false;
    }
    
    // Clear email error if valid
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.email;
      return newErrors;
    });
    
    return true;
  };

  const validateForm = () => {
    const newErrors = {};
    const allFields = [
      ...commonFields,
      ...(selectedRole ? roleSpecificFields[selectedRole] : [])
    ];

    // Validate all fields
    allFields.forEach(field => {
      const value = formData[field.name];
      
      // Required field validation
      if (field.required) {
        if (field.type === 'checkbox' && value !== true) {
          newErrors[field.name] = `${field.label} is required`;
        } 
        else if (field.type === 'multiselect' && (!value || value.length === 0)) {
          newErrors[field.name] = `Please select at least one ${field.label.toLowerCase()}`;
        }
        else if (field.type === 'file' && !value) {
          newErrors[field.name] = `${field.label} is required`;
        }
        else if (!value || (typeof value === 'string' && value.trim() === '')) {
          newErrors[field.name] = `${field.label} is required`;
        }
      }

      // Type-specific validation
      if (value) {
        switch (field.type) {
          case 'email':
            if (!/\S+@\S+\.\S+/.test(value)) {
              newErrors[field.name] = 'Invalid email format';
            }
            break;
          
          case 'tel':
            if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) {
              newErrors[field.name] = 'Please enter a valid 10-digit phone number';
            }
            break;
          
          case 'number':
            if (isNaN(value) || Number(value) <= 0) {
              newErrors[field.name] = 'Please enter a valid number';
            }
            break;
          
          case 'url':
            if (!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value)) {
              newErrors[field.name] = 'Please enter a valid URL';
            }
            break;
          
          case 'password':
            if (value.length < 8) {
              newErrors[field.name] = 'Password must be at least 8 characters';
            }
            if (!/(?=.*[a-z])/.test(value)) {
              newErrors[field.name] = 'Password must contain a lowercase letter';
            }
            if (!/(?=.*[A-Z])/.test(value)) {
              newErrors[field.name] = 'Password must contain an uppercase letter';
            }
            if (!/(?=.*\d)/.test(value)) {
              newErrors[field.name] = 'Password must contain a number';
            }
            break;
          
          default:
            break;
        }
      }
    });

    // Cross-field validation
    if (formData.password && formData.confirmPassword && 
        formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fix the errors in the form');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log('Registration Data:', {
        ...formData,
        password: '[REDACTED]',
        confirmPassword: '[REDACTED]'
      });
      
      alert('Registration successful!');
      onSwitchToLogin();
      
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case 'text':
      case 'email':
      case 'tel':
      case 'number':
      case 'url':
      case 'date':
      case 'password':
        return (
          <>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              className={`form-input ${errors[field.name] ? 'error' : ''}`}
              placeholder={`Enter ${field.label.toLowerCase()}`}
              disabled={isSubmitting}
            />
            {errors[field.name] && (
              <span className="error-message">{errors[field.name]}</span>
            )}
          </>
        );
      
      // ... rest of the field types remain the same as original
      case 'textarea':
        return (
          <>
            <textarea
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              className={`form-textarea ${errors[field.name] ? 'error' : ''}`}
              rows="3"
              placeholder={`Enter ${field.label.toLowerCase()}`}
              disabled={isSubmitting}
            />
            {errors[field.name] && (
              <span className="error-message">{errors[field.name]}</span>
            )}
          </>
        );
      
      case 'select':
        return (
          <>
            <select
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              className={`form-select ${errors[field.name] ? 'error' : ''}`}
              disabled={isSubmitting}
            >
              <option value="">Select {field.label}</option>
              {field.options?.map((opt, idx) => (
                <option key={idx} value={typeof opt === 'object' ? opt.value : opt}>
                  {typeof opt === 'object' ? opt.label : opt}
                </option>
              ))}
            </select>
            {errors[field.name] && (
              <span className="error-message">{errors[field.name]}</span>
            )}
          </>
        );
      
      case 'radio':
        return (
          <div className="radio-group">
            {field.options?.map((opt, idx) => (
              <label key={idx} className="radio-label">
                <input
                  type="radio"
                  name={field.name}
                  value={opt}
                  checked={formData[field.name] === opt}
                  onChange={handleChange}
                  required={field.required}
                  disabled={isSubmitting}
                />
                {opt}
              </label>
            ))}
          </div>
        );
      
      case 'multiselect':
        return (
          <div className="multiselect-group">
            {field.options?.map((opt, idx) => (
              <label key={idx} className="checkbox-label">
                <input
                  type="checkbox"
                  checked={(formData[field.name] || []).includes(opt)}
                  onChange={() => handleMultiSelect(field.name, opt)}
                  disabled={isSubmitting}
                />
                {opt}
              </label>
            ))}
            {errors[field.name] && (
              <span className="error-message">{errors[field.name]}</span>
            )}
          </div>
        );
      
      case 'checkbox':
        return (
          <>
            <label className="checkbox-label">
              <input
                type="checkbox"
                name={field.name}
                checked={formData[field.name] || false}
                onChange={handleChange}
                required={field.required}
                disabled={isSubmitting}
              />
              {field.label}
            </label>
            {errors[field.name] && (
              <span className="error-message">{errors[field.name]}</span>
            )}
          </>
        );
      
      case 'file':
        return (
          <>
            <input
              type="file"
              name={field.name}
              onChange={handleChange}
              required={field.required}
              className="form-input"
              accept={field.name === 'profilePhoto' ? 'image/*' : field.name === 'resume' ? '.pdf,.doc,.docx' : '*'}
              disabled={isSubmitting}
            />
            {formData[field.name] && (
              <span className="file-name">Selected: {formData[field.name].name}</span>
            )}
            {errors[field.name] && (
              <span className="error-message">{errors[field.name]}</span>
            )}
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="auth-shell">
      <header className="auth-header">
        <div className="auth-brand">
          <img className="auth-logo" src={logo} alt="PrepPilot" />
        </div>
        <div className="auth-header-actions">
          <button type="button" className="auth-header-link" onClick={() => onSwitchToLogin()}>
            Login
          </button>
        </div>
      </header>

      <div className="auth-container">
        <div className="auth-card auth-card--register">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-grid">
            {/* Left Side */}
            <div className="form-column">
              {commonFields.slice(0, Math.ceil(commonFields.length / 2)).map((field) => (
                <div key={field.name} className="form-group">
                  {field.type !== 'checkbox' && (
                    <label className="form-label">
                      {field.label} {field.required && <span className="required">*</span>}
                    </label>
                  )}
                  {renderField(field)}
                </div>
              ))}
            </div>

            {/* Right Side */}
            <div className="form-column">
              {commonFields.slice(Math.ceil(commonFields.length / 2)).map((field) => (
                <div key={field.name} className="form-group">
                  {field.type !== 'checkbox' && (
                    <label className="form-label">
                      {field.label} {field.required && <span className="required">*</span>}
                    </label>
                  )}
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>

          {/* Role Specific Fields */}
          {selectedRole && roleSpecificFields[selectedRole] && (
            <>
              <div className="section-divider">
                <h3>
                  {selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Specific Details
                </h3>
              </div>

              <div className="form-grid">
                {roleSpecificFields[selectedRole].map((field) => (
                  <div key={field.name} className="form-group">
                    <label className="form-label">
                      {field.label} {field.required && <span className="required">*</span>}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
              </div>
            </>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Registering...' : 'Register'}
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <span onClick={() => onSwitchToLogin()} className="link">
            Login here
          </span>
        </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
