import React, { useState, useEffect, useLayoutEffect } from "react";
import ShowLeaderboard from "./ShowLeaderboard";
import BackgroundModal from "./BackgroundModal";
import HighScoreForm from "./HighScoreForm";
import LeaderModal from "./LeaderModal";
import discworldImage from "./discworld-characters.jpg";
import Dropdown from "./Dropdown";
import {
  getTopTen,
  isInTopTen,
  getPosition,
  createUserEntry,
  updateUserEntry
} from "./firestoreCalls";

const Game = ({ db, toggleCounter, counter }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [mousePos, setMousePos] = useState(null);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgPos, setImgPos] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [userID, setUserID] = useState(null);
  const [score, setScore] = useState(null);
  const [highScoreForm, setHighScoreForm] = useState(false);
  const [leaderModal, setLeaderModal] = useState(false);
  const [topTenScores, setTopTenScores] = useState(null);

  useEffect(() => {
    startOfGame();

    window.addEventListener('resize', getImgPosition);

    return () => window.removeEventListener('resize', getImgPosition);
  }, []);

  useEffect(() => {
    if (markers.length === 4) {
      endOfGame();
    }
  }, [markers]);

  useEffect(() => {
    if (score) {
      endOfGameTasks();
    }
  }, [score]);

  const startOfGame = () => {
    toggleCounter();
    const img = document.querySelector(".image-container").querySelector("img");
    img.onload = () => getImgPosition();
  }

  const endOfGame = () => {
    toggleCounter();
    setScore(counter);
  }

  const endOfGameTasks = async () => {
    try {
      const userRef = await createUserEntry(score, db);

      setUserID(userRef);

      if (await isInTopTen(db, score)) {
        setHighScoreForm(true);
      }
    } catch (err) {
      console.log(err)
    }
  }

  const getImgPosition = () => {
    const img = document.querySelector(".image-container").querySelector("img");
    const rect = img.getBoundingClientRect();
    setImgPos({ 
      top: parseInt(rect.top), 
      left: parseInt(rect.left),
      height: rect.height,
      width: rect.width,
    });
  }

  const handleDocClick = () => {
    if (!showDropdown) return;
    setShowDropdown(false);
  }

  const handleImgClick = (e) => {
    setShowDropdown(!showDropdown);
    setMousePos({ top: e.pageY, left: e.pageX });
  }

  const handleLiClick = async (dbName, normalName) => {
    try {
      const located = await isCharacterLocated(dbName);

      if (located) {
        setMarkers((markers) => [
          ...markers,
          {
            dbName: dbName,
            normalName: normalName,
          },
        ]);
      }
    } catch (err) {
      console.log(err);
    }

    const isCharacterLocated = async () => {
      const relMousePos = {
        top: (mousePos.top - imgPos.top) / imgPos.height,
        left: (mousePos.left - imgPos.left) / imgPos.width,
      };
  
      const character = await getPosition(db, dbName);
  
      if (
        relMousePos.top > character.yLower &&
        relMousePos.top < character.yUpper &&
        relMousePos.left > character.xLower &&
        relMousePos.left < character.xUpper
      ) {
        return true;
      }
    }
  }

const submitBtnClick = async (name) => {
  try {
    await updateUserEntry(db, userID, name)
    const topTen = await getTopTen(db);
    setTopTenScores(topTen);
    setLeaderModal(true);
  } catch (err) {
    console.log(err);
  }
}

const handleShowLeaderboard = async () => {
  if (!topTenScores) {
    try {
      const topTen = await getTopTen(db);
      setTopTenScores(topTen);
      setLeaderModal(true);
    } catch (err) {
      console.log(err);
    }
  } else {
    setLeaderModal(true);
  }
}

  function closeLeaderModal() {
    setLeaderModal(false);
  
  }

  return (
    <>
      <div className="game-wrap" onClick={handleDocClick}>
        <div className="image-container">
          <img
            src={discworldImage}
            alt="A crowd of Discworld characters"
            onClick={handleImgClick}
          />
          {showDropdown && (
            <Dropdown {...mousePos} handler={handleLiClick} markers={markers} />
          )}
        </div>
      </div>
      <div className="scores-area">
        <div className="scores-area-inner">
          {highScoreForm ? (
            <HighScoreForm score={score} handler={submitBtnClick} />
          ) : (
            <ShowLeaderboard handler={handleShowLeaderboard} />
          )}
        </div>
      </div>
      {leaderModal && <BackgroundModal handler={closeLeaderModal} />}
      {leaderModal && (
        <LeaderModal users={topTenScores} handler={closeLeaderModal} />
      )}
    </>
  );
};

export default Game;
