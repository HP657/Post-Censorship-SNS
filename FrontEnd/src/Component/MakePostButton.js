import React from "react";
import "../Css/Button.css";
import { useNavigate } from "react-router-dom";

const MakePostButton = () => {
  const navigate = useNavigate();

  return (
    <div className="postbutton-container">
      <button className="postbutton" onClick={() => navigate("/mapo")}>
        게시물 작성하기
      </button>
    </div>
  );
};

export default MakePostButton;
