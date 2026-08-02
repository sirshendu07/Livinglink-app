import { NavLink } from 'react-router-dom';
import ContactLinks from './ContactLinks';
import './Sidebar.css'; 

const Sidebar = ({ isOpen, closeMenu }) => {
  
  // Real-time SOS function linking to our backend
  const handleSOS = async () => {
    if (window.confirm("🚨 URGENT: Do you want to send an emergency SOS Alert to Security?")) {
      try {
        // Uses environment variable in production, defaults to localhost during development
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiUrl}/api/actions/sos`, {
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
        <NavLink to="/home" className="sidebar-link" onClick={closeMenu}>Home</NavLink>
        <NavLink to="/dashboard" className="sidebar-link" onClick={closeMenu}>Dashboard</NavLink>
        <NavLink to="/notices" className="sidebar-link" onClick={closeMenu}>Notice Board</NavLink>
        <NavLink to="/feed" className="sidebar-link" onClick={closeMenu}>Community Feed</NavLink>
        <NavLink to="/gate" className="sidebar-link" onClick={closeMenu}>Gate Management</NavLink>
        <NavLink to="/maintenance" className="sidebar-link" onClick={closeMenu}>Maintenance Bills</NavLink>
        <NavLink to="/events" className="sidebar-link" onClick={closeMenu}>Events Registration</NavLink>
        <NavLink to="/gym-games" className="sidebar-link" onClick={closeMenu}>Gym & Games</NavLink>
        <NavLink to="/complaints" className="sidebar-link" onClick={closeMenu}>Complaints</NavLink>
      </nav>
      
      <div className="sidebar-footer">
        <ContactLinks /> 

        <button className="sos-btn" onClick={handleSOS}>
          ⚠️ SOS ALERT
        </button>
      </div>
      
    </aside>
  );
};

export default Sidebar;