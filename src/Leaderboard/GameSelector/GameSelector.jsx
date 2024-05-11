import React from "react";
import { useEffect, useState } from "react";
import Leaderboard from "../Leaderboard";
import '../style.css';
import {DotLottiePlayer} from '@dotlottie/react-player';

export function GameSelector() {
	// game id integer state
	const [game, setGame] = useState(0);

	// generate button ids for the game buttons
	useEffect(() => {
		const buttons = document.getElementById('game-selector-button-container').querySelectorAll('button');

		buttons.forEach((button, index) => {
			button.id = `g${index}`;
		});
	}, []);

	
	return (
		<div className="component-container">
			<div id="game-selector">
				<div id="game-selector-button-container">
				<button
						onClick={() => setGame(1)}
						className={`game-selector-button ${game === 1 ? "game-selector-button-container-button-active" : ""}`}
					>Match the Cards</button>
					<button
						onClick={() => setGame(2)}
						className={`game-selector-button ${game === 2 ? "game-selector-button-container-button-active" : ""}`}
					>8 Ball Pool</button>
					<button
						onClick={() => setGame(3)}
						className={`game-selector-button ${game === 3 ? "game-selector-button-container-button-active" : ""}`}
					>???</button>
				</div>
				
				<Leaderboard game={game}/>
				
				<div className="lottie-container-leaderboard">
					<script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script>
					<DotLottiePlayer src="https://lottie.host/3b3bab4e-d9f1-403d-9758-81693db3f26c/EIQyPXt0Ip.json" background="transparent" speed="1" autoplay></DotLottiePlayer>
				</div>
			</div>
		</div>
	);
}