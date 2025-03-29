import { useState, useEffect } from "react";
import "./App.css"; // Import the CSS file

function Timer({ title }) {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    let interval;
    if (isRunning) {
      const start = startTime || Date.now() - time;
      setStartTime(start);

      interval = setInterval(() => {
        setTime(Date.now() - start);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime]);

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const hrs = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");
    const milli = String(Math.floor((ms % 1000) / 10)).padStart(2, "0"); // Two-digit milliseconds
    return `${hrs}:${mins}:${secs}.${milli}`;
  };

  return (
    <div className="timer-container">
      <h2>{title}</h2>
      <div className="timer">{formatTime(time)}</div>
      <div className="buttons">
        <button onClick={() => setIsRunning(true)}>Play</button>
        <button onClick={() => setIsRunning(false)}>Pause</button>
        <button
          onClick={() => {
            setIsRunning(false);
            setTime(0);
            setStartTime(null);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="grid-container">
      <Timer title="Work" />
      <Timer title="Rest" />
      <Timer title="Eat" />
      <Timer title="Misc" />
    </div>
  );
}

export default App;
