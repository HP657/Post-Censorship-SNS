import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Css/MakePost.css";
import { useNavigate } from "react-router-dom";

const PostUploadForm = () => {
  const [postImg, setPostImg] = useState(null);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);  

  const navigate = useNavigate();

  const handleImageChange = (event) => {
    setPostImg(event.target.files[0]);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/auth/info");
        setUserInfo(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user info:", err);
        alert('로그인 하고 오셈');
        navigate('/signin');
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("postImg", postImg);
    formData.append("content", content);
    console.log(userInfo.data.username)
    formData.append("username", userInfo.data.username); 

    try {
      const response = await axios.post(
        "http://localhost:8080/api/post/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message);
      navigate('/');
    } catch (error) {
      console.error("Error uploading post:", error);
      setMessage("게시물 업로드 실패");
    }
  };

  const imagePreviewUrl = postImg ? URL.createObjectURL(postImg) : null;

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <div className="MKP-container">
      <h2 className="MKP-title">게시물 올리기</h2>
      {userInfo ? (
        <p>Welcome, {userInfo.data.username}!</p> 
      ) : (
        <p>Not logged in</p> 
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label className="MKP-label" htmlFor="postImg">
            이미지 업로드:
          </label>
          <input
            className="MKP-file-input"
            type="file"
            id="postImg"
            onChange={handleImageChange}
            required
          />
        </div>
        {imagePreviewUrl && (
          <div className="MKP-image-preview">
            <img src={imagePreviewUrl} alt="미리보기" />
          </div>
        )}
        <div>
          <label className="MKP-label" htmlFor="content">
            내용:
          </label>
          <textarea
            className="MKP-textarea"
            id="content"
            value={content}
            onChange={handleContentChange}
            required
          />
        </div>
        <button className="MKP-button" type="submit">
          게시물 올리기
        </button>
      </form>
      {message && <p className="MKP-message">{message}</p>}
    </div>
  );
};

export default PostUploadForm;
