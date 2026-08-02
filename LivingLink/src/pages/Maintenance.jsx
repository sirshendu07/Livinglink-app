import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Maintenance.css';

const Maintenance = () => {
  const [activeTab, setActiveTab] = useState('pending');
  const [bills, setBills] = useState([]);
  const navigate = useNavigate();

  // Load bills from LocalStorage (or set default if empty)
  useEffect(() => {
    const savedBills = localStorage.getItem('livinglink_bills');
    if (savedBills) {
      setBills(JSON.parse(savedBills));
    } else {
      const defaultBills = [
        { id: 1, month: 'AUG 2026', desc: 'Regular Maintenance (Includes AMC & Water)', amount: 4500, status: 'Unpaid', date: null },
        { id: 2, month: 'JUL 2026', desc: 'Regular Maintenance', amount: 4500, status: 'Paid', date: '10-Jul-2026' },
        { id: 3, month: 'JUN 2026', desc: 'Regular Maintenance', amount: 4500, status: 'Paid', date: '05-Jun-2026' }
      ];
      localStorage.setItem('livinglink_bills', JSON.stringify(defaultBills));
      setBills(defaultBills);
    }
  }, []);

  const pendingBills = bills.filter(b => b.status === 'Unpaid');
  const paidBills = bills.filter(b => b.status === 'Paid');
  const totalDue = pendingBills.reduce((sum, bill) => sum + bill.amount, 0);

  // Send the user to the dedicated payment page, passing the total amount and bill details
  const handlePayNow = () => {
    if (totalDue > 0) {
      navigate('/payment', { state: { amount: totalDue, pendingBills: pendingBills } });
    } else {
      alert("No pending dues to pay!");
    }
  };

  return (
    <div className="maintenance-container">
      
      <div className="page-header">
        <h1 className="page-title">Maintenance Bills</h1>
        <p className="page-subtitle">View your dues, pay securely, and download past receipts.</p>
      </div>

      {/* Massive Outstanding Card */}
      <div className="outstanding-card glowing-border pink-glow">
        <div className="card-content-left">
          <span className="due-label">TOTAL OUTSTANDING DUE</span>
          <h2 className="due-amount">₹{totalDue.toLocaleString()}</h2>
          <p className="due-date">Due by: <strong>15 Aug, 2026</strong> <i>(Late fees apply after due date)</i></p>
        </div>
        <button className="pay-entire-btn" onClick={handlePayNow} disabled={totalDue === 0}>
          💳 Pay Entire Due
        </button>
      </div>

      {/* Tabs */}
      <div className="maintenance-tabs">
        <button className={`tab-btn ${activeTab === 'pending' ? 'active' : ''}`} onClick={() => setActiveTab('pending')}>
          Pending Bills ({pendingBills.length})
        </button>
        <button className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`} onClick={() => setActiveTab('history')}>
          Payment History
        </button>
      </div>

      {/* Bills Table */}
      <div className="table-container glowing-border">
        <table className="maintenance-table">
          <thead>
            <tr>
              <th>BILL MONTH</th>
              <th>DESCRIPTION</th>
              <th>AMOUNT</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {(activeTab === 'pending' ? pendingBills : paidBills).map((bill) => (
              <tr key={bill.id}>
                <td>
                  <div className="month-badge">
                    <span className="m-text">{bill.month.split(' ')[0]}</span>
                    <span className="y-text">{bill.month.split(' ')[1]}</span>
                  </div>
                </td>
                <td>
                  <div className="desc-box">
                    <strong>{bill.desc.split(' (')[0]}</strong>
                    {bill.desc.includes('(') && <span>({bill.desc.split('(')[1]}</span>}
                    {bill.status === 'Paid' && <span style={{display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px'}}>Paid on: {bill.date}</span>}
                  </div>
                </td>
                <td style={{fontWeight: 'bold', fontSize: '1.1rem'}}>₹{bill.amount.toLocaleString()}</td>
                <td>
                  <span className={`status-badge ${bill.status === 'Unpaid' ? 'unpaid' : 'paid'}`}>
                    {bill.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
            {(activeTab === 'pending' && pendingBills.length === 0) && (
              <tr><td colSpan="4" style={{textAlign: 'center', padding: '2rem', color: '#10b981'}}>You are all caught up! No pending bills.</td></tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default Maintenance;