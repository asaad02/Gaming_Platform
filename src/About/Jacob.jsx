// Jacob.js
import React, { useState } from 'react';
// Import useShift hook for accessing context state
import { useShift } from './ShiftContext';
// Import component-specific styles
import './style/Style.css';
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

export function Jacob() {
  // Define the original name for this component
  const originalName = "Jacob"; 
  const { activeName } = useShift();
  // Destructure activeName from context to check if this component should display shifted name
  // Track if the component has been clicked
  const [clicked, setClicked] = useState(false);
  
  // hint in console for each name
  // if the active name is Jacob, the console will log "I'm the only one who is intrested in hardware projects"
  if (activeName === "Jacob") {
      console.log("I'm the only one who is intrested in hardware projects");
      console.log("🔍 Look closely, and decode the secret: ");
    }
  // Function to calculate and return the shifted version of the name
  const shiftName = (name) => {
    const shiftAmount = name.length; // Shift amount based on the length of the name
    // Alphabet used for shifting
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    let shifted = name.toLowerCase().split('').map(char => {
      // Check if the character is in the alphabet
      if (alphabet.includes(char)) { 
        // Find current index of the character
        let currentIndex = alphabet.indexOf(char);
        // Calculate new index after shifting
        let shiftedIndex = (currentIndex + shiftAmount) % alphabet.length;
        return alphabet[shiftedIndex]; 
      }
      return char; // Return non-alphabet characters unchanged
    }).join('');
    return shifted.charAt(0).toUpperCase() + shifted.slice(1); // Capitalize the first letter of the shifted name
  };

  const handleClick = () => {
    // Check if this component is the active one and has been clicked
    if (activeName === originalName) {
      setClicked(true); // Mark as clicked to reveal the shifted name
    }
  };

  // if clicked, the console will log "I'm the only one who knows vmware"
  if (clicked) {
    console.log("My favorite number is 5, and i love binary numbers");
  }

  return (
    <div className="card-container" onClick={handleClick}>
      <img src="public/images/jacob.png" alt="Jacob Serafin" className="profile-image"/>
      <div className="about-me">
        {/* Reveal the shifted name only if this component has been clicked and is the active one */}
        <h2>{clicked && activeName === originalName ? shiftName(originalName) : originalName}</h2>
        <p>I'm an aspiring software engineer with a passion for learning and creating.</p>
        <p>I'm in my final year now and excited to apply all I have learned into one big project.</p>
        <p>Outside of school, I enjoy woodworking, playing board games, and lately, I've been starting to play around with small hardware projects.</p>
      </div>
      {clicked && activeName === originalName && (
        // Display the lottie animation only if this component has been clicked and is the active one
        <div className="lottie-container-detective_aboutme">
          <div id="lottie-animation">
            <script
              src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs"
              type="module"
            ></script>
            <DotLottiePlayer
              src="https://lottie.host/89b4f153-bbf1-40d5-8aab-17a2059ebdb1/Nd8Ami7khx.json"
              background="transparent"
              speed="1"
              style={{ width: "300px", height: "300px" }}
              loop
              autoplay
            ></DotLottiePlayer>
            <p>🔍 Look closely, and decode the secret:</p>
            <p>Decode hint: <span className="binary">01001000 01101001 01101110 01110100 00100000 01101001 01101110 00100000 01000011 01100001 01100101 01110011 01100001 01110010 00100000 01100011 01101001 01110000 01101000 01100101 01110010 00111010 00100000 01011000 01001010 01000110 01010111 01001000 01001101 00100000 01001011 01010100 01010111 00100000 01011001 01001101 01001010 00100000 01000010 01001010 01000110 01010101 01010100 01010011</span></p>
          </div>
        </div>
      )}
      <div className="social-links">
          <a href="https://gitlab.socs.uoguelph.ca/serafinj" target="_blank" rel="noopener noreferrer">
              <img src="public/icons/gitlab-icon.svg" alt="GitLab" className="icon" />
          </a>
          <a href="https://www.linkedin.com/in/jacob-s-455683110/" target="_blank" rel="noopener noreferrer">
              <img src="public/icons/linkedin-original.svg" alt="LinkedIn" className="icon" />
          </a>
          <a href="mailto:serafinj@uoguelph.ca">
              <img src="public/icons/envelope.svg" alt="Email" className="icon" />
          </a>
      </div>
    </div>
  );
}

export default Jacob;
