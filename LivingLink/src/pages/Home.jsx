import { useNavigate } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      {/* AI Search Bar */}
      <div className="search-bar glowing-border" style={{ padding: '15px 20px', borderRadius: '12px', background: 'var(--bg-card)', display: 'flex', gap: '10px', alignItems: 'center' }}>
        <span className="search-icon text-neon-cyan">✨</span>
        <input 
          type="text" 
          placeholder="Ask LivingLink AI anything... e.g., 'What are the pool timings?'" 
          style={{ width: '100%', background: 'transparent', border: 'none', color: 'white', outline: 'none', fontSize: '1rem' }} 
        />
      </div>

      {/* Quick Actions - Structural styles moved to CSS */}
      <div className="quick-actions-grid">
        <div className="action-card glowing-border" onClick={() => navigate('/notices')}>
          <span className="action-icon text-neon-cyan">📄</span>
          <p>Notice</p>
        </div>
        
        <div className="action-card glowing-border" onClick={() => navigate('/maintenance')}>
          <span className="action-icon text-neon-cyan">💳</span>
          <p>Pay Dues</p>
        </div>
        
        <div className="action-card glowing-border" onClick={() => navigate('/gym-games')}>
          <span className="action-icon text-neon-cyan">🏋️</span>
          <p>Book Gym</p>
        </div>
        
        <div className="action-card glowing-border" onClick={() => navigate('/feed')}>
          <span className="action-icon text-neon-cyan">💬</span>
          <p>Community Feed</p>
        </div>
      </div>

      {/* Main Content Grid - Structural styles moved to CSS */}
      <div className="home-content-grid">
        
        {/* Left Side: Important Notices */}
        <div className="important-notices">
          <h3 style={{ color: 'white', marginBottom: '1.5rem' }}>Important Notices</h3>
          
          <div className="notice-card glowing-border red-glow" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px', marginBottom: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ background: 'rgba(255, 51, 102, 0.2)', color: '#ff3366', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>URGENT</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Today, 9:00 AM</span>
            </div>
            <h4 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '1.1rem' }}>Water supply interruption in Tower B</h4>
            <p style={{ color: '#ccc', margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>Please be informed that there will be a water supply interruption in Tower B from 2 PM to 5 PM today due to overhead tank cleaning. Please store sufficient water.</p>
          </div>

          <div className="notice-card glowing-border cyan-glow" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ background: 'rgba(0, 229, 255, 0.2)', color: 'var(--neon-cyan)', padding: '4px 10px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>INFO</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Yesterday, 10:30 AM</span>
            </div>
            <h4 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '1.1rem' }}>AMC Due Date Extended</h4>
            <p style={{ color: '#ccc', margin: 0, fontSize: '0.95rem', lineHeight: '1.5' }}>The last date for Annual Maintenance Charges has been extended.</p>
          </div>
        </div>

        {/* Right Side: Community Feed Snippet */}
        <div className="community-snippet glowing-border" style={{ background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '12px', height: 'fit-content' }}>
          <h3 style={{ color: 'white', margin: '0 0 1.5rem 0' }}>Community Feed</h3>
          
          <div style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
            <strong style={{ color: 'white', display: 'block', marginBottom: '5px' }}>Amit Roy</strong>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>Does anyone have the contact number for a trusted carpenter? Need some...</p>
          </div>
          
          <div style={{ marginBottom: '1.5rem' }}>
            <strong style={{ color: 'var(--neon-cyan)', display: 'block', marginBottom: '5px' }}>Society Committee</strong>
            <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>Reminder: AGM regarding Durga Puja budget tomorrow at 7:00 PM...</p>
          </div>

          <button onClick={() => navigate('/feed')} style={{ background: 'transparent', border: 'none', color: 'var(--neon-cyan)', fontWeight: 'bold', cursor: 'pointer', padding: 0 }}>View Full Feed →</button>
        </div>

        {/* Help & Enquire Now Section */}
        <div className="enquire-now-section glowing-border pink-glow">
          <div className="enquire-text">
            <h3 style={{ color: 'white', margin: '0 0 10px 0' }}>Need Help? Enquire Now</h3>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>Reach out to the society management office for immediate assistance.</p>
          </div>
          <div className="enquire-buttons">
            <button className="email-btn">✉️ Email Desk</button>
            <button className="call-btn">📞 Call Office</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;