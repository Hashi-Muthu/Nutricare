import React from 'react';
import './Main.css'; // Import your CSS file
import bg from '../images/N.jpg'; // Import your background image
import logo from '../images/Newlogo.png'; // Import your logo image
import guidanceVideo from '../Videos/VG.mp4'; // Import your video

const FrontPage = () => {
  return (
    <div className="front-page">
      
           
          
      <header style={{ backgroundImage: `url(${bg})` }}>
      <img src={logo} alt="Logo" className="logo" />
        <div className="header-content">
          
          <h1>WELCOME</h1>
          <p>Start your healthy journey with us</p>
          <div className="buttons">
            <a href="/gq" className="buttonf">
              Go to Another Page
            </a>
            <a href="#guidance-video" className="buttonf">
              Watch Guidance Video
            </a>
          </div>
        </div>
      </header>
      <div className="body">
        
        <div className="video-container">
          <h2 id='guidance-video'>Video Guidance</h2>
          
          <video
            src={guidanceVideo}
            
            controls
            className="guidance-video"
          ></video>
        </div>
      
      </div>
    </div>
  );
};

export default FrontPage;
