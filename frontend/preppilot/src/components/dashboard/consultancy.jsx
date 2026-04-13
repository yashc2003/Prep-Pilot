import React, { useMemo, useState } from 'react';
import ConsultancyDashboardHome from '../consultancy/ConsultancyDashboardHome';
import ConsultancyCandidateManagement from '../consultancy/ConsultancyCandidateManagement';
import ConsultancyCandidatePrep from '../consultancy/ConsultancyCandidatePrep';
import ConsultancyMockInterviews from '../consultancy/ConsultancyMockInterviews';
import ConsultancyAssignedJobs from '../consultancy/ConsultancyAssignedJobs';
import ConsultancyPayments from '../consultancy/ConsultancyPayments';
import ConsultancyEmployeeManagement from '../consultancy/ConsultancyEmployeeManagement';

const ConsultancyDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');
  const [candidateGroupOpen, setCandidateGroupOpen] = useState(true);
  const [employeeGroupOpen, setEmployeeGroupOpen] = useState(true);

  const [candidates, setCandidates] = useState([
    {
      id: 'cand-1',
      name: 'Ananya Verma',
      plan: ['DSA basics', 'React projects', 'Mock interview: behavioral'],
      progress: 62,
      status: 'In Progress',
      feedback: 'Good fundamentals. Focus on system design basics next.',
      softSkillPlan: ['Communication drills', 'STAR storytelling', 'Mock interview: HR round'],
      softSkillProgress: 45,
      softSkillStatus: 'In Progress',
      softSkillFeedback: 'Practice concise answers and maintain eye contact.',
    },
    {
      id: 'cand-2',
      name: 'Rohan Iyer',
      plan: ['Java + OOP revision', 'Spring Boot APIs', 'Mock interview: technical'],
      progress: 48,
      status: 'Needs Attention',
      feedback: 'Improve communication clarity and practice coding under time.',
      softSkillPlan: ['Confidence building', 'Resume walkthrough', 'Mock interview: behavioral'],
      softSkillProgress: 38,
      softSkillStatus: 'Needs Attention',
      softSkillFeedback: 'Slow down while speaking; structure answers with examples.',
    },
    {
      id: 'cand-3',
      name: 'Meera Nair',
      plan: ['Resume review', 'Portfolio polish', 'Mock interview: HR round'],
      progress: 81,
      status: 'On Track',
      feedback: 'Strong profile. Add metrics to projects.',
      softSkillPlan: ['Negotiation basics', 'HR rapid-fire Q&A', 'Confidence drills'],
      softSkillProgress: 70,
      softSkillStatus: 'On Track',
      softSkillFeedback: 'Good tone and clarity. Work on handling follow-up questions.',
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

  const [employees, setEmployees] = useState([
    { id: 'emp-1', name: 'Sanjay Kumar', email: 'sanjay.tech@talentscout.in', phone: '9000000001', role: 'Technical', skills: ['DSA', 'JavaScript'], status: 'Active' },
    { id: 'emp-2', name: 'Ritika Jain', email: 'ritika.hr@talentscout.in', phone: '9000000002', role: 'HR', skills: ['Communication', 'Behavioral'], status: 'Active' },
    { id: 'emp-3', name: 'Aditya Rao', email: 'aditya.expert@talentscout.in', phone: '9000000003', role: 'Expert', skills: ['System Design', 'React'], status: 'Active' },
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

  const handleAddEmployee = (employee) => {
    setEmployees((prev) => [{ ...employee, id: `emp-${prev.length + 1}` }, ...prev]);
  };

  const handleEmployeeAction = (employeeId, action) => {
    if (action === 'remove') {
      setEmployees((prev) => prev.filter((e) => e.id !== employeeId));
      return;
    }

    if (action === 'toggleStatus') {
      setEmployees((prev) =>
        prev.map((e) => {
          if (e.id !== employeeId) return e;
          return { ...e, status: e.status === 'Active' ? 'Inactive' : 'Active' };
        })
      );
    }
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
            className={`consultancy-nav-item ${activePage === 'candidates' || activePage === 'prep' ? 'active' : ''}`}
            onClick={() => setCandidateGroupOpen((p) => !p)}
            type="button"
            aria-expanded={candidateGroupOpen}
          >
            Candidate Management <span className={`consultancy-nav-caret ${candidateGroupOpen ? 'open' : ''}`}>▾</span>
          </button>
          {candidateGroupOpen ? (
            <div className="consultancy-nav-sub">
              <button
                className={`consultancy-nav-item consultancy-nav-sublink ${activePage === 'candidates' ? 'active' : ''}`}
                onClick={() => setActivePage('candidates')}
                type="button"
              >
                View Candidate
              </button>
              <button
                className={`consultancy-nav-item consultancy-nav-sublink ${activePage === 'prep' ? 'active' : ''}`}
                onClick={() => setActivePage('prep')}
                type="button"
              >
                View Candidate-Preparation
              </button>
            </div>
          ) : null}

          <button
            className={`consultancy-nav-item ${activePage === 'mock' ? 'active' : ''}`}
            onClick={() => setActivePage('mock')}
            type="button"
          >
            Mock Interview Sessions
          </button>
          <button
            className={`consultancy-nav-item ${activePage === 'payments' ? 'active' : ''}`}
            onClick={() => setActivePage('payments')}
            type="button"
          >
            Payment Management
          </button>

          <button
            className={`consultancy-nav-item ${activePage === 'jobs' || activePage === 'employees' ? 'active' : ''}`}
            onClick={() => setEmployeeGroupOpen((p) => !p)}
            type="button"
            aria-expanded={employeeGroupOpen}
          >
            Employee Management <span className={`consultancy-nav-caret ${employeeGroupOpen ? 'open' : ''}`}>▾</span>
          </button>
          {employeeGroupOpen ? (
            <div className="consultancy-nav-sub">
              <button
                className={`consultancy-nav-item consultancy-nav-sublink ${activePage === 'jobs' ? 'active' : ''}`}
                onClick={() => setActivePage('jobs')}
                type="button"
              >
                Job
              </button>
              <button
                className={`consultancy-nav-item consultancy-nav-sublink ${activePage === 'employees' ? 'active' : ''}`}
                onClick={() => setActivePage('employees')}
                type="button"
              >
                Employee
              </button>
            </div>
          ) : null}
        </nav>
      </aside>

      <main className="consultancy-main">
        {activePage === 'dashboard' && <ConsultancyDashboardHome stats={dashboardStats} />}

        {activePage === 'candidates' && <ConsultancyCandidateManagement candidates={candidates} onNavigate={setActivePage} />}

        {activePage === 'prep' && (
          <ConsultancyCandidatePrep
            candidates={candidates}
            employees={employees}
            jobs={jobs}
            onUpdateCandidate={handleUpdateCandidate}
          />
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

        {activePage === 'employees' && (
          <ConsultancyEmployeeManagement
            employees={employees}
            onAddEmployee={handleAddEmployee}
            onAction={handleEmployeeAction}
            currentPage={activePage}
            onNavigate={setActivePage}
          />
        )}
      </main>
    </div>
  );
};

export default ConsultancyDashboard;
