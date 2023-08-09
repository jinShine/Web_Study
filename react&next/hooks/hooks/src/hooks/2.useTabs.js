import { useState } from "react";

const useTabs = (initialIndex, contents) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  if (!contents || !Array.isArray(contents)) return;

  return {
    currentItem: contents[currentIndex],
    changeItem: setCurrentIndex,
  };
};

export default useTabs;
