import React from "react";

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
      return "inactive";
    }
  }

  return (
    <div className="dropdown" style={dropdownPosition}>
      <ul>
        <li
          className={checkIfFound("samVimes")}
          onClick={() => handleLiClick("samVimes")}
        >
          Sam Vimes
        </li>
        <li
          className={checkIfFound("deathOfRats")}
          onClick={() => handleLiClick("deathOfRats")}
        >
          Death of Rats
        </li>
        <li
          className={checkIfFound("ridcully")}
          onClick={() => handleLiClick("ridcully")}
        >
          Ridcully
        </li>
        <li
          className={checkIfFound("igor")}
          onClick={() => handleLiClick("igor")}
        >
          Igor
        </li>
      </ul>
    </div>
  );
}
