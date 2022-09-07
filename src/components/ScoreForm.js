import { useRef } from "react";
import { msToMinsSecsAndMs } from "../utils/convertTime";
import styles from "../sass/components/ScoreForm.module";

const ScoreForm = ({
  score,
  handleSubmitButton,
  handleRestart,
  isHighScore,
}) => {
  const inputRef = useRef();

  const handleClick = (e) => {
    e.preventDefault();
    const input = inputRef.current;
    if (input.value === "") {
      input.classList.add("invalid");
    } else {
      handleSubmitButton(input.value);
    }
  };

  return (
    <div className={styles.root}>
      {isHighScore ? (
        <div className={styles.highScoreForm}>
          <h3> You made the top ten!</h3>
          <p>Your time was {msToMinsSecsAndMs(score)} seconds.</p>
          <form>
            <input
              type="text"
              className={styles.nameInput}
              placeholder="Enter your name..."
              ref={inputRef}
            ></input>
            <button className={styles.scoresSubmitButton} onClick={handleClick}>
              Submit
            </button>
          </form>
        </div>
      ) : (
        <div className={styles.finalScore}>
          <p>Your time was {msToMinsSecsAndMs(score)} seconds.</p>
          <button className={styles.restart} onClick={handleRestart}>
            Restart
          </button>
        </div>
      )}
    </div>
  );
};

export default ScoreForm;
