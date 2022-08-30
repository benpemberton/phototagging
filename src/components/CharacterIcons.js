import React from "react";
import { checkIfFound } from "../utils/checkCharacters";
import ridcully from "../assets/ridcully.jpg";
import samVimes from "../assets/sam-vimes.jpg";
import deathOfRats from "../assets/death-of-rats.jpg";
import igor from "../assets/igor.jpg";

const CharacterIcons = ({ characters }) => {
  return (
    <div className="character-icons header-item">
      <div className={`character ${checkIfFound(characters, "ridcully")}`}>
        <img src={ridcully} alt="Archchancellor Ridcully" />
        <p className="name">Ridcully</p>
      </div>
      <div className={`character ${checkIfFound(characters, "samVimes")}`}>
        <img src={samVimes} alt="Sir Samuel Vimes" />
        <p className="name">Sam Vimes</p>
      </div>
      <div className={`character ${checkIfFound(characters, "deathOfRats")}`}>
        <img src={deathOfRats} alt="The Death of Rats" />
        <p className="name">Death of Rats</p>
      </div>
      <div className={`character ${checkIfFound(characters, "igor")}`}>
        <img src={igor} alt="Igor" />
        <p className="name">Igor</p>
      </div>
    </div>
  );
};

export default CharacterIcons;
