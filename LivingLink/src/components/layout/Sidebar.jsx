import { NavLink } from 'react-router-dom';
import ContactLinks from './ContactLinks';
import './Sidebar.css'; 

const Sidebar = ({ isOpen, closeMenu }) => {
  
  // Real-time SOS function linking to our backend
  const handleSOS = async () => {
    if (window.confirm("🚨 URGENT: Do you want to send an emergency SOS Alert to Security?")) {
      try {
        const response = await fetch('http://localhost:5000/api/actions/sos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            residentName: 'Rahul Sharma', 
            flatNumber: 'B-402' 
          })
        });

        if (response.ok) {
          alert("SOS ALERT BROADCASTED! Security guards have been notified for flat B-402.");
        } else {
          alert("Failed to send SOS. Please try again.");
        }
      } catch (error) {
        console.error("SOS Error:", error);
        alert("Server error. Could not connect to security terminal.");
      }
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      
      <div className="sidebar-brand">
        <h2>Living<span className="text-neon-cyan">Link</span></h2>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/home" className="sidebar-link">Home</NavLink>
        <NavLink to="/dashboard" className="sidebar-link">Dashboard</NavLink>
        <NavLink to="/notices" className="sidebar-link">Notice Board</NavLink>
        <NavLink to="/feed" className="sidebar-link">Community Feed</NavLink>
        <NavLink to="/gate" className="sidebar-link">Gate Management</NavLink>
        <NavLink to="/maintenance" className="sidebar-link">Maintenance Bills</NavLink>
        <NavLink to="/events" className="sidebar-link">Events Registration</NavLink>
        <NavLink to="/gym-games" className="sidebar-link">Gym & Games</NavLink>
        <NavLink to="/complaints" className="sidebar-link">Complaints</NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <ContactLinks /> 

        <button className="sos-btn" style={{ marginTop: '15px' }} onClick={handleSOS}>
          ⚠️ SOS ALERT
        </button>
      </div>
      
    </aside>
  );
};

export default Sidebar;