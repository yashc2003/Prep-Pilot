import React, { useMemo, useRef, useState } from 'react';

const StatusPill = ({ status }) => {
  const normalized = (status || '').toLowerCase();
  const className =
    normalized === 'placed'
      ? 'pill pill-green'
      : normalized === 'not placed'
        ? 'pill pill-red'
        : normalized === 'in process'
          ? 'pill pill-amber'
          : 'pill';

  return <span className={className}>{status}</span>;
};

const normalizeList = (list) => (Array.isArray(list) ? list : []);

const splitSkills = (value) =>
  String(value || '')
    .split(/[,;|]/)
    .map((s) => s.trim())
    .filter(Boolean);

const parseCsvRows = (text) => {
  const rows = [];
  let row = [];
  let field = '';
  let inQuotes = false;
  let i = 0;

  const flushField = () => {
    row.push(field);
    field = '';
  };

  const flushRow = () => {
    const hasAny = row.some((cell) => String(cell || '').trim() !== '');
    if (hasAny) rows.push(row);
    row = [];
  };

  while (i < text.length) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i += 2;
          continue;
        }
        inQuotes = false;
        i += 1;
        continue;
      }
      field += ch;
      i += 1;
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
      i += 1;
      continue;
    }

    if (ch === ',') {
      flushField();
      i += 1;
      continue;
    }

    if (ch === '\n') {
      flushField();
      flushRow();
      i += 1;
      continue;
    }

    if (ch === '\r') {
      i += 1;
      continue;
    }

    field += ch;
    i += 1;
  }

  flushField();
  flushRow();

  return rows;
};

const downloadTextFile = (filename, text) => {
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};

const ListManager = ({ title, subtitle, items, onAdd, onRemove, placeholder }) => {
  const [value, setValue] = useState('');

  const submit = (e) => {
    e.preventDefault();
    const next = value.trim();
    if (!next) return;
    const exists = (items || []).some((i) => String(i).toLowerCase() === next.toLowerCase());
    if (exists) {
      setValue('');
      return;
    }
    onAdd(next);
    setValue('');
  };

  return (
    <div className="admin-panel">
      <div className="admin-section-head">
        <div>
          <div className="admin-title">{title}</div>
          <div className="admin-muted">{subtitle}</div>
        </div>
        <span className="pill">Total: {items.length}</span>
      </div>

      <form className="admin-form" onSubmit={submit}>
        <input className="admin-input" value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder} />
        <button className="btn btn-small" type="submit">
          Add
        </button>
      </form>

      <div className="admin-skill-row" style={{ marginTop: 12 }}>
        {items.map((item) => (
          <button key={item} type="button" className="pill" title="Remove" onClick={() => onRemove(item)}>
            {item}
          </button>
        ))}
        {items.length === 0 ? <div className="admin-muted">No entries yet.</div> : null}
      </div>
      <div className="admin-muted" style={{ marginTop: 10 }}>
        Tip: click a pill to remove it.
      </div>
    </div>
  );
};

const StudentManagement = ({
  students,
  onAction,
  onAddStudent,
  batches,
  onAddBatch,
  onRemoveBatch,
  courses,
  onAddCourse,
  onRemoveCourse,
  years,
  onAddYear,
  onRemoveYear,
  semesters,
  onAddSemester,
  onRemoveSemester,
}) => {
  const [query, setQuery] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('students');
  const [importReport, setImportReport] = useState(null);
  const fileInputRef = useRef(null);

  const [newStudent, setNewStudent] = useState({
    name: '',
    course: '',
    skills: '',
    batch: '',
    year: '',
    semester: '',
    status: 'In Process',
    company: '',
  });

  const safeBatches = normalizeList(batches);
  const safeCourses = normalizeList(courses);
  const safeYears = normalizeList(years);
  const safeSemesters = normalizeList(semesters);

  const courseOptions = useMemo(() => {
    const all = (students || []).map((s) => s.course).filter(Boolean);
    return Array.from(new Set(all)).sort();
  }, [students]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (students || []).filter((s) => {
      const matchesQuery =
        !q ||
        s.name.toLowerCase().includes(q) ||
        s.course.toLowerCase().includes(q) ||
        (s.skills || []).some((skill) => skill.toLowerCase().includes(q));
      const matchesCourse = courseFilter === 'all' ? true : s.course === courseFilter;
      const matchesStatus = statusFilter === 'all' ? true : s.status === statusFilter;
      return matchesQuery && matchesCourse && matchesStatus;
    });
  }, [students, query, courseFilter, statusFilter]);

  const canAddStudent = useMemo(() => newStudent.name.trim() && newStudent.course.trim(), [newStudent.name, newStudent.course]);

  const downloadTemplate = () => {
    const template = [
      ['name', 'course', 'skills', 'status', 'company', 'batch', 'year', 'semester'].join(','),
      ['Aarav Mehta', 'B.Tech CSE', 'React;Node.js', 'In Process', '', '2025-26', '3', '5'].join(','),
    ].join('\n');
    downloadTextFile('student-template.csv', template);
  };

  const importFromFile = async (file) => {
    setImportReport(null);
    if (!file) return;

    const ext = (file.name.split('.').pop() || '').toLowerCase();
    if (ext !== 'csv') {
      setImportReport({
        filename: file.name,
        added: 0,
        skipped: 0,
        errors: ['Only CSV import is supported right now. Please upload a .csv file (you can export CSV from Excel).'],
      });
      return;
    }

    const text = await file.text();
    const rows = parseCsvRows(text);
    if (rows.length === 0) {
      setImportReport({ filename: file.name, added: 0, skipped: 0, errors: ['File is empty.'] });
      return;
    }

    const headers = rows[0].map((h) => String(h || '').trim().toLowerCase());
    const data = rows.slice(1);
    const errors = [];
    let added = 0;
    let skipped = 0;

    data.forEach((cells, index) => {
      const rowObj = {};
      headers.forEach((key, keyIndex) => {
        if (!key) return;
        rowObj[key] = String(cells[keyIndex] || '').trim();
      });

      const name = rowObj.name || rowObj.student || rowObj['student name'] || '';
      const course = rowObj.course || '';
      if (!name || !course) {
        skipped += 1;
        errors.push(`Row ${index + 2}: missing required "name" or "course".`);
        return;
      }

      const status = rowObj.status || 'In Process';
      const normalizedStatus = ['Placed', 'In Process', 'Not Placed'].includes(status) ? status : 'In Process';
      const company = normalizedStatus === 'Placed' ? rowObj.company || 'TBD' : '';

      if (onAddStudent) {
        onAddStudent({
          name,
          course,
          skills: splitSkills(rowObj.skills),
          status: normalizedStatus,
          company,
          batch: rowObj.batch || '',
          year: rowObj.year || '',
          semester: rowObj.semester || '',
          aiScore: 0,
        });
      }
      added += 1;
    });

    setImportReport({
      filename: file.name,
      added,
      skipped,
      errors: errors.slice(0, 6),
      moreErrors: Math.max(0, errors.length - 6),
    });
  };

  const onImportChange = async (e) => {
    const file = e.target.files?.[0];
    await importFromFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const submitStudent = (e) => {
    e.preventDefault();
    if (!onAddStudent) return;

    const skills = newStudent.skills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    onAddStudent({
      name: newStudent.name.trim(),
      course: newStudent.course.trim(),
      skills,
      status: newStudent.status,
      company: newStudent.status === 'Placed' ? newStudent.company.trim() || 'TBD' : '',
      batch: newStudent.batch || '',
      year: newStudent.year || '',
      semester: newStudent.semester || '',
      aiScore: 0,
    });

    setNewStudent({
      name: '',
      course: '',
      skills: '',
      batch: '',
      year: '',
      semester: '',
      status: 'In Process',
      company: '',
    });
    setActiveTab('students');
  };

  return (
    <div className="dashboard-container">
      <div className="student-mgmt-page-head">
        <div>
          <div className="student-mgmt-kicker">College Dashboard</div>
          <div className="student-mgmt-title">Student Management</div>
        </div>
        <div className="student-mgmt-stats">
          <span className="pill">Showing: {filtered.length}</span>
          <span className="pill">Query: {query ? 'On' : 'Off'}</span>
        </div>
      </div>

      <div className="student-mgmt-tabs">
        <button type="button" className={`student-mgmt-tab ${activeTab === 'courses' ? 'active' : ''}`} onClick={() => setActiveTab('courses')}>
          Course
        </button>
        <button type="button" className={`student-mgmt-tab ${activeTab === 'batches' ? 'active' : ''}`} onClick={() => setActiveTab('batches')}>
          Add Batch
        </button>
        <button type="button" className={`student-mgmt-tab ${activeTab === 'years' ? 'active' : ''}`} onClick={() => setActiveTab('years')}>
          Year
        </button>
        <button type="button" className={`student-mgmt-tab ${activeTab === 'semesters' ? 'active' : ''}`} onClick={() => setActiveTab('semesters')}>
          Sem
        </button>
        <button type="button" className={`student-mgmt-tab ${activeTab === 'students' ? 'active' : ''}`} onClick={() => setActiveTab('students')}>
          Student
        </button>
        <button
          type="button"
          className={`student-mgmt-tab student-mgmt-tab-primary ${activeTab === 'addStudent' ? 'active' : ''}`}
          onClick={() => setActiveTab('addStudent')}
        >
          Add Student
        </button>
      </div>

      {activeTab === 'addStudent' ? (
        <div className="admin-panel">
          <div className="admin-section-head">
            <div>
              <div className="admin-title">Add Student</div>
              <div className="admin-muted">Adds a student to the table (UI only).</div>
            </div>
            <span className="pill">{canAddStudent ? 'Ready' : 'Fill required fields'}</span>
          </div>

          <form className="admin-form" onSubmit={submitStudent}>
            <input
              className="admin-input"
              placeholder="Student name *"
              value={newStudent.name}
              onChange={(e) => setNewStudent((p) => ({ ...p, name: e.target.value }))}
            />
            <select className="admin-select" value={newStudent.course} onChange={(e) => setNewStudent((p) => ({ ...p, course: e.target.value }))}>
              <option value="">Select course *</option>
              {safeCourses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <input
              className="admin-input"
              placeholder="Skills (comma separated)"
              value={newStudent.skills}
              onChange={(e) => setNewStudent((p) => ({ ...p, skills: e.target.value }))}
            />
            <select className="admin-select" value={newStudent.batch} onChange={(e) => setNewStudent((p) => ({ ...p, batch: e.target.value }))}>
              <option value="">Batch (optional)</option>
              {safeBatches.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <select className="admin-select" value={newStudent.year} onChange={(e) => setNewStudent((p) => ({ ...p, year: e.target.value }))}>
              <option value="">Year (optional)</option>
              {safeYears.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
            <select
              className="admin-select"
              value={newStudent.semester}
              onChange={(e) => setNewStudent((p) => ({ ...p, semester: e.target.value }))}
            >
              <option value="">Semester (optional)</option>
              {safeSemesters.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <select className="admin-select" value={newStudent.status} onChange={(e) => setNewStudent((p) => ({ ...p, status: e.target.value }))}>
              <option value="In Process">In Process</option>
              <option value="Placed">Placed</option>
              <option value="Not Placed">Not Placed</option>
            </select>
            {newStudent.status === 'Placed' ? (
              <input
                className="admin-input"
                placeholder="Company (optional)"
                value={newStudent.company}
                onChange={(e) => setNewStudent((p) => ({ ...p, company: e.target.value }))}
              />
            ) : null}
            <button className="btn btn-small" type="submit" disabled={!canAddStudent}>
              Add Student
            </button>
          </form>
          <div className="admin-muted" style={{ marginTop: 10 }}>
            Required: student name + course.
          </div>
        </div>
      ) : null}

      {activeTab === 'batches' ? (
        <ListManager
          title="Batches"
          subtitle="Add or remove passing batches (e.g., 2025-26)."
          items={safeBatches}
          onAdd={onAddBatch || (() => {})}
          onRemove={onRemoveBatch || (() => {})}
          placeholder="Enter batch (e.g., 2025-26)"
        />
      ) : null}

      {activeTab === 'courses' ? (
        <ListManager
          title="Courses"
          subtitle="Maintain course list used while adding students."
          items={safeCourses}
          onAdd={onAddCourse || (() => {})}
          onRemove={onRemoveCourse || (() => {})}
          placeholder="Enter course (e.g., B.Tech CSE)"
        />
      ) : null}

      {activeTab === 'years' ? (
        <ListManager
          title="Years"
          subtitle="Add/remove year options."
          items={safeYears}
          onAdd={onAddYear || (() => {})}
          onRemove={onRemoveYear || (() => {})}
          placeholder="Enter year (e.g., 1, 2, 3, 4)"
        />
      ) : null}

      {activeTab === 'semesters' ? (
        <ListManager
          title="Semesters"
          subtitle="Add/remove semester options."
          items={safeSemesters}
          onAdd={onAddSemester || (() => {})}
          onRemove={onRemoveSemester || (() => {})}
          placeholder="Enter semester (e.g., 1, 2, 3...)"
        />
      ) : null}

      {activeTab === 'students' ? (
        <>
          <div className="student-mgmt-filters">
            <input
              className="admin-input"
              placeholder="Search by name"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <select className="admin-select" value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
              <option value="all">Course</option>
              {courseOptions.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <select className="admin-select" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="all">All Status</option>
              <option value="Placed">Placed</option>
              <option value="In Process">In Process</option>
              <option value="Not Placed">Not Placed</option>
            </select>
          </div>

          <div className="student-mgmt-table-wrap">
            <div className="student-mgmt-table-head">
              <div>
                <div className="student-mgmt-table-title">List of Student</div>
                <div className="admin-muted">Student name, course, skills, placement status, and action.</div>
              </div>
              <span className="pill">Total: {filtered.length}</span>
            </div>
            <div className="student-mgmt-table-scroll">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Student Name</th>
                    <th>Course</th>
                    <th>Skills</th>
                    <th>Placement Status</th>
                    <th className="admin-th-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s) => (
                    <tr key={s.id}>
                      <td className="admin-td-strong">{s.name}</td>
                      <td>{s.course}</td>
                      <td>
                        <div className="admin-skill-row">
                          {(s.skills || []).map((skill) => (
                            <span key={skill} className="pill">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <div className="admin-stack">
                          <StatusPill status={s.status} />
                          {s.status === 'Placed' && s.company ? <span className="admin-muted">Company: {s.company}</span> : null}
                        </div>
                      </td>
                      <td className="admin-td-actions">
                        <button className="btn btn-small" type="button" onClick={() => onAction(s.id, 'togglePlaced')}>
                          {s.status === 'Placed' ? 'Unmark Placed' : 'Mark Placed'}
                        </button>
                        <button className="btn btn-small btn-warn" type="button" onClick={() => onAction(s.id, 'markNotPlaced')}>
                          Mark Not Placed
                        </button>
                        <button className="btn btn-small btn-danger" type="button" onClick={() => onAction(s.id, 'remove')}>
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="admin-empty">
                        No students found.
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>

          <div className="admin-panel student-mgmt-upload">
            <div className="admin-section-head">
              <div>
                <div className="admin-title">Default Template student Excel File upload</div>
                <div className="admin-muted">Download template and upload student list as CSV (export CSV from Excel).</div>
              </div>
              <div className="student-mgmt-upload-actions">
                <button className="btn btn-small btn-ghost" type="button" onClick={downloadTemplate}>
                  Download Template
                </button>
                <button className="btn btn-small" type="button" onClick={() => fileInputRef.current?.click()}>
                  Upload File
                </button>
              </div>
            </div>
            <input
              ref={fileInputRef}
              className="student-mgmt-file"
              type="file"
              accept=".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              onChange={onImportChange}
            />

            {importReport ? (
              <div className="student-mgmt-import-feedback">
                <div className="admin-muted">
                  File: {importReport.filename} · Added: {importReport.added} · Skipped: {importReport.skipped}
                </div>
                {importReport.errors?.length ? (
                  <div className="student-mgmt-import-errors">
                    {importReport.errors.map((msg) => (
                      <div key={msg}>{msg}</div>
                    ))}
                    {importReport.moreErrors ? <div>+ {importReport.moreErrors} more…</div> : null}
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default StudentManagement;
