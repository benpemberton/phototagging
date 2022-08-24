import React, { useState, useEffect } from "react";
import { msToMinsAndSecs } from "./convertTime";

const Time = ({ counter }) => {
  const [time, setTime] = useState("00:00");

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
