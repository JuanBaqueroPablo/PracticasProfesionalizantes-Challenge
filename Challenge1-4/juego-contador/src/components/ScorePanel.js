import React from 'react';
import './ScorePanel.css';

/**
 * ScorePanel — displays the current score, time remaining, and all-time high score.
 */
function ScorePanel({ currentScore, timeLeft, highScore, isPlaying }) {
  return (
    <div className="score-panel">
      <div className={`score-item ${isPlaying ? 'score-item--active' : ''}`}>
        <span className="score-label">CLICKS</span>
        <span className="score-value score-value--current">{currentScore}</span>
      </div>

      <div className={`score-item score-item--timer ${isPlaying ? 'score-item--active' : ''}`}>
        <span className="score-label">TIEMPO</span>
        <span className={`score-value score-value--timer ${timeLeft <= 2 && isPlaying ? 'score-value--danger' : ''}`}>
          {timeLeft}s
        </span>
      </div>

      <div className="score-item">
        <span className="score-label">RÉCORD</span>
        <span className="score-value score-value--high">{highScore}</span>
      </div>
    </div>
  );
}

export default ScorePanel;
