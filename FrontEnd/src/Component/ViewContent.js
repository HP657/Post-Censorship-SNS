import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "../Css/Content.css";
import { Link } from "react-router-dom";
import API from "./API/API";

const ViewContent = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = async () => {
    try {
      const response = await API("/post/t/view", "GET");
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts: ", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  return (
    <div className="content-area">
      {posts.length === 0 ? (
        <p>게시물가 없습니다.</p>
      ) : (
        <div className="posts-container">
          {posts.map((post) => (
            <div key={post.postId} className="post-item">
              <Link to={`/view/post/${post.postId}`}>
                <p>닉네임 : {post.username || "Unknown User"}</p>
                <img
                  src={post.postImgUrl}
                  alt={post.postText}
                  className="post-image"
                />
              </Link>
              <p className="post-text">{post.postText}</p>
              <p className="post-share">{post.share ? "공유됨" : "비공유"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

ViewContent.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      username: PropTypes.string,
      postImgUrl: PropTypes.string.isRequired,
      postText: PropTypes.string.isRequired,
      share: PropTypes.bool.isRequired,
      postId: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ViewContent;
