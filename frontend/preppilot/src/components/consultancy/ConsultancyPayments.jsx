import React, { useMemo } from 'react';

const ConsultancyPayments = ({ payments, onMarkPayment }) => {
  const totals = useMemo(() => {
    const paid = payments.filter((p) => p.status === 'Paid').reduce((sum, p) => sum + p.amount, 0);
    const pending = payments.filter((p) => p.status !== 'Paid').reduce((sum, p) => sum + p.amount, 0);
    const feeRate = 0.12;
    const serviceFees = Math.round(paid * feeRate);
    return { paid, pending, serviceFees };
  }, [payments]);

  return (
    <div className="dashboard-container">
      <div className="page-section-head">
        <h2>Payment Management</h2>
        <p className="muted">Track candidate payments and consultancy services fees.</p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h3>Candidate payments (Paid)</h3>
          <p className="stat-number">₹{totals.paid.toLocaleString()}</p>
          <p>Collected to date</p>
        </div>
        <div className="dashboard-card">
          <h3>Candidate payments (Pending)</h3>
          <p className="stat-number">₹{totals.pending.toLocaleString()}</p>
          <p>Upcoming dues</p>
        </div>
        <div className="dashboard-card">
          <h3>Consultancy services fees</h3>
          <p className="stat-number">₹{totals.serviceFees.toLocaleString()}</p>
          <p>Estimated platform fee</p>
        </div>
      </div>

      <div className="ui-card">
        <div className="ui-card-head">
          <h3>Candidate payments</h3>
          <span className="muted">{payments.length} records</span>
        </div>

        <div className="ui-table-wrap">
          <table className="ui-table">
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Amount</th>
                <th>Due date</th>
                <th>Status</th>
                <th className="ui-th-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td className="ui-td-strong">{p.candidateName}</td>
                  <td>₹{p.amount.toLocaleString()}</td>
                  <td>{p.dueDate}</td>
                  <td>
                    <span className={`pill ${p.status === 'Paid' ? 'pill-success' : 'pill-warn'}`}>{p.status}</span>
                  </td>
                  <td className="ui-td-actions">
                    {p.status === 'Paid' ? (
                      <button type="button" className="btn btn-ghost btn-small" onClick={() => onMarkPayment(p.id, 'Pending')}>
                        Mark pending
                      </button>
                    ) : (
                      <button type="button" className="btn btn-primary btn-small" onClick={() => onMarkPayment(p.id, 'Paid')}>
                        Mark paid
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {payments.length === 0 ? (
                <tr>
                  <td colSpan={5} className="ui-empty">
                    No payments yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ConsultancyPayments;

