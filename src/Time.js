import React, { useState, useEffect } from "react";

const Time = ({ counter }) => {
  const [time, setTime] = useState("00:00");

  useEffect(() => {
    if (counter % 1000 === 0) {
      setTime(convertMsToMinsAndSecs(counter));
    }
  }, [counter]);

  const convertMsToMinsAndSecs = (ms) => {
    let minutes = Math.floor(ms / 60000);
    let seconds = ((ms % 60000) / 1000).toFixed(0);
    return (
      (minutes < 10 ? "0" : "") +
      minutes +
      ":" +
      (seconds < 10 ? "0" : "") +
      seconds
    );
  };

  return (
    <div className="time">
      <p>{time}</p>
    </div>
  );
};

export default Time;
