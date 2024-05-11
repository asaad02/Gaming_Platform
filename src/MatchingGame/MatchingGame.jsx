/* eslint-disable require-jsdoc */
/* eslint-disable max-len */
import React, {useState, useEffect, useRef} from 'react';
import {createElement} from 'react';
import '../../globals.css';
import './style.css';
import {store} from '../Leaderboard/LeaderboardManager/leaderboard-manager.js';
import {SessionContext} from '../SessionProvider/index.js';
import HowToPlayGame from '../HowToPlayGame/HowToplayGame';
import Card from './Card.jsx';

export function MatchingGame() {
  const {username} = React.useContext(SessionContext);

  const [showStartButton, setShowStartButton] = useState(true);
  const [showExitButton, setShowExitButton] = useState(false);
  const [showRestartButton, setShowRestartButton] = useState(false);
  const [showNextLevel, setShowNextLevel] = useState(false);
  const [boardVisible, setBoardVisible] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timerId, setTimerId] = useState(null);
  const [timer, setTimer] = useState(120); // Starting time in seconds
  const [timerActive, setTimerActive] = useState(false);
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [matchCount, setMatchCount] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const firstCard = useRef(null);
  const secondCard = useRef(null);
  const revealedCards = useRef({});
  const lockBoard = useRef(false);

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const [cardDesign, setCardDesign] = useState('playingCards');

  const [hintUsed, setHintUsed] = useState(false); // New state variable to track hint usage

  const [playingCardImages, setPlayingCardImages] = useState([
    {id: 1, url: '../public/assets/svg-cards/ace_of_clubs.svg', matched: false},
    {id: 2, url: '../public/assets/svg-cards/ace_of_diamonds.svg', matched: false},
    {id: 3, url: '../public/assets/svg-cards/ace_of_hearts.svg', matched: false},
    {id: 4, url: '../public/assets/svg-cards/ace_of_spades.svg', matched: false},
    {id: 5, url: '../public/assets/svg-cards/king_of_hearts.svg', matched: false},
    {id: 6, url: '../public/assets/svg-cards/king_of_diamonds.svg', matched: false},
    {id: 7, url: '../public/assets/svg-cards/king_of_clubs.svg', matched: false},
    {id: 8, url: '../public/assets/svg-cards/king_of_spades.svg', matched: false},
    {id: 9, url: '../public/assets/svg-cards/queen_of_hearts.svg', matched: false},
    {id: 10, url: '../public/assets/svg-cards/queen_of_diamonds.svg', matched: false},
    {id: 11, url: '../public/assets/svg-cards/queen_of_clubs.svg', matched: false},
    {id: 12, url: '../public/assets/svg-cards/queen_of_spades.svg', matched: false},
  ]);

  const [catCardImages, setCatCardImages] = useState([
    {id: 1, url: '../public/assets/cat-cards/1.png', matched: false},
    {id: 2, url: '../public/assets/cat-cards/2.png', matched: false},
    {id: 3, url: '../public/assets/cat-cards/3.png', matched: false},
    {id: 4, url: '../public/assets/cat-cards/4.png', matched: false},
    {id: 5, url: '../public/assets/cat-cards/5.png', matched: false},
    {id: 6, url: '../public/assets/cat-cards/6.png', matched: false},
    {id: 7, url: '../public/assets/cat-cards/7.png', matched: false},
    {id: 8, url: '../public/assets/cat-cards/8.png', matched: false},
    {id: 9, url: '../public/assets/cat-cards/9.png', matched: false},
    {id: 10, url: '../public/assets/cat-cards/10.png', matched: false},
    {id: 11, url: '../public/assets/cat-cards/11.png', matched: false},
    {id: 12, url: '../public/assets/cat-cards/12.png', matched: false},
  ]);

  const [superHeroCardImages, setSuperHeroCardImages] = useState([
    {id: 1, url: '../public/assets/superhero-cards/1.png', matched: false},
    {id: 2, url: '../public/assets/superhero-cards/2.png', matched: false},
    {id: 3, url: '../public/assets/superhero-cards/3.png', matched: false},
    {id: 4, url: '../public/assets/superhero-cards/4.png', matched: false},
    {id: 5, url: '../public/assets/superhero-cards/5.png', matched: false},
    {id: 6, url: '../public/assets/superhero-cards/6.png', matched: false},
    {id: 7, url: '../public/assets/superhero-cards/7.png', matched: false},
    {id: 8, url: '../public/assets/superhero-cards/8.png', matched: false},
    {id: 9, url: '../public/assets/superhero-cards/9.png', matched: false},
    {id: 10, url: '../public/assets/superhero-cards/10.png', matched: false},
    {id: 11, url: '../public/assets/superhero-cards/11.png', matched: false},
    {id: 12, url: '../public/assets/superhero-cards/12.png', matched: false},
  ]);
  const [cards, setCards] = useState(() => generateCardsForLevel(1));

  // Generic popup for relaying message to the user
  function GameModal({isOpen, onClose, message}) {
    if (!isOpen) return null;

    let emoji = null;
    if (message === 'Oops, you have run out of time. Please play again!' || message === 'Oops, you have run out of lives. Please play again!') {
      emoji = <img className="modal-emoji" src="../../public/assets/DisappointedEmoji.png" alt="Disappointed Emoji" />;
    } else {
      emoji = <img className="modal-emoji" src="../../public/assets/SunglassesEmoji.png" alt="Disappointed Emoji" />;
    }

    return (
      <div className="modal">
        <div className="modal-content">
          {emoji}
          <h2 className='modal-message'>{message}</h2>
          <button onClick={onClose} className="modal-button">Close</button>
        </div>
      </div>
    );
  }

  // To close the modal
  function handleCloseModal() {
    setModalOpen(false);
  }
  const startTimer = () => {
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
    setTimerActive(true);
    setTimer(120);
  };

  const stopTimer = () => {
    setTimerActive(false);
    if (timerId) {
      clearInterval(timerId);
      setTimerId(null);
    }
  };
  // Decrement the timer every 1000 miliseconds
  useEffect(() => {
    if (timerActive && !timerId) {
      const id = setInterval(() => {
        setTimer((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
      setTimerId(id); // Store the new timer ID
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
        setTimerId(null);
      }
    };
  }, [timerActive]);
  // chcek every timer decrement that the player has not ran out of time
  useEffect(() =>{
    if (timer <= 0) {
      stopTimer();
      if (timer <= 0 && lives > 0) {
        setModalMessage('Oops, you have run out of time. Please play again!');
        setModalOpen(true);
        exitGame();
      } else if (timer <= 0 && lives <= 0) {
        setModalMessage('Oops, you have run out of lives. Please play again!');
        setModalOpen(true);
        exitGame();
      }
    }
  }, [timer]);
  // Initializes first level as well as next levels
  const startGame = (isRestartGame) => {
    // Toggle button displays
    setShowExitButton(true);
    setShowRestartButton(false);
    setShowNextLevel(false);
    setShowStartButton(false);
    lockBoard.current = false;
    if (isRestartGame) {
      setScore(0);
      setCurrentLevel(1);
    } else {
      setCurrentLevel((prevCurrentLevel) => prevCurrentLevel + 1);
    }
    setLives(3);
    setGameStarted(true);
    setGameOver(false);
    startTimer();
    setBoardVisible(true);
  };

  // Create new board when level changes
  useEffect(() => {
    setCards(generateCardsForLevel(currentLevel));
  }, [currentLevel]);

  function generateCardsForLevel(level) {
    // Start with 8 cards and add 4 cards for every level.
    const numberOfPairs = 4 + (level - 1) * 2;
    let selectedImages = [];
    // Choose the card design
    if (cardDesign === 'playingCards') {
      selectedImages = playingCardImages.slice(0, numberOfPairs);
    } else if (cardDesign === 'catCards') {
      selectedImages = catCardImages.slice(0, numberOfPairs);
    } else if (cardDesign === 'superheroCards') {
      selectedImages = superHeroCardImages.slice(0, numberOfPairs);
    }


    let cards = [];
    let idCounter = 0;

    for (const image of selectedImages) {
      cards.push({...image, id: idCounter++, isLocked: false});
      cards.push({...image, id: idCounter++, isLocked: false});
    }
    // Shuffle the cards
    cards = shuffleCards(cards);
    return cards;
  };
  // Fisher-Yates random shuffle algorithm
  function shuffleCards(cards) {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards;
  };

  function flipCard(cardId) {
    // Don't allow the player to flip the card if the board is locked
    // ie they have already selected 2 cards or have lost
    const selectedCard = cards.find((card) => card.id === cardId);
    if (lockBoard.current || selectedCard === firstCard.current) return;

    // flip the card
    const updatedCards = cards.map((card) =>
      card.id === cardId ? {...card, isFlipped: true, isLocked: true} : card,
    );
    setCards(updatedCards);
    // save the card for comparison
    if (!firstCard.current) {
      firstCard.current = selectedCard;
      return;
    } else {
      secondCard.current = selectedCard;
      lockBoard.current=true;
    }
    // if the player has selected 2 cards then lock all remaining unflipped cards
    const lockCards = updatedCards.map((card) => {
      if (!card.isFlipped) {
        return {...card, isLocked: true};
      } else {
        return card;
      }
    });
    setCards(lockCards);
    // Record the number of times the player clicks on each card
    // If this is the first time the card is selected then initialize the card in the array
    if (!revealedCards.current[firstCard.current.id]) {
      revealedCards.current[firstCard.current.id] = 1;
    }

    if (!revealedCards.current[secondCard.current.id]) {
      revealedCards.current[secondCard.current.id] = 1;
    }
    checkForMatch(lockCards);
  }

  // Show the back side of the card to the user
  function unflipCards(firstId, secondId) {
    setTimeout(() => {
      const updatedCards = cards.map((card) => {
        if (card.id === firstId || card.id === secondId) {
          return {...card, isFlipped: false, isLocked: false};
        }
        return card;
      });
      setCards(updatedCards);
      resetBoard();
    }, 1500);
  }

  function checkForMatch(lockCards) {
    // check if the cards match
    const isMatch = firstCard.current.url === secondCard.current.url;
    if (!isMatch) {
      // if the cards dont match then unflip the selected ones and then unlock the unflipped ones
      unflipCards(firstCard.current.id, secondCard.current.id, () => {
        lockBoard.current = false;
        const unlockCards = lockCards.map((card) => {
          if (!card.isFlipped) {
            return {...card, isLocked: false};
          } else {
            return card;
          }
        });
        setCards(unlockCards);
      });
    }

    lockBoard.current = false;
    if (isMatch) {
      // if the cards match then keep the cards facing the user
      // and check if the user has won
      firstCard.current = null;
      secondCard.current = null;
      setMatchCount((prevMatchCount) => {
        const updatedMatchCount = prevMatchCount + 1;
        const isWin = checkWin(updatedMatchCount);
        if (!isWin) {
          return updatedMatchCount;
        } else {
          return;
        }
      });
      // unlock the remaining unflipped cards
      const unlockCards = lockCards.map((card) => {
        if (!card.isFlipped) {
          return {...card, isLocked: false};
        } else {
          return card;
        }
      });
      setCards(unlockCards);
    } else if (revealedCards.current[firstCard.current.id] > 1 || revealedCards.current[secondCard.current.id] > 1) {
      // If the user has already revealed either card then remove a life
      // And check if they have ran out of lives
      setLives((prevLives) => {
        const updatedLives = prevLives - 1;

        if (updatedLives <= 0) {
          stopTimer();
          setModalMessage('Oops, you have run out of lives. Please play again!');
          setModalOpen(true);
          exitGame();
        }
        return updatedLives;
      });
    } else {
      // Record that the user has checked the card
      revealedCards.current[firstCard.current.id]++;
      revealedCards.current[secondCard.current.id]++;
    }
  }
  // Reset the firstCard, secondCard
  function resetBoard() {
    firstCard.current = null;
    secondCard.current = null;
  }
  // restart the game to the first level and reset tracking variables
  function restartGame() {
    // Reset the board state
    firstCard.current = null;
    secondCard.current = null;
    revealedCards.current = {};
    lockBoard.current = false;

    // Reset game state variables
    setMatchCount(0);
    setLives(3);
    setScore(0);
    setCurrentLevel(1);
    setHintUsed(false); // Ensure hint is reset
    setGameOver(false);
    setGameStarted(true);
    setBoardVisible(true);

    // Generate a new set of cards for the first level
    const newCards = generateCardsForLevel(1);
    // Ensure all cards are reset to an unmatched and unflipped state
    const resetCards = newCards.map((card) => ({...card, matched: false, isFlipped: false}));
    setCards(resetCards);

    // Restart the timer
    startTimer();
    startGame(true);
  }

  function checkWin(newMatchCount) {
    // calculate the number of pairs based on the current level
    // And check if the user has beaten the level
    const numberOfPairs = 4 + 2 * (currentLevel - 1);
    if (newMatchCount === numberOfPairs) {
      stopTimer();
      let message = 'Congratulations, you won the level!';
      setModalMessage(message);
      setModalOpen(true);
      // Reset values for next level
      setMatchCount(0);
      revealedCards.current = {};
      setLives(3);
      // Calculate the players score
      switch (currentLevel) {
        case 1:
          setScore((prevScore) => prevScore + 100);
          break;
        case 2:
          setScore((prevScore) => prevScore + 200);
          break;
        case 3:
          setScore((prevScore) => prevScore + 300);
          break;
        case 4:
          setScore((prevScore) => prevScore + 400);
          break;
        default:
          break;
      }


      // toggle buttons
      setGameStarted(true);
      setShowExitButton(true);
      setShowRestartButton(false);
      setShowStartButton(false);
      setShowNextLevel(true);

      // Automatically proceed to the next level after a short delay
      setTimeout(() => {
        if (currentLevel < 4) {
          setCurrentLevel((prevLevel) => prevLevel + 1);
          startGame(false); // Start the next level
        } else {
          message = 'Congratulations, you have completed all levels!';
          stopTimer();
          setModalMessage(message);
          setModalOpen(true);
          setCurrentLevel(1);
          exitGame();
        }
      }, 500); // Set delay as needed

      return true;
    }
    return false;
  }

  function exitGame() {
    stopTimer();
    const unflippedCards = cards.map((card) => ({
      ...card,
      isFlipped: false,
      isLocked: false,
    }));

    setCards(unflippedCards);
    setMatchCount(0);
    resetBoard();
    setBoardVisible(false);
    if (username != 'Friends' && username != '') {
      store(1, score, username);
    }
    clearInterval(timer);
    revealedCards.current = {};
    setGameOver(true);

    setShowExitButton(false);
    setShowRestartButton(true);
    setShowStartButton(false);

    // const gameBoardElement = document.getElementById('gameBoard');
    // if (gameBoardElement) {
    //   gameBoardElement.innerHTML = '';
    // }
  }

  const onCardDesignChange = (e) => {
    setCardDesign(e.target.value);
  };

  // New function to handle the hint action
  const useHint = () => {
    // Temporarily flip all unmatched and not already flipped cards
    const flippedCards = cards.map((card) => {
      if (!card.matched && !card.isFlipped) {
        return {...card, isFlipped: true, hintFlip: true}; // Add a temporary property to mark cards flipped by the hint
      }
      return card;
    });
    setCards(flippedCards);

    // Set a timeout to flip the unmatched cards back after 1 second
    setTimeout(() => {
      const unflippedCards = flippedCards.map((card) => {
        // Only unflip cards that were flipped by the hint and are not matched
        if (card.hintFlip) {
          return {...card, isFlipped: false, hintFlip: false};
        }
        return card;
      });
      setCards(unflippedCards);
    }, 1000);

    setHintUsed(true); // Mark the hint as used
  };

  // Update the useEffect for level change to reset the hintUsed state
  useEffect(() => {
    setCards(generateCardsForLevel(currentLevel));
    setHintUsed(false); // Reset hint usage on level change
  }, [currentLevel]);

  return (
    <div className="gameBackground">
      <div className="game-container" role="main">
        <div className="game-header animate__animated animate__bounceInDown">
          <h1 id="gameTitle" hidden={gameStarted} className="title">MATCH THE CARDS</h1>
          <div className="game-info" hidden={!gameStarted}>
            <p id="timerDisplay" hidden={!gameStarted}>{timer} seconds</p>
            <p id="livesDisplay" hidden={!gameStarted}>Lives: {lives}</p>
            <p id="scoreDisplay" hidden={!gameStarted}>Score: {score}</p>
          </div>
          <div className="select-card-design" hidden={gameStarted}>
            <h2>Please select the card design</h2>
            <form>
              <label className='radio-button-container' htmlFor="playingCards">Playing Cards
                <input type="radio" name="cardDesign" value="playingCards" id="playingCards" defaultChecked onChange={onCardDesignChange}/>
                <span className='checkmark'></span>
              </label>
              <label className='radio-button-container' htmlFor="catCards">Cat Cards
                <input type="radio" name="cardDesign" value="catCards" id="catCards" onChange={onCardDesignChange}/>
                <span className='checkmark'></span>
              </label>

              <label className='radio-button-container' htmlFor="superheroCards">Superhero Cards
                <input type="radio" name="cardDesign" value="superheroCards" id="superheroCards" onChange={onCardDesignChange}/>
                <span className='checkmark'></span>
              </label>
              
              

            </form>
          </div>
        </div>

        <section id="gameBoard" className={`game-board ${boardVisible ? 'animate__animated animate__fadeIn' : 'hidden'}`}
          style={{display: boardVisible ? 'grid' : 'none'}}>
          {cards.map((card) => (
            <Card
              key={card.id}
              cardId={card.id}
              imageSource={card.url}
              flipCard={flipCard}
              isFlipped={card.isFlipped}
              isLocked={card.isLocked}
            />
          ))}
        </section>
        <p className={`${!gameOver ? 'hidden' : ''}`}>Game Over. Thank you for playing!</p>

        <footer className="game-footer">
          <button id="startButton" className={`game-button ${showStartButton ? '' : 'hidden'}`} onClick={() => startGame(false)}>
            Play
          </button>
          <button id="exitButton" className={`game-button ${showNextLevel ? '' : 'hidden'} animate__animated animate__fadeIn`} onClick={() => startGame(false)}
            aria-label="Exit Game">Next Level</button>
          <button id="restartButton" className={`game-button ${showRestartButton ? '' : 'hidden'} animate__animated animate__fadeIn`} onClick={() => restartGame()}
            aria-label="Restart Game">Restart</button>
          <button id="exitButton" className={`game-button ${showExitButton ? '' : 'hidden'} animate__animated animate__fadeIn`} onClick={() => exitGame()}
            aria-label="Exit Game">Give Up</button>
          <button
            className={`game-button ${!hintUsed && gameStarted ? '' : 'hidden'}`}
            onClick={useHint}
            aria-label="Hint"
          >
          Hint
          </button>
          {/* Button to open the HowToPlayGame modal */}
          <button className="game-button" onClick={() => setShowModal(true)} aria-label="How to Play">How to Play</button>
          {/* Conditional rendering of the HowToPlayGame modal */}
          {showModal && (
            <HowToPlayGame onClose={() => setShowModal(false)} />
          )}
          {/* button to exit the game */}
          <button className="game-button" onClick={() => window.location.href = '/'} aria-label="Exit Game">Exit Game</button>
        </footer>

        <GameModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          message={modalMessage}
        />
      </div>
      {/* </body> */}
    </div>
  );
}

export default MatchingGame;
