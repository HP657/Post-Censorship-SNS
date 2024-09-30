import React, { useState, useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/post/my/post"
        );
        setPosts(response.data.data);
        console.log(posts);
      } catch (error) {
        setError("Failed to load posts.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const requestReview = async (postId) => {
    try {
      await axios.post(
        `http://localhost:8080/api/post/${postId}/request/review`
      );
      alert("재검토 요청");

      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.postId === postId ? { ...post, reviewRequested: true } : post
        )
      );
    } catch (error) {
      alert("Failed to request review.");
    }
  };

  const deletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:8080/api/post/delete/${postId}`);
      alert("게시물이 삭제되었습니다.");

      // 삭제 후, 해당 게시물을 posts 상태에서 제거
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.postId !== postId)
      );
    } catch (error) {
      alert("게시물 삭제에 실패했습니다.");
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
            <p style={styles.noPosts}>게시물이 없습니다.</p>
          ) : (
            posts.map((post) => (
              <div key={post.postId} style={styles.card}>
                <img src={post.postImgUrl} alt="Post" style={styles.image} />
                <div style={styles.content}>
                  <p>
                    <strong>Username:</strong> {post.username}
                  </p>
                  <p>
                    <strong>Text:</strong> {post.postText}
                  </p>
                  <p>
                    <strong>Shared:</strong> {post.share ? "Yes" : "No"}
                  </p>
                  {post.share ? (
                    <p style={styles.reviewStatus}>공유됨</p>
                  ) : post.reviewRequested ? (
                    <p style={styles.reviewStatus}>재검토 요청 중</p>
                  ) : (
                    <button
                      style={styles.button}
                      onClick={() => requestReview(post.postId)}
                    >
                      재검토 요청
                    </button>
                  )}
                  <button
                    style={{ ...styles.button, backgroundColor: "red" }}
                    onClick={() => deletePost(post.postId)}
                  >
                    삭제하기
                  </button>
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
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "15px",
    margin: "10px 0",
    width: "100%",
    maxWidth: "600px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s ease",
  },
  image: {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "10px",
    marginBottom: "10px",
  },
  content: {
    textAlign: "center",
  },
  button: {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 20px",
    fontSize: "16px",
    cursor: "pointer",
    marginTop: "10px",
    transition: "background-color 0.3s ease",
  },
  loading: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: "18px",
    fontWeight: "bold",
  },
  noPosts: {
    fontSize: "18px",
    color: "#555",
  },
  reviewStatus: {
    color: "#555",
    fontSize: "16px",
    marginTop: "10px",
  },
};

export default Profile;
