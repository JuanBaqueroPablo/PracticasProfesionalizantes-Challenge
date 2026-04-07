import React from 'react';
import './App.css';
import { useGameLogic, PHASE } from './hooks/useGameLogic';
import ScorePanel from './components/ScorePanel';
import CountdownDisplay from './components/CountdownDisplay';
import ResultBanner from './components/ResultBanner';

function App() {
  const {
    phase,
    countdownMessage,
    timeLeft,
    currentScore,
    highScore,
    newRecord,
    startGame,
    handleClick,
  } = useGameLogic();

  const isIdle = phase === PHASE.IDLE;
  const isCountdown = phase === PHASE.COUNTDOWN;
  const isPlaying = phase === PHASE.PLAYING;
  const isFinished = phase === PHASE.FINISHED;

  const canStart = isIdle || isFinished;
  const canClick = isPlaying;

  return (
    <main className="app">
      {/* Background grid decoration */}
      <div className="app__grid" aria-hidden="true" />

      {/* Card */}
      <div className="game-card">
        {/* Header */}
        <header className="game-card__header">
          <div className="game-card__badge">React Challenge</div>
          <h1 className="game-card__title">JuegoContador</h1>
          <p className="game-card__subtitle">
            ¿Cuántos clicks podés hacer en 5 segundos?
          </p>
        </header>

        {/* Score panel — always visible */}
        <ScorePanel
          currentScore={currentScore}
          timeLeft={timeLeft}
          highScore={highScore}
          isPlaying={isPlaying}
        />

        {/* Countdown message */}
        {isCountdown && (
          <CountdownDisplay message={countdownMessage} />
        )}

        {/* Result banner */}
        {isFinished && (
          <ResultBanner
            currentScore={currentScore}
            highScore={highScore}
            newRecord={newRecord}
          />
        )}

        {/* Controls */}
        <div className="game-card__controls">
          {/* Start button */}
          <button
            className="btn btn--start"
            onClick={startGame}
            disabled={!canStart}
            aria-label="Iniciar juego"
          >
            {isFinished ? 'JUGAR DE NUEVO' : 'INICIAR JUEGO'}
          </button>

          {/* Click button */}
          <button
            className={`btn btn--click ${isPlaying ? 'btn--click-active' : ''}`}
            onClick={handleClick}
            disabled={!canClick}
            aria-label="Clickear"
          >
            <span className="btn__icon">⚡</span>
            CLICK!
          </button>
        </div>

        {/* Footer hint */}
        <p className="game-card__hint">
          {isIdle && 'Presioná INICIAR para comenzar'}
          {isCountdown && 'Preparate...'}
          {isPlaying && '¡Dale, dale, dale!'}
          {isFinished && 'Presioná JUGAR DE NUEVO para intentar superar tu récord'}
        </p>
      </div>
    </main>
  );
}

export default App;
