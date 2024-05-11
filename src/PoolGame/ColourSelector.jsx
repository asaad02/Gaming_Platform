import React from 'react';
import { PoolContext } from './PoolGame.jsx';

function ColourModal({isOpen, onClose}) {
	const colors = ['red', 'blue'];
	const {setPlayerOneColour, setPlayerTwoColour, playerOneBallColour, playerTwoBallColour} = React.useContext(PoolContext);
	  
  	if (!isOpen) return null;

  	return (
    	<div style={{
			position: 'fixed', 
			top: 0, 
			left: 0, 
			bottom: 0, 
			right: 0, 
			display: 'flex', 
			justifyContent: 'center', 
			alignItems: 'center'}}>
			<div style={{
				/* Semi-transparent black background */
				background: 'rgba(0, 0, 0, 0.65)',
				borderRadius: '20px',
				padding: '25px',
				width: '400px',
				maxWidth: '100%',
				position: 'relative',
				boxShadow: '8px 8px 8px rgba(0, 0, 0, 0.35)',
				textAlign: 'center'}}>
				<h2>Select Player Ones Colour</h2>
				<div>
					{colors.map((color) => (
						<button
							key={color}
							className="colour_selector"
							style={{backgroundColor: color}}
							onClick={() => {
								setPlayerOneColour(color);
								playerOneBallColour.current = color;
								setPlayerTwoColour(color === 'red' ? 'blue' : 'red');
								playerTwoBallColour.current = color === 'red' ? 'blue' : 'red';
								onClose();
							}}
						>
							{color}
						</button>
					))}
				</div>
				<div>
					<button onClick={onClose} className="start-game-button">Cancel</button>
				</div>
				
			</div>
    	</div>
  );
}

export default function ColourSelector() {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<div>
			<button
				className="start-game-button"
				onClick={() => setIsOpen(true)}
			>
				Change Player Colours
			</button>
			<ColourModal
				isOpen={isOpen}
				onClose={() => setIsOpen(false)}
			/>
		</div>
  );
}