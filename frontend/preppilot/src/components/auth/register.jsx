import React, { useState } from 'react';
import { commonFields, roleSpecificFields } from '../../utils/formConfig';
import './Auth.css';

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    role: ''
  });
  const [selectedRole, setSelectedRole] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      if (name === 'role') {
        setSelectedRole(value);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration Data:', formData);
    // Add your API call here
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
          <input
            type={field.type}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            className="form-input"
          />
        );
      
      case 'textarea':
        return (
          <textarea
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            className="form-textarea"
            rows="3"
          />
        );
      
      case 'select':
        return (
          <select
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            required={field.required}
            className="form-select"
          >
            <option value="">Select {field.label}</option>
            {field.options?.map((opt, idx) => (
              <option key={idx} value={typeof opt === 'object' ? opt.value : opt}>
                {typeof opt === 'object' ? opt.label : opt}
              </option>
            ))}
          </select>
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
                />
                {opt}
              </label>
            ))}
          </div>
        );
      
      case 'checkbox':
        return (
          <label className="checkbox-label">
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name] || false}
              onChange={handleChange}
              required={field.required}
            />
            {field.label}
          </label>
        );
      
      case 'file':
        return (
          <input
            type="file"
            name={field.name}
            onChange={handleChange}
            required={field.required}
            className="form-input"
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Registration</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          
          {/* Common Fields */}
          {commonFields.map((field) => (
            <div key={field.name} className="form-group">
              {field.type !== 'checkbox' && (
                <label className="form-label">
                  {field.label} {field.required && <span className="required">*</span>}
                </label>
              )}
              {renderField(field)}
            </div>
          ))}

          {/* Role-Specific Fields */}
          {selectedRole && roleSpecificFields[selectedRole] && (
            <>
              <div className="section-divider">
                <h3>{selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1)} Specific Details</h3>
              </div>
              {roleSpecificFields[selectedRole].map((field) => (
                <div key={field.name} className="form-group">
                  <label className="form-label">
                    {field.label} {field.required && <span className="required">*</span>}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </>
          )}

          <button type="submit" className="btn btn-primary">
            Register
          </button>
        </form>

        <p className="auth-switch">
          Already have an account?{' '}
          <span onClick={onSwitchToLogin} className="link">
            Login here
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;