import { useState } from 'react';
import './NoticeBoard.css';

// Mock data for notices
const initialNotices = [
  {
    id: 1,
    type: 'urgent',
    title: 'Water supply interruption in Tower B',
    date: '2026-08-01T09:00:00', // ISO format for easy sorting
    displayDate: 'Today, 9:00 AM',
    author: 'Facility Manager',
    content: 'Please be informed that there will be a water supply interruption in Tower B from 2 PM to 5 PM today due to overhead tank cleaning. Please store sufficient water.'
  },
  {
    id: 2,
    type: 'info',
    title: 'AMC Due Date Extended',
    date: '2026-07-31T10:30:00',
    displayDate: '31 Jul, 10:30 AM',
    author: 'Society Committee',
    content: 'The deadline for paying the Annual Maintenance Charges (AMC) has been extended to the 15th of August. Please clear your dues on time to avoid late fees.'
  },
  {
    id: 3,
    type: 'event',
    title: 'Weekend Yoga Class Starting',
    date: '2026-07-30T16:00:00',
    displayDate: '30 Jul, 4:00 PM',
    author: 'Cultural Committee',
    content: 'Join us for the new weekend yoga sessions starting this Saturday at the Clubhouse. The session is open to all residents free of charge. Please bring your own mats.'
  },
  {
    id: 4,
    type: 'info',
    title: 'New Security Guards Deployed',
    date: '2026-07-25T08:00:00',
    displayDate: '25 Jul, 8:00 AM',
    author: 'Chief Security Officer',
    content: 'We have deployed a new team of security guards at the main gate and basement parking. Please cooperate with them during the initial transition period.'
  }
];

const NoticeBoard = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');

  // Filter & Sort Logic
  const filteredNotices = initialNotices.filter(notice => 
    activeCategory === 'all' ? true : notice.type === activeCategory
  );

  const sortedNotices = [...filteredNotices].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="notices-container">
      
      {/* Page Header */}
      <div className="notices-header">
        <h1 className="page-title">Notice Board</h1>
        <p className="page-subtitle">Stay updated with the latest society announcements and rules.</p>
      </div>

      {/* Control Bar: Categories & Sorting */}
      <div className="notices-controls glowing-border">
        
        {/* Left: Category Tabs */}
        <div className="category-tabs">
          <button className={`cat-btn ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>All Notices</button>
          <button className={`cat-btn ${activeCategory === 'urgent' ? 'active' : ''}`} onClick={() => setActiveCategory('urgent')}>Urgent</button>
          <button className={`cat-btn ${activeCategory === 'info' ? 'active' : ''}`} onClick={() => setActiveCategory('info')}>General Info</button>
          <button className={`cat-btn ${activeCategory === 'event' ? 'active' : ''}`} onClick={() => setActiveCategory('event')}>Events</button>
        </div>

        {/* Right: Sort Dropdown */}
        <div className="sort-control">
          <span className="sort-label">Sort by:</span>
          <select 
            className="sort-select" 
            value={sortOrder} 
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="newest">Most Recent</option>
            <option value="oldest">Least Recent</option>
          </select>
        </div>
        
      </div>

      {/* Notices List */}
      <div className="notices-list">
        {sortedNotices.length > 0 ? (
          sortedNotices.map((notice) => (
            <div key={notice.id} className={`full-notice-card glowing-border ${notice.type}-glow`}>
              
              <div className="full-notice-header">
                <div className="notice-meta-left">
                  <span className={`notice-badge ${notice.type}`}>{notice.type.toUpperCase()}</span>
                  <span className="notice-author">By {notice.author}</span>
                </div>
                <span className="full-notice-date">{notice.displayDate}</span>
              </div>
              
              <h3 className="full-notice-title">{notice.title}</h3>
              <p className="full-notice-body">{notice.content}</p>
              
              <div className="full-notice-footer">
                <button className="action-link">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" style={{marginRight: '6px', verticalAlign: 'middle'}}><path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path></svg>
                  View Attachment (PDF)
                </button>
              </div>

            </div>
          ))
        ) : (
          <div className="no-notices">
            <p>No notices found in this category.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default NoticeBoard;