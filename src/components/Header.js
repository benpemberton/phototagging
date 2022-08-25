import React from "react";
import Time from "./Time";
import CharacterIcons from "./CharacterIcons";

const Header = ({ startGame, counter, setCounter, characters }) => {
  return (
    <div className="header">
      <Time startGame={startGame} counter={counter} setCounter={setCounter} />
      <h1>Discworld Characters</h1>
      <CharacterIcons characters={characters} />
    </div>
  );
};

export default Header;
