import React from 'react';
import "../../globals.css";
function NotFound() {

  return (
    <div className="gameBackground">
      <div className="game-container" role="main">
        <div className="game-header animate__animated animate__bounceInDown">
          <h1 id="gameTitle" className="title">Oops!</h1>
        </div>
        <div className="select-card-design" >
            <p>This page does not exist</p>
            <p>Please return home</p>
        </div>
      </div>
    </div>
  );
}

export default NotFound;