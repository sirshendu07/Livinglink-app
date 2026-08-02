import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // 1. User Registration State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('resident');
  const [flatNumber, setFlatNumber] = useState('');
  const [totalUsers, setTotalUsers] = useState(0);

  // 2. Notice Board State
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeContent, setNoticeContent] = useState('');
  const [noticeType, setNoticeType] = useState('INFO');

  // 3. Payments Ledger State
  const [payments, setPayments] = useState([]);

  // Fetch all Admin Data on load
  const fetchAdminData = async () => {
    try {
      // Fetch Total Users
      const userRes = await fetch('http://localhost:5000/api/users/stats');
      if (userRes.ok) {
        const userData = await userRes.json();
        setTotalUsers(userData.total);
      }

      // Fetch Payments Ledger
      const payRes = await fetch('http://localhost:5000/api/payments/all');
      if (payRes.ok) {
        const payData = await payRes.json();
        setPayments(payData);
      }
    } catch (error) {
      console.error("Error fetching admin data:", error);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  // --- Handlers ---

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, role, flatNumber })
      });
      if (response.ok) {
        alert('Member added successfully!');
        setName(''); setPhone(''); setFlatNumber(''); setRole('resident');
        fetchAdminData(); 
      }
    } catch (error) {
      alert('Error adding member.');
    }
  };

  const handleSeedUsers = async () => {
    if(!window.confirm("Are you sure you want to generate mock users?")) return;
    try {
      const response = await fetch('http://localhost:5000/api/users/seed', { method: 'POST' });
      if (response.ok) {
        alert('Mock Users inserted into MongoDB!');
        fetchAdminData(); 
      }
    } catch (error) {
      alert('Error seeding users.');
    }
  };

  const handlePostNotice = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/notices/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          title: noticeTitle, 
          content: noticeContent, 
          type: noticeType, 
          author: 'Admin Sanju' 
        })
      });

      if (response.ok) {
        alert('Notice officially broadcasted to all residents!');
        setNoticeTitle(''); setNoticeContent(''); setNoticeType('INFO');
      }
    } catch (error) {
      alert('Error broadcasting notice.');
    }
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="admin-container">
      
      {/* HEADER SECTION */}
      <div className="admin-profile-header glowing-border cyan-glow">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="profile-avatar">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=AdminSanju1" alt="Admin Profile" />
          </div>
          <div>
            <h1 className="page-title text-neon-cyan" style={{ margin: '0 0 5px 0' }}>Welcome, Admin Sanju!</h1>
            <p className="page-subtitle" style={{ margin: 0 }}>System Administrator | Solaris Bonhooghly</p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div className="stats-badge">
            Total Users: {totalUsers}
          </div>
          <button className="logout-btn" onClick={handleLogout}>Logout ⎋</button>
        </div>
      </div>

      <div className="admin-grid">
        
        {/* LEFT COLUMN: Actions */}
        <div className="admin-actions-col">
          
          {/* Module 1: Broadcast Notice */}
          <div className="admin-card glowing-border cyan-glow">
            <h3 className="admin-card-title">📢 Broadcast Notice</h3>
            <form className="admin-form" onSubmit={handlePostNotice}>
              <input 
                type="text" 
                placeholder="Notice Title" 
                className="glow-input" 
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                required 
              />
              <select 
                className="glow-input select-input" 
                value={noticeType}
                onChange={(e) => setNoticeType(e.target.value)}
              >
                <option value="INFO">Information</option>
                <option value="URGENT">Urgent Alert</option>
                <option value="EVENT">Society Event</option>
              </select>
              <textarea 
                placeholder="Write the full notice details here..." 
                className="glow-input"
                rows="4"
                value={noticeContent}
                onChange={(e) => setNoticeContent(e.target.value)}
                required
              ></textarea>
              <button type="submit" className="admin-action-btn cyan-btn">Publish to Notice Board</button>
            </form>
          </div>

          {/* Module 2: Add User */}
          <div className="admin-card glowing-border">
            <h3 className="admin-card-title">👤 Register Member</h3>
            <form className="admin-form" onSubmit={handleAddMember}>
              <input type="text" placeholder="Full Name" className="glow-input" value={name} onChange={(e) => setName(e.target.value)} required />
              <input type="tel" placeholder="Phone Number" className="glow-input" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Flat (e.g. C-101)" className="glow-input" value={flatNumber} onChange={(e) => setFlatNumber(e.target.value)} required={role === 'resident'} style={{ flex: 1 }} />
                <select className="glow-input select-input" value={role} onChange={(e) => setRole(e.target.value)} style={{ flex: 1 }}>
                  <option value="resident">Resident</option>
                  <option value="security">Security</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <button type="submit" className="admin-action-btn">Save Member</button>
            </form>
            
            <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>
              <button onClick={handleSeedUsers} style={{ background: 'transparent', border: '1px solid #ff3366', color: '#ff3366', padding: '8px 15px', borderRadius: '6px', fontSize: '0.85rem', cursor: 'pointer', width: '100%' }}>
                ⚡ Generate Mock Data
              </button>
            </div>
          </div>
          
        </div>

        {/* RIGHT COLUMN: Ledger */}
        <div className="admin-ledger-col">
          <div className="admin-card glowing-border">
            <h3 className="admin-card-title">💰 Financial Ledger</h3>
            
            <div className="ledger-table-container">
              <table className="ledger-table">
                <thead>
                  <tr>
                    <th>Resident Details</th>
                    <th>Payment Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length > 0 ? (
                    payments.map((payment) => (
                      <tr key={payment._id}>
                        <td>
                          <strong>{payment.residentName}</strong>
                          <span style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)' }}>{payment.flatNumber}</span>
                        </td>
                        <td>
                          <span className={`type-badge ${payment.paymentType.toLowerCase()}`}>
                            {payment.paymentType.toUpperCase()}
                          </span>
                          {payment.plan && <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--neon-cyan)', marginTop: '4px' }}>{payment.plan} Plan</span>}
                        </td>
                        <td style={{ fontWeight: 'bold' }}>₹{payment.amount.toLocaleString()}</td>
                        <td><span style={{ color: '#10b981', fontWeight: 'bold' }}>SUCCESS</span></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                        No payments recorded yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;