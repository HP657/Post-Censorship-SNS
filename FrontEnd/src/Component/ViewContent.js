import React from "react";
import PropTypes from "prop-types";
import "../Css/Content.css"; 

const ViewContent = ({ posts }) => {
    return (
      <div className="content-area">
        {posts.length === 0 ? (
          <p>포스트가 없습니다.</p>
        ) : (
          <div className="posts-container">
            {posts.map((post) => (
              <div key={post.postId} className="post-item">
                <p>{post.username || "Unknown User"}</p> {/* 기본값 설정 */}
                <img src={post.postImgUrl} alt={post.postText} className="post-image" />
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
