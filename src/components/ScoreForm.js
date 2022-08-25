import React, { useRef } from "react";
import { msToMinsSecsAndMs } from "../utils/convertTime";

export default function ScoreForm({
  score,
  handleSubmitButton,
  handleRestart,
  isHighScore,
}) {
  const inputRef = useRef();

  function handleClick(e) {
    e.preventDefault();
    const input = inputRef.current;
    if (input.value === "") {
      input.classList.add("invalid");
    } else {
      handleSubmitButton(input.value);
    }
  }

  return (
    <>
      {isHighScore ? (
        <div className="high-score-form">
          <h3> You made the top ten!</h3>
          <p>Your time was {msToMinsSecsAndMs(score)} seconds.</p>
          <form>
            <input
              type="text"
              className="name-input"
              placeholder="Enter your name..."
              ref={inputRef}
            ></input>
            <button className="score-submit-btn" onClick={handleClick}>
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className="final-score">
          <p>Your time was {msToMinsSecsAndMs(score)} seconds.</p>
          <button className="restart" onClick={handleRestart}>
            Restart
          </button>
        </div>
      )}
    </>
  );
}
