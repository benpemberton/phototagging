import React, { useState, useEffect } from "react";
import { msToMinsAndSecs } from "../utils/convertTime";
import styles from '../sass/components/Time.module'

const Time = ({ startGame, user }) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    let interval;

    if (user.start && user.end) {
      setCounter(user.end - user.start);
    } else if (startGame && user.start) {
      setCounter(0);

      interval = setInterval(() => {
        const diff = Date.now() - user.start;

        setCounter(diff);
      }, 500);
    }

    return () => clearInterval(interval);
  }, [startGame, user]);

  return (
    <div className={styles.root}>
      <p>{msToMinsAndSecs(counter)}</p>
    </div>
  );
};

export default Time;
