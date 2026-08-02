import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SecurityDashboard.css';

const SecurityDashboard = () => {
  const [visitorName, setVisitorName] = useState('');
  const [phone, setPhone] = useState('');
  const [flatToVisit, setFlatToVisit] = useState('');
  const [category, setCategory] = useState('guest');
  const [activeVisitors, setActiveVisitors] = useState([]);
  
  const navigate = useNavigate(); // Used for the logout redirect

  const fetchVisitors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/visitors/active');
      const data = await response.json();
      setActiveVisitors(data);
    } catch (error) {
      console.error("Error fetching visitors:", error);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/visitors/log-entry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ visitorName, phone, flatToVisit, category })
      });

      if (response.ok) {
        setVisitorName(''); setPhone(''); setFlatToVisit(''); setCategory('guest');
        fetchVisitors();
      }
    } catch (error) {
      console.error("Error submitting visitor:", error);
    }
  };

  // LOGOUT FUNCTION
  const handleLogout = () => {
    // Later we will clear the authentication token here
    navigate('/login');
  };

  return (
    <div className="security-container">
      
      {/* HEADER WITH LOGOUT */}
      <div className="security-profile-header glowing-border red-glow">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="profile-avatar">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=SecuritySanju" alt="Security Profile" />
          </div>
          <div>
            <p className="page-subtitle text-neon-pink">MAIN GATE TERMINAL</p>
            <h1 className="page-title">Security Sanju 1</h1>
            <p className="page-subtitle">📞 +91 8888888801</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout ⎋</button>
      </div>

      <div className="security-layout">
        
        {/* LEFT SIDE: ENTRY FORM */}
        <div className="entry-form-section glowing-border red-glow">
          <h3 className="section-title">Log New Visitor</h3>
          <form className="security-form" onSubmit={handleSubmit}>
            <input type="text" placeholder="Visitor Name" className="glow-input" value={visitorName} onChange={(e) => setVisitorName(e.target.value)} required />
            <input type="tel" placeholder="Phone Number" className="glow-input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            <div className="form-row">
              <input type="text" placeholder="Flat No. (e.g. B-402)" className="glow-input" value={flatToVisit} onChange={(e) => setFlatToVisit(e.target.value.toUpperCase())} required />
              <select className="glow-input select-input" value={category} onChange={(e) => setCategory(e.target.value)} required>
                <option value="guest">Guest</option>
                <option value="delivery">Delivery</option>
                <option value="staff">Staff/Maid</option>
              </select>
            </div>
            <button type="submit" className="admin-action-btn pink-btn">Send Approval Request</button>
          </form>
        </div>

        {/* RIGHT SIDE: LIVE STATUS */}
        <div className="gate-status-section glowing-border">
          <h3 className="section-title">Live Gate Status</h3>
          <div className="status-list">
            {activeVisitors.length > 0 ? (
              activeVisitors.map((visitor) => (
                <div key={visitor._id} className={`status-item ${visitor.status === 'waiting' ? 'waiting' : 'approved'}`}>
                  <div className="status-info">
                    <strong>{visitor.visitorName} ({visitor.category})</strong>
                    {visitor.status === 'waiting' ? (
                      <span>Waiting for {visitor.flatToVisit} Approval...</span>
                    ) : (
                      <span>Approved by {visitor.flatToVisit}</span>
                    )}
                  </div>
                  {visitor.status === 'waiting' ? (
                    <span className="badge badge-waiting">⏳ WAITING</span>
                  ) : (
                    <button className="admin-action-btn green-btn small-btn">Mark as Entered</button>
                  )}
                </div>
              ))
            ) : (
              <p style={{color: 'var(--text-muted)'}}>No active visitors at the gate.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default SecurityDashboard;