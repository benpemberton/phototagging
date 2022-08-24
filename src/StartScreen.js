import React from "react";
import CharacterIcons from "./CharacterIcons";

const StartScreen = ({ handleStartButton, isSignedIn }) => {
  return (
    <div className="start-screen-wrap">
      <p>
        Find and select the four Discworld characters in the fastest possible
        time.
      </p>
      <button
        className="start-button"
        type="button"
        onClick={() => handleStartButton()}
        disabled={!isSignedIn}
      >
        Start the clock!
      </button>
    </div>
  );
};

export default StartScreen;
