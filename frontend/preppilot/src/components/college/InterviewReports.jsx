import React, { useMemo, useState } from 'react';
import { DocumentTextIcon, FunnelIcon } from '@heroicons/react/24/outline';
import AdminPageHeader from '../admin/AdminPageHeader';
import bannerArt from '../../assets/admin-banner.svg';

const OutcomePill = ({ outcome }) => {
  const normalized = (outcome || '').toLowerCase();
  const className =
    normalized === 'selected'
      ? 'pill pill-green'
      : normalized === 'rejected'
        ? 'pill pill-red'
        : normalized === 'pending'
          ? 'pill pill-amber'
          : 'pill';
  return <span className={className}>{outcome}</span>;
};

const InterviewReports = ({ students, interviewReports }) => {
  const [companyFilter, setCompanyFilter] = useState('all');
  const [outcomeFilter, setOutcomeFilter] = useState('all');

  const companies = useMemo(() => {
    const all = (interviewReports || []).map((r) => r.company).filter(Boolean);
    return Array.from(new Set(all)).sort();
  }, [interviewReports]);

  const rows = useMemo(() => {
    const byId = new Map((students || []).map((s) => [s.id, s]));
    return (interviewReports || [])
      .map((r) => ({
        ...r,
        studentName: byId.get(r.studentId)?.name || 'Unknown',
        course: byId.get(r.studentId)?.course || '-',
      }))
      .filter((r) => (companyFilter === 'all' ? true : r.company === companyFilter))
      .filter((r) => (outcomeFilter === 'all' ? true : r.outcome === outcomeFilter));
  }, [students, interviewReports, companyFilter, outcomeFilter]);

  const pendingCount = useMemo(() => rows.filter((r) => r.outcome === 'Pending').length, [rows]);

  return (
    <div className="dashboard-container">
      <AdminPageHeader
        title="Interview Reports"
        subtitle="Monitor interview rounds, outcomes and pending results."
        imageSrc={bannerArt}
        right={
          <div className="admin-chip-row">
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <DocumentTextIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Showing</span>
              <span className="admin-chip-value">{rows.length}</span>
            </div>
            <div className="admin-chip">
              <span className="admin-chip-icon">
                <FunnelIcon className="admin-icon" />
              </span>
              <span className="admin-chip-label">Pending</span>
              <span className="admin-chip-value">{pendingCount}</span>
            </div>
          </div>
        }
      />

      <div className="admin-toolbar">
        <select className="admin-select" value={companyFilter} onChange={(e) => setCompanyFilter(e.target.value)}>
          <option value="all">All Companies</option>
          {companies.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select className="admin-select" value={outcomeFilter} onChange={(e) => setOutcomeFilter(e.target.value)}>
          <option value="all">All Outcomes</option>
          <option value="Selected">Selected</option>
          <option value="Rejected">Rejected</option>
          <option value="Pending">Pending</option>
        </select>
      </div>

      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Student</th>
              <th>Course</th>
              <th>Company</th>
              <th>Round</th>
              <th>Date</th>
              <th>Outcome</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id}>
                <td className="admin-td-strong">{r.studentName}</td>
                <td>{r.course}</td>
                <td>{r.company}</td>
                <td>{r.round}</td>
                <td>{r.date}</td>
                <td>
                  <OutcomePill outcome={r.outcome} />
                </td>
              </tr>
            ))}

            {rows.length === 0 ? (
              <tr>
                <td colSpan={6} className="admin-empty">
                  No interview reports found.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InterviewReports;

