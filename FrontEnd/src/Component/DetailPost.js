import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Css/DetailPost.css";
import API from "./API/API";

const DetailPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const postResult = await API(`/post/view/${postId}`, "GET");

        if (postResult.data) {
          setPost(postResult.data);
        } else {
          console.error("Failed to fetch post data.");
        }
      } catch (error) {
        console.error("Error fetching post data:", error);
      }

      try {
        const commentsResult = await API(`/comments/post/${postId}`, "GET");

        if (commentsResult.data) {
          setComments(commentsResult.data);
        } else {
          console.error("Failed to fetch comments.");
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchPostAndComments();
  }, [postId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      return;
    }
    try {
      const response = await API("/comments/add/comment", "POST", {
        postId: postId,
        commentText: newComment,
      });

      if (response) {
        setNewComment("");

        const commentsResult = await API(`/comments/post/${postId}`, "GET");
        setComments(commentsResult.data);
      } else {
        console.error("Failed to submit comment.");
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <div className="detail-post">
      <p className="post-author">닉네임: {post.username || "Unknown User"}</p>
      <img src={post.postImgUrl} alt={post.postText} className="detail-image" />
      <h3 className="post-title">{post.postText}</h3>
      <p className="post-share-status">
        {post.share ? "공유됨" : "공유되지 않음"}
      </p>

      <div className="comment-section">
        <input
          type="text"
          placeholder="댓글을 입력해주세요"
          value={newComment}
          onChange={handleCommentChange}
        />
        <button onClick={handleCommentSubmit}>입력</button>
      </div>

      <div className="comments-list">
        {comments.length === 0 ? (
          <p>댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.commentId} className="comment-item">
              <p>
                <strong>{comment.username || "Unknown User"}</strong>:{" "}
                {comment.commentText}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DetailPost;
