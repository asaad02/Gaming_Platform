// ShiftContext.js
import React, {createContext, useContext, useState, useEffect} from 'react';
// Import the PropTypes library for type-checking props
import PropTypes from 'prop-types';

// Create a new Context object.
// This will be used to allow components to subscribe to context changes.
const ShiftContext = createContext();

// Define a list of names that can be randomly selected as the active name.
const names = ['Abdullah', 'Aakil', 'Jacob', 'Dipto', 'Lucas', 'Hammad'];

// ShiftProvider is a component that wraps part of your application.
// where the ShiftContext needs to be accessible.
// It initializes and provides the application's state.
// regarding which name is currently 'active'.
export const ShiftProvider = ({children}) => {
  // State hook to store the currently active name.
  // It starts with an empty string and will be set to
  // a random name from the `names` array when the component mounts.
  const [activeName, setActiveName] = useState('');

  // useEffect hook to set the activeName state
  // to a random name from the `names` array when the component mounts.
  useEffect(() => {
    setActiveName(names[Math.floor(Math.random() * names.length)]);
  }, []);

  // The value provided to the context
  //  consumers includes only `activeName` for now.
  // This allows any child component to access the currently active name.
  return (
    <ShiftContext.Provider value={{activeName}}>
      {children} {/* Render children components passed into ShiftProvider */}
    </ShiftContext.Provider>
  );
};

// PropType validation for ShiftProvider component.
// This ensures that `children` prop passed
// to ShiftProvider is required and must be a renderable React node.
ShiftProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


// Custom hook `useShift` to provide a simpler
// and more direct API for accessing the ShiftContext from any component.
// This hook abstracts away the useContext hook used with ShiftContext
// making it easier to use.

export const useShift = () => useContext(ShiftContext);
