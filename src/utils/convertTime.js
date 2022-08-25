const msToMinsSecsAndMs = (ms) => {
  let minutes = Math.floor(ms / 60000);
  let seconds = ((ms % 60000) / 1000).toFixed(0);
  let millis = (ms % 1000).toFixed(0);

  if (minutes < 1) {
    return seconds + "." + (millis < 10 ? "0" : "") + millis;
  } else {
    return (
      minutes + " min " + seconds + "." + (millis < 10 ? "0" : "") + millis
    );
  }
};

const msToMinsAndSecs = (ms) => {
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

export { msToMinsSecsAndMs, msToMinsAndSecs };
