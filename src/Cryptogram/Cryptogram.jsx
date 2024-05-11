import React from 'react';
import { useState, useRef, createRef, useEffect } from 'react';
import "../../globals.css";
import './style.css';
import WinCrypto from "../WinCrypto/WinCrypto";
function Cryptogram() {
  const [showModal, setShowModal] = useState(false);
  const [originalMsg, setOriginalMessage] = useState('');
  const [encryptedMsg, setEncryptedMsg] = useState('');
  const [userGuesses, setUserGuesses] = useState({});
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    const form = event.target;
    const inputs = form.querySelectorAll('input');
    const inputValues = Array.from(inputs).map(input => input.value); // Map over inputs to get their values
    
    const userInputs = inputValues.join(''); // Combine into a single string
    if(userInputs.replace(/[^A-Za-z]/g, "").toLowerCase() == originalMsg.replace(/[^A-Za-z]/g, "").toLowerCase()) {
      setShowModal(true)
    }
  };
  //once the message is received, shift the letters by 6
  useEffect(() => {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    let shift = 6;
    for (let i = 0; i < originalMsg.length; i++) {
      const char = originalMsg[i];
      const isUpperCase = char === char.toUpperCase();
      let index = alphabet.indexOf(char.toUpperCase());

      if (index === -1) {
        result += char;
      } else {
        index = (index - shift + alphabet.length) % alphabet.length;
        result += isUpperCase ? alphabet[index] : alphabet[index].toLowerCase();
      }
    }
    setEncryptedMsg(result);
  }, [originalMsg]);

  useEffect(() => {
    const fetchWeaponData = async () => {
      try {
        const response = await fetch(
          "https://cis4250w24-03.socs.uoguelph.ca/api/weapon/pick-weapon.php",
          {
            method: "get",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            }
          }
        );
        const data = await response.json();
        if (data) {
          setOriginalMessage(data.sentence.replace(/[^a-zA-Z ]/g, ""));
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchWeaponData();
  }, []);
  //set all matching text boxes to the inputted letter
  const handleInputChange = (char, event) => {
    const value = event.target.value.toUpperCase();
    setUserGuesses(prevGuesses => {
      const updatedGuesses = { ...prevGuesses, [char]: value };
      return updatedGuesses;
    });
  };
  return (

    <div className="gameBackground">
      <div className="game-container" role="main">
        <div className="game-header animate__animated animate__bounceInDown">
          <h1 id="gameTitle" className="title">Decrypt the sentence!</h1>
        </div>
        <div className="cryptogram-container">
          <form onSubmit={handleSubmit}>
            {encryptedMsg.split(' ').map((word, wordIndex) => (
              <div className="cryptogram-header" key={`word-${wordIndex}`} style={{ display: 'flex', marginRight: '15px' }}>
                {word.split('').map((char, index) => {
                  return (
                    <div key={`input-${char}-${index}`} style={{ marginRight: '2px' }}>
                      <input
                        type="text"
                        maxLength="1"
                        value={userGuesses[char] || ''}
                        key={index}
                        onChange={(event) => handleInputChange(char, event)}
                        style={{ width: '20px', textAlign: 'center' }}
                      />
                      <div style={{fontFamily: 'Manrope', color:'black'}}>{char.toUpperCase()}</div>
                    </div>
                  );
                })}
              </div>
            ))}
            <button className='game-button' type="submit">Submit</button>
            {showModal && (
                <WinCrypto onClose={() => setShowModal(false)} />
              )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Cryptogram;
