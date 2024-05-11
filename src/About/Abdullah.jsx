import React, {useState} from 'react';
// Import the useShift hook from the ShiftContext file
import {useShift} from './ShiftContext';

// CSS styles are imported to style the component
import './style/Style.css';
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";

// Define the functional component "Abdullah"
export function Abdullah() {
  const {activeName} = useShift();
  // Destructure the activeName from the context to determine if this component should show the shifted name
  // Track if the component has been clicked
  const [clicked, setClicked] = useState(false);
  const originalName = 'Abdullah'; // The original name for this component
  // hint in console for each name
  // if the active name is Abdullah, the console will log "I'm the only one who knows vmware"
  if (activeName === 'Abdullah') {
    console.log('I\'m the only one who knows vmware');
  }
  // Function to shift the name based on its length
  const shiftName = (name) => {
    const shiftAmount = name.length; // Determine the shift amount (based on the length of the name)
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'; // Define the alphabet for shifting
    const shifted = name.toLowerCase().split('').map((char) => {
      // Split the name into characters and shift each character
      if (alphabet.includes(char)) {
        // Only shift if the character is in the alphabet
        const currentIndex = alphabet.indexOf(char); // Get current index of the character
        const shiftedIndex = (currentIndex + shiftAmount) % alphabet.length; // Calculate the new index
        return alphabet[shiftedIndex]; // Return the shifted character
      }
      return char; // Return the character unchanged if it's not a lowercase alphabet letter
    }).join('');
    return shifted.charAt(0).toUpperCase() + shifted.slice(1); // Capitalize the first letter of the shifted name
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
    console.log('My favorite number is 8, and i love binary numbers ??');
    console.log("🔍 Look closely, and decode the secret: ");
  }

  return (
    <div className="card-container" onClick={handleClick}>
      <img src="public/images/Abdullah_Saad.jpeg" alt="Abdullah Saad" className="profile-image"/>
      <div className="about-me">
        {/* Reveal the shifted name only if this component has been clicked and is the active one */}
        <h2>{clicked && activeName === originalName ? shiftName(originalName) : originalName}</h2>
        {/* Brief introduction and details about Abdullah */}
        <p>I'm a dedicated fifth-year software engineering student with a minor in economics at the University of Guelph.</p>
        <p>I'm proficient in multiple programming languages and frameworks, with expertise in tools like VMware, Git, AWS, Docker, and methodologies like Agile/Scrum.</p>
        <p>I'm passionate about leveraging my skills in machine learning and full-stack development to contribute to innovative projects.</p>
      </div>
      {clicked && activeName === originalName && (

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
            <p>Decode hint: <span className="binary">01001000 01101001 01101110 01110100 00100000 01101001 01101110 00100000 01000011 01100001 01100101 01110011 01100001 01110010 00100000 01100011 01101001 01110000 01101000 01100101 01110010 00111010 00100000 01000001 01001101 01001001 01011010 01001011 01010000 00100000 01001110 01010111 01011010 00100000 01000010 01010000 01001101 00100000 01000101 01001101 01001001 01011000 01010111 01010110</span></p>

          </div>
        </div>

      )}
      {/* Social links for further contact or information */}
      <div className="social-links">
        <a href="https://gitlab.socs.uoguelph.ca/asaad02" target="_blank" rel="noopener noreferrer">
          <img src="public/icons/gitlab-icon.svg" alt="GitLab" className="icon"/>
        </a>
        <a href="https://www.linkedin.com/in/abdullah94-saad/" target="_blank" rel="noopener noreferrer">
          <img src="public/icons/linkedin-original.svg" alt="LinkedIn" className="icon"/>
        </a>
        <a href="mailto:asaad02@uoguelph.ca">
          <img src="public/icons/envelope.svg" alt="Email" className="icon"/>
        </a>
      </div>
    </div>
  );
}

export default Abdullah;
