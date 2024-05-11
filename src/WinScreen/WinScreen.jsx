import React from 'react';
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './style.css';
import "../../globals.css";
import "@dotlottie/react-player/dist/index.css";
import { DotLottiePlayer } from "@dotlottie/react-player";
function WinScreen() {
  const { token } = useParams();
  const navigate = useNavigate();

  function validateTokenClientSide(token) {
    const storedToken = sessionStorage.getItem('winToken');
    return token === storedToken;
  }

  useEffect(() => {
    const isValid = validateTokenClientSide(token);
    if (!isValid) {
      // Redirect to home page or show an error
      navigate('/'); // Assuming you have an error route
    }
  }, [token, navigate]);
  
  return (
    <div className="gameBackground">
      <div className="game-container" role="main">
        <div className="game-header animate__animated animate__bounceInDown">
          <h1 id="gameTitle" className="title">Congratulations!</h1>
        </div>
        <div className="select-card-design" >
          <p >You have completed our secret game!</p>
          <p>Your reward is this enchanted cookie!</p>
        </div>
      </div>
          <div className="lottie-container-cookie">
            <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>
            <DotLottiePlayer src="https://lottie.host/b996ad72-72f6-43f2-8453-b8ec30871f8d/7N04xbR3CZ.json"  speed="1" loop autoplay></DotLottiePlayer>
          </div>
    </div>
  );
}

export default WinScreen;
