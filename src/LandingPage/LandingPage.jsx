/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React, {useRef, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {DotLottiePlayer} from '@dotlottie/react-player';
import '@dotlottie/react-player/dist/index.css';
import {useLocation} from 'react-router-dom';
import HowToPlayGame from '../HowToPlayGame/HowToplayGame';
import HowToPlayPool from '../HowToPlayPool/HowToPlayPool';
import Footer from '../Footer/Footer';
import {SessionContext} from '../SessionProvider';
import {Secret, SecretCard} from '../Secret/Secret';
import '../../globals.css';

export function LandingPage() {
  const scrollTarget = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [showPoolModal, setShowPoolModal] = useState(false);
  const location = useLocation();
  const gameSectionRef = useRef(null);

  const [mindTextColor, setMindTextColor] = useState('white');
  const [gamesTextColor, setGamesTextColor] = useState('white');
  const [secretName, setSecretName] = useState('');

  const riddles = [
    'Navigate the intricate maze of mental strategies.',
    'Engage in cerebral battles of wit and strategy.',
    'Challenge perceptions and unravel mental puzzles.',
    'Explore the chessboard of the mind\'s complexities.',
    'Exercise your intellect in the arena of mental gymnastics.',
    'Probe the depths of psychological manipulation and tactics.',
    'Enter the realm where perception meets deception.',
    'Unravel the enigma of cognitive riddles and illusions.',
    'Dive into the pool of psychological warfare and cunning.',
    'Embark on a journey through the labyrinth of strategic thinking and cunning maneuvers.',
  ];

  const murderWeaponHints = [
    'Search for objects that seem out of place or have been disturbed recently.',
    'Look for subtle clues like bloodstains or fingerprints that might lead you to the murder weapon\'s hiding spot.',
    'Investigate areas where the suspect has been seen frequently or where they might have attempted to conceal evidence.',
    'Pay attention to conversations or notes that hint at the weapon\'s location or the suspect\'s involvement with it.',
    'Consider the motive behind the crime to help narrow down potential hiding spots for the weapon.',
    'Use tools like a magnifying glass or a blacklight to uncover hidden traces of evidence.',
    'Explore different rooms or locations where the crime took place, as the weapon might have been hastily discarded.',
    'Keep an eye out for any unusual smells or sounds that could indicate the presence of the weapon nearby.',
    'Interrogate witnesses or suspects to gather information that might lead you to the murder weapon\'s whereabouts.',
    'Think creatively and consider alternative hiding spots, such as hidden compartments or unconventional storage areas.',
  ];

  const randomMurderWeaponHint = murderWeaponHints[Math.floor(Math.random() * murderWeaponHints.length)];

  const randomRiddle = riddles[Math.floor(Math.random() * riddles.length)];

  const handleMindTextColor = (e) => {
    if (mindTextColor === 'white') {
      setMindTextColor('yellow');
    }
  };

  const handleGamesTextColor = (e) => {
    if (gamesTextColor === 'white') {
      setGamesTextColor('yellow');
      if (mindTextColor === 'yellow') {
        setClickedOnMindGames(true);
      }
    }
  };

  const scrollSmooth = () => {
    scrollTarget.current.scrollIntoView({behavior: 'smooth'});
  };

  const {
    loginStatus,
    username,
    userCreate,
    clickedOnMindGames,
    setClickedOnMindGames,
  } = React.useContext(SessionContext);

  useEffect(() => {
    if (location.hash === '#game-section' && gameSectionRef.current) {
      const gamesSection = document.getElementById('game-section');
      if (gamesSection) {
        gamesSection.scrollIntoView({behavior: 'smooth'});
      }
    } else {
      console.loginStatus; // test
    }
  }, []);

  return (
    <div>
      <section className="hero-section">
        <div className="lottie-container-emoji" title={randomRiddle}>
          <div id="lottie-animation">
            <script
              src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
              type="module"
            ></script>
            <DotLottiePlayer
              src="https://lottie.host/0ae7278a-fef4-4a92-bd6c-1f7064219fda/8QYRWQHrIt.json"
              background="transparent"
              speed="1"
              style={{width: '300px', height: '300px'}}
              loop
              autoplay
            ></DotLottiePlayer>
          </div>
        </div>
        <div hidden={!loginStatus}>
          {loginStatus ? (
            userCreate ? (
              <h1>Nice to meet you, {username}!</h1>
            ) : (
              <h1>Good to see you again, {username}!</h1>
            )
          ) : (
            <></>
          )}
        </div>

        <div>
          {loginStatus ? (
            <h1>
              WELCOME TO A WORLD OF{' '}
              <div
                onClick={handleMindTextColor}
                style={{color: mindTextColor, display: 'inline-block'}}
              >
                MIND
              </div>
              -BLOWING MINI{' '}
              <div
                onClick={handleGamesTextColor}
                style={{color: gamesTextColor, display: 'inline-block'}}
              >
                GAMES
              </div>
            </h1>
          ) : (
            <h1>
              WELCOME TO A WORLD<br></br>OF MIND-BLOWING<br></br>MINI GAMES
            </h1>
          )}
        </div>

        <div className="lottie-container-globe">
          <div id="lottie-animation">
            <script
              src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
              type="module"
            ></script>
            <DotLottiePlayer
              src="https://lottie.host/f6e7a815-82a4-4317-bde7-1280d979fffe/HJmRgJ0H0b.json"
              background="transparent"
              speed="1"
              style={{width: '300px', height: '300px'}}
              loop
              autoplay
            ></DotLottiePlayer>
          </div>
        </div>
        <div className="lottie-container-mind-blowing"></div>

        <button
          onClick={scrollSmooth}
          className="play-button"
          id="scroll-to-game"
        >
          Explore
        </button>
      </section>
      <section className="murder-weapon-hint">
        <div>
          <p>{randomMurderWeaponHint}</p>
        </div>
        <br /><br />
      </section>
      <section className="game-section">

        <div className="game-card">
          <div className="game-card-content">
            <div
              ref={gameSectionRef}
              id="pool-section"
              className="game-image-container"
            >
              <img
                src="public/assets/catsplayingpool.png"
                alt="Cats Playing Pool"
                className="game-image"
              ></img>
            </div>
            <div className="game-content" ref={scrollTarget}>
              <h2>8 BALL POOL</h2>
              <p>Challenge yourself in a virtual pool hall. Sink balls and master the cue.</p>
              <div className="button-block">
                <Link to="/poolgame">
                  <button id="poolgamediv" className="start-game-button">
            ENTER GAME
                  </button>
                </Link>

                {/* Button to open the HowToPlayPool modal */}
                <button
                  onClick={() => setShowPoolModal(true)}
                  className="how-to-play-button"
                >
          ?
                </button>
              </div>

              {/* Conditional rendering of the HowToPlayPool modal */}
              {showPoolModal && (
                <HowToPlayPool onClose={() => setShowPoolModal(false)} />
              )}
            </div>
          </div>
        </div>

        <div className="game-card">
          <div className="game-card-content">
            <div
              ref={gameSectionRef}
              id="game-section"
              className="game-image-container"
            >
              <img
                src="public/assets/catsplayingcard.png"
                alt="Cats Playing Cards"
                className="game-image"
              ></img>
            </div>
            <div className="game-content" ref={scrollTarget}>
              <h2>MATCH THE CARDS</h2>
              <p>Play a game against the clock to match pairs of cards.</p>
              <div className="button-block">
                <Link to="/matchingGame">
                  <button id="gamediv" className="start-game-button">
                    ENTER GAME
                  </button>
                </Link>

                {/* Button to open the HowToPlayGame modal */}
                <button
                  onClick={() => setShowModal(true)}
                  className="how-to-play-button"
                >
                  ?
                </button>
              </div>

              {/* Conditional rendering of the HowToPlayGame modal */}
              {showModal && (
                <HowToPlayGame onClose={() => setShowModal(false)} />
              )}
            </div>
          </div>
        </div>

        <div className="game-card">
          <div className="game-card-content">
            <div
              ref={gameSectionRef}
              id="game-section"
              className="game-image-container"
            >
              {clickedOnMindGames && loginStatus ? (
                <input
                  type="image"
                  src="public/assets/catschilling.png"
                  alt="Cats Playing Cards"
                  className="game-image"
                />
              ) : (
                <img
                  src="public/assets/catschilling.png"
                  alt="Cats Playing Cards"
                  className="game-image"
                ></img>
              )}
            </div>
            <h2>ANOTHER GAME</h2>
            <p>The details are yet to be revealed. Stay tuned!</p>

            {clickedOnMindGames ? (
              <Secret />
            ) : (
              <button className="coming-soon-button" type="button">
                COMING SOON
              </button>
            )}
          </div>
        </div>

        <div className="game-card">
          <div className="game-card-content">
            <div
              ref={gameSectionRef}
              id="game-section"
              className="game-image-container"
            >
              <img
                src="public/assets/catssleeping.png"
                alt="Cats Playing Cards"
                className="game-image"
              ></img>
            </div>

            {loginStatus && clickedOnMindGames ? (
              <SecretCard />
            ) : (
              <div>
                <h2>ANOTHER GAME</h2>
                <p>The details are yet to be revealed. Stay tuned!</p>
                <button className="coming-soon-button" type="button" >
                  COMING SOON
                </button>
              </div>
            )}
          </div>
        </div>

      </section>
      <Footer/>
    </div>
  );
}

export default LandingPage;
