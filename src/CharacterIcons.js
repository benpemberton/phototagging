import React from "react";
import ridcully from "./ridcully.jpg";
import samVimes from "./sam-vimes.jpg";
import deathOfRats from "./death-of-rats.jpg";
import igor from "./igor.jpg";

const CharacterIcons = () => {
  return (
    <div className="character-icons">
      <img src={ridcully} alt="Archchancellor Ridcully" />
      <img src={samVimes} alt="Sir Samuel Vimes" />
      <img src={deathOfRats} alt="The Death of Rats" />
      <img src={igor} alt="Igor" />
    </div>
  );
};

export default CharacterIcons;
