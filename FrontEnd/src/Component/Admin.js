import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import API from "./API/API";

const fetchInfo = async (endpoint) => {
  try {
    const response = await API(`/post${endpoint}`, "GET");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const adminCheck = async () => {
  try {
    const response = await API("/auth/info", "GET");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const sharePost = async (postId) => {
  try {
    await API(`/post/${postId}/request/review/ok`, "POST");
    alert("게시글이 공유 요청되었습니다!");
    window.location.reload();
  } catch (error) {
    console.error("Failed to send share request:", error);
    alert("게시글 공유 요청에 실패했습니다.");
  }
};

const PostCard = ({ post, onClick, showShareButton }) => (
  <div style={styles.card} onClick={() => onClick(post.postId)}>
    <img src={post.postImgUrl} alt="Post" style={styles.image} />
    <div style={styles.content}>
      <p>
        <strong>Username:</strong> {post.username}
      </p>
      <p>
        <strong>Text:</strong> {post.postText}
      </p>
      {showShareButton && (
        <button
          style={styles.shareButton}
          onClick={(e) => {
            e.stopPropagation();
            sharePost(post.postId);
          }}
        >
          공유하기
        </button>
      )}
    </div>
  </div>
);

const PostSection = ({ title, endpoint, showShareButton }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const admin = await adminCheck();
        if (!(admin.email === "God@Admin" && admin.username === "God")) {
          navigate("/");
        }
        const result = await fetchInfo(endpoint);
        setData(result || []);
      } catch (error) {
        setError(error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint, navigate]);

  const handlePostClick = (postId) => {
    navigate(`/view/post/${postId}`);
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
            {data.length > 0 ? (
              data.map((post) => (
                <PostCard
                  key={post.postId}
                  post={post}
                  onClick={handlePostClick}
                  showShareButton={showShareButton}
                />
              ))
            ) : (
              <div>No posts available</div>
            )}
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
      <PostSection title="모든 게시글" endpoint="/a/view" />
      <PostSection title="공유된 게시글" endpoint="/t/view" />
      <PostSection title="검열된 게시글" endpoint="/f/view" />
      <PostSection
        title="재검토 요청된 게시글"
        endpoint="/r/view"
        showShareButton={true}
      />
    </div>
  );
};

const styles = {
  scrollContainer: {
    display: "flex",
    overflowX: "auto",
    whiteSpace: "nowrap",
    gap: "10px",
    padding: "10px 0",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "200px",
    cursor: "pointer",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  content: {
    marginTop: "10px",
    textAlign: "center",
  },
  shareButton: {
    marginTop: "10px",
    backgroundColor: "#28a745",
    color: "white",
    border: "none",
    borderRadius: "5px",
    padding: "8px 12px",
    cursor: "pointer",
  },
};

export default Admin;
