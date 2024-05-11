/* eslint-disable max-len */
import React from 'react';

// Defines a React functional component for displaying game instructions in a modal.
const HowToPlayGame = ({onClose}) => {
  // Prevents the click event from closing the modal when clicking on the content.
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // The component renders a modal overlay that provides instructions on how to play.
  // It includes a detailed explanation of the game rules and mechanics.
  return (
    <div className="how-to-play-modal" onClick={onClose}>
      <div className="how-to-play-content" onClick={stopPropagation}>
        <h2>How to Play the Game</h2>
        <p>Welcome to the Matching Game! Here is how to play:</p>
        <ul>
          <li><strong>Objective:</strong> Match pairs of cards before time runs out.</li>
          <li><strong>Select Cards:</strong> Click a card to reveal its image.</li>
          <li><strong>Make a Match:</strong> Find and click the matching card.</li>
          <li><strong>Lives:</strong> You have a limited number of lives. A mismatch costs one life.</li>
          <li><strong>Levels:</strong> Complete all levels by matching all pairs in each level.</li>
          <li><strong>Time:</strong> Each level has a time limit. Beat the clock to advance!</li>
        </ul>
        <p>Remember, quick thinking and a good memory are your best tools.</p>
        <p>Good luck! from Team 3</p>
        {/* This button is styled as a close icon (×). When clicked, it calls the
                    onClose function provided as a prop, which is intended to hide the modal. */}
        <button onClick={onClose} className="close-button">&times;</button>
      </div>
    </div>
  );
};

export default HowToPlayGame;
