import React, { useState, useEffect } from "react";
import { msToMinsAndSecs } from "../utils/convertTime";

const Time = ({ startGame }) => {
  const [time, setTime] = useState("00:00");
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let interval;

    if (startGame) {
      setCounter(0);

      interval = setInterval(() => {
        setCounter((counter) => counter + 10);
      }, 10);
    }

    return () => clearInterval(interval);
  }, [startGame]);

  useEffect(() => {
    if (counter % 1000 === 0) {
      setTime(msToMinsAndSecs(counter));
    }
  }, [counter]);

  return (
    <div className="time">
      <p>{time}</p>
    </div>
  );
};

export default Time;
