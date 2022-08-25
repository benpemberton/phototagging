import React, { useState, useRef } from "react";
import discworldImage from "../assets/discworld-characters.jpg";
import Dropdown from "./Dropdown";
import { getPosition } from "../firebase/firestoreCalls";
import { checkIfAllFound } from "../utils/checkCharacters";

const GameImage = ({ characters, setCharacters, handleEnd }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mousePos, setMousePos] = useState(null);
  const [imgPos, setImgPos] = useState(null);

  const imgRef = useRef();

  const handleDocClick = () => {
    if (showDropdown) setShowDropdown(false);
  };

  const handleImgClick = (e) => {
    const rect = imgRef.current.getBoundingClientRect();
    setImgPos({
      top: parseInt(rect.top),
      left: parseInt(rect.left),
      height: rect.height,
      width: rect.width,
    });

    setMousePos({
      top: e.nativeEvent.offsetY,
      left: e.nativeEvent.offsetX,
    });

    setShowDropdown(!showDropdown);
  };

  const handleLiClick = async (name) => {
    try {
      const located = await isCharacterLocated(name);

      if (!located) return;

      const newArray = characters.map((obj) => {
        if (obj.name !== name) return obj;
        return { ...obj, found: true };
      });
      setCharacters(newArray);

      checkIfAllFound(newArray) ? handleEnd() : null;
    } catch (err) {
      console.log(err);
    }
  };

  const isCharacterLocated = async (name) => {
    const relMousePos = {
      top: mousePos.top / imgPos.height,
      left: mousePos.left / imgPos.width,
    };

    const character = await getPosition(name);

    if (
      relMousePos.top > character.yLower &&
      relMousePos.top < character.yUpper &&
      relMousePos.left > character.xLower &&
      relMousePos.left < character.xUpper
    ) {
      return true;
    }
  };

  return (
    <div className="game-image-wrap" onClick={handleDocClick}>
      <div className="game-image-container">
        <img
          src={discworldImage}
          alt="A crowd of Discworld characters"
          onClick={handleImgClick}
          ref={imgRef}
        />
        {showDropdown && (
          <Dropdown
            {...mousePos}
            handleLiClick={handleLiClick}
            characters={characters}
          />
        )}
      </div>
    </div>
  );
};

export default GameImage;
