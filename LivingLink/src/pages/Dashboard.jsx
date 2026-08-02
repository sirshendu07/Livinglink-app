import { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = () => {
  const [totalDue, setTotalDue] = useState(0);
  const [activeVisitors, setActiveVisitors] = useState(0);
  const [activeComplaints, setActiveComplaints] = useState(0);

  useEffect(() => {
    // 1. Fetch Maintenance Dues from LocalStorage
    const savedBills = localStorage.getItem('livinglink_bills');
    if (savedBills) {
      const bills = JSON.parse(savedBills);
      const pending = bills.filter(b => b.status === 'Unpaid');
      setTotalDue(pending.reduce((sum, bill) => sum + bill.amount, 0));
    } else {
      setTotalDue(4500); 
    }

    // 2. Fetch Live Visitors for Flat B-402 from Backend
    const fetchVisitors = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/visitors/flat/B-402');
        if (res.ok) {
          const data = await res.json();
          const active = data.filter(v => v.status === 'waiting' || v.status === 'approved' || v.status === 'inside');
          setActiveVisitors(active.length);
        }
      } catch (error) {
        console.error("Error fetching gate status:", error);
      }
    };

    // 3. Fetch Active Complaints from Backend
    const fetchComplaints = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/actions/complaints');
        if (res.ok) {
          const data = await res.json();
          const myComplaints = data.filter(c => c.flatNumber === 'B-402' && c.status !== 'Resolved');
          setActiveComplaints(myComplaints.length);
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchVisitors();
    fetchComplaints();
  }, []);

  return (
    <div className="dashboard-container">
      <div className="welcome-section">
        <h1 className="welcome-title">Welcome back, <span className="text-neon-cyan">Rahul</span></h1>
        <p className="welcome-subtitle">Here is what is happening in Solaris Bonhooghly Phase 1 today.</p>
      </div>

      <div className="dashboard-grid">
        
        {/* Maintenance Card */}
        <div className="dashboard-card">
          <p className="card-title">TOTAL DUE (MAINTENANCE)</p>
          <h2 className="card-value">₹{totalDue.toLocaleString()}</h2>
          <p className={`card-status ${totalDue > 0 ? 'text-neon-pink' : ''}`} style={totalDue === 0 ? {color: '#10b981'} : {}}>
            Status: {totalDue > 0 ? 'Unpaid' : 'All Dues Cleared'}
          </p>
        </div>

        {/* Visitors Card */}
        <div className="dashboard-card">
          <p className="card-title">EXPECTED VISITORS TODAY</p>
          <h2 className="card-value">{activeVisitors}</h2>
          <p className="card-status text-neon-cyan">Logged at gate terminal</p>
        </div>

        {/* Complaints Card */}
        <div className="dashboard-card">
          <p className="card-title">ACTIVE COMPLAINTS</p>
          <h2 className="card-value">{activeComplaints}</h2>
          <p className="card-status" style={{color: '#f59e0b'}}>Needs Attention</p>
        </div>
      </div>

      <div className="recent-activity-section glowing-border">
        <h3>Recent Activity</h3>
        <p style={{color: 'var(--text-muted)'}}>Select a module from the sidebar to manage visitors, events, or notices.</p>
      </div>
    </div>
  );
};

export default Dashboard;