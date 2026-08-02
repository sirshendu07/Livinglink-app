import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // <-- Imported this for navigation
import './Navbar.css';

const Navbar = ({ toggleMenu }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeFlat, setActiveFlat] = useState("B-402");
  const navigate = useNavigate(); // <-- Initialized navigation

  // Function to handle logout
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="top-navbar">
      
      {/* LEFT SIDE: Hamburger & Breadcrumbs */}
      <div className="nav-left">
        <button className="mobile-menu-btn" onClick={toggleMenu}>
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
        <span className="breadcrumb hide-mobile">Home / <span className="highlight">Dashboard</span></span>
      </div>

      {/* NEW: Mobile Logo perfectly centered */}
      <div className="mobile-navbar-logo">
        <h2>Living<span className="text-neon-cyan">Link</span></h2>
      </div>
      
      {/* RIGHT SIDE: Notifications & Profile */}
      <div className="nav-right">
        
        {/* Notification Bell */}
        <button className="icon-btn">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
          </svg>
          <span className="notification-dot"></span>
        </button>
        
        {/* User Profile Container (Crucial for Dropdown positioning) */}
        <div className="user-profile-container">
          
          <div className="user-profile" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
            <img src="https://ui-avatars.com/api/?name=Rahul+Sharma&background=00e5ff&color=080c10&bold=true" alt="User Avatar" className="avatar" />
            
            <div className="user-info hide-mobile">
              <span className="user-name">Rahul Sharma</span>
              <span className="user-role">Owner, {activeFlat}</span>
            </div>
            
            <svg width="16" height="16" fill="none" stroke="var(--text-muted)" strokeWidth="2" viewBox="0 0 24 24" className="dropdown-arrow">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>

          {/* Switch Flat Dropdown */}
          {isDropdownOpen && (
            <div className="profile-dropdown">
              <div className="dropdown-header">SWITCH FLAT</div>
              
              <button 
                className={`dropdown-item ${activeFlat === "B-402" ? "active" : ""}`}
                onClick={() => { setActiveFlat("B-402"); setIsDropdownOpen(false); }}
              >
                Tower B - Flat 402 (Owner)
              </button>
              
              <button 
                className={`dropdown-item ${activeFlat === "A-105" ? "active" : ""}`}
                onClick={() => { setActiveFlat("A-105"); setIsDropdownOpen(false); }}
              >
                Tower A - Flat 105 (Owner)
              </button>
              
              <div className="dropdown-divider"></div>
              
              {/* CONNECTED THE LOGOUT BUTTON HERE */}
              <button className="dropdown-item text-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;