/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
import React from "react";
import { DotLottiePlayer } from "@dotlottie/react-player";
import "@dotlottie/react-player/dist/index.css";
import "../../globals.css";
import Cryptogram from '../Cryptogram/Cryptogram.jsx';

export function AKLMMSJLDAHA() {
  const [password, setPassword] = React.useState("");
  const [verified, setVerified] = React.useState(false);
  const [alert, setAlert] = React.useState("");

  const verify = async () => {
    try {
      const response = await fetch(
        "https://cis4250w24-03.socs.uoguelph.ca/api/team-2/verify.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({ password: password }),
        }
      );

      const data = await response.json();
      if (data["message"] === "Great work detective! You've solved the case!") {
        setVerified(true);
        setAlert("");
        setPassword("");
      } else {
        setVerified(false);
        setPassword("");
        setAlert("Incorrect password, try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="hero-section">
      <div className="lottie-container-detective">
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
        </div>
      </div>
      {verified ? (
        <>
          <h2>
            Oh no! the case files have been scrambled, help me unscramble them
            to learn more.
          </h2>
          <Cryptogram />
        </>
      ) : (
        <>
          <div>
            <h1>Enter the password to get access to the case files.</h1>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <button onClick={verify} className="play-button">
              Open
            </button>
            <div style={{ color: "red" }}>{alert}</div>
          </div>
        </>
      )}
    </div>
  );
}

export default AKLMMSJLDAHA;
