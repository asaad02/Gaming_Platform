import React from 'react';

// Defines a React functional component for displaying game instructions in a modal.
const WinCrypto = ({onClose}) => {
  // Prevents the click event from closing the modal when clicking on the content.
  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  // The component renders a modal overlay that provides the password for the next teams game.
  // It includes a detailed explanation of the game rules and mechanics.
  return (
    <div className="how-to-play-modal" onClick={onClose}>
      <div className="how-to-play-content" onClick={stopPropagation}>
        <h2>Great work detective! You've found the murder weapon!</h2>
        <p>It appears more of the case files are missing!</p>
        <p>Continue to the next website to discover the suspects.</p>
        <p>The password to the next teams site is: pass</p>
        <p>Good luck! from Team 3</p>
        <button className='start-game-button' onClick={() => window.location.href = 'https://cis4250w24-04.socs.uoguelph.ca/team_4/index.php?custom_redirect=40524fa34471d1ffa2c56697a6bf4e4d'}>To Team 4</button>
      </div>
    </div>
  );
};

export default WinCrypto;