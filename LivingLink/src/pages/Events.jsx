import './Events.css';

const Events = () => {
  const eventsList = [
    { id: 1, title: 'Annual Sports 2026', date: 'December 15, 2026', type: 'Sports', img: '🏃‍♂️' },
    { id: 2, title: 'Durga Puja Celebration', date: 'October 10, 2026', type: 'Festival', img: '🔱' },
    { id: 3, title: 'Laxmi Puja', date: 'October 25, 2026', type: 'Festival', img: '🪔' },
    { id: 4, title: 'Winter Badminton Tournament', date: 'January 10, 2027', type: 'Sports', img: '🏸' }
  ];

  return (
    <div className="events-container">
      <div className="page-header">
        <h1 className="page-title">Events Registration</h1>
        <p className="page-subtitle">Register for upcoming society events and festivals.</p>
      </div>

      <div className="events-grid">
        {eventsList.map(event => (
          <div key={event.id} className="event-card glowing-border">
            
            {/* Coming Soon Badge */}
            <div className="event-badge">COMING SOON</div>
            
            <div className="event-icon">{event.img}</div>
            <h3 className="event-title">{event.title}</h3>
            <p className="event-date">📅 {event.date}</p>
            <span className="event-type">{event.type}</span>
            
            {/* Disabled Button */}
            <button className="event-btn" disabled>
              Registration Not Open
            </button>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Events;