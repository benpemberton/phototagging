import React from "react";

const StartScreen = ({ handleStart, isSignedIn }) => {
  return (
    <div className="start-screen-wrap">
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
  );
};

export default StartScreen;
