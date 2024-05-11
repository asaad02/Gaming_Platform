// Import necessary libraries and components for the test.
import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
// Required for routing context in tests
import {BrowserRouter} from 'react-router-dom';
// Ensure the path matches the location of your NavBar component.
import NavBar from '../src/NavBar/NavBar';
import {SessionProvider} from '../src/SessionProvider/index.js';

// Describe block sets up a test suite for the NavBar component.
describe('NavBar', () => {
  // Utility function to render the component within the context of a Router.
  // This is necessary because the NavBar component likely uses Link components
  //  from React Router,
  // which require a routing context to function properly.
  const renderWithRouter = (ui, {route = '/'} = {}) => {
    // Simulate navigation to a test route
    window.history.pushState({}, 'Test page', route);
    // Render the UI within a BrowserRouter to provide routing context
    return render(ui, {wrapper: BrowserRouter});
  };

  // Test to verify that the NavBar renders the logo element.
  it('renders the logo', () => {
    renderWithRouter(<SessionProvider><NavBar /></SessionProvider>);
    // Assert that an element with the alt text 'Logo' is present,
    // indicating the logo has been rendered successfully.
    expect(screen.getByAltText('Logo')).toBeInTheDocument();
  });

  // Test to ensure the NavBar contains a link to the About Us page.
  it('has a link to the About Us page', () => {
    renderWithRouter(<SessionProvider><NavBar /></SessionProvider>);
    // Assert that there's a link with the name 'About Us'
    // and it points to the '/about' route.
    // This verifies the presence and correctness of the link's href attribute.
    expect(screen.getByRole('link', {name: 'About Us'})).toHaveAttribute(
        'href', '/about');
  });
});
