import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GymGames.css';

const GymGames = () => {
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    const sub = localStorage.getItem('livinglink_gym_sub');
    if (sub) {
      const parsedSub = JSON.parse(sub);
      // Check if expired
      if (new Date(parsedSub.expiry) > new Date()) {
        setSubscription(parsedSub);
      } else {
        localStorage.removeItem('livinglink_gym_sub'); // Expired
      }
    }
  }, []);

  const handleSubscribe = (planName, amount) => {
    navigate('/payment', { state: { type: 'gym', amount: amount, plan: planName } });
  };

  return (
    <div className="gym-container">
      <div className="page-header">
        <h1 className="page-title">Gymnasium & Club</h1>
        <p className="page-subtitle">Manage your fitness club membership.</p>
      </div>

      {/* ID CARD / STATUS BANNER */}
      {subscription ? (
        <div className="status-banner active-pass glowing-border green-glow">
          <div className="status-icon">✅</div>
          <div className="status-info">
            <h2>ACCESS GRANTED</h2>
            <p>You have an active <strong>{subscription.plan}</strong> subscription.</p>
            <span className="expiry-text">Valid until: {new Date(subscription.expiry).toLocaleDateString()}</span>
          </div>
        </div>
      ) : (
        <div className="status-banner inactive-pass glowing-border red-glow">
          <div className="status-icon">❌</div>
          <div className="status-info">
            <h2>ACCESS DENIED</h2>
            <p>Your payment is not done. Please purchase a plan below to enter the gym.</p>
          </div>
        </div>
      )}

      {/* PRICING PLANS */}
      <h3 className="section-title" style={{ marginTop: '2rem' }}>Membership Plans</h3>
      <div className="pricing-grid">
        
        <div className="pricing-card glowing-border">
          <h4>Daily Pass</h4>
          <h2>₹25</h2>
          <p>Valid for 1 Day</p>
          <button onClick={() => handleSubscribe('Daily', 25)} className="cyan-btn sub-btn">Pay Now</button>
        </div>

        <div className="pricing-card glowing-border">
          <h4>Weekly Pass</h4>
          <h2>₹125</h2>
          <p>Valid for 7 Days</p>
          <button onClick={() => handleSubscribe('Weekly', 125)} className="cyan-btn sub-btn">Pay Now</button>
        </div>

        <div className="pricing-card glowing-border pink-glow popular">
          <div className="badge">Most Popular</div>
          <h4>Monthly Pass</h4>
          <h2>₹400</h2>
          <p>Valid for 30 Days</p>
          <button onClick={() => handleSubscribe('Monthly', 400)} className="pink-btn sub-btn">Pay Now</button>
        </div>

        <div className="pricing-card glowing-border">
          <h4>Quarterly Pass</h4>
          <h2>₹1000</h2>
          <p>Valid for 90 Days</p>
          <button onClick={() => handleSubscribe('Quarterly', 1000)} className="cyan-btn sub-btn">Pay Now</button>
        </div>

      </div>
    </div>
  );
};

export default GymGames;