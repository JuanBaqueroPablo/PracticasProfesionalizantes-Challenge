import React from 'react';
import './ResultBanner.css';

/**
 * ResultBanner — shown after the game ends with the final result.
 */
function ResultBanner({ currentScore, highScore, newRecord }) {
  return (
    <div className={`result-banner ${newRecord ? 'result-banner--record' : ''}`}>
      {newRecord ? (
        <>
          <span className="result-banner__icon">🏆</span>
          <span className="result-banner__message">¡Nuevo récord!</span>
          <span className="result-banner__score">{currentScore} clicks</span>
        </>
      ) : (
        <>
          <span className="result-banner__message">Resultado final</span>
          <span className="result-banner__score">{currentScore} clicks</span>
          <span className="result-banner__sub">Récord: {highScore}</span>
        </>
      )}
    </div>
  );
}

export default ResultBanner;
