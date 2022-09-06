import React from "react";
import styles from "../sass/components/Dropdown.module";

export default function Dropdown({ top, left, handleLiClick, characters }) {
  const dropdownPosition = {
    top: top + "px",
    left: left + 10 + "px",
  };

  function checkIfFound(name) {
    if (
      characters.some((character) => {
        return character.name === name && character.found;
      })
    ) {
      return true;
    }
  }

  return (
    <div className={styles.root} style={dropdownPosition}>
      <ul>
        <li
          className={checkIfFound("samVimes") ? styles.inactive : null}
          onClick={(e) => handleLiClick(e, "samVimes")}
        >
          Sam Vimes
        </li>
        <li
          className={checkIfFound("deathOfRats") ? styles.inactive : null}
          onClick={(e) => handleLiClick(e, "deathOfRats")}
        >
          Death of Rats
        </li>
        <li
          className={checkIfFound("ridcully") ? styles.inactive : null}
          onClick={(e) => handleLiClick(e, "ridcully")}
        >
          Ridcully
        </li>
        <li
          className={checkIfFound("igor") ? styles.inactive : null}
          onClick={(e) => handleLiClick(e, "igor")}
        >
          Igor
        </li>
      </ul>
    </div>
  );
}
