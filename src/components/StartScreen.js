import React from "react";
import Discworld from "../assets/the-discworld.jpg";
import styles from '../sass/components/StartScreen.module'

const StartScreen = ({ handleStart, isSignedIn }) => {
  return (
    <div className={styles.root}>
      <div className="main-content-wrap">
        <div className="image-container">
          <img src={Discworld} alt="The Discworld on the back of Great Atuin" />
        </div>
        <p>
          Find and select the four Discworld characters in the fastest possible
          time.
        </p>
        <button
          className="start-button"
          type="button"
          onClick={handleStart}
          disabled={!isSignedIn}
        >
          Start the clock!
        </button>
      </div>
    </div>
  );
};

export default StartScreen;
