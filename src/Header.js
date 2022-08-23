import React from "react";
import Time from "./Time";

const Header = ({ counter }) => {
  return (
    <div className="header">
      <Time counter={counter} />
      <h1>Discworld Characters</h1>
    </div>
  );
};

export default Header;
