import React from 'react';

const PageHero = ({ title, subtitle, imageSrc, right }) => {
  return (
    <div className="page-hero">
      <div className="page-hero-content">
        <div className="page-hero-text">
          <div className="page-hero-title">{title}</div>
          {subtitle ? <div className="page-hero-subtitle">{subtitle}</div> : null}
          {right ? <div className="page-hero-right">{right}</div> : null}
        </div>

        {imageSrc ? (
          <img className="page-hero-art" src={imageSrc} alt="" aria-hidden="true" />
        ) : null}
      </div>
    </div>
  );
};

export default PageHero;

