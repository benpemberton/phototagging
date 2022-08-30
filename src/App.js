import React, { useEffect, useState } from "react";
import firebaseSignIn from "./firebase/firebaseSignIn";
import { cleanUserList } from "./firebase/firestoreCalls";
import Header from "./components/Header";
import StartScreen from "./components/StartScreen";
import GameImage from "./components/GameImage";
import LeaderModal from "./components/LeaderModal";
import Footer from "./components/Footer";
import { characterArray } from "./utils/characterArray";
import "./app.css";

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({});
  const [showStart, setShowStart] = useState(true);
  const [startGame, setStartGame] = useState(false);
  const [characters, setCharacters] = useState(characterArray);
  const [leaderModal, setLeaderModal] = useState(false);
  const [topTenScores, setTopTenScores] = useState(null);

  useEffect(() => {
    firebaseSignIn(setIsSignedIn);
    cleanUserList();
  }, []);

  const handleStart = () => {
    setUser({
      start: Date.now(),
    });
    setShowStart(false);
    setStartGame(true);
  };

  const handleEnd = async () => {
    setStartGame(false);
    setUser({
      ...user,
      end: Date.now(),
    });
  };

  const handleRestart = () => {
    setCharacters(characterArray);
    setLeaderModal(false);
    handleStart();
  };

  return (
    <div className="wrap">
      <Header startGame={startGame} user={user} characters={characters} />

      {showStart ? (
        <StartScreen handleStart={handleStart} isSignedIn={isSignedIn} />
      ) : (
        <GameImage
          characters={characters}
          setCharacters={setCharacters}
          handleEnd={handleEnd}
        />
      )}

      <Footer
        user={user}
        topTenScores={topTenScores}
        setTopTenScores={setTopTenScores}
        setLeaderModal={setLeaderModal}
        handleRestart={handleRestart}
      />

      {leaderModal && (
        <LeaderModal
          topTenScores={topTenScores}
          setLeaderModal={setLeaderModal}
        />
      )}
    </div>
  );
};

export default App;
