// import React, { useEffect } from "react";
// import "./../Css/Main.css";
// import axios from "axios";

// const Main = () => {
//   const handleClick = (label) => {
//     console.log(`${label} clicked`);
//   };

//   const info = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/api/auth/info");
//       console.log(response.data);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//     }
//   };

//   useEffect(() => {
//     info();
//   }, []);

//   return (
//     <div className="container">
//       <header className="header">
//         <div className="logo">Logo</div>
//       </header>
//       <main className="content">
//         <div>Content Area</div>
//       </main>
//       <footer className="footer">
//         <div className="footerItem" onClick={() => handleClick("Home")}>
//           <img src="/imgs/home.png" alt="Home" className="img" />
//           <button className="button">Home</button>
//         </div>
//         <div className="footerItem" onClick={() => handleClick("Settings")}>
//           <img src="/imgs/setting.png" alt="Settings" className="img" />
//           <button className="button">Settings</button>
//         </div>
//         <div className="footerItem" onClick={() => handleClick("Menu")}>
//           <img src="/imgs/hamburger.png" alt="Menu" className="img" />
//           <button className="button">Menu</button>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Main;

import React, { useEffect, useState } from "react";
import axios from "axios";

axios.defaults.withCredentials = true; // 모든 Axios 요청에 쿠키 포함

const Main = () => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/auth/info");
        setUserInfo(response.data.data);
      } catch (error) {
        console.error("Error fetching user info: ", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      <h1>Main Page</h1>
      {userInfo ? (
        <div>
          <p>Welcome, {userInfo.username}</p>
        </div>
      ) : (
        <p>Please log in.</p>
      )}
    </div>
  );
};

export default Main;
