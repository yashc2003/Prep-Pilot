import React from 'react';

const AdminPageHeader = ({ title, subtitle, imageSrc, right }) => {
  return (
    <div className="admin-hero">
      <div className="admin-hero-content">
        <div className="admin-hero-text">
          <div className="admin-hero-title">{title}</div>
          {subtitle ? <div className="admin-hero-subtitle">{subtitle}</div> : null}
          {right ? <div className="admin-hero-right">{right}</div> : null}
        </div>

        {imageSrc ? (
          <img className="admin-hero-art" src={imageSrc} alt="" aria-hidden="true" />
        ) : null}
      </div>
    </div>
  );
};

export default AdminPageHeader;

