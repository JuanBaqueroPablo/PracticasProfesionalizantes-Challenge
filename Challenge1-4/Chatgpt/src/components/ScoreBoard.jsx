function ScoreBoard({ maxScore, currentScore }) {
  return (
    <div>
      <p>Puntaje Máximo: {maxScore}</p>
      <p>Puntaje Actual: {currentScore}</p>
    </div>
  );
}

export default ScoreBoard;
