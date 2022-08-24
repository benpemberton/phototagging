import React from "react";
import Time from "./Time";
import CharacterIcons from "./CharacterIcons";


const Header = ({ counter }) => {
  return (
    <div className="header">
      <Time counter={counter} />
      <h1>Discworld Characters</h1>
      <CharacterIcons />
    </div>
  );
};

export default Header;
