import React from 'react';

const CandidateDashboard = () => {
  return (
    <div className="dashboard-container">
      <h2>Welcome, Candidate!</h2>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Profile Completion</h3>
          <div className="progress-bar">
            <div className="progress" style={{width: '75%'}}></div>
          </div>
          <p>75% Complete</p>
        </div>

        <div className="dashboard-card">
          <h3>Job Applications</h3>
          <p className="stat-number">12</p>
          <p>Active Applications</p>
        </div>

        <div className="dashboard-card">
          <h3>Interviews Scheduled</h3>
          <p className="stat-number">3</p>
          <p>Upcoming Interviews</p>
        </div>

        <div className="dashboard-card">
          <h3>Skill Tests</h3>
          <p className="stat-number">5</p>
          <p>Tests Completed</p>
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Job Postings</h3>
        <ul>
          <li>Frontend Developer - TechCorp (2 days ago)</li>
          <li>Full Stack Engineer - StartupXYZ (5 days ago)</li>
          <li>React Developer - WebSolutions (1 week ago)</li>
        </ul>
      </div>
    </div>
  );
};

export default CandidateDashboard;