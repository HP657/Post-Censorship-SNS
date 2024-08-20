import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/post/my/post'); 
        setPosts(response.data.data);
      } catch (error) {
        setError('Failed to load posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // 재검토 요청 API 호출
  const requestReview = async (postId) => {
    try {
      await axios.post(`http://localhost:8080/api/post/${postId}/request-review`);
      alert('Review request sent successfully!');
    } catch (error) {
      alert('Failed to request review.');
    }
  };

  return (
    <div className="Profile">
      <h1>My Profile</h1>

      {loading ? (
        <div style={styles.loading}>Loading...</div>
      ) : error ? (
        <div style={styles.error}>{error}</div>
      ) : (
        <div style={styles.container}>
          {posts.length === 0 ? (
            <p style={styles.noPosts}>No posts available.</p>
          ) : (
            posts.map(post => (
              <div key={post.postId} style={styles.card}>
                <img src={post.postImgUrl} alt="Post" style={styles.image} />
                <div style={styles.content}>
                  <p><strong>Username:</strong> {post.username}</p>
                  <p><strong>Text:</strong> {post.postText}</p>
                  <p><strong>Shared:</strong> {post.share ? 'Yes' : 'No'}</p>
                  {!post.share && (
                    <button style={styles.button} onClick={() => requestReview(post.postId)}>
                      Request Review
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '10px',
    padding: '15px',
    margin: '10px 0',
    width: '100%',
    maxWidth: '600px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s ease',
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  content: {
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px',
    transition: 'background-color 0.3s ease',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
  loading: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    fontSize: '18px',
    fontWeight: 'bold',
  },
  noPosts: {
    fontSize: '18px',
    color: '#555',
  },
};

export default Profile;
