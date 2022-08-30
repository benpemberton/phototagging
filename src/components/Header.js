import React from "react";
import Time from "./Time";
import CharacterIcons from "./CharacterIcons";

const Header = ({ startGame, user, characters }) => {
  return (
    <div className="header">
      <h1 className="header-item">Discworld Characters</h1>
      <Time startGame={startGame} user={user} />
      <CharacterIcons characters={characters} />
    </div>
  );
};

export default Header;
