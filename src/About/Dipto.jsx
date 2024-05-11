import React from 'react';
import './style/Style.css';
import {useState} from 'react';
import {useShift} from './ShiftContext';
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

export function Dipto() {
    // Define the original name for this component
    const originalName = "Dipto"; 
    const { activeName } = useShift();
    // Destructure activeName from context to check if this component should display shifted name
    // Track if the component has been clicked
    const [clicked, setClicked] = useState(false);
    
    // hint in console for each name
    // if the active name is Jacob, the console will log "I'm the only one who is intrested in hardware projects"
    if (activeName === "Dipto") {
        console.log("I am the only one who is a DJ!");
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
      console.log("My favorite number is 5, and I love binary numbers");
      console.log("🔍 Look closely, and decode the secret: ");
    }

  return (
    <div className="card-container" onClick={handleClick}>
      <img src="public/images/dipto.jpeg" alt="Dipto Biswas" className="profile-image"/>
      <div className="about-me">
           {/* Reveal the shifted name only if this component has been clicked and is the active one */}
          <h2>{clicked && activeName === originalName ? shiftName(originalName) : originalName}</h2>
          <p>Hello, This is Dipto.</p>
          <p>I am a 5th year Software Engineering student with a keen interest in AI and augmented reality technologies. My experience includes working at the City of Kitchener Innovation Lab and Waterloo Region Innovation Lab.</p>
          <p>Apart from my love for technology, I am also a DJ and producer, passionate about house music. You can often find me DJing at underground raves in Toronto during the weekends.</p>
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
          <a href="https://gitlab.socs.uoguelph.ca/dbiswas" target="_blank" rel="noopener noreferrer">
              <img src="public/icons/gitlab-icon.svg" alt="GitLab" className="icon" />
          </a>
          <a href="https://www.linkedin.com/in/diptobiswas/" target="_blank" rel="noopener noreferrer">
              <img src="public/icons/linkedin-original.svg" alt="LinkedIn" className="icon" />
          </a>
          <a href="mailto:dbiswas@uoguelph.ca">
              <img src="public/icons/envelope.svg" alt="Email" className="icon" />
          </a>
      </div>
    </div>
  );
}

export default Dipto;
