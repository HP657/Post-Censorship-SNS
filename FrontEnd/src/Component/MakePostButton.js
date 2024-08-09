import React from "react";
import "../Css/Button.css";
import { useNavigate } from "react-router-dom";

const MakePostButton = () => {
  const handleClick = () => {
    console.log("포스트 작성하기 버튼 클릭됨");
    navigate('/mapo')
  };

  const navigate = useNavigate();

  return (
    <div className="postbutton-container">
      <button className="postbutton" onClick={handleClick}>포스트 작성하기</button>
    </div>
  );
};

export default MakePostButton;
