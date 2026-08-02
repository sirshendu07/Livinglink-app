import './SOSButton.css';

const SOSButton = () => {
  const handleSOSClick = () => {
    // We will add the actual WebSocket alert logic later
    alert("🚨 SOS ALERT TRIGGERED! Security has been notified.");
  };

  return (
    <button className="sos-btn" onClick={handleSOSClick}>
      <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
      SOS ALERT
    </button>
  );
};

export default SOSButton;