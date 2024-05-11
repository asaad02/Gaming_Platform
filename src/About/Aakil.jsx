import React, {useState} from 'react';
// Import the useShift hook to access the ShiftContext
import {useShift} from './ShiftContext';
// Import the stylesheet for styling this component
import './style/Style.css';
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

export function Aakil() { 
  const {activeName} = useShift();
  // hint in console for each name
  // if the active name is Aakil, the console will log "I'm the only one who is intrested to learn PHP
  if (activeName === "Aakil") {
      console.log("I'm the only one who is intrested to learn PHP");
  }
  
  // Destructure the activeName from the context to determine
  // if this component should display the shifted name
  // Track if the component has been clicked
  const [clicked, setClicked] = useState(false);
  // The original name associated with this component
  const originalName = "Aakil"; 

  // Function to shift the name based on its length
  const shiftName = (name) => {
    // Determine the shift amount based on the name's length
    const shiftAmount = name.length; 
    // Define the alphabet for the shifting process
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'; 
    // Shift each character in the name
    let shifted = name.toLowerCase().split('').map(char => {
      // Check if the character is a letter in the alphabet
      if (alphabet.includes(char)) {
        // Find the current index of the character and calculate 
        //the new index after shifting
        let currentIndex = alphabet.indexOf(char);
        let shiftedIndex = (currentIndex + shiftAmount) % alphabet.length;
        // Return the character from the new index
        return alphabet[shiftedIndex];
      }
      // Return the character unchanged if it's not in the alphabet
      return char;
    }).join('');
    // Capitalize the first letter of the shifted name and return the result
    return shifted.charAt(0).toUpperCase() + shifted.slice(1);
  };

  const handleClick = () => {
    // Check if this component is the active one and has been clicked
    if (activeName === originalName) {
      // Mark as clicked to reveal the shifted name
      setClicked(true); 
    }
  };
  // if clicked, the console will log "I'm the only one who knows vmware"
  if (clicked) {
      console.log("My favorite number is 5, and i love binary numbers");
      console.log("🔍 Look closely, and decode the secret: ");
    }
  

  // Determine if Aakil is the active name and display its shifted version if it is
  const displayName = activeName === originalName ? shiftName(originalName) : originalName;

  return (
    <div className="card-container" onClick={handleClick}>
      <img src="public/images/aakil.jpg" alt="Aakil Bohra" className="profile-image"/>
      <div className="about-me">
      {/* Reveal the shifted name only if this component has been clicked and is the active one */}
      <h2>{clicked && activeName === originalName ? shiftName(originalName) : originalName}</h2>
        <p>My name is Aakil Bohra. I am a Software Engineering student in my fifth year at University of Guelph.</p>
        <p>I am knowledgeable in Python, C, HTML, and CSS as well as Git for version control.</p>
        <p>I am interested to learn new languages/technologies like PHP in CIS*4250.</p>
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
      
      <div className="social-links"> {/* Links to Aakil's social and professional profiles */}
        <a href="https://gitlab.socs.uoguelph.ca/abohra" target="_blank" rel="noopener noreferrer">
            <img src="public/icons/gitlab-icon.svg" alt="GitLab" className="icon" />
        </a>
        <a href="https://www.linkedin.com/in/aakil-bohra/" target="_blank" rel="noopener noreferrer">
            <img src="public/icons/linkedin-original.svg" alt="LinkedIn" className="icon" />
        </a>
        <a href="mailto:abohra@uoguelph.ca">
            <img src="public/icons/envelope.svg" alt="Email" className="icon" />
        </a>
      </div>
    </div>
  );
}

export default Aakil;
