import React from 'react';
import './../Css/Main.css';

const Main = () => {
  const handleClick = (label) => {
    console.log(`${label} clicked`);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo">Logo</div>
      </header>
      <main className="content">
        <div>Content Area</div>
      </main>
      <footer className="footer">
        <div className="footerItem" onClick={() => handleClick('Home')}>
          <img src="/imgs/home.png" alt="Home" className="img" />
          <button className="button">Home</button>
        </div>
        <div className="footerItem" onClick={() => handleClick('Settings')}>
          <img src="/imgs/setting.png" alt="Settings" className="img" />
          <button className="button">Settings</button>
        </div>
        <div className="footerItem" onClick={() => handleClick('Menu')}>
          <img src="/imgs/hamburger.png" alt="Menu" className="img" />
          <button className="button">Menu</button>
        </div>
      </footer>
    </div>
  );
};

export default Main;

