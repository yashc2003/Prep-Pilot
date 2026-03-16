import React from 'react';
import './visitingpage.css';
import { BriefcaseIcon, ChartBarIcon, SparklesIcon } from '@heroicons/react/24/outline';
import logo from '../assets/preppilot-logo.svg';
import heroArt from '../assets/visiting-hero.svg';

const VisitingPage = ({ onStartRegister, onGoToLogin }) => {
  return (
    <div className="visiting-container">
      <header className="visiting-nav">
        <div className="visiting-brand">
          <img className="visiting-logo" src={logo} alt="PrepPilot" />
          <div>
            <div className="visiting-brand-name">PrepPilot</div>
            <div className="visiting-brand-tagline">AI based interview application</div>
          </div>
        </div>

        <div className="visiting-nav-actions">
          <button type="button" className="visiting-btn secondary" onClick={onGoToLogin}>
            Login
          </button>
          <button type="button" className="visiting-btn primary" onClick={onStartRegister}>
            Start Registration
          </button>
        </div>
      </header>

      <main className="visiting-main">
        <section className="visiting-hero">
          <div className="visiting-hero-left">
            <div className="visiting-badge">
              <SparklesIcon className="visiting-icon" />
              <span>Smarter prep. Better outcomes.</span>
            </div>

            <h1 className="visiting-title">
              Prepare, practice and get hired with <span className="visiting-accent">PrepPilot</span>.
            </h1>

            <p className="visiting-subtitle">
              Build your profile, explore jobs, and track interview performance — all from one clean dashboard.
            </p>

            <div className="visiting-points">
              <div className="visiting-point">
                <BriefcaseIcon className="visiting-point-icon" />
                <div>
                  <div className="visiting-point-title">Active Jobs</div>
                  <div className="visiting-point-text">Discover verified job postings and apply faster.</div>
                </div>
              </div>
              <div className="visiting-point">
                <ChartBarIcon className="visiting-point-icon" />
                <div>
                  <div className="visiting-point-title">Interview Insights</div>
                  <div className="visiting-point-text">See statistics and improve with each attempt.</div>
                </div>
              </div>
              <div className="visiting-point">
                <SparklesIcon className="visiting-point-icon" />
                <div>
                  <div className="visiting-point-title">One Platform</div>
                  <div className="visiting-point-text">Candidates, companies and consultancies in one place.</div>
                </div>
              </div>
            </div>

            <div className="visiting-actions">
              <button type="button" className="visiting-btn primary" onClick={onStartRegister}>
                Create your account
              </button>
              <button type="button" className="visiting-btn secondary" onClick={onGoToLogin}>
                I already have an account
              </button>
            </div>

            <div className="visiting-trust">
              <span className="visiting-trust-pill">Secure profiles</span>
              <span className="visiting-trust-pill">Role-based dashboards</span>
              <span className="visiting-trust-pill">Fast onboarding</span>
            </div>
          </div>

          <div className="visiting-hero-right" aria-hidden="true">
            <img className="visiting-hero-art" src={heroArt} alt="" />
            <div className="visiting-floating-card card-a">
              <div className="visiting-floating-title">Interview score</div>
              <div className="visiting-floating-value">8.2/10</div>
              <div className="visiting-floating-sub">+14% this week</div>
            </div>
            <div className="visiting-floating-card card-b">
              <div className="visiting-floating-title">Active jobs</div>
              <div className="visiting-floating-value">126</div>
              <div className="visiting-floating-sub">Verified postings</div>
            </div>
          </div>
        </section>

        <section className="visiting-features">
          <div className="visiting-section-head">
            <h2 className="visiting-h2">Everything you need to move faster</h2>
            <p className="visiting-section-sub">
              A modern, simple interface to manage profiles, approvals and analytics.
            </p>
          </div>

          <div className="visiting-feature-grid">
            <div className="visiting-feature-card">
              <div className="visiting-feature-top">
                <BriefcaseIcon className="visiting-feature-icon" />
                <div className="visiting-feature-title">Jobs & Applications</div>
              </div>
              <div className="visiting-feature-text">Browse jobs, track applications and stay organized.</div>
            </div>

            <div className="visiting-feature-card">
              <div className="visiting-feature-top">
                <ChartBarIcon className="visiting-feature-icon" />
                <div className="visiting-feature-title">Reports & Analytics</div>
              </div>
              <div className="visiting-feature-text">Visualize performance with simple, readable stats.</div>
            </div>

            <div className="visiting-feature-card">
              <div className="visiting-feature-top">
                <SparklesIcon className="visiting-feature-icon" />
                <div className="visiting-feature-title">Quick Setup</div>
              </div>
              <div className="visiting-feature-text">Create an account and start using the platform in minutes.</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="visiting-footer">
        <div className="visiting-footer-inner">
          <span>© {new Date().getFullYear()} PrepPilot</span>
          <span className="visiting-footer-muted">AI based interview application</span>
        </div>
      </footer>
    </div>
  );
};

export default VisitingPage;
