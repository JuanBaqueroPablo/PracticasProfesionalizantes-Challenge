import React from 'react';
import './CountdownDisplay.css';

/**
 * CountdownDisplay — shows the animated "Preparados / Listos / Ya" message.
 */
function CountdownDisplay({ message }) {
  return (
    <div className="countdown-display">
      <span key={message} className="countdown-text">
        {message}
      </span>
    </div>
  );
}

export default CountdownDisplay;
