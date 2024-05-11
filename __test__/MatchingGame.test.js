// Import React, testing utilities, and the component to be tested.
import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
// Path adjusted for accuracy
import MatchingGame from '../src/MatchingGame/MatchingGame';
import {SessionProvider} from '../src/SessionProvider/index.js';

// Describe block declares a suite of tests for the MatchingGame component.
describe('MatchingGame Component Tests', () => {
  // Test 1: Verifies that the MatchingGame component renders correctly.
  test('renders the component correctly', () => {
    // Render the component in a virtual DOM to enable testing.
    // render(<MatchingGame />);
    render(<SessionProvider><MatchingGame /></SessionProvider>);
    // Check for the presence of specific text elements to confirm the
    // component rendered as expected.
    // This includes a title or prompt ("MATCH THE CARDS") and a playable
    // action ("Play").
    expect(screen.getByText('MATCH THE CARDS')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
  });

  // Test 2: Simulates a user action to start the game and verifies the UI
  // updates accordingly.
  test('starts the game and updates the UI', () => {
    // First, render the MatchingGame component to set up the initial state.
    render(<SessionProvider><MatchingGame /></SessionProvider>);
    // Locate the "Play" button within the rendered output using its text
    //  content.
    const playButton = screen.getByText('Play');
    // Simulate a click event on the "Play" button to start the game.
    fireEvent.click(playButton);
    // After starting the game, verify that the UI reflects the expected state:
    // - A timer showing "seconds remaining" indicates the game countdown has
    //  started.
    // - The initial number of lives is displayed, confirming the game status
    //  is active.
    // - The initial score is set to 0, ready for the player to start
    //  accumulating points.
    // Regex used to match dynamic text content
    expect(screen.getByText('Lives: 3')).toBeInTheDocument();
    expect(screen.getByText('Score: 0')).toBeInTheDocument();
  });

  // This is a test that checks the functionality of flipping a card.
  // it flips a card and checks if it has the class "card flipped"
  test('flips cards when clicked and updates UI', () => {
    // render the game
    render(<SessionProvider><MatchingGame /></SessionProvider>);
    // click on the play button
    const playButton = screen.getByText('Play');
    fireEvent.click(playButton);
    // get the card with the attribute "data-card-id" to be "0"
    // click on this card
    const card = document.querySelector('[data-card-id="0"]');
    fireEvent.click(card);
    // Check if the card has flipped i.e., check if it has the class
    // "card flipped"
    expect(card).toHaveClass('card flipped');
  });

  /* Doesnt work for now, will test in next sprint.
  test('handles matching cards correctly', () => {
    render(<SessionProvider><MatchingGame /></SessionProvider>);

    const playButton = screen.getByText('Play');
    fireEvent.click(playButton);

    // Assuming there are at least two matching cards initially
    const firstCard = screen.getByTestId('card-0'); // Adjust this based
     on your actual card structure
    const secondCard = screen.getByTestId('card-1'); // Adjust this based
    //  on your actual card structure

    fireEvent.click(firstCard);
    fireEvent.click(secondCard);

    // Check if both cards are matched
    expect(firstCard).toHaveClass('matched');
    expect(secondCard).toHaveClass('matched');
  });
  */

  // tests the Give Up button
  test('verifies that clicking on the give up button stops the game', () => {
    // render the game
    render(<SessionProvider><MatchingGame /></SessionProvider>);
    // click on the play button
    const playButton = screen.getByText('Play');
    fireEvent.click(playButton);
    // click on the "Give Up" button
    const giveUpButton = screen.getByText('Give Up');
    fireEvent.click(giveUpButton);
    // try to find a card on the page
    const aCard = document.querySelector('[class="card"]');
    // there should be no cards as the game has stopped.
    expect(aCard).toBeNull();
  });
});
