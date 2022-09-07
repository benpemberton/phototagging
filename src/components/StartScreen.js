import Discworld from "../assets/the-discworld.jpg";
import styles from "../sass/components/StartScreen.module";

const StartScreen = ({ handleStart, isSignedIn }) => {
  return (
    <div className={styles.root}>
      <div className={styles.imageContainer}>
        <img src={Discworld} alt="The Discworld on the back of Great Atuin" />
      </div>
      <p>
        Find and select the four Discworld characters in the fastest possible
        time.
      </p>
      <button onClick={handleStart} disabled={!isSignedIn}>
        Start the clock!
      </button>
    </div>
  );
};

export default StartScreen;
