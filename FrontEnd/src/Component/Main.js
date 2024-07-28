import React, { useEffect, useState } from "react";
import axios from "axios";
import "./../Css/Main.css";

axios.defaults.withCredentials = true; // 모든 Axios 요청에 쿠키 포함

const Main = () => {
  const [userInfo, setUserInfo] = useState(null);

  const handleClick = (label) => {
    console.log(`${label} clicked`);
  };

  const fetchUserInfo = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/auth/info");
      setUserInfo(response.data.data);
    } catch (error) {
      console.error("Error fetching user info: ", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  return (
    <div className="container">
      <header className="header">
        <div className="logo">Logo</div>
      </header>
      <main className="content">
        <div>Content Area</div>
        {userInfo ? (
          <div>
            <p>Welcome, {userInfo.username}</p>
          </div>
        ) : (
          <p>Please log in.</p>
        )}
      </main>
      <footer className="footer">
        <div className="footerItem" onClick={() => handleClick("Home")}>
          <img src="/imgs/home.png" alt="Home" className="img" />
          <button className="button">Home</button>
        </div>
        <div className="footerItem" onClick={() => handleClick("Settings")}>
          <img src="/imgs/setting.png" alt="Settings" className="img" />
          <button className="button">Settings</button>
        </div>
        <div className="footerItem" onClick={() => handleClick("Menu")}>
          <img src="/imgs/hamburger.png" alt="Menu" className="img" />
          <button className="button">Menu</button>
        </div>
      </footer>
    </div>
  );
};

export default Main;
