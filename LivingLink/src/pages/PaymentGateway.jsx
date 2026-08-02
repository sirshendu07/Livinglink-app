import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './PaymentGateway.css';

const PaymentGateway = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Get data passed from Maintenance or Gym pages
  const amountToPay = location.state?.amount || 0;
  const paymentType = location.state?.type || 'maintenance'; 
  const gymPlan = location.state?.plan || ''; 

  // Function to download a .txt receipt
  const downloadReceipt = () => {
    const date = new Date().toLocaleString();
    const receiptContent = `
=========================================
      LIVINGLINK - SECURE PAYMENT
=========================================
Resident Name : Rahul Sharma
Flat Number   : B-402
Payment Date  : ${date}
Payment Type  : ${paymentType.toUpperCase()} ${gymPlan ? `(${gymPlan} Plan)` : ''}
-----------------------------------------
Amount Paid   : Rs. ${amountToPay.toLocaleString()}
Status        : SUCCESS
Transaction ID: TXN${Math.floor(Math.random() * 1000000000)}
=========================================
Thank you for using LivingLink!
`;
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `LivingLink_Receipt_${Date.now()}.txt`;
    link.click();
  };

  const processPayment = (e) => {
    e.preventDefault();
    
    // Check Authentication
    if (password === 'sanju12345') {
      
      // 1. Download the receipt for both types of payments
      downloadReceipt();

      // 2. Process based on what they are paying for
      if (paymentType === 'gym') {
        
        // Calculate Expiry Date for Gym
        const now = new Date();
        let daysToAdd = 1;
        if (gymPlan === 'Weekly') daysToAdd = 7;
        if (gymPlan === 'Monthly') daysToAdd = 30;
        if (gymPlan === 'Quarterly') daysToAdd = 90;
        now.setDate(now.getDate() + daysToAdd);

        // Save Gym Sub to localStorage
        localStorage.setItem('livinglink_gym_sub', JSON.stringify({
          plan: gymPlan,
          expiry: now.toISOString()
        }));

        alert(`Gym ${gymPlan} Subscription Activated successfully!`);
        navigate('/gym-games');

      } else {
        
        // Update Maintenance Bills to "Paid"
        const savedBills = JSON.parse(localStorage.getItem('livinglink_bills'));
        const updatedBills = savedBills.map(bill => {
          if (bill.status === 'Unpaid') {
            return { ...bill, status: 'Paid', date: new Date().toLocaleDateString('en-GB') };
          }
          return bill;
        });
        localStorage.setItem('livinglink_bills', JSON.stringify(updatedBills));

        alert("Maintenance Payment Successful!");
        navigate('/maintenance');
      }

    } else {
      setError("Incorrect Payment Password!");
    }
  };

  if (amountToPay === 0) {
    return <div style={{ color: 'white', textAlign: 'center', marginTop: '50px' }}>No payment data found. <button onClick={() => navigate(-1)}>Go Back</button></div>;
  }

  return (
    <div className="gateway-container">
      <div className="gateway-card glowing-border green-glow">
        
        <div className="gateway-header">
          <h2>LivingLink SecurePay</h2>
          <p>Complete your {paymentType} transaction securely.</p>
        </div>

        <div className="bill-summary">
          <span>Paying Amount:</span>
          <h3>₹{amountToPay.toLocaleString()}</h3>
          {gymPlan && <span style={{display: 'block', marginTop: '5px', color: '#10b981'}}>{gymPlan} Pass</span>}
        </div>

        <form onSubmit={processPayment} className="gateway-form">
          <label>Authentication Password</label>
          <input 
            type="password" 
            placeholder="Enter payment password (sanju12345)" 
            className="glow-input"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(''); }}
            required 
          />
          {error && <p className="error-msg">{error}</p>}
          
          <div className="gateway-actions">
            <button type="button" className="cancel-btn" onClick={() => navigate(-1)}>Cancel</button>
            <button type="submit" className="pay-btn">Confirm Payment</button>
          </div>
        </form>
        
        <div className="secure-badge">🔒 256-bit Encrypted Transaction</div>
      </div>
    </div>
  );
};

export default PaymentGateway;