import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('livinglink123');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Quick Demo Fillers for instant testing
  const fillDemo = (demoPhone) => {
    setPhone(demoPhone);
    setPassword('livinglink123');
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password })
      });

      const data = await response.json();

      if (response.ok) {
        // Save logged in user to localStorage
        localStorage.setItem('livinglink_user', JSON.stringify(data.user));

        // Redirect based on role
        if (data.user.role === 'admin') navigate('/admin');
        else if (data.user.role === 'security') navigate('/security');
        else navigate('/home');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Cannot connect to server. Is backend running on port 5000?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card glowing-border">
        
        {/* Logo & Header */}
        <div className="login-header">
          <div className="login-logo-badge">LL</div>
          <h1 className="login-title">Living<span className="text-neon-cyan">Link</span></h1>
          <p className="login-subtitle">Solaris Bonhooghly Portal</p>
        </div>

        {/* Demo Fast-Login Pills */}
        <div className="demo-pills-section">
          <span className="demo-label">Quick Test Login:</span>
          <div className="demo-pills">
            <button type="button" className="demo-pill admin-pill" onClick={() => fillDemo('9999999901')}>
              👑 Admin Sanju 1
            </button>
            <button type="button" className="demo-pill security-pill" onClick={() => fillDemo('8888888801')}>
              🛡️ Security Sanju 1
            </button>
            <button type="button" className="demo-pill resident-pill" onClick={() => fillDemo('9876543210')}>
              🏠 Rahul (B-402)
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && <div className="login-error-box">{error}</div>}

        {/* Login Form */}
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <label>Phone Number</label>
            <input 
              type="tel" 
              placeholder="e.g. 9999999901" 
              className="glow-input" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••••••" 
              className="glow-input" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>

          <button type="submit" className="login-submit-btn" disabled={loading}>
            {loading ? 'Authenticating...' : 'Sign In to Portal'}
          </button>
        </form>

      </div>
    </div>
  );
};

export default Login;