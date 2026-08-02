import { useState } from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import AIAssistant from '../ai/AIAssistant';
import './Layout.css';

const Layout = ({ children }) => {
  // State to track if the mobile menu is open
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="layout-container">
      {/* Pass the state and close function to the Sidebar */}
      <Sidebar isOpen={isMobileMenuOpen} closeMenu={() => setIsMobileMenuOpen(false)} />
      
      <main className="main-content">
        {/* Pass the toggle function to the Navbar */}
        <Navbar toggleMenu={toggleMobileMenu} />
        
        <div className="page-content">
            {children}
        </div>
      </main>
      
      <AIAssistant />
      
      {/* Dark overlay for mobile when sidebar is open */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
    </div>
  );
};

export default Layout;




