import React from 'react';
import '../../globals.css';
import './style.css';
const Card = ({cardId, imageSource, flipCard, isFlipped, isLocked}) => {
  const cardClassName = `card ${isFlipped ? 'flipped' : ''}`;

  return (
    <div className={cardClassName} data-image={imageSource} data-card-id={cardId}
      onClick={!isFlipped && !isLocked ? () => flipCard(cardId) : undefined}>
      <div className = 'front-face'>
        <img src='../../public/assets/9461.jpg' alt="Card Face" />
      </div>
      <div className='back-face'>
        {isFlipped && <img src = {imageSource} alt="Card Back"/>}
      </div>
    </div>
  );
};

export default Card;
