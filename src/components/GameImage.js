import React, { useState, useEffect, useRef } from "react";
import discworldImage from "../assets/discworld-characters.jpg";
import Dropdown from "./Dropdown";
import CustomCursor from "./CustomCursor";
import { getPosition } from "../firebase/firestoreCalls";
import styles from '../sass/components/GameImage.module'

const GameImage = ({ characters, setCharacters }) => {
  const [mousePos, setMousePos] = useState(null);
  const [imgPos, setImgPos] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showCursor, setShowCursor] = useState(false);

  const imgRef = useRef();

  useEffect(() => {
    showDropdown
      ? (imgRef.current.style.cursor = "auto")
      : (imgRef.current.style.cursor = "none");
  }, [showDropdown]);

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

  const handleLiClick = async (e, name) => {
    try {
      const located = await isCharacterLocated(name);

      if (!located) return;

      const newArray = characters.map((obj) => {
        if (obj.name !== name) return obj;
        return { ...obj, found: true };
      });

      setCharacters(newArray);

      setMousePos({
        top: e.nativeEvent.offsetY - imgPos.top,
        left: e.nativeEvent.offsetX - imgPos.left,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleMouseOver = () => {
    setShowCursor(true);
  };

  const handleMouseOut = () => {
    if (showDropdown) return;
    setShowCursor(false);
  };

  const handleMouseMove = (e) => {
    if (showDropdown) return;
    setMousePos({
      top: e.nativeEvent.offsetY,
      left: e.nativeEvent.offsetX,
    });
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
    <div className={`${styles.root} main-content-wrap`} onClick={handleDocClick}>
      <div className="game-image-container">
        <img
          src={discworldImage}
          alt="A crowd of Discworld characters"
          onClick={handleImgClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onMouseMove={handleMouseMove}
          ref={imgRef}
        />
        {showCursor && <CustomCursor {...mousePos} />}
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
