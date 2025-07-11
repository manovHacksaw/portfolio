import { useState, useEffect } from 'react';

export const useItemSwitcher = (itemCount: number, interval = 3000) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (itemCount === 0) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % itemCount);
    }, interval);

    return () => clearInterval(timer);
  }, [itemCount, interval]);

  return currentIndex;
};