import { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Add event listener
    const debouncedHandleResize = debounce(handleResize, 150)
    window.addEventListener("resize", debouncedHandleResize);
    
    handleResize();
    
    return () => window.removeEventListener("resize", debouncedHandleResize);
  }, []);

  return windowSize;
}
