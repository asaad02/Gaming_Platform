/* eslint-disable react/prop-types */
/* eslint-disable max-len */
import React from 'react';

// Defines a React functional component for displaying game instructions in a modal.
const HowToPlayGame = ({onClose}) => {
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="how-to-play-modal" onClick={onClose}>
      <div className="how-to-play-content" onClick={stopPropagation}>
        <h2>How to Play the Game</h2>
        <p>Welcome to the 8 Ball Pool:</p>
        <ul>
          <li>Move your cursor to aim the cue.</li>
          <li>Hold space and release at your desired cue speed.</li>
          <li>
            Adjust the volume of background music and sound effects using the volume slider located in the upper left corner of the game screen.
          </li>
          <li>After a foul, click on the desired location on the table to place the white ball.</li>
          <li>
            Or click left mouse button to hit at max speed.
            <img
              src="public/assets/mouseclick.png"
              alt="Click Mouse Button"
              style={{maxWidth: '50px', display: 'inline-block', marginLeft: '10px', verticalAlign: 'middle'}}
            />
          </li>
        </ul>
        <p>Remember, strategy and practice are key to mastering 8 Ball Pool. Good luck from Team 3</p>
        <button onClick={onClose} className="close-button">&times;</button>
      </div>
    </div>
  );
};

export default HowToPlayGame;

