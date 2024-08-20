import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Css/DetailPost.css";
import axios from "axios";

const DetailPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState([]);

  useEffect(() => {
    // 포스트 및 댓글 데이터 가져오기
    const fetchPostAndComments = async () => {
      try {
        const postResponse = await fetch(
          `http://localhost:8080/api/post/view/${postId}`
        );
        const postResult = await postResponse.json();

        if (postResponse.ok && postResult.data) {
          setPost(postResult.data);
        } else {
          console.error("포스트 정보를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("포스트를 가져오는 중 오류 발생:", error);
      }

      try {
        const commentsResponse = await fetch(
          `http://localhost:8080/api/comments/post/${postId}`
        );
        const commentsResult = await commentsResponse.json();

        if (commentsResponse.ok && commentsResult.data) {
          setComments(commentsResult.data);
        } else {
          console.error("댓글 정보를 가져오는 데 실패했습니다.");
        }
      } catch (error) {
        console.error("댓글을 가져오는 중 오류 발생:", error);
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
      await axios.post(`http://localhost:8080/api/comments/add/comment`, {
        postId: postId,
        commentText: newComment,
      });
      setNewComment("");

      // 댓글 업데이트
      const response = await fetch(
        `http://localhost:8080/api/comments/post/${postId}`
      );
      const result = await response.json();
      setComments(result.data);
    } catch (error) {
      console.error("댓글 제출 중 오류 발생: ", error);
    }
  };

  if (!post) {
    return <p>로딩 중...</p>;
  }

  return (
    <div className="detail-post">
      <p className="post-author">
        닉네임: {post.username || "알 수 없는 사용자"}
      </p>
      <img src={post.postImgUrl} alt={post.postText} className="detail-image" />
      <h3 className="post-title">{post.postText}</h3>
      <p className="post-share-status">
        {post.share ? "공유된 포스트입니다." : "비공유 포스트입니다."}
      </p>

      <div className="comment-section">
        <input
          type="text"
          placeholder="댓글을 입력하세요"
          value={newComment}
          onChange={handleCommentChange}
        />
        <button onClick={handleCommentSubmit}>댓글 달기</button>
      </div>

      <div className="comments-list">
        {comments.length === 0 ? (
          <p>댓글이 없습니다.</p>
        ) : (
          comments.map((comment) => (
            <div key={comment.commentId} className="comment-item">
              <p>
                <strong>{comment.username || "알 수 없는 사용자"}</strong>:{" "}
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