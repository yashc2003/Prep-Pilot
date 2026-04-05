import React, { useMemo, useState } from 'react';
import CollegeDashboardHome from '../college/CollegeDashboardHome';
import StudentManagement from '../college/StudentManagement';
import PlacementDrives from '../college/PlacementDrives';
import CompanyOpportunities from '../college/CompanyOpportunities';
import NotifyStudents from '../college/NotifyStudents';
import InterviewReports from '../college/InterviewReports';
import AiInterviewPerformance from '../college/AiInterviewPerformance';

const CollegeDashboard = () => {
  const [activePage, setActivePage] = useState('dashboard');

  const [students, setStudents] = useState([
    { id: 's1', name: 'Aarav Mehta', course: 'B.Tech CSE', skills: ['React', 'Node.js'], status: 'Placed', company: 'TechCorp', aiScore: 8.2 },
    { id: 's2', name: 'Neha Sharma', course: 'B.Tech IT', skills: ['Java', 'Spring'], status: 'In Process', company: '', aiScore: 7.5 },
    { id: 's3', name: 'Vikram Rao', course: 'BCA', skills: ['Python', 'Django'], status: 'Not Placed', company: '', aiScore: 6.8 },
    { id: 's4', name: 'Isha Singh', course: 'B.Tech ECE', skills: ['C++', 'Embedded'], status: 'In Process', company: '', aiScore: 7.0 },
    { id: 's5', name: 'Rohan Gupta', course: 'B.Tech CSE', skills: ['DSA', 'SQL'], status: 'Placed', company: 'WebSolutions', aiScore: 8.6 },
    { id: 's6', name: 'Priya Nair', course: 'MBA', skills: ['Communication', 'Analytics'], status: 'In Process', company: '', aiScore: 7.9 },
    { id: 's7', name: 'Sana Khan', course: 'B.Tech CSE', skills: ['ML', 'Python'], status: 'Not Placed', company: '', aiScore: 7.2 },
    { id: 's8', name: 'Arjun Patel', course: 'B.Tech IT', skills: ['React', 'TypeScript'], status: 'Placed', company: 'StartupXYZ', aiScore: 8.0 },
  ]);

  const [drives, setDrives] = useState([
    { id: 'd1', company: 'TechCorp', role: 'SDE Intern', date: 'Mar 05, 2026', status: 'Completed', registered: 62, selected: 8 },
    { id: 'd2', company: 'StartupXYZ', role: 'Full Stack Intern', date: 'Mar 18, 2026', status: 'Ongoing', registered: 41, selected: 3 },
    { id: 'd3', company: 'WebSolutions', role: 'React Developer', date: 'Mar 28, 2026', status: 'Scheduled', registered: 55, selected: 0 },
  ]);

  const [opportunities, setOpportunities] = useState([
    { id: 'o1', company: 'DataHub', role: 'Backend Trainee', ctc: '6.5 LPA', deadline: 'Mar 30, 2026', skills: ['Node.js', 'SQL'] },
    { id: 'o2', company: 'FinEdge', role: 'Business Analyst', ctc: '7.2 LPA', deadline: 'Apr 03, 2026', skills: ['Excel', 'Communication'] },
  ]);

  const [notifications, setNotifications] = useState([
    { id: 'n1', audience: 'All Students', message: 'Mock interview slots are open for next week.', date: 'Mar 16, 2026' },
    { id: 'n2', audience: 'B.Tech CSE', message: 'TechCorp drive registration closes tomorrow.', date: 'Mar 17, 2026' },
  ]);

  const [interviewReports] = useState([
    { id: 'r1', studentId: 's1', company: 'TechCorp', round: 'Technical', date: 'Mar 06, 2026', outcome: 'Selected' },
    { id: 'r2', studentId: 's2', company: 'StartupXYZ', round: 'HR', date: 'Mar 19, 2026', outcome: 'Pending' },
    { id: 'r3', studentId: 's5', company: 'WebSolutions', round: 'Technical', date: 'Mar 10, 2026', outcome: 'Selected' },
    { id: 'r4', studentId: 's3', company: 'TechCorp', round: 'Aptitude', date: 'Mar 05, 2026', outcome: 'Rejected' },
  ]);

  const companiesVisiting = useMemo(() => {
    const unique = new Set(drives.map((d) => d.company));
    return unique.size;
  }, [drives]);

  const placementStats = useMemo(() => {
    const total = students.length;
    const placed = students.filter((s) => s.status === 'Placed').length;
    const inProcess = students.filter((s) => s.status === 'In Process').length;
    const notPlaced = students.filter((s) => s.status === 'Not Placed').length;
    const placedPct = total === 0 ? 0 : Math.round((placed / total) * 100);
    return { total, placed, inProcess, notPlaced, placedPct };
  }, [students]);

  const handleStudentAction = (studentId, action) => {
    if (action === 'remove') {
      setStudents((prev) => prev.filter((s) => s.id !== studentId));
      return;
    }

    if (action === 'togglePlaced') {
      setStudents((prev) =>
        prev.map((s) => {
          if (s.id !== studentId) return s;
          if (s.status === 'Placed') return { ...s, status: 'In Process', company: '' };
          return { ...s, status: 'Placed', company: s.company || 'TBD' };
        })
      );
      return;
    }

    if (action === 'markNotPlaced') {
      setStudents((prev) => prev.map((s) => (s.id === studentId ? { ...s, status: 'Not Placed', company: '' } : s)));
    }
  };

  const handleAddDrive = (drive) => {
    setDrives((prev) => [{ ...drive, id: `d${prev.length + 1}` }, ...prev]);
  };

  const handleAddOpportunity = (opportunity) => {
    setOpportunities((prev) => [{ ...opportunity, id: `o${prev.length + 1}` }, ...prev]);
  };

  const handleSendNotification = ({ audience, message, date }) => {
    setNotifications((prev) => [{ id: `n${prev.length + 1}`, audience, message, date }, ...prev]);
  };

  return (
    <div className="college-shell">
      <aside className="college-sidebar">
        <div className="college-sidebar-header">
          <div className="college-title">College Pages</div>
          <div className="college-subtitle">Placement cell dashboard</div>
        </div>

        <nav className="college-nav">
          <button
            className={`college-nav-item ${activePage === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActivePage('dashboard')}
            type="button"
          >
            Dashboard
          </button>
          <button
            className={`college-nav-item ${activePage === 'students' ? 'active' : ''}`}
            onClick={() => setActivePage('students')}
            type="button"
          >
            Student Management
          </button>
          <button
            className={`college-nav-item ${activePage === 'drives' ? 'active' : ''}`}
            onClick={() => setActivePage('drives')}
            type="button"
          >
            Placement Drives
          </button>
          <button
            className={`college-nav-item ${activePage === 'opportunities' ? 'active' : ''}`}
            onClick={() => setActivePage('opportunities')}
            type="button"
          >
            Company Opportunities
          </button>
          <button
            className={`college-nav-item ${activePage === 'notify' ? 'active' : ''}`}
            onClick={() => setActivePage('notify')}
            type="button"
          >
            Notify Students
          </button>
          <button
            className={`college-nav-item ${activePage === 'reports' ? 'active' : ''}`}
            onClick={() => setActivePage('reports')}
            type="button"
          >
            Interview Reports
          </button>
          <button
            className={`college-nav-item ${activePage === 'ai' ? 'active' : ''}`}
            onClick={() => setActivePage('ai')}
            type="button"
          >
            AI Interview Performance
          </button>
        </nav>
      </aside>

      <main className="college-main">
        {activePage === 'dashboard' && (
          <CollegeDashboardHome
            students={students}
            drives={drives}
            opportunities={opportunities}
            placementStats={placementStats}
            companiesVisiting={companiesVisiting}
          />
        )}

        {activePage === 'students' && (
          <StudentManagement students={students} onAction={handleStudentAction} />
        )}

        {activePage === 'drives' && (
          <PlacementDrives drives={drives} onAddDrive={handleAddDrive} />
        )}

        {activePage === 'opportunities' && (
          <CompanyOpportunities opportunities={opportunities} onAddOpportunity={handleAddOpportunity} />
        )}

        {activePage === 'notify' && (
          <NotifyStudents notifications={notifications} onSend={handleSendNotification} />
        )}

        {activePage === 'reports' && (
          <InterviewReports
            students={students}
            drives={drives}
            interviewReports={interviewReports}
          />
        )}

        {activePage === 'ai' && (
          <AiInterviewPerformance students={students} />
        )}
      </main>
    </div>
  );
};

export default CollegeDashboard;
