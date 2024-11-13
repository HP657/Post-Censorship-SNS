import React, { useEffect, useState } from "react";
import "../Css/Main.css";
import MakePostButton from "./MakePostButton";
import { Outlet, useNavigate } from "react-router-dom";
import API from "./API/API";

const Main = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [UserProfileImg, setUserProfileImg] = useState("imgs/person.png");
  const navigate = useNavigate();

  const handleClick = (label) => {
    switch (label) {
      case "Home":
        navigate("/");
        break;
      case "Profile":
        navigate("/mypage");
        break;
      default:
        break;
    }
  };

  const fetchUserInfo = async () => {
    try {
      const response = await API("/auth/info", "GET");
      const fetchedUserInfo = response.data;
      setUserInfo(fetchedUserInfo);
      if (fetchedUserInfo && fetchedUserInfo.profileImgUrl) {
        setUserProfileImg(fetchedUserInfo.profileImgUrl);
      }
    } catch (error) {
      console.error("Error fetching user info: ", error);
    }
  };

  const logout = async () => {
    try {
      await API("/auth/logout", "POST");
      setUserInfo(null);
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <img
          className="logo"
          src="/imgs/Logo.png"
          onClick={() => handleClick("Home")}
          alt="Logo"
        />
        <MakePostButton />
        <div className="loginarea">
          {userInfo ? (
            <div>
              <p>Welcome, {userInfo.username}</p>
              <button className="logout-button" onClick={logout}>
                로그아웃
              </button>
            </div>
          ) : (
            <div className="button-container">
              <button
                className="signup-button"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                회원가입
              </button>
              <button
                className="signin-button"
                onClick={() => {
                  navigate("/signin");
                }}
              >
                로그인
              </button>
            </div>
          )}
        </div>
      </header>
      <main className="content">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footerItem" onClick={() => handleClick("Home")}>
          <img src="/imgs/home.png" alt="Home" className="img" />
          <button className="footer-button">Home</button>
        </div>
        <div className="footerItem" onClick={() => handleClick("Profile")}>
          <img src={UserProfileImg} alt="Profile" className="img" />
          <button className="footer-button">Profile</button>
        </div>
      </footer>
    </div>
  );
};

export default Main;
