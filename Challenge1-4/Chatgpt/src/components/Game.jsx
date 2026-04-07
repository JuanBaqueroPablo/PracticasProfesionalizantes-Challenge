import { useState, useEffect } from "react";
import ScoreBoard from "./ScoreBoard";
import Timer from "./Timer";

const COUNTDOWN_MESSAGES = ["Preparados", "Listos", "Ya"];

function Game() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [countdownIndex, setCountdownIndex] = useState(-1);
  const [timeLeft, setTimeLeft] = useState(5);
  const [clicks, setClicks] = useState(0);
  const [maxScore, setMaxScore] = useState(0);
  const [canClick, setCanClick] = useState(false);

  useEffect(() => {
    if (countdownIndex >= 0 && countdownIndex < COUNTDOWN_MESSAGES.length) {
      const timer = setTimeout(() => {
        setCountdownIndex((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    }

    if (countdownIndex === COUNTDOWN_MESSAGES.length) {
      setCanClick(true);
      setIsPlaying(true);
      setCountdownIndex(-1);
    }
  }, [countdownIndex]);

  useEffect(() => {
    if (isPlaying && timeLeft > 0) {
      const interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }

    if (timeLeft === 0 && isPlaying) {
      endGame();
    }
  }, [isPlaying, timeLeft]);

  const startGame = () => {
    setClicks(0);
    setTimeLeft(5);
    setCountdownIndex(0);
    setCanClick(false);
  };

  const handleClick = () => {
    if (canClick) {
      setClicks((prev) => prev + 1);
    }
  };

  const endGame = () => {
    setIsPlaying(false);
    setCanClick(false);
    if (clicks > maxScore) setMaxScore(clicks);
  };

  return (
    <div>
      <ScoreBoard maxScore={maxScore} currentScore={clicks} />

      {countdownIndex >= 0 && (
        <h2>{COUNTDOWN_MESSAGES[countdownIndex]}</h2>
      )}

      <Timer timeLeft={timeLeft} />

      <button onClick={startGame} disabled={isPlaying || countdownIndex >= 0}>
        Iniciar
      </button>

      <button onClick={handleClick} disabled={!canClick}>
        Click
      </button>
    </div>
  );
}

export default Game;
