import {useState, useCallback} from 'react';

// Custom hook to manage the active name for shifting
export const useShift = () => {
  const [activeName, setActiveName] = useState(null);
  const toggleActiveName = useCallback((name) => {
    setActiveName((currentName) => currentName === name ? null : name);
  }, []);

  return {activeName, toggleActiveName};
};
