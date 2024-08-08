import React, { useState } from "react";
import axios from "axios";
import "../Css/MakePost.css";

const PostUploadForm = () => {
  const [postImg, setPostImg] = useState(null);
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");

  const handleImageChange = (event) => {
    setPostImg(event.target.files[0]);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("postImg", postImg);
    formData.append("content", content);

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
    } catch (error) {
      console.error("Error uploading post:", error);
      setMessage("게시물 업로드 실패");
    }
  };

  const imagePreviewUrl = postImg ? URL.createObjectURL(postImg) : null;

  return (
    <div className="MKP-container">
      <h2 className="MKP-title">게시물 올리기</h2>
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
