import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  // Extracts the current path (e.g., "/about")
  const { pathname } = useLocation();

  useEffect(() => {
    // Whenever the 'pathname' changes, scroll to the top
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Use "instant" so users don't see the scroll animation
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;