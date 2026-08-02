import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import GateManagement from './pages/GateManagement';
import Maintenance from './pages/Maintenance';
import NoticeBoard from './pages/NoticeBoard'; 
import AdminDashboard from './pages/admin/AdminDashboard';
import SecurityDashboard from './pages/security/SecurityDashboard';
import Login from './pages/Login';
import PaymentGateway from './pages/PaymentGateway';
import CommunityFeed from './pages/CommunityFeed';
import GymGames from './pages/GymGames';
import Events from './pages/Events';
import Complaints from './pages/Complaints';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        
        {/* =========================================
            INDEPENDENT PAGES (No Sidebar)
           ========================================= */}
        <Route path="/" element={<Navigate to="/home" replace />} />   
        /*<Route path="/" element={<Navigate to="/login" replace />} />*/
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/security" element={<SecurityDashboard />} />
        <Route path="/payment" element={<PaymentGateway />} />

        {/* =========================================
            RESIDENT PAGES (Wrapped in Layout)
           ========================================= */}
        <Route path="/home" element={<Layout><Home /></Layout>} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/notices" element={<Layout><NoticeBoard /></Layout>} />
        <Route path="/feed" element={<Layout><CommunityFeed /></Layout>} />
        <Route path="/gate" element={<Layout><GateManagement /></Layout>} />
        <Route path="/maintenance" element={<Layout><Maintenance /></Layout>} />
        <Route path="/events" element={<Layout><Events /></Layout>} />
        <Route path="/gym-games" element={<Layout><GymGames /></Layout>} />
        <Route path="/complaints" element={<Layout><Complaints /></Layout>} />

      </Routes>
    </Router>
  );
}

export default App;