import './MetricCard.css';

const MetricCard = ({ title, value, status, statusColor = "var(--neon-cyan)" }) => {
  return (
    <div className="metric-card">
      <h3 className="metric-title">{title}</h3>
      <div className="metric-value">{value}</div>
      {status && (
        <div className="metric-status" style={{ color: statusColor }}>
          {status}
        </div>
      )}
    </div>
  );
};

export default MetricCard;