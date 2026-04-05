import React, { useMemo, useState } from 'react';
import CandidateDashboardHome from '../candidate/CandidateDashboardHome';
import CandidateProfile from '../candidate/CandidateProfile';
import CandidateJobSearch from '../candidate/CandidateJobSearch';
import CandidateMockInterviews from '../candidate/CandidateMockInterviews';
import CandidateInterviewResults from '../candidate/CandidateInterviewResults';
import CandidateSchedule from '../candidate/CandidateSchedule';

const CandidateDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const [profile, setProfile] = useState({
    name: 'Candidate User',
    education: 'B.Tech (Computer Science)',
    skills: ['React', 'JavaScript', 'Node.js'],
    resumeName: '',
  });

  const [jobs] = useState([
    { id: 'j1', title: 'Frontend Developer', company: 'TechCorp', location: 'Bengaluru', experience: '0-2', skills: ['React', 'JS'] },
    { id: 'j2', title: 'Full Stack Engineer', company: 'StartupXYZ', location: 'Hyderabad', experience: '2-4', skills: ['React', 'Node.js'] },
    { id: 'j3', title: 'React Developer', company: 'WebSolutions', location: 'Remote', experience: '1-3', skills: ['React'] },
    { id: 'j4', title: 'Backend Engineer', company: 'DataHub', location: 'Pune', experience: '2-5', skills: ['Node.js'] },
  ]);

  const [interviewProcesses, setInterviewProcesses] = useState([
    {
      id: 'p1',
      jobId: 'j1',
      company: 'TechCorp',
      role: 'Frontend Developer',
      rounds: [
        {
          id: 'r1',
          name: 'Round 1 (Technical)',
          date: '2026-04-06',
          slotOptions: ['10:00', '11:30', '15:00'],
          selectedSlot: '',
          status: 'Pending Slot',
        },
        {
          id: 'r2',
          name: 'Round 2 (HR)',
          date: '2026-04-08',
          slotOptions: ['10:30', '13:00', '16:00'],
          selectedSlot: '',
          status: 'Pending Slot',
        },
      ],
    },
  ]);

  const [previousInterviews, setPreviousInterviews] = useState([
    { id: 'i1', date: 'Mar 10, 2026', role: 'Frontend Developer', score: 7.4 },
    { id: 'i2', date: 'Mar 14, 2026', role: 'Full Stack Engineer', score: 7.9 },
  ]);

  const [selectedInterviewId, setSelectedInterviewId] = useState('i2');

  const interviewResults = useMemo(
    () => ({
      i1: {
        communication: 7.1,
        technical: 7.6,
        confidence: 'Moderate',
        suggestions: ['Speak a bit slower for clarity', 'Use STAR method for behavioral answers', 'Revise React hooks edge cases'],
      },
      i2: {
        communication: 7.8,
        technical: 8.1,
        confidence: 'High',
        suggestions: ['Add more real project examples', 'Mention tradeoffs when choosing tools', 'Practice system design basics'],
      },
    }),
    []
  );

  const performanceScore = useMemo(() => {
    const selected = interviewResults[selectedInterviewId];
    if (!selected) return 0;
    return Math.round(((selected.communication + selected.technical) / 2) * 10) / 10;
  }, [interviewResults, selectedInterviewId]);

  const preparationProgress = useMemo(() => {
    const base = 55;
    const skillBonus = Math.min(profile.skills.length * 8, 30);
    const resumeBonus = profile.resumeName ? 12 : 0;
    return Math.min(base + skillBonus + resumeBonus, 100);
  }, [profile.skills.length, profile.resumeName]);

  const recommendedJobs = useMemo(() => {
    const skills = new Set(profile.skills.map((s) => s.toLowerCase()));
    return jobs
      .map((j) => {
        const matchCount = j.skills.filter((s) => skills.has(s.toLowerCase())).length;
        return { ...j, matchCount };
      })
      .sort((a, b) => b.matchCount - a.matchCount)
      .slice(0, 3);
  }, [jobs, profile.skills]);

  const handleStartAiInterview = () => {
    alert('AI Interview start will be connected to backend/API.');
    const now = new Date();
    const label = now.toLocaleDateString(undefined, { month: 'short', day: '2-digit', year: 'numeric' });
    setPreviousInterviews((prev) => [
      { id: `i${prev.length + 1}`, date: label, role: 'AI Mock Interview', score: 8.0 },
      ...prev,
    ]);
    setActivePage('results');
  };

  const handleSelectRoundSlot = (processId, roundId, slot) => {
    setInterviewProcesses((prev) =>
      prev.map((p) => {
        if (p.id !== processId) return p;
        return {
          ...p,
          rounds: p.rounds.map((r) => (r.id === roundId ? { ...r, selectedSlot: slot, status: r.status === 'Scheduled' ? 'Scheduled' : 'Slot Selected' } : r)),
        };
      })
    );
  };

  const handleConfirmRoundSlot = (processId, roundId) => {
    setInterviewProcesses((prev) =>
      prev.map((p) => {
        if (p.id !== processId) return p;
        const round = p.rounds.find((r) => r.id === roundId);
        if (!round) return p;
        if (!round.selectedSlot) {
          alert('Please select a slot first.');
          return p;
        }
        return {
          ...p,
          rounds: p.rounds.map((r) => (r.id === roundId ? { ...r, status: 'Scheduled' } : r)),
        };
      })
    );
  };

  const handleAddSchedule = (newSchedule) => {
    setInterviewProcesses((prev) => [
      {
        id: `p${prev.length + 1}`,
        jobId: newSchedule.jobId || `custom-${prev.length + 1}`,
        company: newSchedule.company,
        role: newSchedule.role,
        rounds: [
          {
            id: 'r1',
            name: newSchedule.roundName,
            date: newSchedule.date,
            slotOptions: newSchedule.slotOptions,
            selectedSlot: '',
            status: 'Pending Slot',
          },
        ],
      },
      ...prev,
    ]);
  };

  return (
    <div className="candidate-shell">
      <aside className="candidate-sidebar">
        <div className="candidate-sidebar-header">
          <div className="candidate-title">Candidate Pages</div>
          <div className="candidate-subtitle">Track progress</div>
        </div>

        <nav className="candidate-nav">
          <button
            className={`candidate-nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActivePage('dashboard')}
            type="button"
          >
            Dashboard
          </button>
          <button
            className={`candidate-nav-item ${activePage === 'profile' ? 'active' : ''}`}
            onClick={() => setActivePage('profile')}
            type="button"
          >
            Profile Page
          </button>
          <button
            className={`candidate-nav-item ${activePage === 'jobs' ? 'active' : ''}`}
            onClick={() => setActivePage('jobs')}
            type="button"
          >
            Job Search
          </button>
          <button
            className={`candidate-nav-item ${activePage === 'mock' ? 'active' : ''}`}
            onClick={() => setActivePage('mock')}
            type="button"
          >
            Mock Interviews
          </button>
          <button
            className={`candidate-nav-item ${activePage === 'results' ? 'active' : ''}`}
            onClick={() => setActivePage('results')}
            type="button"
          >
            Interview Results
          </button>
          <button
            className={`candidate-nav-item ${activePage === 'schedule' ? 'active' : ''}`}
            onClick={() => setActivePage('schedule')}
            type="button"
          >
            Schedule
          </button>
        </nav>
      </aside>

      <main className="candidate-main">
        {activePage === 'dashboard' && (
          <CandidateDashboardHome
            recommendedJobs={recommendedJobs}
            performanceScore={performanceScore}
            preparationProgress={preparationProgress}
          />
        )}

        {activePage === 'profile' && (
          <CandidateProfile profile={profile} onChange={setProfile} />
        )}

        {activePage === 'jobs' && (
          <CandidateJobSearch jobs={jobs} />
        )}

        {activePage === 'mock' && (
          <CandidateMockInterviews
            onStartAiInterview={handleStartAiInterview}
            previousInterviews={previousInterviews}
            selectedInterviewId={selectedInterviewId}
            onSelectInterview={setSelectedInterviewId}
          />
        )}

        {activePage === 'results' && (
          <CandidateInterviewResults
            previousInterviews={previousInterviews}
            selectedInterviewId={selectedInterviewId}
            onSelectInterview={setSelectedInterviewId}
            result={interviewResults[selectedInterviewId]}
          />
        )}

        {activePage === 'schedule' && (
          <CandidateSchedule
            jobs={jobs}
            processes={interviewProcesses}
            onSelectSlot={handleSelectRoundSlot}
            onConfirmSlot={handleConfirmRoundSlot}
            onAddSchedule={handleAddSchedule}
          />
        )}
      </main>
    </div>
  );
};

export default CandidateDashboard;
