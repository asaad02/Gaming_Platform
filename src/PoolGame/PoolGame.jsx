import React, { useEffect, useRef, useState, createContext } from 'react';
import Ball from './Ball/ball';
import Stick from './Stick/Stick';
import './style.css';

import ColourSelector from './ColourSelector.jsx';

export const PoolContext = createContext();
import { SessionContext } from '../SessionProvider/SessionProvider.jsx';

import {store} from '../Leaderboard/LeaderboardManager/leaderboard-manager.js';


// Assets import section for game elements such as balls, the table, and the cue stick
import redBallAsset from '../../public/assets/pool-cards/ball_3.png';
import blueBallAsset from '../../public/assets/pool-cards/ball_2.png';
import blackBallAsset from '../../public/assets/pool-cards/ball_8.png';
import whiteBallAsset from '../../public/assets/pool-cards/ball_16.png';
import tableAsset from '../../public/assets/pool-cards/table.png';
import stickAsset from '../../public/assets/pool-cards/cue.png';

import cueStrikeSound from '../../public/assets/pool-sounds/Cue_Strike.mp3';
import ballsHittingBallsSound from '../../public/assets/pool-sounds/Balls_Hitting_Other_Balls.mp3';
import ballbackgroundSound from '../../public/assets/pool-sounds/sunlights-and-coconuts-8888.mp3';
// Import the HowToPlayPool component
import HowToPlayPool from '../HowToPlayPool/HowToPlayPool';

// Defining constants for the pool table's dimensions
const TABLE_WIDTH = 1200;
const TABLE_HEIGHT = 600;



function GameModal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  let emoji = null;
  if (message === 'Game Over!') {
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

export function PoolGame() {
  // useRef hooks for canvas and game objects (balls and stick) to persist state without causing re-renders
  const canvasRef = useRef(null);
  const ballsRef = useRef([]);
  const stickRef = useRef(new Stick(600, 344, stickAsset));
  const { username } = React.useContext(SessionContext);

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  
  const [currentPlayer, setCurrentPlayer] = useState('Player 1');
  const playerTurn = useRef(currentPlayer);
  const [gameStarted, setGameStarted] = useState(false);

  const playerOneBallColour = useRef('blue');
  const playerTwoBallColour = useRef('red');

  const [playerOneColour, setPlayerOneColour] = useState('blue');
  const [playerTwoColour, setPlayerTwoColour] = useState('red');
 
  // state for volume Control - the volume will be set to 1 by default
  const [volume, setVolume] = useState(1);
  // State to control the HowToPlayPool modal
  const [showPoolModal, setShowPoolModal] = useState(false);


  // State to control music background
  const [isPlaying, setIsPlaying] = useState(true);
  let power = 0; // Define power as a non-state variable
  const [isAiming, setIsAiming] = useState(true); // New state to track if the player is aiming with the mouse

  // State variables for dynamic updates of balls
  const [playeroneballs, setPlayerOneBalls] = useState(0); // Initial value set to 0
  const [playertwoballs, setPlayerTwoBalls] = useState(0); // Initial value set to 0

  function onBallPocketed(ballColor) {
    // Update the player's balls based on the color of the pocketed ball
	if (ballColor === playerOneBallColour.current) {
		setPlayerOneBalls(prevBalls => prevBalls + 1);
	} else if (ballColor === playerTwoBallColour.current) {
		setPlayerTwoBalls(prevBalls => prevBalls + 1);
	}
	
  }

  // Toggle sound playing state
  const toggleSound = (event) => {

    setIsPlaying(prevIsPlaying => !prevIsPlaying);
    // Stop the event from bubbling up
    event.stopPropagation();
  };

  // Restart the game
  function restartGame() {
    location.reload();
  }



  useEffect(() => {
    // Load the background sound
    const backgroundSound = new Audio(ballbackgroundSound);
    // Set the audio to loop
    backgroundSound.loop = true;
    // set the volume based on state
    backgroundSound.volume = volume;

    const handleSpacebarDown = (event) => {
      // Check if the key pressed is the spacebar
      if (event.code === 'Space') {
        // Prevent the default behavior of scrolling
        event.preventDefault();
      }
    };
    // Add event listener for keydown event
    window.addEventListener('keydown', handleSpacebarDown);
    // Control sound playback based on isPlaying state
    if (isPlaying) {
      backgroundSound.play().catch((error) => console.error("Playback prevented by browser", error));
    } else {
      backgroundSound.pause();
    }
    // Cleanup function to pause sound when component unmounts
    return () => {
      backgroundSound.pause();
      // Reset the time to ensure it starts from the beginning if replayed
      backgroundSound.currentTime = 0;
      window.removeEventListener('keydown', handleSpacebarDown);
    };
  }, [isPlaying, volume]);

  // defining the six pockets
  const pockets = [
    { x: 64, y: 54, radius: 50 },
    { x: 606, y: 42, radius: 50 },
    { x: 1143, y: 54, radius: 50 },
    { x: 64, y: 544, radius: 50 },
    { x: 606, y: 557, radius: 50 },
    { x: 1143, y: 543, radius: 50 },
  ];

  useEffect(() => {
	
    let power = 0;
    let playerShot = false;
    let canShoot = true;

    // Setup the canvas and its drawing context
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    // Load and display the pool table background
    const tableImage = new Image();
    tableImage.src = tableAsset;
    tableImage.onload = () => ctx.drawImage(tableImage, 0, 0, TABLE_WIDTH, TABLE_HEIGHT);

    // Initialize game objects like balls and stick
    initGameObjects();

    // Mouse move listener to adjust the stick's orientation around the white ball based on cursor position
    const handleMouseMove = (event) => {
      setIsAiming(true); // Player is aiming with the mouse
      const whiteBall = ballsRef.current.find((ball) => ball.color === "white");

      if (!whiteBall || Math.abs(whiteBall.vx) > 0.1 || Math.abs(whiteBall.vy) > 0.1) {
        return;
      }

      stickRef.current.updatePositionAroundBall(
        whiteBall.x,
        whiteBall.y,
        whiteBall.radius,
        event.clientX,
        event.clientY,
        power
      );
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    // Mouse or Spacebar click listener to shoot the white ball
    const handleShoot = (event) => {
		if (!gameStarted) { 
			setGameStarted(true);
		}
      if (((event.type === 'click') || ((event.type === 'keydown') && (event.code === 'Space')))) {
        const whiteBall = ballsRef.current.find((ball) => ball.color === "white");
        setIsAiming(false);

        // cant click if white ball is moving
        if (whiteBall && (whiteBall.vx === 0) && (whiteBall.vy === 0) && stickRef.current.visible) {
          // if the mouse is clicked, power will be set to 10
          if (event.type === 'click') {
            power = 10;
            // if the spacebar is pressed and held, power will be increased by 1
          } else if ((event.type === 'keydown') && (event.code === 'Space')) {
            power += 0.1;
            if (power >= 10) { // Reset power if it reaches or exceeds 10
              power = 0;
            }
          }
          // play the cue strike sound
          const strikeSound = new Audio(cueStrikeSound);
          strikeSound.play();
        }
      }
    };

    // handle increasing power of the shot
    const handlePower = (event) => {
      if ((((event.type === 'keyup') && (event.code === 'Space')) || ((event.type === 'click') && (power > 0)))) {
        const whiteBall = ballsRef.current.find((ball) => ball.color === "white");
        // if the white ball moving, the player can't shoot, if the stick is not visible, the player can't shoot
        if (whiteBall && (whiteBall.vx === 0) && (whiteBall.vy === 0) && stickRef.current.visible && (whiteBall.x > 0)) {
          playerShot = true;
          canShoot = false;
          // Calculate the velocity based on the stick's angle and power
          const velocity = {
            x: Math.cos(stickRef.current.angle) * power,
            y: Math.sin(stickRef.current.angle) * power
          };
          // Apply the velocity to the white ball
          whiteBall.vx = velocity.x;
          whiteBall.vy = velocity.y;
        }
        power = 0; // Reset power after the shot
      }
    };

    // handle placing the white ball at the mouse click position
    const placeWhiteBall = (event) => {
      const whiteBall = ballsRef.current.find((ball) => ball.color === "white");

      // if the white ball is at -100, -100, the player can place the ball at the mouse click position
      if (whiteBall && (whiteBall.x === -100) && (whiteBall.y === -100)) {
        // offset the white ball position to the mouse click position on the canvas
        whiteBall.x = event.clientX - canvas.getBoundingClientRect().left;
        whiteBall.y = event.clientY - canvas.getBoundingClientRect().top;
      }
    };

    // Add the click and keydown event listeners to the canvas
    canvas.addEventListener('click', handleShoot);
    window.addEventListener('keydown', handleShoot);
    window.addEventListener('keyup', handlePower);
    window.addEventListener('click', handlePower);
    canvas.addEventListener('click', placeWhiteBall);

    // Main game rendering loop
    const render = () => {
      ctx.clearRect(0, 0, TABLE_WIDTH, TABLE_HEIGHT); // Clear canvas for redrawing
      ctx.drawImage(tableImage, 0, 0, TABLE_WIDTH, TABLE_HEIGHT); // Redraw the table
      ballsRef.current.forEach((ball) => ball.draw(ctx)); // Draw each ball

      // Update stick position based on power when not aiming
      if (!isAiming) {
        const whiteBall = ballsRef.current.find(ball => ball.color === 'white');
        if (whiteBall && stickRef.current.visible) {
          // Update stick position without changing its angle
          stickRef.current.updatePositionAroundBall(whiteBall.x, whiteBall.y, whiteBall.radius, whiteBall.x, whiteBall.y, power);
        }
      }

      // Draw the stick if it's visible
      if (stickRef.current.visible) {
        stickRef.current.draw(ctx);
      }

      // Power bar background (white) with rounded corners
      const radius = 10; // Corner radius
      const x = 100; // X position, starting a bit further
      const y = TABLE_HEIGHT - 30; // Y position
      const width = Math.min(200, TABLE_WIDTH - x - 10); // Width, maxing out at 100 from the right edge
      const height = 20; // Height

      // Function to draw rounded rectangle
      function drawRoundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x + radius, y);
        ctx.lineTo(x + width - radius, y);
        ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        ctx.lineTo(x + width, y + height - radius);
        ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        ctx.lineTo(x + radius, y + height);
        ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        ctx.lineTo(x, y + radius);
        ctx.quadraticCurveTo(x, y, x + radius, y);
        ctx.closePath();
      }

      // Draw power bar background with rounded corners
      ctx.fillStyle = 'white';
      drawRoundedRect(ctx, x, y, width + 20, height, radius);
      ctx.fill();

      // Calculate the fill percentage
      const fillPercentage = Math.min(power / 10, 1) + 0.1; // Assuming power is a value from 0 to 10, maxing out at 100%

      // Create gradient based on fill percentage
      const gradient = ctx.createLinearGradient(x, 0, x + width, 0);
      gradient.addColorStop(0, 'green');
      gradient.addColorStop(0.5, 'yellow');
      gradient.addColorStop(0.75, 'orange');
      gradient.addColorStop(1, 'red');

      // Apply gradient to rounded rectangle for current power
      ctx.fillStyle = gradient;
      drawRoundedRect(ctx, x, y, width * fillPercentage, height, radius);
      ctx.fill();

      requestAnimationFrame(render); // Continuously loop the render function
    };

    render(); // Start rendering  

    // Update function to handle game logic, including ball movements and collisions
    const update = () => {
      setCurrentPlayer(playerTurn.current);
      //coefficient of friction
      const friction = 0.993;

      ballsRef.current.forEach((ball, index) => {
        if (ball.isPocketing) {
          ball.radius -= 0.1;
          if (ball.radius < 5) {
            ballsRef.current.splice(index, 1);
          }
        }
        // Update ball position based on its velocity
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Apply friction to the ball's velocity
        ball.vx *= friction;
        ball.vy *= friction;
        // Wall collision detection and response
        if (ball.x + ball.radius >= (TABLE_WIDTH - 77) || ball.x - ball.radius <= 77) {
          // Correct the position to prevent the ball from getting stuck in the border
          if (ball.x + ball.radius >= TABLE_WIDTH - 77) {
            ball.x = TABLE_WIDTH - ball.radius - 77;
          }
          if (ball.x - ball.radius <= 77) {
            ball.x = ball.radius + 77;
          }
          ball.vx = -ball.vx; // Reverse the velocity
        }

        if (ball.y + ball.radius >= (TABLE_HEIGHT - 68) || ball.y - ball.radius <= 68) {
          // Correct the position to prevent the ball from getting stuck in the border
          if (ball.y + ball.radius >= TABLE_HEIGHT - 68) {
            ball.y = TABLE_HEIGHT - ball.radius - 68;
          }
          if (ball.y - ball.radius <= 68) {
            ball.y = ball.radius + 68;
          }
          ball.vy = -ball.vy; // Reverse the velocity
        }

        // ensure the stick is not visible when the white ball is at -100, -100
        if ((ball.color === 'white') && (ball.x === -100) && (ball.y === -100)) {
          stickRef.current.visible = false;
        }

        // Check if the ball goes into any of the pockets
        pockets.forEach((pocket) => {
          const dx = pocket.x - ball.x;
          const dy = pocket.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // If the distance between the ball and pocket is less than or equal to the sum of their radii, the ball is in the pocket
          if (distance <= ball.radius + pocket.radius) {
            if (ball.color === 'white') {
              //stop the ball from moving 
        ball.vx = 0; 
        ball.vy = 0;
				// hide the ball from the screen
				ball.x = -100;
				ball.y = -100;
				canShoot = false;

      } else if (ball.color === 'black') {
        let playerWon = checkLegalWin();
        if (playerWon) {
          let message = "Congratulations! You won the game.";
          setModalMessage(message);
          setModalOpen(true);
          // Reset the game
          initGameObjects();
          setCurrentPlayer('Player 1');
        } else {
          // Game over, the black ball is pocketed
          let message = 'Game Over!';
          setModalMessage(message);
          setModalOpen(true);
          // Reset the game
          initGameObjects();
          setCurrentPlayer('Player 1');
        }
      }
			else {
				// if the ball is the same color as the player's color, the player can continue playing
				if ((playerTurn.current === 'Player 1') && (ball.color === playerOneColour)) {
					canShoot = true;
					// the player can continue playing
				} else if ((playerTurn.current === 'Player 2') && (ball.color === playerTwoColour)) {
					canShoot = true;
					// the player can continue playing
				} else {
					// if the ball is not the same color as the player's color, the player's turn is over
					// const whiteBall = ballsRef.current.find((ball) => ball.color === "white");
					// whiteBall.x = -100;
					// whiteBall.y = -100;
					canShoot = false;
				}
        
        // Add this ball to the player's list of balls pocketed.
        onBallPocketed(ball.color);
		
		// Remove the ball from the balls array
        ballsRef.current.splice(index, 1);
			}
            // Stop the iteration since the ball is removed
            return;
          }
        });

        // Check for collisions between this ball and all others
        for (let j = index + 1; j < ballsRef.current.length; j++) {
          const otherBall = ballsRef.current[j];
          const dx = otherBall.x - ball.x;
          const dy = otherBall.y - ball.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // Collision detected
          if (distance < ball.radius + otherBall.radius) {
            // play the sound of the collision
            var ballsWithBallsSound = new Audio(ballsHittingBallsSound);
            // Set the volume to match the volume state
            ballsWithBallsSound.volume = volume;
            // Play the sound
            ballsWithBallsSound.play();

            // Calculate angle, sine, and cosine of the collision
            const angle = Math.atan2(dy, dx);
            const sine = Math.sin(angle);
            const cosine = Math.cos(angle);

            // Rotate ball position
            const pos0 = { x: 0, y: 0 }; // Ball's position
            const pos1 = rotate(dx, dy, sine, cosine, true);

            // Rotate ball velocities
            const vel0 = rotate(ball.vx, ball.vy, sine, cosine, true);
            const vel1 = rotate(otherBall.vx, otherBall.vy, sine, cosine, true);

            // Collision reaction: swapping velocities (for simplicity)
            const vxTotal = vel0.x - vel1.x;
            vel0.x = vel1.x;
            vel1.x = vxTotal + vel0.x;

            // Update positions to avoid overlap (assuming equal mass)
            const absV = Math.abs(vel0.x) + Math.abs(vel1.x),
              overlap = (ball.radius + otherBall.radius - Math.abs(pos0.x - pos1.x));
            pos0.x += vel0.x / absV * overlap;
            pos1.x += vel1.x / absV * overlap;

            // Rotate positions back
            const pos0F = rotate(pos0.x, pos0.y, sine, cosine, false);
            const pos1F = rotate(pos1.x, pos1.y, sine, cosine, false);

            // Adjust positions to screen coordinates
            otherBall.x = ball.x + pos1F.x;
            otherBall.y = ball.y + pos1F.y;
            ball.x += pos0F.x;
            ball.y += pos0F.y;

            // Rotate velocities back
            const vel0F = rotate(vel0.x, vel0.y, sine, cosine, false);
            const vel1F = rotate(vel1.x, vel1.y, sine, cosine, false);
            ball.vx = vel0F.x;
            ball.vy = vel0F.y;
            otherBall.vx = vel1F.x;
            otherBall.vy = vel1F.y;
          }
          // Stop the ball if its speed is low
          if (Math.abs(ball.vx) < 0.055 && Math.abs(ball.vy) < 0.055) {
            ball.vx = 0;
            ball.vy = 0;
          }
        }


      });



      // Determine if the white ball has stopped moving
      const whiteBall = ballsRef.current.find(ball => ball.color === 'white');
      if (whiteBall && Math.abs(whiteBall.vx) < 0.055 && Math.abs(whiteBall.vy) < 0.055 && whiteBall.x > 0) {
        // The white ball has nearly stopped moving
        whiteBall.vx = 0;
        whiteBall.vy = 0;

      } else {
        // The white ball is still moving
        stickRef.current.visible = false;
      }

      function checkLegalWin() {
        let currentPlayerBalls = [];
        let currentPlayerColor = '';

        // Determine the color of the current player's balls and collect them
        if (playerTurn.current === 'Player 1') {
          currentPlayerColor = playerOneColour;
        } else if (playerTurn.current === 'Player 2') {
          currentPlayerColor = playerTwoColour;
        }

        // Collect current player's balls
        ballsRef.current.forEach((ball) => {
          if (ball.color === currentPlayerColor) {
            currentPlayerBalls.push(ball);
          }
        });

        // Check if all of the current player's balls are potted
        if (currentPlayerBalls.length === 0) {
			let score = 0;
			if (username != '') {
				if (playerTurn.current === 'Player 1') {
					score = playeroneballs;
					store(2, score, username + ' (Player 2)');
				} else if (playerTurn.current === 'Player 2') {
					score = playertwoballs;
					store(2, score, username + ' (Player 1)');
				}
    		}
          return true; // All balls potted, legal win
        } else {
          return false; // Not all balls potted, continue playing
        }
      }


      // Check if all balls have stopped moving
      const allBallsStopped = ballsRef.current.every(ball => Math.abs(ball.vx) < 0.055 && Math.abs(ball.vy) < 0.055);

      // If all balls have stopped moving, switch to the next player
      if (allBallsStopped) {
        if (playerShot) {
          if ((playerTurn.current === 'Player 1') && (canShoot === false)) {
            playerTurn.current = 'Player 2';

          } else if ((playerTurn.current === 'Player 2') && (canShoot === false)) {
            playerTurn.current = 'Player 1';

          }
          playerShot = false;
          canShoot = true;
        }

        // show the stick once all balls have stopped moving
        if (whiteBall && (whiteBall.x !== -100) && (whiteBall.y !== -100)) {
          stickRef.current.visible = true;
        }
      }

      // Request next frame update
      requestAnimationFrame(update);
    };

    // Function to rotate coordinates in collision response
    function rotate(x, y, sine, cosine, reverse) {
      return {
        x: (reverse) ? (x * cosine + y * sine) : (x * cosine - y * sine),
        y: (reverse) ? (y * cosine - x * sine) : (y * cosine + x * sine)
      };
    }

    // Initial call to start the game loop, includes rendering and updating
    update();

    // Cleanup function to remove event listeners when the component unmounts
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleShoot);
      window.removeEventListener('keydown', handleShoot);
      window.removeEventListener('keyup', handlePower);
      window.removeEventListener('click', handlePower);
    };
  }, []);

  // Initializes game objects like balls and the stick
  function initGameObjects() {
    // Initial setup for balls with positions and assets
    const balls = [
      new Ball(911, 304, 15, blackBallAsset, "black"), // Example: black ball
      new Ball(200, 304, 15, whiteBallAsset, "white"), // White ball for cueing
    ];

    // Example: setup for specific colored balls, could be expanded or modified
    const redBalls = [
      new Ball(884, 319, 15, redBallAsset, "red"), //2
      new Ball(911, 274, 15, redBallAsset, "red"), //3
      new Ball(938, 289, 15, redBallAsset, "red"), //4
      new Ball(938, 351, 15, redBallAsset, "red"), //4
      new Ball(966, 243.5, 15, redBallAsset, "red"), //5
      new Ball(966, 304.5, 15, redBallAsset, "red"), //5
      new Ball(966, 334.5, 15, redBallAsset, "red"), //5
    ]; // Red balls initialization
    const blueBalls = [
      new Ball(857, 304, 15, blueBallAsset, "blue"), //1
      new Ball(884, 289, 15, blueBallAsset, "blue"), //2
      new Ball(911, 334, 15, blueBallAsset, "blue"), //3
      new Ball(938, 258, 15, blueBallAsset, "blue"), //4
      new Ball(938, 320, 15, blueBallAsset, "blue"), //4
      new Ball(966, 274, 15, blueBallAsset, "blue"), //5
      new Ball(966, 365, 15, blueBallAsset, "blue"), //5
    ]; // Blue balls initialization

    // Combine all balls into the ballsRef for easy access and updates
    ballsRef.current = [...balls, ...redBalls, ...blueBalls];

    // Setup the stick position around the white ball initially
    const whiteBall = ballsRef.current.find(ball => ball.image.src.includes('ball_16'));
    if (whiteBall) {
      stickRef.current.updatePositionAroundBall(
        whiteBall.x,
        whiteBall.y,
        whiteBall.radius,
        whiteBall.x,
        whiteBall.y,
        power // Pass the current power value
      );
    }
  }

  // To close the modal
  function handleCloseModal() {
    setModalOpen(false);
    location.reload();
  }

  // Render the canvas element
  return (

	<PoolContext.Provider value={{setPlayerOneColour, setPlayerTwoColour, playerOneBallColour, playerTwoBallColour}}>
		<div style={{ position: 'relative', width: TABLE_WIDTH, height: TABLE_HEIGHT, margin: 'auto' }}>
		<div style={{
			borderRadius: '20px',
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			padding: '10px',
			backgroundColor: 'pink',
			color: 'black',
			fontSize: '24px',
			boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
			fontFamily: 'LuckiestGuy',
			fontSize: '24px'
		}}>
			{/* Volume button Section */}
			<button onClick={toggleSound} className="game-button"> 
			{isPlaying ? '🔊' : '🔇'}
			</button>
			{/* Volume Slider Section */}
			<div className="game-button" >
			{/* Displays Volume Label */}
			<label htmlFor="volume-slider"> Volume:  </label>
			{/* the input is a range slider*/}
			{/* min="0" Sets the minimum for the slider, where 0 is muted  volume. */}
			{/* max="1": Sets the maximum values for the slider, 1 is the maximum volume. */}
			{/* Determines the slider steps */}
			{/* `volume` state */}
			{/* Updates the volume state when the slider's value changes and converting the value from a string to a float*/}
			{/* Sets the width of the slider to 100 pixels */}
			<input
				id="volume-slider"
				type="range"
				min="0"
				max="1"
				step="0.01"
				value={volume}
				onChange={(e) => setVolume(parseFloat(e.target.value))}
			/>
			</div>
			<div className="game-button" >{currentPlayer}'s Turn </div> {/* Display the current player's turn */}

			{/* Button to open the HowToPlayPool modal */}
			<button
				onClick={() => setShowPoolModal(true)}
				className="game-button"
			>
				How to Play
			</button>
			{/* Conditional rendering of the HowToPlayPool modal */}
			{showPoolModal && (
					<HowToPlayPool onClose={() => setShowPoolModal(false)} />
			)}
			
		</div>
		<div style={{ height: '10px' }}></div>
		<canvas ref={canvasRef} width={TABLE_WIDTH} height={TABLE_HEIGHT}></canvas>
		<div>
			<button className='restart-button' onClick={restartGame}>Restart</button>
			{/* add exit button */}
			<button className='exit-button' onClick={() => window.location.href = '/'}>Exit</button>
		</div>
		<div className="game-stats" >
			<div className="player-section">
			<div className='player-info' style={{ color: playerOneColour}}>PLAYER 1:
				<div className="player-balls">
				{[...Array(playeroneballs)].map((_, i) => (
					<img 
					key={i} 
					src={ playerOneColour === 'blue' ? blueBallAsset : redBallAsset }
					alt={ playerOneColour === 'blue' ? 'Blue Ball' : 'Red Ball'}
					className="ball" />
				))}
				</div>
			</div>
			<div style={{ color: playerTwoColour}}>PLAYER 2:
				<div className="player-balls">
				{[...Array(playertwoballs)].map((_, i) => (
					<img 
					key={i} 
					src={ playerTwoColour === 'blue' ? blueBallAsset : redBallAsset }
					alt={ playerTwoColour === 'blue' ? 'Blue Ball' : 'Red Ball'}
					className="ball" />
				))}
				</div>
			</div>
			</div>
			<div style={{alignContent: 'center', textAlign: 'center'}}>
				{ gameStarted ? ( "" ) : ( <ColourSelector /> ) }
			</div>
			<GameModal
			isOpen={isModalOpen}
			onClose={handleCloseModal}
			message={modalMessage}
			/>
		</div>
		</div>
	</PoolContext.Provider>
  );
}
