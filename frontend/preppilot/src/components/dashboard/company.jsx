import React, { useMemo, useState } from 'react';
import CompanyDashboardHome from '../company/CompanyDashboardHome';
import CompanyPostJob from '../company/CompanyPostJob';
import CompanyManageJobs from '../company/CompanyManageJobs';
import CompanyCandidates from '../company/CompanyCandidates';
import CompanyInterviewSchedule from '../company/CompanyInterviewSchedule';
import CompanyAnalytics from '../company/CompanyAnalytics';

const CompanyDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const [jobs, setJobs] = useState([
    {
      id: 'job-1',
      title: 'Frontend Developer',
      skillsRequired: ['React', 'JavaScript', 'CSS'],
      experience: '0-2 years',
      salary: '₹8-12 LPA',
      description: 'Build modern UI features and collaborate with product and design teams.',
      location: 'Bengaluru',
      deadline: '2026-04-10',
      postedDate: '2026-03-18',
      status: 'Open',
      applications: 18,
    },
    {
      id: 'job-2',
      title: 'Backend Engineer',
      skillsRequired: ['Node.js', 'REST', 'SQL'],
      experience: '2-4 years',
      salary: '₹12-18 LPA',
      description: 'Design APIs, improve performance, and maintain reliable services.',
      location: 'Pune',
      deadline: '2026-04-05',
      postedDate: '2026-03-20',
      status: 'Open',
      applications: 11,
    },
  ]);

  const [candidates, setCandidates] = useState([
    {
      id: 'cand-1',
      name: 'Ananya Verma',
      skills: ['React', 'JS', 'UI'],
      resume: 'ananya-verma.pdf',
      aiInterviewScore: 8.2,
      applicationStatus: 'Applied',
      appliedJobId: 'job-1',
    },
    {
      id: 'cand-2',
      name: 'Rohan Iyer',
      skills: ['Node.js', 'SQL', 'APIs'],
      resume: 'rohan-iyer.pdf',
      aiInterviewScore: 7.1,
      applicationStatus: 'Applied',
      appliedJobId: 'job-2',
    },
    {
      id: 'cand-3',
      name: 'Meera Nair',
      skills: ['React', 'Testing', 'UX'],
      resume: 'meera-nair.pdf',
      aiInterviewScore: 8.7,
      applicationStatus: 'Shortlisted',
      appliedJobId: 'job-1',
    },
  ]);

  const [interviews, setInterviews] = useState([
    { id: 'int-1', candidateId: 'cand-3', candidateName: 'Meera Nair', time: '2026-03-29T15:00', status: 'Scheduled' },
  ]);

  const stats = useMemo(() => {
    const totalJobPosts = jobs.length;
    const applicationsReceived = jobs.reduce((sum, j) => sum + (j.applications ?? 0), 0);
    const shortlistedCandidates = candidates.filter((c) => c.applicationStatus === 'Shortlisted').length;
    const scheduledInterviews = interviews.filter((i) => i.status === 'Scheduled').length;
    return { totalJobPosts, applicationsReceived, shortlistedCandidates, scheduledInterviews };
  }, [jobs, candidates, interviews]);

  const handlePostJob = (job) => {
    setJobs((prev) => [
      {
        ...job,
        id: `job-${prev.length + 1}`,
        postedDate: new Date().toISOString().slice(0, 10),
        status: 'Open',
        applications: 0,
      },
      ...prev,
    ]);
    alert('Job posted.');
    setActivePage('manage');
  };

  const handleDeleteJob = (jobId) => {
    if (!window.confirm('Delete this job?')) return;
    setJobs((prev) => prev.filter((j) => j.id !== jobId));
  };

  const handleEditJob = (jobId) => {
    const title = prompt('New job title:');
    if (!title) return;
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, title } : j)));
  };

  const handleUpdateJobStatus = (jobId, status) => {
    setJobs((prev) => prev.map((j) => (j.id === jobId ? { ...j, status } : j)));
  };

  const handleCandidateAction = (candidateId, action) => {
    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id !== candidateId) return c;
        if (action === 'shortlist') return { ...c, applicationStatus: 'Shortlisted' };
        if (action === 'reject') return { ...c, applicationStatus: 'Rejected' };
        return c;
      })
    );
  };

  const handleUpdateCandidateStatus = (candidateId, applicationStatus) => {
    setCandidates((prev) => prev.map((c) => (c.id === candidateId ? { ...c, applicationStatus } : c)));
  };

  const handleScheduleInterview = (candidateId) => {
    const candidate = candidates.find((c) => c.id === candidateId);
    if (!candidate) return;
    const time = prompt('Enter interview date-time (YYYY-MM-DDTHH:MM):', '2026-03-31T11:00');
    if (!time) return;
    setInterviews((prev) => [
      { id: `int-${prev.length + 1}`, candidateId, candidateName: candidate.name, time, status: 'Scheduled' },
      ...prev,
    ]);
    setCandidates((prev) =>
      prev.map((c) => (c.id === candidateId && c.applicationStatus !== 'Rejected' ? { ...c, applicationStatus: 'Interview Scheduled' } : c))
    );
    alert('Interview scheduled.');
    setActivePage('schedule');
  };

  const handleUpdateInterview = (interviewId, updates) => {
    setInterviews((prev) => prev.map((i) => (i.id === interviewId ? { ...i, ...updates } : i)));
  };

  return (
    <div className="company-shell">
      <aside className="company-sidebar">
        <div className="company-sidebar-header">
          <div className="company-title">Company Pages</div>
          <div className="company-subtitle">Hire faster</div>
        </div>

        <nav className="company-nav">
          <button className={`company-nav-item ${activePage === 'dashboard' ? 'active' : ''}`} onClick={() => setActivePage('dashboard')} type="button">
            Dashboard
          </button>
          <button className={`company-nav-item ${activePage === 'post' ? 'active' : ''}`} onClick={() => setActivePage('post')} type="button">
            Post Job
          </button>
          <button className={`company-nav-item ${activePage === 'manage' ? 'active' : ''}`} onClick={() => setActivePage('manage')} type="button">
            Manage Jobs
          </button>
          <button className={`company-nav-item ${activePage === 'candidates' ? 'active' : ''}`} onClick={() => setActivePage('candidates')} type="button">
            Candidates
          </button>
          <button className={`company-nav-item ${activePage === 'schedule' ? 'active' : ''}`} onClick={() => setActivePage('schedule')} type="button">
            Interview Schedule
          </button>
          <button className={`company-nav-item ${activePage === 'analytics' ? 'active' : ''}`} onClick={() => setActivePage('analytics')} type="button">
            Analytics
          </button>
        </nav>
      </aside>

      <main className="company-main">
        {activePage === 'dashboard' && <CompanyDashboardHome stats={stats} jobs={jobs} candidates={candidates} interviews={interviews} />}

        {activePage === 'post' && <CompanyPostJob onSubmit={handlePostJob} />}

        {activePage === 'manage' && (
          <CompanyManageJobs jobs={jobs} onEdit={handleEditJob} onDelete={handleDeleteJob} onUpdateStatus={handleUpdateJobStatus} />
        )}

        {activePage === 'candidates' && (
          <CompanyCandidates
            candidates={candidates}
            jobs={jobs}
            onAction={handleCandidateAction}
            onUpdateStatus={handleUpdateCandidateStatus}
            onScheduleInterview={handleScheduleInterview}
          />
        )}

        {activePage === 'schedule' && <CompanyInterviewSchedule interviews={interviews} onUpdateInterview={handleUpdateInterview} />}

        {activePage === 'analytics' && <CompanyAnalytics jobs={jobs} candidates={candidates} interviews={interviews} />}
      </main>
    </div>
  );
};

export default CompanyDashboard;
