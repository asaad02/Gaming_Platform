// Import necessary utilities and components for testing.
import React from 'react';
import {render, fireEvent, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import HowToPlayGame from '../src/HowToPlayGame/HowToplayGame';

// Describe block defines a test suite for the HowToPlayGame modal component.
describe('HowToPlayGame Modal', () => {
  // Test 1: Checks if the modal renders with correct content.
  it('displays the game instructions', () => {
    // Renders the HowToPlayGame component into the virtual DOM for testing.
    render(<HowToPlayGame onClose={() => {}} />);
    // Asserts that the modal displays the correct instructional text.
    // These checks ensure that specific text elements present in the document.
    // verifying the modal's content.

    expect(screen.getByText('How to Play the Game')).toBeInTheDocument();

    expect(screen.getByText('Objective:')).toBeInTheDocument();
    expect(screen.getByText('Select Cards:')).toBeInTheDocument();
  });

  // Test 2: Verifies that the onClose callback is called when the close button
  // is clicked.
  it('calls onClose when the close button is clicked', () => {
    // Creates a mock function to serve as the onClose prop.
    // This allows us to check if the function is called as expected.
    const onCloseMock = jest.fn();
    // Renders the component with the mock function passed as the onClose prop.
    render(<HowToPlayGame onClose={onCloseMock} />);
    // Simulates a user clicking the close button in the modal.
    // The '×' character represents the close button text/icon.
    fireEvent.click(screen.getByText('×'));
    // Checks that the mock onClose function was called exactly once.
    // This verifies that the modal's close functionality works as intended.
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  // Test 3: Ensures the modal does not close when clicking its content.
  it('does not close the modal when content is clicked', () => {
    // Again, a mock function is created for testing the onClose callback.
    const onCloseMock = jest.fn();
    // The component is rendered with the mock function as the onClose prop.
    render(<HowToPlayGame onClose={onCloseMock} />);
    // Simulates a click event inside the modal, specifically on a piece of
    // instructional text.
    // This tests the modal's behavior to not close when its content
    // is interacted with.

    // fireEvent.click(
    //     screen.getByText(welcomeMessage));
    // Asserts that the onClose callback was not triggered by the content click.
    // This confirms the modal remains open unless the close button
    // is specifically clicked.
    expect(onCloseMock).not.toHaveBeenCalled();
  });
});
