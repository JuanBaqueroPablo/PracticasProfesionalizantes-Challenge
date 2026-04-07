import { useState, useEffect, useRef, useCallback } from 'react';

// Game phases
export const PHASE = {
  IDLE: 'idle',
  COUNTDOWN: 'countdown',
  PLAYING: 'playing',
  FINISHED: 'finished',
};

const COUNTDOWN_MESSAGES = ['Preparados', 'Listos', 'Ya'];
const GAME_DURATION = 5;

export function useGameLogic() {
  const [phase, setPhase] = useState(PHASE.IDLE);
  const [countdownIndex, setCountdownIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [currentScore, setCurrentScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [newRecord, setNewRecord] = useState(false);

  const countdownRef = useRef(null);
  const gameTimerRef = useRef(null);

  // Cleanup all intervals on unmount
  useEffect(() => {
    return () => {
      clearInterval(countdownRef.current);
      clearInterval(gameTimerRef.current);
    };
  }, []);

  const startGame = useCallback(() => {
    // Reset state for a new round
    setPhase(PHASE.COUNTDOWN);
    setCountdownIndex(0);
    setCurrentScore(0);
    setTimeLeft(GAME_DURATION);
    setNewRecord(false);

    let index = 0;

    countdownRef.current = setInterval(() => {
      index += 1;

      if (index < COUNTDOWN_MESSAGES.length) {
        setCountdownIndex(index);
      } else {
        // Countdown finished — start the game
        clearInterval(countdownRef.current);
        setPhase(PHASE.PLAYING);

        let remaining = GAME_DURATION;

        gameTimerRef.current = setInterval(() => {
          remaining -= 1;
          setTimeLeft(remaining);

          if (remaining <= 0) {
            clearInterval(gameTimerRef.current);
            setPhase(PHASE.FINISHED);
          }
        }, 1000);
      }
    }, 1000);
  }, []);

  const handleClick = useCallback(() => {
    if (phase !== PHASE.PLAYING) return;
    setCurrentScore((prev) => prev + 1);
  }, [phase]);

  // Update high score when game finishes
  useEffect(() => {
    if (phase === PHASE.FINISHED) {
      setHighScore((prev) => {
        if (currentScore > prev) {
          setNewRecord(true);
          return currentScore;
        }
        return prev;
      });
    }
  }, [phase, currentScore]);

  return {
    phase,
    countdownMessage: COUNTDOWN_MESSAGES[countdownIndex],
    timeLeft,
    currentScore,
    highScore,
    newRecord,
    startGame,
    handleClick,
  };
}
