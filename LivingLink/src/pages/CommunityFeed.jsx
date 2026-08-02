import { useState, useEffect } from 'react';
import './CommunityFeed.css';

const CommunityFeed = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  // Load posts from LocalStorage
  useEffect(() => {
    const savedPosts = localStorage.getItem('livinglink_feed');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    } else {
      const defaultPosts = [
        { id: 1, author: 'Amit Roy (A-105)', content: 'Does anyone have the contact number for a trusted carpenter? Need some work done this weekend.', time: '2 hours ago' },
        { id: 2, author: 'Rahul Sharma (B-402)', content: 'Found a set of keys near the swimming pool. Handed them over to the main gate security.', time: '5 hours ago' }
      ];
      setPosts(defaultPosts);
      localStorage.setItem('livinglink_feed', JSON.stringify(defaultPosts));
    }
  }, []);

  const handlePost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const postObj = {
      id: Date.now(),
      author: 'Rahul Sharma (B-402)', // Hardcoded for now
      content: newPost,
      time: 'Just now'
    };

    const updatedPosts = [postObj, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('livinglink_feed', JSON.stringify(updatedPosts));
    setNewPost('');
  };

  return (
    <div className="feed-container">
      <div className="page-header">
        <h1 className="page-title">Community Feed</h1>
        <p className="page-subtitle">Discuss, ask for help, and connect with your neighbors.</p>
      </div>

      <div className="create-post-card glowing-border cyan-glow">
        <form onSubmit={handlePost}>
          <textarea 
            className="post-input" 
            placeholder="What's on your mind? Share with the community..." 
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            rows="3"
          ></textarea>
          <button type="submit" className="cyan-btn post-btn">Post Message</button>
        </form>
      </div>

      <div className="posts-list">
        {posts.map((post) => (
          <div key={post.id} className="post-card glowing-border">
            <div className="post-header">
              <div className="post-avatar">{post.author.charAt(0)}</div>
              <div>
                <h4 className="post-author">{post.author}</h4>
                <span className="post-time">{post.time}</span>
              </div>
            </div>
            <p className="post-content">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;