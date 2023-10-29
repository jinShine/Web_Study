import { useEffect, useState } from "react";

function Timer() {
  useEffect(() => {
    const savedTitme = document.title;

    const id = setInterval(() => {
      document.title = `Now: ${new Date().getTime()}`;
    }, 100);

    return () => {
      console.log("End of effect");
      clearInterval(id);
      document.title = savedTitme;
    };
  }, []);

  return null;
}

export default function TimerControl() {
  const [playing, setPlaying] = useState(false);

  const handleClick = () => {
    setPlaying(!playing);
  };

  return (
    <>
      {playing ? <Timer /> : <p>Stop</p>}
      <button type="button" onClick={handleClick}>
        Toggle
      </button>
    </>
  );
}
