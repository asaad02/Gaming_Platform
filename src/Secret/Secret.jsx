import React from "react";
import { SessionContext } from "../SessionProvider";
import { useNavigate } from 'react-router-dom';
// Secret has prop key
export function Secret() {
  const [secret, setSecret] = React.useState("");
  const { username } = React.useContext(SessionContext);
  


  const verify = async () => {
    try {
      const response = await fetch(
        "https://cis4250w24-03.socs.uoguelph.ca/api/secret/verify.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            secret: secret,
            key: username,
          }),
        }
      );

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={secret}
        onChange={(e) => setSecret(e.target.value)}
      />
      <button onClick={verify} className="coming-soon-button">
        Play
      </button>
    </div>
  );
}

export function SecretCard() {
  const [catsSecret, setCatsSecret] = React.useState("");

  const getSecret = async () => {
    try {
      const response = await fetch(
        "https://cis4250w24-03.socs.uoguelph.ca/api/secret/get-secret.php",
        {
          method: "get",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      if (data) {
        setCatsSecret(data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  function generateUniqueToken() {
    const timestamp = new Date().getTime();
    const randomElement = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${randomElement}`;
  }
  let navigate = useNavigate();

  function navigateToWinScreen() {
    let token = generateUniqueToken();
    sessionStorage.setItem('winToken', token);
    navigate(`/win/${token}`);
  }
  return (
    <div>
      {catsSecret.length > 0 ? (
        <>
          <h2>Cats Secret</h2>
          <p>{catsSecret}</p>
          <button className="start-game-button" onClick={navigateToWinScreen}>Well Done!</button>
        </>
      ) : (
        <>
          <h2>ANOTHER GAME</h2>
          <p>The details are yet to be revealed. Stay tuned!</p>
          <button onClick={getSecret} className="coming-soon-button">
            Click Me
          </button>
        </>
      )}
    </div>
  );
}

export default Secret;
