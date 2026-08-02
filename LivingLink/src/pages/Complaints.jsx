import { useState, useEffect } from 'react';
import './Complaints.css';

const Complaints = () => {
  const [category, setCategory] = useState('Plumbing');
  const [description, setDescription] = useState('');
  const [myComplaints, setMyComplaints] = useState([]);

  // Fetch complaints from the backend
  const fetchComplaints = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/actions/complaints');
      if (response.ok) {
        const data = await response.json();
        // Filter so Rahul only sees his own flat's complaints
        const myData = data.filter(c => c.flatNumber === 'B-402');
        setMyComplaints(myData);
      }
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  // Submit a new complaint to the backend
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      const response = await fetch('http://localhost:5000/api/actions/complaint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          residentName: 'Rahul Sharma',
          flatNumber: 'B-402',
          category: category,
          description: description
        })
      });

      if (response.ok) {
        alert('Complaint registered successfully! The Admin team has been notified.');
        setDescription('');
        setCategory('Plumbing');
        fetchComplaints(); // Refresh the list instantly
      }
    } catch (error) {
      alert('Error registering complaint.');
    }
  };

  return (
    <div className="complaints-container">
      
      <div className="page-header">
        <h1 className="page-title">Helpdesk & Complaints</h1>
        <p className="page-subtitle">Report issues to the society management or maintenance team.</p>
      </div>

      <div className="complaints-layout">
        
        {/* Left Side: Lodge Complaint Form */}
        <div className="lodge-complaint-section glowing-border pink-glow">
          <h3 className="section-title">Lodge a New Complaint</h3>
          
          <form className="complaint-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Issue Category</label>
              <select 
                className="glow-input select-input" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Security">Security / Noise</option>
                <option value="Cleaning">Common Area Cleaning</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="input-group">
              <label>Describe the Issue</label>
              <textarea 
                className="glow-input"
                placeholder="E.g., The tap in the kitchen is leaking heavily..."
                rows="5"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-complaint-btn">
              Submit Complaint
            </button>
          </form>
        </div>

        {/* Right Side: Complaint History */}
        <div className="complaint-history-section glowing-border">
          <h3 className="section-title">My Recent Complaints</h3>
          
          <div className="history-list">
            {myComplaints.length > 0 ? (
              myComplaints.map((complaint) => (
                <div key={complaint._id} className="history-card">
                  <div className="history-header">
                    <span className="history-category">{complaint.category}</span>
                    <span className={`status-badge ${complaint.status.toLowerCase().replace(' ', '-')}`}>
                      {complaint.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="history-desc">{complaint.description}</p>
                  <span className="history-date">
                    Reported on: {new Date(complaint.createdAt).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="empty-state">
                <span style={{ fontSize: '2rem', display: 'block', marginBottom: '10px' }}>✅</span>
                <p>You have no active or past complaints.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Complaints;