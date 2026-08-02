import { useState, useEffect } from 'react';
import './GateManagement.css';

const GateManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [visitors, setVisitors] = useState([]);
  
  // Hardcoded for testing. Later, this comes from the logged-in user!
  const myFlatNumber = "B-402"; 

  // Fetch visitors for this specific flat
  const fetchMyVisitors = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/visitors/flat/${myFlatNumber}`);
      const data = await response.json();
      setVisitors(data);
    } catch (error) {
      console.error("Error fetching visitors:", error);
    }
  };

  useEffect(() => {
    fetchMyVisitors();
    
    // Optional: Auto-refresh every 5 seconds to instantly see when security adds someone
    const interval = setInterval(fetchMyVisitors, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle Approve / Deny button clicks
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5000/api/visitors/update-status/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (response.ok) {
        fetchMyVisitors(); // Refresh the list instantly
      }
    } catch (error) {
      alert("Error updating status.");
    }
  };

  // Filter visitors based on tabs
  const filteredVisitors = visitors.filter(v => {
    if (activeTab === 'all') return true;
    if (activeTab === 'expected') return v.status === 'pre-approved' || v.status === 'waiting';
    if (activeTab === 'inside') return v.status === 'inside';
    return true;
  });

  // Find if there is a visitor currently waiting for approval at the gate
  const waitingVisitor = visitors.find(v => v.status === 'waiting');

  return (
    <div className="gate-container">
      
      {/* Page Header */}
      <div className="gate-header-top">
        <div>
          <h1 className="gate-title">Gate Management</h1>
          <p className="gate-subtitle">Manage your expected visitors for Flat {myFlatNumber}.</p>
        </div>
        <button className="pre-approve-btn">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"></path></svg>
          Pre-Approve Guest
        </button>
      </div>

      {/* LIVE ALERT BANNER (Only shows if someone is waiting!) */}
      {waitingVisitor && (
        <div className="live-alert-banner glowing-border urgent-glow">
          <div className="alert-info">
            <div className="pulse-dot"></div>
            <div>
              <strong>Action Required:</strong> {waitingVisitor.visitorName} ({waitingVisitor.category}) is at the Main Gate.
            </div>
          </div>
          <div className="alert-actions">
            <button className="alert-btn approve" onClick={() => updateStatus(waitingVisitor._id, 'approved')}>Approve</button>
            <button className="alert-btn deny" onClick={() => updateStatus(waitingVisitor._id, 'denied')}>Deny</button>
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="gate-tabs">
        <button className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`} onClick={() => setActiveTab('all')}>All Logs</button>
        <button className={`tab-btn ${activeTab === 'expected' ? 'active' : ''}`} onClick={() => setActiveTab('expected')}>Expected / Waiting</button>
        <button className={`tab-btn ${activeTab === 'inside' ? 'active' : ''}`} onClick={() => setActiveTab('inside')}>Inside Premises</button>
      </div>

      {/* Visitor Table */}
      <div className="table-container glowing-border">
        <table className="visitor-table">
          <thead>
            <tr>
              <th>Visitor Details</th>
              <th>Category</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            
            {filteredVisitors.length > 0 ? (
              filteredVisitors.map((visitor) => (
                <tr key={visitor._id}>
                  <td>
                    <div className="td-user">
                      <div className={`td-avatar ${visitor.category}-avatar`}>
                        {visitor.visitorName.charAt(0).toUpperCase()}
                      </div>
                      <div className="td-info">
                        <span className="td-name">{visitor.visitorName}</span>
                        <span className="td-phone">{visitor.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className={`cat-badge cat-${visitor.category}`}>{visitor.category.toUpperCase()}</span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 'bold', color: visitor.status === 'approved' || visitor.status === 'inside' ? '#10b981' : visitor.status === 'denied' ? '#ff3366' : '#f59e0b' }}>
                      {visitor.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: 'center', padding: '2rem' }}>No visitors found.</td>
              </tr>
            )}

          </tbody>
        </table>
      </div>

    </div>
  );
};

export default GateManagement;