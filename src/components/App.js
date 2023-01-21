import { useEffect, useState } from "react";
import firebaseSignIn from "../firebase/firebaseSignIn";
import { cleanUserList } from "../firebase/firestoreCalls";
import Header from "./Header";
import StartScreen from "./StartScreen";
import GameImage from "./GameImage";
import LeaderModal from "./LeaderModal";
import Footer from "./Footer";
import { characterArray } from "../utils/characterArray";
import styles from "../sass/App.module";

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

  useEffect(() => {
    if (!checkIfAllFound(characters)) return;
    handleEnd();
  }, [characters]);

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

  const checkIfAllFound = (characters) => {
    return characters.every((character) => character.found);
  };

  return (
    <div className={styles.root}>
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
