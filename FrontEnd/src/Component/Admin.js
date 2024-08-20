import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const fetchPosts = async (endpoint) => {
  try {
    const response = await axios.get(`http://localhost:8080/api/post${endpoint}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const PostCard = ({ post, onClick }) => (
  <div style={styles.card} onClick={() => onClick(post.postId)}>
    <img src={post.postImgUrl} alt="Post" style={styles.image} />
    <div style={styles.content}>
      <p><strong>Username:</strong> {post.username}</p>
      <p><strong>Text:</strong> {post.postText}</p>
    </div>
  </div>
);

const PostSection = ({ title, endpoint }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await fetchPosts(endpoint);
        setData(result.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  return (
    <div>
      <h2>{title}</h2>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>Error fetching data</div>
      ) : (
        <div>
          <div ref={containerRef} style={styles.scrollContainer}>
            {data.map(post => (
              <PostCard key={post.postId} post={post} onClick={handlePostClick} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Admin = () => {
  return (
    <div className="Admin">
      <h1>Admin Dashboard</h1>
      <PostSection title="View A Posts" endpoint="/a/view" />
      <PostSection title="View T Posts" endpoint="/t/view" />
      <PostSection title="View F Posts" endpoint="/f/view" />
    </div>
  );
};

const styles = {
  scrollContainer: {
    display: 'flex',
    overflowX: 'auto',
    whiteSpace: 'nowrap',
    gap: '10px',
    padding: '10px 0',
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '200px',
    cursor: 'pointer',
  },
  image: {
    width: '100%',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  content: {
    marginTop: '10px',
    textAlign: 'center',
  },
};

export default Admin;
