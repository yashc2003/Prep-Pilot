import React, { useMemo, useState } from 'react';
import ConsultancyDashboardHome from '../consultancy/ConsultancyDashboardHome';
import ConsultancyCandidatePrep from '../consultancy/ConsultancyCandidatePrep';
import ConsultancyMockInterviews from '../consultancy/ConsultancyMockInterviews';
import ConsultancyAssignedJobs from '../consultancy/ConsultancyAssignedJobs';
import ConsultancyPayments from '../consultancy/ConsultancyPayments';

const ConsultancyDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const [candidates, setCandidates] = useState([
    {
      id: 'cand-1',
      name: 'Ananya Verma',
      plan: ['DSA basics', 'React projects', 'Mock interview: behavioral'],
      progress: 62,
      status: 'In Progress',
      feedback: 'Good fundamentals. Focus on system design basics next.',
    },
    {
      id: 'cand-2',
      name: 'Rohan Iyer',
      plan: ['Java + OOP revision', 'Spring Boot APIs', 'Mock interview: technical'],
      progress: 48,
      status: 'Needs Attention',
      feedback: 'Improve communication clarity and practice coding under time.',
    },
    {
      id: 'cand-3',
      name: 'Meera Nair',
      plan: ['Resume review', 'Portfolio polish', 'Mock interview: HR round'],
      progress: 81,
      status: 'On Track',
      feedback: 'Strong profile. Add metrics to projects.',
    },
  ]);

  const [mockSessions, setMockSessions] = useState([
    {
      id: 'ms-1',
      candidateId: 'cand-1',
      candidateName: 'Ananya Verma',
      when: '2026-03-30T16:30',
      status: 'Scheduled',
      score: null,
      evaluation: '',
    },
    {
      id: 'ms-2',
      candidateId: 'cand-3',
      candidateName: 'Meera Nair',
      when: '2026-03-24T11:00',
      status: 'Completed',
      score: 8.1,
      evaluation: 'Great structure and confident delivery.',
    },
  ]);

  const [jobs, setJobs] = useState([
    {
      id: 'job-1',
      title: 'Frontend Developer',
      company: 'TechCorp',
      location: 'Bengaluru',
      skills: ['React', 'JavaScript', 'CSS'],
      deadline: '2026-04-10',
      recommendedCandidateIds: ['cand-1'],
    },
    {
      id: 'job-2',
      title: 'Backend Engineer',
      company: 'DataHub',
      location: 'Pune',
      skills: ['Node.js', 'REST', 'SQL'],
      deadline: '2026-04-05',
      recommendedCandidateIds: [],
    },
  ]);

  const [payments, setPayments] = useState([
    { id: 'pay-1', candidateId: 'cand-1', candidateName: 'Ananya Verma', amount: 4999, status: 'Paid', dueDate: '2026-03-05' },
    { id: 'pay-2', candidateId: 'cand-2', candidateName: 'Rohan Iyer', amount: 4999, status: 'Pending', dueDate: '2026-03-29' },
    { id: 'pay-3', candidateId: 'cand-3', candidateName: 'Meera Nair', amount: 7999, status: 'Pending', dueDate: '2026-03-31' },
  ]);

  const dashboardStats = useMemo(() => {
    const totalCandidates = candidates.length;
    const mockConducted = mockSessions.filter((s) => s.status === 'Completed').length;
    const placed = 2;
    const placementRate = totalCandidates === 0 ? 0 : Math.round((placed / totalCandidates) * 100);
    return { totalCandidates, mockConducted, placementRate };
  }, [candidates.length, mockSessions]);

  const handleUpdateCandidate = (candidateId, updates) => {
    setCandidates((prev) => prev.map((c) => (c.id === candidateId ? { ...c, ...updates } : c)));
  };

  const handleAddMockSession = (session) => {
    setMockSessions((prev) => [{ ...session, id: `ms-${prev.length + 1}` }, ...prev]);
  };

  const handleUpdateMockSession = (sessionId, updates) => {
    setMockSessions((prev) => prev.map((s) => (s.id === sessionId ? { ...s, ...updates } : s)));
  };

  const handleToggleRecommendation = (jobId, candidateId) => {
    setJobs((prev) =>
      prev.map((job) => {
        if (job.id !== jobId) return job;
        const has = job.recommendedCandidateIds.includes(candidateId);
        return {
          ...job,
          recommendedCandidateIds: has
            ? job.recommendedCandidateIds.filter((id) => id !== candidateId)
            : [...job.recommendedCandidateIds, candidateId],
        };
      })
    );
  };

  const handleMarkPayment = (paymentId, nextStatus) => {
    setPayments((prev) => prev.map((p) => (p.id === paymentId ? { ...p, status: nextStatus } : p)));
  };

  return (
    <div className="consultancy-shell">
      <aside className="consultancy-sidebar">
        <div className="consultancy-sidebar-header">
          <div className="consultancy-title">Consultancy Pages</div>
          <div className="consultancy-subtitle">Manage candidates</div>
        </div>

        <nav className="consultancy-nav">
          <button
            className={`consultancy-nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActivePage('dashboard')}
            type="button"
          >
            Dashboard
          </button>
          <button
            className={`consultancy-nav-item ${activePage === 'prep' ? 'active' : ''}`}
            onClick={() => setActivePage('prep')}
            type="button"
          >
            Candidate Preparation
          </button>
          <button
            className={`consultancy-nav-item ${activePage === 'mock' ? 'active' : ''}`}
            onClick={() => setActivePage('mock')}
            type="button"
          >
            Mock Interview Sessions
          </button>
          <button
            className={`consultancy-nav-item ${activePage === 'jobs' ? 'active' : ''}`}
            onClick={() => setActivePage('jobs')}
            type="button"
          >
            Assigned Jobs
          </button>
          <button
            className={`consultancy-nav-item ${activePage === 'payments' ? 'active' : ''}`}
            onClick={() => setActivePage('payments')}
            type="button"
          >
            Payment Management
          </button>
        </nav>
      </aside>

      <main className="consultancy-main">
        {activePage === 'dashboard' && <ConsultancyDashboardHome stats={dashboardStats} />}

        {activePage === 'prep' && (
          <ConsultancyCandidatePrep candidates={candidates} onUpdateCandidate={handleUpdateCandidate} />
        )}

        {activePage === 'mock' && (
          <ConsultancyMockInterviews
            candidates={candidates}
            sessions={mockSessions}
            onAddSession={handleAddMockSession}
            onUpdateSession={handleUpdateMockSession}
          />
        )}

        {activePage === 'jobs' && (
          <ConsultancyAssignedJobs jobs={jobs} candidates={candidates} onToggleRecommendation={handleToggleRecommendation} />
        )}

        {activePage === 'payments' && (
          <ConsultancyPayments payments={payments} onMarkPayment={handleMarkPayment} />
        )}
      </main>
    </div>
  );
};

export default ConsultancyDashboard;

